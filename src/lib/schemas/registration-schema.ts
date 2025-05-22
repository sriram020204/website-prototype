import { z } from 'zod';

// Step 1: Company Details
export const companyDetailsSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  companyType: z.string().min(1, { message: "Please select a company type." }), // Dropdown
  yearOfEstablishment: z.coerce.number().min(1800, { message: "Invalid year." }).max(new Date().getFullYear(), { message: "Year cannot be in the future." }),
  country: z.string().min(2, { message: "Please select a country." }),
  state: z.string().min(2, { message: "Please select a state." }),
  city: z.string().min(2, { message: "Please enter a city." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }), // Textarea
  websiteUrl: z.string().url({ message: "Invalid URL." }).optional().or(z.literal('')),
});

// Step 2: Business Capabilities
export const businessCapabilitiesSchema = z.object({
  businessRoles: z.string().min(3, { message: "Please enter at least one business role (comma-separated)." }), // Multi-select chips (as Textarea)
  industrySectors: z.string().min(3, { message: "Please enter at least one industry sector (comma-separated)." }), // Multi-select chips (as Textarea)
  productServiceKeywords: z.string().min(3, { message: "Please enter product/service keywords (comma-separated)." }), // Tag input (as Textarea)
  hsnSacCodes: z.string().optional().or(z.literal('')), // Tag input (as Textarea, optional)
  technicalCapabilities: z.string().min(10, { message: "Technical capabilities must be at least 10 characters." }), // Textarea or tag
  monthlyCapacityValue: z.coerce.number().min(0, { message: "Capacity value must be non-negative." }).optional(),
  monthlyCapacityUnit: z.string().min(1, { message: "Capacity unit is required if value is provided." }).optional().or(z.literal('')),
  certifications: z.string().optional().or(z.literal('')), // "upload with multi-select" -> Textarea for names
});

// Step 3: Financial & Legal Info
export const financialLegalInfoSchema = z.object({
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN format." }),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, { message: "Invalid GSTIN format." }).optional().or(z.literal('')),
  msmeUdyamNsicNumber: z.string().optional().or(z.literal('')),
  msmeUdyamNsicCertificate: z.string().describe("Name or path of MSME/Udyam/NSIC certificate file").optional().or(z.literal('')), // "upload" -> text
  annualTurnoverFY1Amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount format." }).optional().or(z.literal('')),
  annualTurnoverFY1Currency: z.string().optional().or(z.literal('')), // USD/INR
  annualTurnoverFY2Amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount format." }).optional().or(z.literal('')),
  annualTurnoverFY2Currency: z.string().optional().or(z.literal('')),
  annualTurnoverFY3Amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount format." }).optional().or(z.literal('')),
  annualTurnoverFY3Currency: z.string().optional().or(z.literal('')),
  netWorthAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount format." }).optional().or(z.literal('')),
  netWorthCurrency: z.string().optional().or(z.literal('')),
  isBlacklistedOrLitigation: z.boolean().default(false),
  blacklistedDetails: z.string().optional().or(z.literal('')), // Optional textarea
});

// Step 4: Tender Experience
export const tenderExperienceSchema = z.object({
  suppliedToGovtPsus: z.boolean().default(false),
  pastClients: z.string().min(3, { message: "Enter past clients, comma-separated." }).optional().or(z.literal('')), // Text list
  purchaseOrders: z.string().describe("Names of PO files, comma-separated").optional().or(z.literal('')), // Multi-upload -> text
  performanceReports: z.string().describe("Names of report files, comma-separated").optional().or(z.literal('')), // Multi-upload -> text
  highestOrderValueFulfilled: z.coerce.number().min(0).optional(),
  tenderTypesHandled: z.string().min(3, { message: "Enter tender types, comma-separated." }).optional().or(z.literal('')), // Multi-select -> Textarea
});

// Step 5: Geographic Reach & Digital Readiness
export const geographicDigitalReachSchema = z.object({
  operationalStates: z.string().min(2, { message: "Enter operational states, comma-separated." }), // Multi-select -> Textarea
  countriesServed: z.string().min(2, { message: "Enter countries served, comma-separated." }), // Multi-select -> Textarea
  hasImportExportLicense: z.boolean().default(false),
  registeredOnPortals: z.boolean().default(false), // GeM / CPPP / State Portals
  hasDigitalSignature: z.boolean().default(false),
  preferredTenderLanguages: z.string().min(2, { message: "Enter preferred languages, comma-separated." }), // Multi-select -> Textarea
});

// Step 6: Declarations & Uploads
export const declarationsUploadsSchema = z.object({
  panUpload: z.string().describe("Name of PAN card file").optional().or(z.literal('')),
  gstUpload: z.string().describe("Name of GST certificate file").optional().or(z.literal('')),
  msmeCertUpload: z.string().describe("Name of MSME certificate file (if applicable)").optional().or(z.literal('')),
  isoCertUpload: z.string().describe("Name of ISO certificate file (if applicable)").optional().or(z.literal('')),
  bisCertUpload: z.string().describe("Name of BIS certificate file (if applicable)").optional().or(z.literal('')),
  infoConfirmed: z.boolean().refine(val => val === true, { message: "You must confirm the information is true." }),
  blacklistingDeclaration: z.boolean().default(false),
  blacklistingDeclarationUpload: z.string().describe("Name of blacklisting declaration file (if applicable)").optional().or(z.literal('')),
});


// Main Schema combining all steps
export const registrationSchema = z.object({
  companyDetails: companyDetailsSchema,
  businessCapabilities: businessCapabilitiesSchema,
  financialLegalInfo: financialLegalInfoSchema, // Renamed from financialInformation
  tenderExperience: tenderExperienceSchema,
  geographicDigitalReach: geographicDigitalReachSchema, // New combined step
  declarationsUploads: declarationsUploadsSchema, // New step
}).strict(); // Using strict to catch any unexpected fields

export type RegistrationFormData = z.infer<typeof registrationSchema>;
