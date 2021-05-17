import { ActionPayload } from 'vuex';

export interface Changelog {
  searchParams?: SearchParams;
  buildDetails?: BuildDetails;
  workItems: any[];
}

export interface SearchParams extends ActionPayload {
  fromBuildId: string;
  toBuildId: string;
}

export interface BuildDetails {
  from: any;
  to: any;
}
