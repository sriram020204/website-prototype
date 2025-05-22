"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { RegistrationFormData } from '@/lib/schemas/registration-schema';
import type { ValidateProfileInput, ValidateProfileOutput } from '@/ai/flows/validate-profile';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface ReviewSubmitStepProps {
  form: UseFormReturn<RegistrationFormData>;
  aiValidationResult: ValidateProfileOutput | null;
  isAIValidating: boolean;
}

// Helper function to format data for display
const formatDisplayData = (data: any): string => {
  if (typeof data === 'boolean') return data ? 'Yes' : 'No';
  if (typeof data === 'object' && data !== null) {
    return Object.entries(data)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${formatDisplayData(value)}`)
      .join('\n');
  }
  return String(data);
};

export const ReviewSubmitStep: FC<ReviewSubmitStepProps> = ({ form, aiValidationResult, isAIValidating }) => {
  const formData = form.getValues();

  const renderSection = (title: string, data: object) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <div className="p-4 bg-muted/50 rounded-md text-sm space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="grid grid-cols-3 gap-2">
            <span className="font-medium col-span-1">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
            <span className="col-span-2 whitespace-pre-wrap">{formatDisplayData(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Review Your Profile</CardTitle>
        <CardDescription>Please review all your information carefully before submission. You can trigger an AI validation check.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderSection("Company Details", formData.companyDetails)}
        {renderSection("Business Capabilities", formData.businessCapabilities)}
        {renderSection("Financial Information", formData.financialInformation)}
        {renderSection("Tender Experience", formData.tenderExperience)}
        {renderSection("Geographic Reach", formData.geographicReach)}
        {renderSection("Digital Readiness", formData.digitalReadiness)}

        <Separator className="my-8" />

        <h3 className="text-lg font-semibold text-primary mb-2">AI Profile Validation</h3>
        {isAIValidating && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertTitle>Validating...</AlertTitle>
            <AlertDescription>
              Our AI is currently reviewing your profile. This may take a moment.
            </AlertDescription>
          </Alert>
        )}
        {aiValidationResult && !isAIValidating && (
          <>
            {aiValidationResult.isValid ? (
              <Alert variant="default" className="bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-300">Profile Validated</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Our AI has reviewed your profile and it looks good!
                  {aiValidationResult.flags.length > 0 && " However, please review the following minor observations:"}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Potential Issues Found</AlertTitle>
                <AlertDescription>
                  Our AI has identified potential inconsistencies or areas for improvement in your profile. Please review the flags below:
                </AlertDescription>
              </Alert>
            )}
            {aiValidationResult.flags.length > 0 && (
              <div className="mt-4 space-y-2">
                {aiValidationResult.flags.map((flag, index) => (
                  <Alert key={index} variant={aiValidationResult.isValid ? "default" : "destructive"} className={aiValidationResult.isValid ? "bg-yellow-50 border-yellow-300 dark:bg-yellow-900/50 dark:border-yellow-700/50" : ""}>
                     <AlertTriangle className={`h-4 w-4 ${aiValidationResult.isValid ? "text-yellow-600 dark:text-yellow-400" : "" }`} />
                    <AlertTitle className={aiValidationResult.isValid ? "text-yellow-800 dark:text-yellow-300" : ""}>Flagged Field: {flag.field}</AlertTitle>
                    <AlertDescription className={aiValidationResult.isValid ? "text-yellow-700 dark:text-yellow-400" : ""}>{flag.reason}</AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </>
        )}
        {!aiValidationResult && !isAIValidating && (
           <Alert variant="default" className="bg-blue-50 border-blue-300 dark:bg-blue-900/50 dark:border-blue-700/50">
            <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300">AI Validation Pending</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Click the "Validate with AI" button to check your profile for potential issues.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
