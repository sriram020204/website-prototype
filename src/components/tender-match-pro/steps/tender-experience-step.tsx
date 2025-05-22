
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Award } from 'lucide-react';

interface TenderExperienceStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

export const TenderExperienceStep: FC<TenderExperienceStepProps> = ({ form }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Award className="mr-2 h-6 w-6 text-primary" />
          Tender Experience
        </CardTitle>
        <CardDescription>Detail your company's experience with government and private tenders.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="tenderExperience.suppliedToGovtPsus"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Supplied to Government/PSUs?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tenderExperience.pastClients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Past Clients (Optional)</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="e.g., Ministry of Defence, Tata Motors, Reliance Industries" {...field} />
              </FormControl>
              <FormDescription>Enter client names separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tenderExperience.purchaseOrders"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Orders (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., PO_Ref_123.pdf, ClientX_Order.docx" {...field} />
              </FormControl>
              <FormDescription>Enter file names separated by commas. Upload actual files in the final step.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tenderExperience.performanceReports"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Performance Reports (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Q1_Report.pdf, ProjectAlpha_Completion.doc" {...field} />
              </FormControl>
              <FormDescription>Enter file names separated by commas. Upload actual files in the final step.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tenderExperience.highestOrderValueFulfilled"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Highest Order Value Fulfilled (Optional, in your primary currency)</FormLabel>
              <FormControl>
                 <Input type="number" placeholder="e.g., 1000000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tenderExperience.tenderTypesHandled"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tender Types Handled (Optional)</FormLabel>
              <FormControl>
                <Textarea rows={2} placeholder="e.g., Goods, Services, EPC, AMC" {...field} />
              </FormControl>
              <FormDescription>Enter tender types separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
