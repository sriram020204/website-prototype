"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Cog } from 'lucide-react';

interface DigitalReadinessStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

export const DigitalReadinessStep: FC<DigitalReadinessStepProps> = ({ form }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Cog className="mr-2 h-6 w-6 text-primary" />
          Digital Readiness
        </CardTitle>
        <CardDescription>Assess your company's technological capabilities and digital infrastructure.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="digitalReadiness.techStack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Technology Stack</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Describe the main technologies, platforms, and tools your company uses..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="digitalReadiness.digitalToolsUsed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Digital Tools for Operations/Collaboration</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="e.g., CRM systems, project management software, communication platforms..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="digitalReadiness.cybersecurityMeasures"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cybersecurity Measures (Optional)</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Briefly describe key cybersecurity practices or certifications (e.g., ISO 27001, regular audits)..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
