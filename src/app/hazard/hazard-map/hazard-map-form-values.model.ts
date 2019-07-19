import { HazardResultsDataType } from '@nshmp/nshmp-web-utils';

/**
 * Hazard map form values.
 */
export interface HazardMapFormValues {
  user: string;
  resultPrefix: string;
  dataType: HazardResultsDataType;
}
