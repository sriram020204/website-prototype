"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea'; // Using Textarea for longer inputs
import { Zap } from 'lucide-react';

interface BusinessCapabilitiesStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

export const BusinessCapabilitiesStep: FC<BusinessCapabilitiesStepProps> = ({ form }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Zap className="mr-2 h-6 w-6 text-primary" />
          Business Capabilities
        </CardTitle>
        <CardDescription>Describe your company's core strengths and service offerings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="businessCapabilities.coreCompetencies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Core Competencies</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Detail your company's main areas of expertise and strength..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessCapabilities.servicesOffered"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Services Offered</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="List and describe the primary services your company provides..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessCapabilities.keyDifferentiators"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Differentiators (Optional)</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="What makes your company unique compared to competitors? (e.g., proprietary technology, unique methodologies)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
