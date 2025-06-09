
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Globe2, Wifi } from 'lucide-react';
import { TagInput } from '@/components/ui/tag-input';

interface GeographicDigitalReachStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

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

const WORLD_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the",
  "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
  "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
  "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
  "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
                <TagInput
                  {...field}
                  options={WORLD_COUNTRIES}
                  placeholder="Select or type countries served..."
                  id="countriesServed"
                  aria-describedby="countriesServed-description"
                  aria-invalid={!!form.formState.errors.geographicDigitalReach?.countriesServed}
                />
              </FormControl>
              <FormDescription id="countriesServed-description">
                Select the countries your company serves from the list, or type to add custom ones.
              </FormDescription>
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
                <TagInput
                  {...field}
                  options={["English", "Hindi", "Spanish", "French", "German", "Chinese", "Japanese", "Arabic", "Russian", "Portuguese", "Bengali", "Urdu", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Odia", "Punjabi", "Assamese"]}
                  placeholder="Select or type preferred languages..."
                  id="preferredTenderLanguages"
                  aria-describedby="preferredTenderLanguages-description"
                  aria-invalid={!!form.formState.errors.geographicDigitalReach?.preferredTenderLanguages}
                />
              </FormControl>
              <FormDescription id="preferredTenderLanguages-description">
                Select preferred languages for tenders from the list, or type to add custom ones.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};


    