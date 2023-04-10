export interface VehicleRecall {
  component?: string;
  consequenceSummary?: string;
  correctiveAction?: string;
  doNotDriveAdvisory?: boolean;
  manufacturer?: string;
  mfrCampaignNumber?: string;
  nhtsaId: string;
  parkOutsideAdvisory?: boolean;
  potentiallyAffected?: number;
  recallDescription?: string;
  recallLink?: string;
  recallType?: string;
  reportReceivedDate?: Date;
  subject?: string;
}
