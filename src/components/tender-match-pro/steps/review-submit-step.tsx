
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { RegistrationFormData, TurnoverEntry } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react'; 

interface ReviewSubmitStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const formatDisplayData = (data: any, fieldName?: string): string => {
  if (typeof data === 'boolean') return data ? 'Yes' : 'No';
  if (typeof data === 'number') return data.toString();
  if (data === null || data === undefined || data === '') {
    const optionalTextLikeFields = [
        'hsnCodes', 'sacCodes', 'certifications', // BusinessCapabilities
        'pan', 'gstin', // FinancialLegal - numbers conditional on booleans
        'msmeUdyamNumber', 'msmeUdyamCertificate', // FinancialLegal (MSME/Udyam)
        'nsicNumber', 'nsicCertificate', // FinancialLegal (NSIC)
        'blacklistedDetails', // FinancialLegal
        'netWorthAmount', 'netWorthCurrency', // FinancialLegal (amounts & currency)
        'pastClients', 'purchaseOrders', 'performanceReports', 'tenderTypesHandled', // TenderExperience
        'panUpload', 'gstUpload', 'isoCertUpload', 'bisCertUpload', 'otherCertificatesUpload' // Declarations
    ];
    
    if (fieldName && ['financialYear', 'amount'].includes(fieldName) && data === '') return 'Not Provided';
    if (fieldName && optionalTextLikeFields.includes(fieldName)) return 'Not Provided';
    return 'N/A'; 
  }
  // General array handling (excluding annualTurnovers, which is handled specially in renderSectionData)
  if (Array.isArray(data) && fieldName !== 'annualTurnovers') {
    if (data.length === 0) return 'None';
    return data.join(', ');
  }
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) { // Check if not an array
    return Object.entries(data)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${formatDisplayData(value, key)}`)
      .join('; '); 
  }
  return String(data);
};


const renderSectionData = (title: string, sectionData: Record<string, any> | undefined) => {
  if (!sectionData || Object.keys(sectionData).length === 0) {
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
        {Object.entries(sectionData).map(([key, value]) => {
          const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          
          if (key === 'annualTurnovers' && title === "Financial & Legal Information" && Array.isArray(value)) {
            const netWorthCurrency = (sectionData as any).netWorthCurrency;
            const currencySuffix = netWorthCurrency ? ` (in ${netWorthCurrency})` : '';
            return (
              <div key={key} className="space-y-1">
                <span className="font-medium col-span-1 capitalize break-words">{displayKey}:</span>
                {value.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-0.5">
                    {value.map((entry: TurnoverEntry, index: number) => (
                      <li key={index} className="whitespace-pre-wrap break-words">
                        {`FY: ${formatDisplayData(entry.financialYear, 'financialYear')}, Amount: ${formatDisplayData(entry.amount, 'amount')}${currencySuffix}`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="col-span-1 md:col-span-2 whitespace-pre-wrap break-words"> No turnover entries provided.</span>
                )}
              </div>
            );
          }

          return (
            <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 items-start">
              <span className="font-medium col-span-1 capitalize break-words">
                {displayKey}:
              </span>
              <span className="col-span-1 md:col-span-2 whitespace-pre-wrap break-words">{formatDisplayData(value, key)}</span>
            </div>
          );
        })}
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
