interface OntologyObject {
  rid: string;
  properties?: {
    [key: string]: any;
  };
}

export interface SearchResponse {
  data: OntologyObject[];
  nextPageToken?: string;
}

export interface VehicleRecall extends OntologyObject {
  rid: string;
  properties?: {
    mfrCampaignNumber?: string;
    consequenceSummary?: string;
    nhtsaId: string;
    potentiallyAffected?: number;
    component?: string;
    correctiveAction?: string;
    manufacturer?: string;
    recallLink?: string;
    reportReceivedDate?: Date;
    parkOutsideAdvisory?: boolean;
    recallType?: string;
    subject?: string;
    doNotDriveAdvisory?: boolean;
    recallDescription?: string;
  };
}
