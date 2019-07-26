import { FeatureCollection } from 'geojson';

export interface HazardMapPlotResults {
  fc: FeatureCollection;
  propertyName: string;
  legendTitle: string;
  mapTitle: string;
}
