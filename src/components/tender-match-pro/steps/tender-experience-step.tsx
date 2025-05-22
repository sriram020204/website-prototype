"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
        <CardDescription>Highlight your company's experience with tenders and contracts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="tenderExperience.pastProjects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overview of Past Projects / Tenders</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Describe significant past projects or tenders your company has been involved in..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tenderExperience.relevantExperienceYears"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Relevant Experience</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tenderExperience.successRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Success Rate (Optional, %)</FormLabel>
              <FormControl>
                <Input type="number" min="0" max="100" placeholder="e.g., 85" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
