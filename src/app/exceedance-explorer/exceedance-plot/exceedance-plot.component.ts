import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';

import { ExceedanceControlPanelService } from '../exceedance-control-panel/exceedance-control-panel.service';
import { ExceedanceExplorer } from '../exceedance-explorer.model';
import { UncertaintyModel, ExceedanceModel, Maths, Preconditions } from '@nshmp/nshmp-web-utils';
import { ExceedancePlotService } from './exceedance-plot.service';
import {
  D3LineView,
  D3LineLegendOptions,
  D3LineSubViewOptions,
  D3LinePlot,
  D3LineData,
  D3LineOptions,
  D3LineSeriesData} from '@nshmp/nshmp-d3';

@Component({
  selector: 'app-exceedance-plot',
  templateUrl: './exceedance-plot.component.html',
  styleUrls: ['./exceedance-plot.component.scss']
})
export class ExceedancePlotComponent implements OnInit, OnDestroy {

  /** Plot container */
  @ViewChild('plotContainer') plotContainerEl: ElementRef<HTMLElement>;

  /** Control panel service add plot subscription */
  addPlotSubscription: Subscription;

  /** Control panel service clear plot subscription */
  clearPlotSubscription: Subscription;

  /** Control panel service remove plot subscription */
  removePlotSubscription: Subscription;

  /** The main plot view */
  plotView: D3LineView;

  /** The plot */
  exceedancePlot: D3LinePlot;

  /** X values for plot */
  xValues: number[];

  /** e^(xValues) */
  xValuesExp: number[];

  /** The data for the plot */
  exceedanceData: D3LineData;

  /** Default values */
  defaults = {
    xMin: 0.0001,
    xMax: 10.0,
    xPoints: 100
  };

  /** All medians for plots */
  medianValues: number[] = [];

  /** All sigmas for plots */
  sigmaValues: number[] = [];

  /** All rates for plots */
  rateValues: number[] = [];

  /** All truncations fro plots */
  truncationValues: string[] = [];

  /** All trunction levels for plots */
  truncationLevelValues: (string | number)[] = [];

  constructor(
    private controlPanelService: ExceedanceControlPanelService,
    private exceedancePlotService: ExceedancePlotService) { }

  ngOnInit() {
    this.addPlotSubscription = this.controlPanelService.addPlotObserve()
        .subscribe(values => this.addPlot(values));

    this.clearPlotSubscription = this.controlPanelService.clearPlotObserve()
        .subscribe(() => this.clearPlot());

    this.exceedancePlotService.hasPlotNext(false);
    this.exceedancePlotService.hasSelectedNext(false);

    this.plotView = this.createView(this.plotContainerEl.nativeElement);
    this.plotView.setTitle('Exceedance');

    this.exceedancePlot = new D3LinePlot(this.plotView);
    this.exceedanceData = this.exceedancePlot.upperLineData;

    this.xValues = this.createSequence();
    this.xValuesExp = this.xValues.map(x => Math.exp(x));

    this.exceedancePlot.onPlotSelection(this.exceedanceData, (selectedData: D3LineSeriesData) => {
      this.onPlotSelection(selectedData);
    });
  }

  ngOnDestroy() {
    this.addPlotSubscription.unsubscribe();
    this.clearPlotSubscription.unsubscribe();

    if (this.removePlotSubscription) {
      this.removePlotSubscription.unsubscribe();
    }
  }

  /**
   * Add a new plot.
   *
   * @param values The exceedance form values
   */
  addPlot(values: ExceedanceExplorer) {
    this.exceedancePlotService.hasPlotNext(true);

    const mean = Math.log(values.median);

    const model = new UncertaintyModel(mean, values.sigma, values.truncationLevel);

    let label = `μ=${values.median}, σ=${values.sigma}, rate=${values.rate}`;

    let yValues: number[];

    if (values.truncation) {
      yValues = ExceedanceModel.truncationUpperOnlySequence(model, this.xValues);
      label += `, n=${values.truncationLevel}`;
    } else {
      yValues = ExceedanceModel.truncationOffSequence(model, this.xValues);
    }

    yValues = yValues.map(y => Maths.round(y * values.rate, 4));

    const dataBuilder = this.getDataBuilder();

    const lineOptions = D3LineOptions.builder()
        .label(label)
        .markerSize(3)
        .lineWidth(1.25)
        .build();

    const data = dataBuilder
        .data(this.xValuesExp, yValues, lineOptions)
        .removeSmallValues(1e-14)
        .build();

    this.exceedanceData = data;

    this.exceedancePlot.clearAll();
    this.exceedancePlot.plot(data);

    this.updateValues(values);
    this.setPlotData(data);
  }

  /**
   * Clear all plots
   */
  clearPlot() {
    this.exceedancePlotService.hasPlotNext(false);

    this.exceedancePlot.clearAll();

    this.exceedanceData = D3LineData.builder()
        .subView(this.exceedanceData.subView)
        .build();

    this.medianValues = [];
    this.sigmaValues = [];
    this.rateValues = [];
    this.truncationValues = [];
    this.truncationLevelValues = [];
  }

  /**
   * Create the X values to plot.
   */
  createSequence() {
    const xMin = this.defaults.xMin;
    const xMax = this.defaults.xMax;
    const xPoints = this.defaults.xPoints;

    return d3.ticks(Math.log(xMin), Math.log(xMax), xPoints);
  }

  /**
   * Create the main view for the plot.
   *
   * @param plotContainerEl The plot container
   */
  createView(plotContainerEl: HTMLElement): D3LineView {
    Preconditions.checkArgumentInstanceOfHTMLElement(plotContainerEl);

    const legendOptions = D3LineLegendOptions.upperBuilder()
        .location('bottom-left')
        .build();

    const upperSubViewOptions = D3LineSubViewOptions.upperBuilder()
        .defaultXLimit([this.defaults.xMin, this.defaults.xMax])
        .filename('exceedance')
        .label('Exceedance Models')
        .legendOptions(legendOptions)
        .lineLabel('Exceedance Model')
        .xAxisScale('log')
        .xLabel('Ground Motion (g)')
        .yLabel('Annual Frequency of Exceedance')
        .xValueToExponent(true)
        .build();

    return D3LineView.builder()
        .containerEl(plotContainerEl)
        .upperSubViewOptions(upperSubViewOptions)
        .build();
  }

  /**
   * Return a D3LineData.Builder for plotting of the previous data
   * before adding a new plot
   */
  getDataBuilder() {
    const dataBuilder = D3LineData.builder()
        .subView(this.exceedancePlot.view.upperSubView);

    for (const series of this.exceedanceData.series) {
      const lineOptions = D3LineOptions.builder()
          .label(series.lineOptions.label)
          .markerSize(series.lineOptions.markerSize)
          .lineWidth(series.lineOptions.lineWidth)
          .build();

      dataBuilder.data(series.xValues, series.yValues, lineOptions);
    }

    return dataBuilder;
  }

  /**
   * Get the metadata about the plots.
   */
  metadata() {
    const metadata = new Map();

    metadata.set('Median (g)', this.medianValues);
    metadata.set('Sigma (natural log units)', this.sigmaValues);
    metadata.set('Truncation', this.truncationValues);
    metadata.set('Truncation Level (n)', this.truncationLevelValues);

    return metadata;
  }

  /**
   * On plot selection event handler.
   *
   * @param selectedData The selected data
   */
  onPlotSelection(selectedData: D3LineSeriesData) {
    if (!selectedData) {
      this.exceedancePlotService.hasSelectedNext(false);
    }

    Preconditions.checkArgumentInstanceOf(selectedData, D3LineSeriesData);

    this.exceedancePlotService.hasSelectedNext(true);

    if (this.removePlotSubscription) {
      this.removePlotSubscription.unsubscribe();
    }

    this.removePlotSubscription = this.controlPanelService.removePlotObserve()
        .subscribe(() => {
          this.removePlot(selectedData);
        });
  }

  /**
   * Remove selected data if clicked.
   *
   * @param selectedData The selected data to remove
   */
  removePlot(selectedData: D3LineSeriesData) {
    const index = this.exceedanceData.series.findIndex(series => {
      return series.lineOptions.id === selectedData.lineOptions.id;
    });

    this.exceedanceData.series.splice(index, 1);

    this.exceedancePlot.clearAll();
    this.removeValues(index);
    this.setPlotData(this.exceedanceData);

    this.exceedancePlotService.hasSelectedNext(false);

    if (this.exceedanceData.series.length === 0) {
      this.exceedancePlotService.hasPlotNext(false);
      return;
    }

    this.exceedancePlot.plot(this.exceedanceData);
  }

  /**
   * Remove values if a plot has been removed.
   */
  removeValues(index: number) {
    Preconditions.checkArgumentInteger(index);

    this.medianValues.splice(index, 1);
    this.sigmaValues.splice(index, 1);
    this.rateValues.splice(index, 1);
    this.truncationValues.splice(index, 1);
    this.truncationLevelValues.splice(index, 1);
  }

  /**
   * Set the plot data and metadata.
   *
   * @param data The line data
   */
  setPlotData(data: D3LineData) {
    Preconditions.checkArgumentInstanceOf(data, D3LineData);

    this.plotView.setSaveData(data);
    this.plotView.createDataTable(data);
    this.plotView.setMetadata(this.metadata());
    this.plotView.createMetadataTable();
  }

  /**
   * Update values.
   */
  updateValues(values: ExceedanceExplorer) {
    this.medianValues.push(values.median);
    this.sigmaValues.push(values.sigma);
    this.rateValues.push(values.rate);
    this.truncationValues.push(values.truncation ? 'On' : 'Off');
    this.truncationLevelValues.push(values.truncation ? values.truncationLevel : 'N/A');
  }

}
