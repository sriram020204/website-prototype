
import { z } from 'zod';

// Step 1: Company Details
export const companyDetailsSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  companyType: z.string().min(1, { message: "Please select a company type." }),
  yearOfEstablishment: z.coerce.number().min(1800, { message: "Invalid year." }).max(new Date().getFullYear(), { message: "Year cannot be in the future." }),
  country: z.string().min(2, { message: "Please select a country." }),
  state: z.string().min(2, { message: "Please select a state." }),
  city: z.string().min(2, { message: "Please enter a city." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  websiteUrl: z.string().url({ message: "Invalid URL format. Must be like https://example.com" }).optional().or(z.literal('')),
});

// Step 2: Business Capabilities
export const businessCapabilitiesSchema = z.object({
  businessRoles: z.string().min(3, { message: "Please enter at least one business role." }),
  industrySectors: z.string().min(3, { message: "Please enter at least one industry sector." }),
  productServiceKeywords: z.string().min(3, { message: "Please enter product/service keywords." }),
  technicalCapabilities: z.string().optional().or(z.literal('')),
  certifications: z.string().optional(),
  hasNoCertifications: z.boolean().default(false),
}).superRefine((data, ctx) => {
  if (!data.hasNoCertifications && (!data.certifications || data.certifications.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Certification names are required, or check the 'I have no certifications' box.",
      path: ['certifications'],
    });
  }
  if (data.hasNoCertifications && data.certifications && data.certifications.trim() !== "") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "If 'I have no certifications' is checked, the certifications list must be empty. Please clear certifications or uncheck the box.",
      path: ['certifications'],
    });
  }
});

// Step 3: Financial & Legal Info
const turnoverEntrySchema = z.object({
  financialYear: z.string().min(4, { message: "Financial year is required." }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount format." }).min(1, {message: "Amount is required."}),
});

export const financialLegalInfoSchema = z.object({
  hasPan: z.boolean().default(false),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN format." }).optional().or(z.literal('')),
  hasGstin: z.boolean().default(false),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, { message: "Invalid GSTIN format." }).optional().or(z.literal('')),
  
  hasMsmeUdyam: z.boolean().default(false),
  msmeUdyamNumber: z.string().optional().or(z.literal('')),
  msmeUdyamCertificate: z.string().describe("Name of MSME/Udyam certificate file").optional().or(z.literal('')),
  
  hasNsic: z.boolean().default(false),
  nsicNumber: z.string().optional().or(z.literal('')),
  nsicCertificate: z.string().describe("Name of NSIC certificate file").optional().or(z.literal('')),
  
  annualTurnovers: z.array(turnoverEntrySchema).min(1, { message: "At least one annual turnover entry is required." }),

  netWorthAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount format." }).min(1, { message: "Net worth amount is required." }),
  netWorthCurrency: z.string().min(1, { message: "Net worth currency is required." }),
  isBlacklistedOrLitigation: z.boolean().default(false),
  blacklistedDetails: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  if (data.hasPan && (!data.pan || data.pan.trim() === "" || !data.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Valid PAN Number is required if 'Has PAN' is checked.",
      path: ['pan'],
    });
  }
  if (data.hasGstin && (!data.gstin || data.gstin.trim() === "" || !data.gstin.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Valid GSTIN is required if 'Has GSTIN' is checked.",
      path: ['gstin'],
    });
  }
  if (data.hasMsmeUdyam) {
    if (!data.msmeUdyamNumber || data.msmeUdyamNumber.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "MSME/Udyam Number is required when 'Has MSME/Udyam' is checked.", path: ['msmeUdyamNumber'] });
    }
    if (!data.msmeUdyamCertificate || data.msmeUdyamCertificate.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "MSME/Udyam Certificate file name is required when 'Has MSME/Udyam' is checked.", path: ['msmeUdyamCertificate'] });
    }
  }
  if (data.hasNsic) {
    if (!data.nsicNumber || data.nsicNumber.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "NSIC Number is required when 'Has NSIC' is checked.", path: ['nsicNumber'] });
    }
    if (!data.nsicCertificate || data.nsicCertificate.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "NSIC Certificate file name is required when 'Has NSIC' is checked.", path: ['nsicCertificate'] });
    }
  }
  if (data.isBlacklistedOrLitigation && (!data.blacklistedDetails || data.blacklistedDetails.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Details are required if blacklisted or in litigation.",
      path: ['blacklistedDetails'],
    });
  }
});


// Step 4: Tender Experience
export const tenderExperienceSchema = z.object({
  suppliedToGovtPsus: z.boolean().default(false), 
  pastClients: z.string().min(3, { message: "Past clients are required." }),
  purchaseOrders: z.string().min(1, {message: "Purchase order file names are required."}).describe("Names of PO files, comma-separated"),
  performanceReports: z.string().min(1, {message: "Performance report file names are required."}).describe("Names of report files, comma-separated"),
  highestOrderValueFulfilled: z.coerce.number().min(0, {message: "Highest order value fulfilled is required (can be 0)."}),
  tenderTypesHandled: z.string().min(3, { message: "Tender types handled are required." }),
});

// Step 5: Geographic Reach & Digital Readiness
export const geographicDigitalReachSchema = z.object({
  operationalStates: z.string().min(2, { message: "Enter operational states, comma-separated." }),
  countriesServed: z.string().min(2, { message: "Enter countries served, comma-separated." }),
  hasImportExportLicense: z.boolean().default(false), 
  registeredOnPortals: z.boolean().default(false), 
  hasDigitalSignature: z.boolean().default(false), 
  preferredTenderLanguages: z.string().min(2, { message: "Enter preferred languages, comma-separated." }),
});

// Step 6: Declarations & Uploads
export const declarationsUploadsSchema = z.object({
  panUpload: z.string().min(1, {message: "PAN card file name is required."}).describe("Name of PAN card file"),
  gstUpload: z.string().min(1, {message: "GST certificate file name is required."}).describe("Name of GST certificate file"),
  isoCertUpload: z.string().min(1, {message: "ISO certificate file name is required."}).describe("Name of ISO certificate file (if applicable)"),
  bisCertUpload: z.string().min(1, {message: "BIS certificate file name is required."}).describe("Name of BIS certificate file (if applicable)"),
  otherCertificatesUpload: z.string().min(1, {message: "Other certificate file names are required."}).describe("File names for other certifications listed previously (comma-separated)"),
  infoConfirmed: z.boolean().refine(val => val === true, { message: "You must confirm the information is true." }),
});


// Main Schema combining all steps
export const registrationSchema = z.object({
  companyDetails: companyDetailsSchema,
  businessCapabilities: businessCapabilitiesSchema,
  financialLegalInfo: financialLegalInfoSchema,
  tenderExperience: tenderExperienceSchema,
  geographicDigitalReach: geographicDigitalReachSchema,
  declarationsUploads: declarationsUploadsSchema,
}).strict();

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type TurnoverEntry = z.infer<typeof turnoverEntrySchema>;

    
