
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Globe2, Wifi } from 'lucide-react';
import { TagInput } from '@/components/ui/tag-input'; // Added TagInput

interface GeographicDigitalReachStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

// Duplicating state lists here for now. Consider refactoring to a shared constants file later.
const INDIAN_STATES_UTS = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra & Nagar Haveli and Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh",
  "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
].sort();

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
].sort();


export const GeographicDigitalReachStep: FC<GeographicDigitalReachStepProps> = ({ form }) => {
  const selectedCountry = form.watch('companyDetails.country');

  const getStatesForCountry = (countryCode: string | undefined): string[] => {
    if (countryCode === "IN") return INDIAN_STATES_UTS;
    if (countryCode === "US") return US_STATES;
    return [];
  };

  const operationalStateOptions = getStatesForCountry(selectedCountry);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Globe2 className="mr-2 h-6 w-6 text-primary" />
          <span className="mr-2">Geographic Reach</span>
           & <Wifi className="ml-2 mr-2 h-6 w-6 text-primary" />
          Digital Readiness
        </CardTitle>
        <CardDescription>Define your operational markets and digital preparedness.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-semibold text-primary mt-4">Geographic Reach</h3>
        <FormField
          control={form.control}
          name="geographicDigitalReach.operationalStates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operational States</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  options={operationalStateOptions}
                  placeholder={
                    selectedCountry 
                      ? operationalStateOptions.length > 0 
                        ? "Select or type operational states..." 
                        : "No predefined states for selected country. Type to add."
                      : "Select country in Company Details first..."
                  }
                  id="operationalStates"
                  aria-describedby="operationalStates-description"
                  disabled={!selectedCountry && operationalStateOptions.length === 0}
                  aria-invalid={!!form.formState.errors.geographicDigitalReach?.operationalStates}
                />
              </FormControl>
              <FormDescription id="operationalStates-description">
                Select from the list based on the country chosen in 'Company Details', or type to add custom states.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="geographicDigitalReach.countriesServed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Countries Served</FormLabel>
              <FormControl>
                <Textarea rows={2} placeholder="e.g., India, USA, UAE" {...field} />
              </FormControl>
              <FormDescription>Enter countries separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="geographicDigitalReach.hasImportExportLicense"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id={field.name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                  Have Import/Export License?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <h3 className="text-lg font-semibold text-primary mt-8">Digital Readiness</h3>
        <FormField
          control={form.control}
          name="geographicDigitalReach.registeredOnPortals"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id={field.name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                  Registered on GeM / CPPP / State Portals?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="geographicDigitalReach.hasDigitalSignature"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id={field.name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                  Have Digital Signature Certificate (DSC)?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="geographicDigitalReach.preferredTenderLanguages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Languages for Tenders</FormLabel>
              <FormControl>
                <Textarea rows={2} placeholder="e.g., English, Hindi, Marathi" {...field} />
              </FormControl>
              <FormDescription>Enter languages separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
