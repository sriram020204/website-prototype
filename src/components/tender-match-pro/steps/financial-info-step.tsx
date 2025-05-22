"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign } from 'lucide-react';

interface FinancialInformationStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

export const FinancialInformationStep: FC<FinancialInformationStepProps> = ({ form }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <DollarSign className="mr-2 h-6 w-6 text-primary" />
          Financial Information
        </CardTitle>
        <CardDescription>Provide a summary of your company's financial standing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="financialInformation.annualRevenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Revenue (USD)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., 5000000 or 5000000.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="financialInformation.fundingStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funding Status</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Bootstrapped, Seed, Series A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="financialInformation.financialStabilityStatement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Financial Stability Statement (Optional)</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Briefly describe your company's financial stability or outlook..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
