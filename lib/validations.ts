import { z } from 'zod';

// Step 1: Personal Information
export const personalInformationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  middleName: z.string().max(50).optional(),
  lastName: z.string().min(1, 'Last name is required').max(50),
  fullLegalName: z.string().min(1, 'Full legal name is required').max(150),
  preferredName: z.string().max(50).optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().min(1, 'Nationality is required'),
  countryOfResidence: z.string().min(1, 'Country of residence is required'),
  city: z.string().max(100).optional(),
  currentAddress: z.string().max(300).optional(),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  confirmEmail: z.string().email('Invalid email address').min(1, 'Please confirm your email'),
  primaryPhone: z.string().min(1, 'Primary phone number is required'),
  whatsappNumber: z.string().optional(),
  linkedinProfile: z.string().url('Invalid URL').optional().or(z.literal('')),
  personalWebsite: z.string().url('Invalid URL').optional().or(z.literal('')),
  otherProfile: z.string().url('Invalid URL').optional().or(z.literal('')),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Email addresses don't match",
  path: ['confirmEmail'],
});

// Step 2: Professional Information
export const professionalInformationSchema = z.object({
  currentJobTitle: z.string().min(1, 'Current job title is required').max(100),
  currentCompany: z.string().min(1, 'Current company is required').max(100),
  yearsOfExperience: z.string().min(1, 'Years of experience is required'),
  yearsOfBDExperience: z.string().optional(),
  yearsOfLeadership: z.string().optional(),
  currentIndustry: z.string().optional(),
  previousIndustries: z.array(z.string()).optional(),
  currentEmploymentStatus: z.string().optional(),
  currentSalary: z.string().optional(),
  expectedSalary: z.string().optional(),
  noticePeriod: z.string().optional(),
  earliestStartDate: z.string().optional(),
  areasOfExpertise: z.array(z.string()).min(1, 'Please select at least one area of expertise'),
});

// Step 3: Executive Experience
export const leadershipPositionSchema = z.object({
  id: z.string(),
  positionTitle: z.string().min(1, 'Position title is required'),
  company: z.string().min(1, 'Company is required'),
  country: z.string().min(1, 'Country is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  teamSize: z.string().optional(),
  responsibilities: z.string().min(1, 'Main responsibilities are required'),
  achievements: z.string().min(1, 'Major achievements are required'),
});

export const executiveExperienceSchema = z.object({
  hasLeadershipExperience: z.boolean(),
  leadershipPositions: z.array(leadershipPositionSchema),
  largestRevenue: z.string().optional(),
  largestDeal: z.string().optional(),
  workedWithGovernment: z.boolean().optional(),
  governmentDetails: z.string().optional(),
  workedWithEnterprises: z.boolean().optional(),
  enterpriseDetails: z.string().optional(),
  developedPartnerships: z.boolean().optional(),
  partnershipsDetails: z.string().optional(),
  builtBDFunction: z.boolean().optional(),
  bdFunctionDetails: z.string().optional(),
  managedBDTeam: z.boolean().optional(),
  bdTeamDetails: z.string().optional(),
  gccExperience: z.boolean().optional(),
  gccDetails: z.string().optional(),
}).refine((data) => {
  if (data.hasLeadershipExperience) {
    return data.leadershipPositions.length > 0;
  }
  return true;
}, {
  message: 'Please add at least one leadership position',
  path: ['leadershipPositions'],
});

// Step 4: GCC/UAE Experience
export const uaeExperienceRecordSchema = z.object({
  id: z.string(),
  city: z.string().min(1, 'City is required'),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  responsibilities: z.string().min(1, 'Main responsibilities are required'),
});

export const gccUaeExperienceSchema = z.object({
  hasUAEExperience: z.boolean(),
  uaeExperienceRecords: z.array(uaeExperienceRecordSchema),
  hasVisitedUAE: z.boolean(),
  visitPurpose: z.string().optional(),
  visitCity: z.string().optional(),
  visitDate: z.string().optional(),
  hasGCCExperience: z.boolean(),
  gccCountries: z.array(z.string()).optional(),
  gccExperienceDescription: z.string().optional(),
});

// Step 5: Work Authorization & Relocation
export const workAuthorizationSchema = z.object({
  hasUAEVisa: z.boolean(),
  visaType: z.string().optional(),
  visaExpiry: z.string().optional(),
  authorizedToWork: z.string().min(1, 'Please select your work authorization status'),
  willingToRelocate: z.string().min(1, 'Please indicate your relocation preference'),
  hasValidPassport: z.boolean(),
});

// Step 6: Documents (handled separately with file validation)
export const documentsSchema = z.object({
  cvResume: z.any().optional(),
  coverLetter: z.any().optional(),
  portfolio: z.any().optional(),
  nationalIdFront: z.any().optional(),
  nationalIdBack: z.any().optional(),
  passportPage: z.any().optional(),
});

// Step 7: Motivation & Role Fit
export const motivationSchema = z.object({
  whyNabat: z.string().min(50, 'Please provide at least 50 characters').max(1000),
  whyThisRole: z.string().min(50, 'Please provide at least 50 characters').max(1000),
  partnershipExperience: z.string().min(50, 'Please provide at least 50 characters').max(1000),
  significantOpportunity: z.string().min(50, 'Please provide at least 50 characters').max(1000),
  complexDeal: z.string().min(50, 'Please provide at least 50 characters').max(1000),
  relevantIndustries: z.string().min(50, 'Please provide at least 50 characters').max(800),
  pipelineApproach: z.string().min(100, 'Please provide at least 100 characters').max(1200),
  stakeholderExperience: z.string().min(50, 'Please provide at least 50 characters').max(1000),
  first90Days: z.string().min(100, 'Please provide at least 100 characters').max(1200),
  uniqueQualifications: z.string().min(50, 'Please provide at least 50 characters').max(1000),
});

// Step 8: References & Final Submission
export const referenceSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, 'Full name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
});

export const referencesAndSubmissionSchema = z.object({
  references: z.array(referenceSchema).max(3, 'Maximum 3 references allowed'),
  accuracyConfirmed: z.boolean().refine(val => val === true, {
    message: 'You must confirm the accuracy of your information',
  }),
  consentGiven: z.boolean().refine(val => val === true, {
    message: 'You must give consent to process your application',
  }),
  understood: z.boolean().refine(val => val === true, {
    message: 'You must acknowledge this statement',
  }),
});

export type PersonalInformationForm = z.infer<typeof personalInformationSchema>;
export type ProfessionalInformationForm = z.infer<typeof professionalInformationSchema>;
export type ExecutiveExperienceForm = z.infer<typeof executiveExperienceSchema>;
export type GCCUAEExperienceForm = z.infer<typeof gccUaeExperienceSchema>;
export type WorkAuthorizationForm = z.infer<typeof workAuthorizationSchema>;
export type MotivationForm = z.infer<typeof motivationSchema>;
export type ReferencesAndSubmissionForm = z.infer<typeof referencesAndSubmissionSchema>;
