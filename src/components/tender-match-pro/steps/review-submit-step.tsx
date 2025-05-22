
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { RegistrationFormData } from '@/lib/schemas/registration-schema';
// ValidateProfileOutput removed as AI validation is gone
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
// Icons for AI validation removed: CheckCircle, AlertTriangle, Loader2
import { Info } from 'lucide-react'; // Using Info for a general message

interface ReviewSubmitStepProps {
  form: UseFormReturn<RegistrationFormData>;
  // AI related props removed
  // aiValidationResult: ValidateProfileOutput | null;
  // isAIValidating: boolean;
}

// Helper function to format data for display
const formatDisplayData = (data: any, fieldName?: string): string => {
  if (typeof data === 'boolean') return data ? 'Yes' : 'No';
  if (typeof data === 'number') return data.toString();
  if (data === null || data === undefined || data === '') {
    // For specific fields that are optional file uploads or descriptions, show "Not Provided" if empty.
    const optionalTextLikeFields = [
        'hsnSacCodes', 'certifications', // BusinessCapabilities
        'msmeUdyamNsicNumber', 'msmeUdyamNsicCertificate', 'blacklistedDetails', // FinancialLegal
        'annualTurnoverFY1Amount', 'annualTurnoverFY2Amount', 'annualTurnoverFY3Amount', 'netWorthAmount', // FinancialLegal (amounts)
        'pastClients', 'purchaseOrders', 'performanceReports', 'tenderTypesHandled', // TenderExperience
        'panUpload', 'gstUpload', 'msmeCertUpload', 'isoCertUpload', 'bisCertUpload', 'blacklistingDeclarationUpload' // Declarations
    ];
    if (fieldName && optionalTextLikeFields.includes(fieldName)) return 'Not Provided';
    return 'N/A'; // General placeholder for other empty/undefined fields
  }
  if (typeof data === 'object' && data !== null) {
    // This case should ideally not be hit if all nested objects are handled by specific renderSection calls for each form section.
    // If it is, it means there's a deeper object not being explicitly rendered.
    return Object.entries(data)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${formatDisplayData(value, key)}`)
      .join('; '); // Changed newline to semicolon for better inline display if this case is hit
  }
  return String(data);
};


const renderSectionData = (title: string, data: Record<string, any> | undefined) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">No data provided for this section.</p>
      </div>
    );
  }
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <div className="p-4 bg-muted/50 rounded-md text-sm space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 items-start">
            <span className="font-medium col-span-1 capitalize break-words">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
            </span>
            <span className="col-span-1 md:col-span-2 whitespace-pre-wrap break-words">{formatDisplayData(value, key)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export const ReviewSubmitStep: FC<ReviewSubmitStepProps> = ({ form }) => {
  const formData = form.getValues();

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Review Your Profile</CardTitle>
        <CardDescription>Please review all your information carefully before submission.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderSectionData("Company Details", formData.companyDetails)}
        {renderSectionData("Business Capabilities", formData.businessCapabilities)}
        {renderSectionData("Financial & Legal Information", formData.financialLegalInfo)}
        {renderSectionData("Tender Experience", formData.tenderExperience)}
        {renderSectionData("Geographic Reach & Digital Readiness", formData.geographicDigitalReach)}
        {renderSectionData("Declarations & Uploads", formData.declarationsUploads)}

        <Separator className="my-8" />

        {/* AI Validation section removed */}
        <Alert variant="default" className="bg-blue-50 border-blue-300 dark:bg-blue-900/50 dark:border-blue-700/50">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300">Ready to Submit?</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Once you submit, the form will be cleared. Ensure all information is correct.
            </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
