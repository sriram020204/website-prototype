import { z } from 'zod';

export const companyDetailsSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  industry: z.string().min(2, { message: "Industry must be at least 2 characters." }),
  contactEmail: z.string().email({ message: "Invalid email address." }),
  website: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
});

export const businessCapabilitiesSchema = z.object({
  coreCompetencies: z.string().min(10, { message: "Core competencies must be at least 10 characters." }),
  servicesOffered: z.string().min(10, { message: "Services offered must be at least 10 characters." }),
  keyDifferentiators: z.string().min(10, { message: "Key differentiators must be at least 10 characters." }).optional().or(z.literal('')),
});

export const financialInformationSchema = z.object({
  annualRevenue: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid revenue format. e.g., 100000 or 100000.50" }),
  fundingStatus: z.string().min(2, { message: "Funding status must be at least 2 characters." }),
  financialStabilityStatement: z.string().min(10, {message: "Statement must be at least 10 characters."}).optional().or(z.literal('')),
});

export const tenderExperienceSchema = z.object({
  pastProjects: z.string().min(10, { message: "Past projects description must be at least 10 characters." }),
  relevantExperienceYears: z.coerce.number().min(0, { message: "Years of experience cannot be negative." }),
  successRate: z.coerce.number().min(0).max(100).optional(),
});

export const geographicReachSchema = z.object({
  operationalArea: z.string().min(3, { message: "Operational area must be at least 3 characters." }),
  targetMarkets: z.string().min(3, { message: "Target markets must be at least 3 characters." }),
  internationalPresence: z.boolean().default(false),
});

export const digitalReadinessSchema = z.object({
  techStack: z.string().min(5, { message: "Tech stack description must be at least 5 characters." }),
  digitalToolsUsed: z.string().min(5, { message: "Digital tools description must be at least 5 characters." }),
  cybersecurityMeasures: z.string().min(10, {message: "Cybersecurity measures must be at least 10 characters."}).optional().or(z.literal('')),
});

export const registrationSchema = z.object({
  companyDetails: companyDetailsSchema,
  businessCapabilities: businessCapabilitiesSchema,
  financialInformation: financialInformationSchema,
  tenderExperience: tenderExperienceSchema,
  geographicReach: geographicReachSchema,
  digitalReadiness: digitalReadinessSchema,
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
