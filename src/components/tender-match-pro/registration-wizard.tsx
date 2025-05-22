"use client";

import { useState, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, RegistrationFormData, companyDetailsSchema, businessCapabilitiesSchema, financialInformationSchema, tenderExperienceSchema, geographicReachSchema, digitalReadinessSchema } from '@/lib/schemas/registration-schema';
import { useFormPersistence } from '@/hooks/use-form-persistence';
import { validateProfile, ValidateProfileInput, ValidateProfileOutput } from '@/ai/flows/validate-profile';
import { useToast } from '@/hooks/use-toast';

import { Progress } from '@/components/ui/progress';
import { FormNavigation } from './form-navigation';
import { CompanyDetailsStep } from './steps/company-details-step';
import { BusinessCapabilitiesStep } from './steps/business-capabilities-step';
import { FinancialInformationStep } from './steps/financial-info-step';
import { TenderExperienceStep } from './steps/tender-experience-step';
import { GeographicReachStep } from './steps/geographic-reach-step';
import { DigitalReadinessStep } from './steps/digital-readiness-step';
import { ReviewSubmitStep } from './steps/review-submit-step';

const STEPS = [
  { id: 'companyDetails', title: 'Company Details', component: CompanyDetailsStep, schema: companyDetailsSchema, fields: ['companyDetails'] as const },
  { id: 'businessCapabilities', title: 'Business Capabilities', component: BusinessCapabilitiesStep, schema: businessCapabilitiesSchema, fields: ['businessCapabilities'] as const },
  { id: 'financialInformation', title: 'Financial Information', component: FinancialInformationStep, schema: financialInformationSchema, fields: ['financialInformation'] as const },
  { id: 'tenderExperience', title: 'Tender Experience', component: TenderExperienceStep, schema: tenderExperienceSchema, fields: ['tenderExperience'] as const },
  { id: 'geographicReach', title: 'Geographic Reach', component: GeographicReachStep, schema: geographicReachSchema, fields: ['geographicReach'] as const },
  { id: 'digitalReadiness', title: 'Digital Readiness', component: DigitalReadinessStep, schema: digitalReadinessSchema, fields: ['digitalReadiness'] as const },
  { id: 'reviewSubmit', title: 'Review & Submit', component: ReviewSubmitStep, schema: registrationSchema, fields: [] as const }, // Review step validates all
];

const STORAGE_KEY = 'tenderMatchProRegistrationForm';

// Helper to format data for AI
const formatDataForAI = (data: RegistrationFormData): ValidateProfileInput => {
  return {
    companyDetails: `Name: ${data.companyDetails.companyName}, Address: ${data.companyDetails.address}, Industry: ${data.companyDetails.industry}, Email: ${data.companyDetails.contactEmail}, Website: ${data.companyDetails.website || 'N/A'}`,
    businessCapabilities: `Core Competencies: ${data.businessCapabilities.coreCompetencies}. Services Offered: ${data.businessCapabilities.servicesOffered}. Key Differentiators: ${data.businessCapabilities.keyDifferentiators || 'N/A'}`,
    financialInformation: `Annual Revenue: ${data.financialInformation.annualRevenue}, Funding Status: ${data.financialInformation.fundingStatus}, Stability Statement: ${data.financialInformation.financialStabilityStatement || 'N/A'}`,
    tenderExperience: `Past Projects: ${data.tenderExperience.pastProjects}, Years of Experience: ${data.tenderExperience.relevantExperienceYears}, Success Rate: ${data.tenderExperience.successRate !== undefined ? data.tenderExperience.successRate + '%' : 'N/A'}`,
    geographicReach: `Operational Area: ${data.geographicReach.operationalArea}, Target Markets: ${data.geographicReach.targetMarkets}, International Presence: ${data.geographicReach.internationalPresence ? 'Yes' : 'No'}`,
    digitalReadiness: `Tech Stack: ${data.digitalReadiness.techStack}, Digital Tools: ${data.digitalReadiness.digitalToolsUsed}, Cybersecurity: ${data.digitalReadiness.cybersecurityMeasures || 'N/A'}`,
  };
};


export function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAIValidating, setIsAIValidating] = useState(false);
  const [aiValidationResult, setAiValidationResult] = useState<ValidateProfileOutput | null>(null);
  const [aiValidated, setAiValidated] = useState(false);

  const { toast } = useToast();

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange', // Real-time validation on change
    defaultValues: { // Ensure all sections have default empty structures
      companyDetails: { companyName: '', address: '', industry: '', contactEmail: '', website: '' },
      businessCapabilities: { coreCompetencies: '', servicesOffered: '', keyDifferentiators: '' },
      financialInformation: { annualRevenue: '', fundingStatus: '', financialStabilityStatement: '' },
      tenderExperience: { pastProjects: '', relevantExperienceYears: 0, successRate: undefined },
      geographicReach: { operationalArea: '', targetMarkets: '', internationalPresence: false },
      digitalReadiness: { techStack: '', digitalToolsUsed: '', cybersecurityMeasures: '' },
    },
  });

  useFormPersistence(methods, STORAGE_KEY);

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) { // Navigating between data entry steps
      const currentStepSchema = STEPS[currentStep].schema;
      const fieldsToValidate = STEPS[currentStep].fields as (keyof RegistrationFormData)[];
      
      // Trigger validation only for the current step's fields
      // Extract values for current step fields
      const currentStepValues: Partial<RegistrationFormData> = {};
      fieldsToValidate.forEach(fieldKey => {
        currentStepValues[fieldKey] = methods.getValues(fieldKey as any);
      });

      // Validate against the specific schema for the current step
      const isValid = await methods.trigger(fieldsToValidate as any);

      if (isValid) {
        setCurrentStep(prev => prev + 1);
        setAiValidated(false); // Reset AI validation status when moving to next data step
        setAiValidationResult(null);
      } else {
        toast({
          title: "Validation Error",
          description: "Please correct the errors before proceeding.",
          variant: "destructive",
        });
      }
    } else { // This is the final "Submit Profile" action on the review step
      await methods.handleSubmit(onSubmit)();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Optionally reset AI validation status if going back from review step
      if (currentStep === STEPS.length -1) {
        setAiValidated(false);
        setAiValidationResult(null);
      }
    }
  };

  const handleAIValidate = async () => {
    const isValidForm = await methods.trigger(); // Validate all fields before AI check
    if (!isValidForm) {
       toast({
        title: "Form Incomplete",
        description: "Please ensure all required fields across all steps are filled correctly before AI validation.",
        variant: "destructive",
      });
      return;
    }

    setIsAIValidating(true);
    setAiValidationResult(null);
    try {
      const formData = methods.getValues();
      const aiInput = formatDataForAI(formData);
      const result = await validateProfile(aiInput);
      setAiValidationResult(result);
      setAiValidated(true);
      toast({
        title: "AI Validation Complete",
        description: result.isValid ? "Profile looks good!" : "Potential issues found. Please review.",
        variant: result.isValid && result.flags.length === 0 ? "default" : "destructive",
        className: result.isValid && result.flags.length === 0 ? "bg-green-500 text-white" : ""
      });
    } catch (error) {
      console.error("AI Validation Error:", error);
      toast({
        title: "AI Validation Error",
        description: "An error occurred while validating your profile with AI. Please try again.",
        variant: "destructive",
      });
      setAiValidated(false);
    } finally {
      setIsAIValidating(false);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    if (!aiValidated || !aiValidationResult?.isValid && aiValidationResult?.flags.length > 0) {
       toast({
        title: "Submission Blocked",
        description: "Please run AI validation and address any critical issues before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Form Submitted:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({
      title: "Profile Submitted!",
      description: "Your company profile has been successfully submitted.",
      className: "bg-green-500 text-white", // Custom success styling
    });
    methods.reset(); // Clear form
    setCurrentStep(0); // Reset to first step
    setAiValidationResult(null);
    setAiValidated(false);
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
          aiValidationResult={aiValidationResult}
          isAIValidating={isAIValidating}
        />

        <FormNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isNextDisabled={methods.formState.isSubmitting || isAIValidating}
          isSubmitting={isSubmitting}
          isAIValidating={isAIValidating}
          onValidateAI={currentStep === STEPS.length - 1 ? handleAIValidate : undefined}
          aiValidated={aiValidated}
        />
      </form>
    </FormProvider>
  );
}
