// =============================================
// Land Registration Types
// =============================================

export type LandType = 'Agricultural' | 'Residential' | 'Commercial' | 'Industrial' | 'Mixed-Use' | 'Forest' | 'Government';
export type LandUse = 'Owner Occupied' | 'Leased' | 'Vacant' | 'Under Development' | 'Disputed';
export type EncumbranceType = 'Mortgage' | 'Lien' | 'Easement' | 'Lease' | 'None';
export type DocumentType = 'SalesDeed' | 'TitleDeed' | 'EncumbranceCert' | 'PropertyTaxReceipt' | 'SurveyMap' | 'MutationOrder' | 'NOC' | 'AffidavitOfOwnership';

export interface OwnerDetails {
  fullName: string;
  aadhaarNumber: string;
  mobileNumber: string;
  email: string;
  citizenId: string;
  stateOfDomicile: string;
}

export interface PropertyDetails {
  surveyNumber: string;
  subDivisionNumber: string;
  khasraNumber: string;
  totalAreaSqFt: string;
  totalAreaAcres: string;
  landType: LandType | '';
  currentLandUse: LandUse | '';
  encumbrance: EncumbranceType | '';
  encumbranceDetails: string;
  municipalWardNumber: string;
  plotNumber: string;
  registeredPropertyValue: string;
  stampDutyPaid: string;
}

export interface LandLocation {
  addressLine1: string;
  addressLine2: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  pinCode: string;
  latitude: string;
  longitude: string;
  boundaryNorth: string;
  boundarySouth: string;
  boundaryEast: string;
  boundaryWest: string;
}

export interface DocumentEntry {
  type: DocumentType;
  label: string;
  required: boolean;
  file: File | null;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
}

export interface ReviewConsents {
  declarationAccepted: boolean;
  detailsAccurate: boolean;
  blockchainConsent: boolean;
}

export interface RegisterLandFormState {
  owner: OwnerDetails;
  property: PropertyDetails;
  location: LandLocation;
  documents: DocumentEntry[];
  consents: ReviewConsents;
}

export const INITIAL_PROPERTY_DETAILS: PropertyDetails = {
  surveyNumber: '',
  subDivisionNumber: '',
  khasraNumber: '',
  totalAreaSqFt: '',
  totalAreaAcres: '',
  landType: '',
  currentLandUse: '',
  encumbrance: '',
  encumbranceDetails: '',
  municipalWardNumber: '',
  plotNumber: '',
  registeredPropertyValue: '',
  stampDutyPaid: '',
};

export const INITIAL_LAND_LOCATION: LandLocation = {
  addressLine1: '',
  addressLine2: '',
  village: '',
  taluka: '',
  district: '',
  state: '',
  pinCode: '',
  latitude: '',
  longitude: '',
  boundaryNorth: '',
  boundarySouth: '',
  boundaryEast: '',
  boundaryWest: '',
};

export const REQUIRED_DOCUMENTS: DocumentEntry[] = [
  { type: 'SalesDeed', label: 'Sale Deed / Conveyance Deed', required: true, file: null, status: 'pending' },
  { type: 'TitleDeed', label: 'Original Title Deed', required: true, file: null, status: 'pending' },
  { type: 'EncumbranceCert', label: 'Encumbrance Certificate (EC)', required: true, file: null, status: 'pending' },
  { type: 'PropertyTaxReceipt', label: 'Latest Property Tax Receipt', required: true, file: null, status: 'pending' },
  { type: 'SurveyMap', label: 'Cadastral Survey Map (7/12 Extract)', required: true, file: null, status: 'pending' },
  { type: 'MutationOrder', label: 'Mutation / Jamabandi Order', required: false, file: null, status: 'pending' },
  { type: 'NOC', label: 'NOC from Revenue Authority', required: false, file: null, status: 'pending' },
  { type: 'AffidavitOfOwnership', label: 'Affidavit of Ownership (Notarized)', required: true, file: null, status: 'pending' },
];

export const INITIAL_CONSENTS: ReviewConsents = {
  declarationAccepted: false,
  detailsAccurate: false,
  blockchainConsent: false,
};