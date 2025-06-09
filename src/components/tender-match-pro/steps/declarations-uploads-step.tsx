
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X, ClipboardList } from 'lucide-react';

interface DeclarationsUploadsStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const FileInputControl: FC<{ field: any; placeholder: string }> = ({ field, placeholder }) => {
  const { name, value, onChange, ref } = field;
  return (
    <>
      <Input
        type="file"
        id={name}
        onChange={(e) => onChange(e.target.files?.[0]?.name || '')}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
        ref={ref}
        aria-label={placeholder}
      />
      {value && (
        <div className="mt-2 text-sm flex items-center justify-between">
          <div className="flex items-center min-w-0"> 
            <span className="text-muted-foreground mr-2 shrink-0">Selected:</span>
            <span className="truncate break-all" title={value}>{value}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-2 px-1.5 py-0.5 h-auto shrink-0"
            onClick={() => onChange('')}
            aria-label={`Clear ${placeholder}`}
          >
            <X className="h-3 w-3 mr-1" /> Clear
          </Button>
        </div>
      )}
    </>
  );
};


export const DeclarationsUploadsStep: FC<DeclarationsUploadsStepProps> = ({ form }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <ClipboardList className="mr-2 h-6 w-6 text-primary" />
          Declarations & Uploads
        </CardTitle>
        <CardDescription>Select document files and confirm declarations. File contents are not uploaded in this step, only their names are recorded.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-semibold text-primary">Document Uploads (Select Files)</h3>
        <FormDescription>Please select the relevant document files. Only the file name will be recorded.</FormDescription>
        
        <FormField
          control={form.control}
          name="declarationsUploads.panUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN Card</FormLabel>
              <FormControl>
                <FileInputControl field={field} placeholder="PAN Card file" />
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
              <FormLabel>GST Certificate (Optional)</FormLabel>
              <FormControl>
                <FileInputControl field={field} placeholder="GST Certificate file" />
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
              <FormLabel>ISO Certificate(s) (Optional)</FormLabel>
              <FormControl>
                <FileInputControl field={field} placeholder="ISO Certificate file(s)" />
              </FormControl>
              <FormDescription>If multiple, please select one or provide a combined document. Alternatively, list additional file names if a multi-file upload component were available.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="declarationsUploads.bisCertUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BIS Certificate(s) (Optional)</FormLabel>
              <FormControl>
                <FileInputControl field={field} placeholder="BIS Certificate file(s)" />
              </FormControl>
               <FormDescription>If multiple, select one or a combined document.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="declarationsUploads.otherCertificatesUpload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Listed Certificates (Optional)</FormLabel>
              <FormControl>
                <FileInputControl field={field} placeholder="Other certificate file(s)" />
              </FormControl>
              <FormDescription>For certifications listed in Business Capabilities not covered above (e.g., FSSAI). If multiple, select one or a combined document.</FormDescription>
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
                  id={field.name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name}>
                  I confirm that the above information is true to the best of my knowledge and belief.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
