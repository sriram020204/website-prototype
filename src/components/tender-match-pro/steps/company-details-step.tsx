
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase } from 'lucide-react';

interface CompanyDetailsStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const DUMMY_COUNTRIES = [{ label: "India", value: "IN" }, { label: "United States", value: "US" }];
const DUMMY_STATES_IN = [{ label: "Maharashtra", value: "MH" }, { label: "Karnataka", value: "KA" }];
const DUMMY_STATES_US = [{ label: "California", value: "CA" }, { label: "New York", value: "NY" }];
const COMPANY_TYPES = ["Proprietorship", "Pvt Ltd", "LLP", "Public Ltd", "Partnership", "Other"];

export const CompanyDetailsStep: FC<CompanyDetailsStepProps> = ({ form }) => {
  const selectedCountry = form.watch('companyDetails.country');

  const getStatesForCountry = (countryCode: string | undefined) => {
    if (countryCode === "IN") return DUMMY_STATES_IN;
    if (countryCode === "US") return DUMMY_STATES_US;
    return [];
  };
  
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Briefcase className="mr-2 h-6 w-6 text-primary" />
          Company Details
        </CardTitle>
        <CardDescription>Provide fundamental information about your company.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="companyDetails.companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., Acme Innovations Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDetails.companyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COMPANY_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDetails.yearOfEstablishment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Establishment</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 2005" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value,10))} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="companyDetails.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value); 
                  form.setValue('companyDetails.state', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                }} 
                value={field.value || ''}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DUMMY_COUNTRIES.map(country => (
                    <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDetails.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''} disabled={!selectedCountry}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getStatesForCountry(selectedCountry).map(state => (
                    <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!selectedCountry && <FormDescription>Please select a country first.</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDetails.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g., Mumbai" {...field} />
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
                <Textarea rows={3} placeholder="e.g., 123 Tech Park, Silicon Valley, CA 94000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDetails.websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Website URL (Optional)</FormLabel>
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
