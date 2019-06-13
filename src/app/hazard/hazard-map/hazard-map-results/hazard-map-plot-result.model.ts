import { HazardDataType, EnumParameterValues } from '@nshmp/nshmp-web-utils';

/**
 * Container for hazard curve file results.
 */
export class HazardMapPlotResult {
  resultBlob: Blob;
  imt: EnumParameterValues;
  imls: number[];
  dataType: HazardDataType;
  value: string;
  display: string;
  private selectedIml: number;

  constructor(
      resultBlob: Blob,
      imt: EnumParameterValues,
      imls: number[],
      dataType: HazardDataType) {
    this.resultBlob = resultBlob;
    this.imt = imt;
    this.imls = imls;
    this.dataType = dataType;
    this.display = imt.value === dataType.sourceType.value ?
          imt.value : `${imt.value}-${dataType.type.value}.${dataType.sourceType.value}`;
    this.value = `${imt.value}_${dataType.type.value}_${dataType.sourceType.value}`;
  }

  setIml(iml: number): void {
    this.selectedIml = iml;
  }

  getIml(): number {
    return this.selectedIml;
  }
}
