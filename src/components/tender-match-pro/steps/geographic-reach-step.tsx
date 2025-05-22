"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Globe } from 'lucide-react';

interface GeographicReachStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

export const GeographicReachStep: FC<GeographicReachStepProps> = ({ form }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Globe className="mr-2 h-6 w-6 text-primary" />
          Geographic Reach
        </CardTitle>
        <CardDescription>Define your company's operational and target markets.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="geographicReach.operationalArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Operational Area(s)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., North America, Europe, Specific states/countries" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="geographicReach.targetMarkets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Markets</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Government, Healthcare, Enterprise" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="geographicReach.internationalPresence"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base">International Presence</FormLabel>
                <FormDescription>
                  Does your company operate or offer services internationally?
                </FormDescription>
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
      </CardContent>
    </Card>
  );
};
