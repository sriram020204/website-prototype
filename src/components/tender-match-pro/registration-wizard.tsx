
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  registrationSchema, 
  RegistrationFormData, 
  companyDetailsSchema, 
  businessCapabilitiesSchema, 
  financialLegalInfoSchema,
  tenderExperienceSchema, 
  geographicDigitalReachSchema,
  declarationsUploadsSchema
} from '@/lib/schemas/registration-schema';
import { useFormPersistence } from '@/hooks/use-form-persistence';
import { useToast } from '@/hooks/use-toast';

import { Progress } from '@/components/ui/progress';
import { FormNavigation } from './form-navigation';
import { CompanyDetailsStep } from './steps/company-details-step';
import { BusinessCapabilitiesStep } from './steps/business-capabilities-step';
import { FinancialLegalInfoStep } from './steps/financial-info-step';
import { TenderExperienceStep } from './steps/tender-experience-step';
import { GeographicDigitalReachStep } from './steps/geographic-reach-step';
import { DeclarationsUploadsStep } from './steps/declarations-uploads-step';
import { ReviewSubmitStep } from './steps/review-submit-step';

const STEPS = [
  { id: 'companyDetails', title: 'Company Details', component: CompanyDetailsStep, schema: companyDetailsSchema, fields: ['companyDetails'] as const },
  { id: 'businessCapabilities', title: 'Business Capabilities', component: BusinessCapabilitiesStep, schema: businessCapabilitiesSchema, fields: ['businessCapabilities'] as const },
  { id: 'financialLegalInfo', title: 'Financial & Legal Info', component: FinancialLegalInfoStep, schema: financialLegalInfoSchema, fields: ['financialLegalInfo'] as const },
  { id: 'tenderExperience', title: 'Tender Experience', component: TenderExperienceStep, schema: tenderExperienceSchema, fields: ['tenderExperience'] as const },
  { id: 'geographicDigitalReach', title: 'Geographic & Digital', component: GeographicDigitalReachStep, schema: geographicDigitalReachSchema, fields: ['geographicDigitalReach'] as const },
  { id: 'declarationsUploads', title: 'Declarations & Uploads', component: DeclarationsUploadsStep, schema: declarationsUploadsSchema, fields: ['declarationsUploads'] as const },
  { id: 'reviewSubmit', title: 'Review & Submit', component: ReviewSubmitStep, schema: registrationSchema, fields: [] as const }, 
];

const FORM_DATA_STORAGE_KEY = 'tenderMatchProRegistrationForm_v2';
const CURRENT_STEP_STORAGE_KEY = 'tenderMatchProRegistrationStep_v2';

export function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const initialDefaultValues = useMemo<RegistrationFormData>(() => ({
    companyDetails: { 
      companyName: '', 
      companyType: '', 
      yearOfEstablishment: undefined, 
      country: '', 
      state: '', 
      city: '', 
      address: '', 
      websiteUrl: '' 
    },
    businessCapabilities: { 
      businessRoles: '', 
      industrySectors: '', 
      productServiceKeywords: '', 
      hsnCodes: '', 
      sacCodes: '',
      technicalCapabilities: '', 
      certifications: '' 
    },
    financialLegalInfo: {
      hasPan: false,
      pan: '',
      hasGstin: false,
      gstin: '',
      hasMsmeUdyam: false,
      msmeUdyamNumber: '',
      msmeUdyamCertificate: '',
      hasNsic: false,
      nsicNumber: '',
      nsicCertificate: '',
      annualTurnovers: [], 
      netWorthAmount: '',
      netWorthCurrency: '',
      isBlacklistedOrLitigation: false,
      blacklistedDetails: ''
    },
    tenderExperience: { 
      suppliedToGovtPsus: false,
      pastClients: '', 
      purchaseOrders: '', 
      performanceReports: '', 
      highestOrderValueFulfilled: undefined,
      tenderTypesHandled: ''
    },
    geographicDigitalReach: {
      operationalStates: '',
      countriesServed: '',
      hasImportExportLicense: false,
      registeredOnPortals: false,
      hasDigitalSignature: false,
      preferredTenderLanguages: ''
    },
    declarationsUploads: {
      panUpload: '', 
      gstUpload: '', 
      isoCertUpload: '', 
      bisCertUpload: '', 
      otherCertificatesUpload: '',
      infoConfirmed: false,
    },
  }), []);


  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange', 
    defaultValues: initialDefaultValues,
  });

  useFormPersistence(methods, FORM_DATA_STORAGE_KEY, initialDefaultValues); 

  useEffect(() => {
    const savedStep = localStorage.getItem(CURRENT_STEP_STORAGE_KEY);
    if (savedStep) {
      const stepNumber = parseInt(savedStep, 10);
      if (!isNaN(stepNumber) && stepNumber >= 0 && stepNumber < STEPS.length) {
        setCurrentStep(stepNumber);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CURRENT_STEP_STORAGE_KEY, currentStep.toString());
  }, [currentStep]);


  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) { 
      const currentStepFields = STEPS[currentStep].fields as (keyof RegistrationFormData)[];
      
      const isValid = await methods.trigger(currentStepFields.length > 0 ? currentStepFields as any : undefined);

      if (isValid) {
        try {
          const currentValues = methods.getValues();
          localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(currentValues));
        } catch (error) {
          console.error("Failed to save form data to localStorage on Next:", error);
          toast({
            title: "Save Error",
            description: "Could not save form progress. Please try again.",
            variant: "destructive",
          });
        }
        setCurrentStep(prev => prev + 1);
      } else {
        toast({
          title: "Validation Error",
          description: "Please correct the errors on the current page before proceeding.",
          variant: "destructive",
        });
      }
    } else { 
      await methods.handleSubmit(onSubmit)();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    console.log("Form Submitted:", data);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    setIsSubmitting(false);
    toast({
      title: "Profile Submitted!",
      description: "Your company profile has been successfully submitted.",
      className: "bg-green-500 text-white", 
    });
    localStorage.removeItem(CURRENT_STEP_STORAGE_KEY);
    setCurrentStep(0); 
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <Progress value={progressValue} className="w-full mb-6 h-3" />
        
        <CurrentStepComponent form={methods} />

        <FormNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isNextDisabled={methods.formState.isSubmitting || currentStep === STEPS.length -1 && !methods.formState.isValid && methods.formState.isSubmitted } 
          isSubmitting={isSubmitting}
        />
      </form>
    </FormProvider>
  );
}

    