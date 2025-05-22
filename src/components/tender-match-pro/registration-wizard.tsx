
"use client";

import { useState }  from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  registrationSchema, 
  RegistrationFormData, 
  companyDetailsSchema, 
  businessCapabilitiesSchema, 
  financialLegalInfoSchema, // Updated schema name
  tenderExperienceSchema, 
  geographicDigitalReachSchema, // Updated schema name
  declarationsUploadsSchema // New schema
} from '@/lib/schemas/registration-schema';
import { useFormPersistence } from '@/hooks/use-form-persistence';
// AI import removed: import { validateProfile, ValidateProfileInput, ValidateProfileOutput } from '@/ai/flows/validate-profile';
import { useToast } from '@/hooks/use-toast';

import { Progress } from '@/components/ui/progress';
import { FormNavigation } from './form-navigation';
import { CompanyDetailsStep } from './steps/company-details-step';
import { BusinessCapabilitiesStep } from './steps/business-capabilities-step';
import { FinancialLegalInfoStep } from './steps/financial-info-step'; // Updated component
import { TenderExperienceStep } from './steps/tender-experience-step';
import { GeographicDigitalReachStep } from './steps/geographic-reach-step'; // Updated component (was geographic-reach-step, now covers digital too)
import { DeclarationsUploadsStep } from './steps/declarations-uploads-step'; // New component
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

const STORAGE_KEY = 'tenderMatchProRegistrationForm_v2'; // Changed key due to structure change

export function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // AI States removed
  // const [isAIValidating, setIsAIValidating] = useState(false);
  // const [aiValidationResult, setAiValidationResult] = useState<ValidateProfileOutput | null>(null);
  // const [aiValidated, setAiValidated] = useState(false);


  const { toast } = useToast();

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange', 
    defaultValues: { 
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
        hsnSacCodes: '', 
        technicalCapabilities: '', 
        monthlyCapacityValue: undefined,
        monthlyCapacityUnit: '',
        certifications: '' 
      },
      financialLegalInfo: {
        pan: '',
        gstin: '',
        msmeUdyamNsicNumber: '',
        msmeUdyamNsicCertificate: '',
        annualTurnoverFY1Amount: '',
        annualTurnoverFY1Currency: '',
        annualTurnoverFY2Amount: '',
        annualTurnoverFY2Currency: '',
        annualTurnoverFY3Amount: '',
        annualTurnoverFY3Currency: '',
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
        msmeCertUpload: '',
        isoCertUpload: '',
        bisCertUpload: '',
        infoConfirmed: false,
        blacklistingDeclaration: false,
        blacklistingDeclarationUpload: ''
      },
    },
  });

  useFormPersistence(methods, STORAGE_KEY);

  const handleNext = async () => {
    // AI Validated reset removed
    // setAiValidated(false); 
    // setAiValidationResult(null);

    if (currentStep < STEPS.length - 1) { 
      const currentStepFields = STEPS[currentStep].fields as (keyof RegistrationFormData)[];
      
      const isValid = await methods.trigger(currentStepFields.length > 0 ? currentStepFields as any : undefined);

      if (isValid) {
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
      // AI reset removed
    }
  };

  // handleAIValidate function removed

  const onSubmit = async (data: RegistrationFormData) => {
    // AI validation check removed
    // if (!aiValidated || !aiValidationResult?.isValid && aiValidationResult?.flags.length > 0) {
    //    toast({
    //     title: "Submission Blocked",
    //     description: "Please run AI validation and address any critical issues before submitting.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setIsSubmitting(true);
    console.log("Form Submitted:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({
      title: "Profile Submitted!",
      description: "Your company profile has been successfully submitted.",
      className: "bg-green-500 text-white",
    });
    methods.reset(); 
    setCurrentStep(0); 
    // AI result reset removed
    localStorage.removeItem(STORAGE_KEY);
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <Progress value={progressValue} className="w-full mb-6 h-3" />
        
        <CurrentStepComponent 
          form={methods} 
          // AI props removed
          // aiValidationResult={aiValidationResult}
          // isAIValidating={isAIValidating}
        />

        <FormNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isNextDisabled={methods.formState.isSubmitting /*|| isAIValidating - removed */}
          isSubmitting={isSubmitting}
          // AI props removed
          // isAIValidating={isAIValidating} 
          // onValidateAI={currentStep === STEPS.length - 1 ? handleAIValidate : undefined}
          // aiValidated={aiValidated}
        />
      </form>
    </FormProvider>
  );
}
