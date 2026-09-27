export interface PersonalInformation {
  firstName: string;
  middleName?: string;
  lastName: string;
  fullLegalName: string;
  preferredName?: string;
  dateOfBirth?: string;
  nationality: string;
  countryOfResidence: string;
  city?: string;
  currentAddress?: string;
  email: string;
  confirmEmail: string;
  primaryPhone: string;
  whatsappNumber?: string;
  linkedinProfile?: string;
  personalWebsite?: string;
  otherProfile?: string;
}

export interface ProfessionalInformation {
  currentJobTitle: string;
  currentCompany: string;
  yearsOfExperience: string;
  yearsOfBDExperience?: string;
  yearsOfLeadership?: string;
  currentIndustry?: string;
  previousIndustries?: string[];
  currentEmploymentStatus?: string;
  currentSalary?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  earliestStartDate?: string;
  areasOfExpertise: string[];
}

export interface LeadershipPosition {
  id: string;
  positionTitle: string;
  company: string;
  country: string;
  startDate: string;
  endDate?: string;
  teamSize?: string;
  responsibilities: string;
  achievements: string;
}

export interface ExecutiveExperience {
  hasLeadershipExperience: boolean;
  leadershipPositions: LeadershipPosition[];
  largestRevenue?: string;
  largestDeal?: string;
  workedWithGovernment?: boolean;
  governmentDetails?: string;
  workedWithEnterprises?: boolean;
  enterpriseDetails?: string;
  developedPartnerships?: boolean;
  partnershipsDetails?: string;
  builtBDFunction?: boolean;
  bdFunctionDetails?: string;
  managedBDTeam?: boolean;
  bdTeamDetails?: string;
  gccExperience?: boolean;
  gccDetails?: string;
}

export interface UAEExperienceRecord {
  id: string;
  city: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  responsibilities: string;
}

export interface GCCUAEExperience {
  hasUAEExperience: boolean;
  uaeExperienceRecords: UAEExperienceRecord[];
  hasVisitedUAE: boolean;
  visitPurpose?: string;
  visitCity?: string;
  visitDate?: string;
  hasGCCExperience: boolean;
  gccCountries?: string[];
  gccExperienceDescription?: string;
}

export interface WorkAuthorization {
  hasUAEVisa: boolean;
  visaType?: string;
  visaExpiry?: string;
  authorizedToWork: string;
  willingToRelocate: string;
  hasValidPassport: boolean;
}

export interface DocumentUpload {
  cvResume?: File | null;
  cvResumeUrl?: string;
  coverLetter?: File | null;
  coverLetterUrl?: string;
  portfolio?: File | null;
  portfolioUrl?: string;
  nationalIdFront?: File | null;
  nationalIdFrontUrl?: string;
  nationalIdBack?: File | null;
  nationalIdBackUrl?: string;
  passportPage?: File | null;
  passportPageUrl?: string;
}

export interface MotivationAnswers {
  whyNabat: string;
  whyThisRole: string;
  partnershipExperience: string;
  significantOpportunity: string;
  complexDeal: string;
  relevantIndustries: string;
  pipelineApproach: string;
  stakeholderExperience: string;
  first90Days: string;
  uniqueQualifications: string;
}

export interface Reference {
  id: string;
  fullName: string;
  jobTitle: string;
  company: string;
  relationship: string;
  email: string;
  phone: string;
}

export interface ReferencesAndSubmission {
  references: Reference[];
  accuracyConfirmed: boolean;
  consentGiven: boolean;
  understood: boolean;
}

export interface ApplicationData {
  personalInformation: Partial<PersonalInformation>;
  professionalInformation: Partial<ProfessionalInformation>;
  executiveExperience: Partial<ExecutiveExperience>;
  gccUaeExperience: Partial<GCCUAEExperience>;
  workAuthorization: Partial<WorkAuthorization>;
  documents: Partial<DocumentUpload>;
  motivation: Partial<MotivationAnswers>;
  referencesAndSubmission: Partial<ReferencesAndSubmission>;
  currentStep: number;
  lastSaved?: string;
}

export interface SubmittedApplication {
  id: string;
  applicationNumber: string;
  position: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  data: ApplicationData;
  recruiterNotes?: string;
  tags?: string[];
}

export type ApplicationStatus = 
  | 'new'
  | 'in-review'
  | 'shortlisted'
  | 'interview'
  | 'rejected'
  | 'hired';

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  'new': 'New',
  'in-review': 'In Review',
  'shortlisted': 'Shortlisted',
  'interview': 'Interview',
  'rejected': 'Rejected',
  'hired': 'Hired',
};

export const COUNTRIES = [
  'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman',
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'India', 'Pakistan', 'Egypt', 'Jordan', 'Lebanon', 'Morocco', 'Tunisia',
  'South Africa', 'Nigeria', 'Kenya', 'Singapore', 'Malaysia', 'Indonesia',
  'China', 'Japan', 'South Korea', 'Brazil', 'Mexico', 'Argentina',
  // Add more as needed
];

export const GCC_COUNTRIES = [
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
];

export const INDUSTRIES = [
  'Climate Technology',
  'Environmental Technology',
  'AI / Machine Learning',
  'Robotics',
  'Geospatial Technology',
  'SaaS',
  'Enterprise Software',
  'Consulting',
  'Government / Public Sector',
  'ESG / Sustainability',
  'Carbon Markets',
  'Renewable Energy',
  'Agriculture Technology',
  'Forestry',
  'Marine / Coastal',
  'Investment / Venture Capital',
  'Real Estate',
  'Construction',
  'Oil & Gas',
  'Technology',
  'Financial Services',
  'Healthcare',
  'Education',
  'Other',
];

export const AREAS_OF_EXPERTISE = [
  'Business Development',
  'Strategic Partnerships',
  'Enterprise Sales',
  'Government Relations',
  'B2B Sales',
  'Corporate Partnerships',
  'ESG',
  'Climate Tech',
  'AI',
  'Robotics',
  'Environmental Technology',
  'SaaS',
  'Geospatial Technology',
  'Digital Transformation',
  'Consulting',
  'Strategy',
  'Investment / Venture Capital',
  'Product Management',
  'Marketing',
  'Operations',
  'Other',
];

export const EMPLOYMENT_STATUS = [
  'Employed',
  'Self-Employed',
  'Consulting',
  'Between Opportunities',
  'Student',
  'Other',
];

export const NOTICE_PERIODS = [
  'Immediate',
  '2 weeks',
  '1 month',
  '2 months',
  '3 months',
  'Negotiable',
  'Other',
];
