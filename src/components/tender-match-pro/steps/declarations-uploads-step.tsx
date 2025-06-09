
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardList } from 'lucide-react';

interface DeclarationsUploadsStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

export const DeclarationsUploadsStep: FC<DeclarationsUploadsStepProps> = ({ form }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <ClipboardList className="mr-2 h-6 w-6 text-primary" />
          Declarations & Uploads
        </CardTitle>
        <CardDescription>Provide necessary document names and confirm declarations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-semibold text-primary">Document Uploads (Enter File Names)</h3>
        <FormDescription>Please enter the file names for the documents you will provide. Actual file uploads are typically handled separately.</FormDescription>
        
        <FormField
          control={form.control}
          name="declarationsUploads.panUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN Card (File Name)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., pan_card.pdf" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="declarationsUploads.gstUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GST Certificate (File Name - Optional)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., gst_certificate.pdf" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="declarationsUploads.msmeCertUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MSME Certificate (File Name - Optional)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., msme_cert.pdf" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="declarationsUploads.isoCertUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISO Certificate(s) (File Names - Optional)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., iso_9001.pdf, iso_14001.jpg" {...field} />
              </FormControl>
              <FormDescription>Enter multiple file names separated by commas if needed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="declarationsUploads.bisCertUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BIS Certificate(s) (File Names - Optional)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., bis_cert_productA.pdf" {...field} />
              </FormControl>
               <FormDescription>Enter multiple file names separated by commas if needed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="declarationsUploads.otherCertificatesUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Listed Certificates (File Names - Optional)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., fssai_license.pdf, organic_cert.jpg" {...field} />
              </FormControl>
              <FormDescription>For certifications listed in Business Capabilities not covered above (e.g., FSSAI). Enter multiple file names separated by commas if needed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-lg font-semibold text-primary mt-6">Declarations</h3>
        <FormField
          control={form.control}
          name="declarationsUploads.infoConfirmed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I confirm that the above information is true to the best of my knowledge and belief.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="declarationsUploads.blacklistingDeclaration"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I declare that the company is not currently blacklisted by any government/PSU/major private entity. (Check if true)
                </FormLabel>
                 <FormDescription>If your company has faced blacklisting that has since been lifted, or if there are specific circumstances you wish to clarify, please provide details in the 'Blacklisting Declaration Upload' field or the blacklisting details field in the Financial & Legal Info step.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="declarationsUploads.blacklistingDeclarationUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blacklisting Declaration Document (File Name - Optional)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., clarification_letter.pdf" {...field} />
              </FormControl>
              <FormDescription>Upload if you need to provide additional context to the blacklisting declaration.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

