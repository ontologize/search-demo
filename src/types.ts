interface OntologyObject {
  rid: string;
  properties?: {
    [key: string]: string | number | Date | boolean;
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

export interface NhtsaOdiComplaint extends OntologyObject {
  rid: string;
  properties?: {
    cdescr?: string;
    compdesc?: string;
    cmplid: number;
    yeartxt?: number;
    dealerName?: string;
    origEquipYn?: string;
    dealerTel?: string;
    seatType?: string;
    dealerZip?: string;
    cruiseContYn?: boolean;
    tireSize?: string;
    driveTrain?: string;
    miles?: number;
    antiBrakesYn?: boolean;
    ldate?: Date;
    transType?: string;
    city?: string;
    datea?: Date;
    origOwnerYn?: boolean;
    occurences?: number;
    dealerCity?: string;
    cmplType?: string;
    vehSpeed?: number;
    injured?: number;
    faildate?: Date;
    state?: string;
    tireFailType?: string;
    deaths?: number;
    maketxt?: string;
    vin?: string;
    locOfTire?: string;
    prodType?: string;
    mfrName?: string;
    vehiclesTowedYn?: boolean;
    medicalAttn?: boolean;
    modeltxt?: string;
    fuelType?: string;
    manufDt?: Date;
    odino?: number;
    repairedYn?: string;
    purchDt?: Date;
    restraintType?: string;
    crash?: boolean;
    fire?: boolean;
    dot?: string;
    policeRptYn?: boolean;
    dealerState?: string;
    fuelSys?: string;
    numCyls?: number;
  };
}

type QueryType =
  | "lt"
  | "gt"
  | "lte"
  | "gte"
  | "eq"
  | "isNull"
  | "contains"
  | "not"
  | "and"
  | "or"
  | "prefix"
  | "phrase"
  | "anyTerm"
  | "allTerms";

type OrderByDirection = "asc" | "desc";

export type Query =
  | {
      type: Omit<QueryType, "not" | "and" | "or">;
      field: string;
      value: string | number;
    }
  | {
      type: "not" | "and" | "or";
      value: Query[];
    };

interface OrderBy {
  orderBy: {
    fields: { field: string; direction: OrderByDirection }[];
  };
}

export interface SearchBody {
  query: Query;
  orderBy?: OrderBy;
  pageSize?: number;
  pageToken?: string;
}
