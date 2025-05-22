"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Briefcase } from 'lucide-react';

interface CompanyDetailsStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

export const CompanyDetailsStep: FC<CompanyDetailsStepProps> = ({ form }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Briefcase className="mr-2 h-6 w-6 text-primary" />
          Company Details
        </CardTitle>
        <CardDescription>Please provide fundamental information about your company.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="companyDetails.companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Acme Innovations Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDetails.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Company Address</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 123 Tech Park, Silicon Valley, CA 94000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDetails.industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Software Development, Manufacturing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDetails.contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="e.g., contact@acmeinnovations.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDetails.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Website (Optional)</FormLabel>
              <FormControl>
                <Input type="url" placeholder="e.g., https://www.acmeinnovations.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
