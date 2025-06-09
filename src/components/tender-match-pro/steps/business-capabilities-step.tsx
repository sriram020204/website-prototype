
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { TagInput } from '@/components/ui/tag-input'; // Import the new TagInput
import { Zap } from 'lucide-react';

interface BusinessCapabilitiesStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const BUSINESS_ROLE_OPTIONS = [
  "Manufacturer", "Distributor", "Retailer", "Franchise", "Subscription",
  "Freemium", "Advertising", "Marketplace", "On-Demand", "Brokerage",
  "Product-as-a-Service", "Dropshipping", "Aggregator", "Pay-Per-Use",
  "Crowdsourcing", "Licensing", "Consulting", "E-commerce",
  "Dealer", "Trader", "OEM", "Service Provider", "EPC Contractor"
].filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
 .sort(); // Sort alphabetically


export const BusinessCapabilitiesStep: FC<BusinessCapabilitiesStepProps> = ({ form }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Zap className="mr-2 h-6 w-6 text-primary" />
          Business Capabilities
        </CardTitle>
        <CardDescription>Describe your company's roles, sectors, products, and capacities.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="businessCapabilities.businessRoles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Role(s)</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  options={BUSINESS_ROLE_OPTIONS}
                  placeholder="Select or type business roles..."
                  id="businessRoles"
                  aria-describedby="businessRoles-description"
                  aria-invalid={!!form.formState.errors.businessCapabilities?.businessRoles}
                />
              </FormControl>
              <FormDescription id="businessRoles-description">
                Select your company's business roles. Type to search.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessCapabilities.industrySectors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry Sectors</FormLabel>
              <FormControl>
                <Textarea rows={2} placeholder="e.g., Healthcare, Construction, IT (comma-separated)" {...field} />
              </FormControl>
              <FormDescription>Enter sectors separated by commas. You can use the TagInput for roles as an example for future enhancements here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessCapabilities.productServiceKeywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product & Service Keywords</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="e.g., Software development, CNC machines, Office supplies (comma-separated)" {...field} />
              </FormControl>
              <FormDescription>Enter keywords separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessCapabilities.hsnSacCodes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HSN/SAC Codes (Optional)</FormLabel>
              <FormControl>
                <Textarea rows={2} placeholder="e.g., 8471, 998313 (comma-separated)" {...field} />
              </FormControl>
              <FormDescription>Enter codes separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessCapabilities.technicalCapabilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technical Capabilities</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Describe your technical expertise, equipment, or methodologies..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="businessCapabilities.monthlyCapacityValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Capacity Value (Optional)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 1000" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessCapabilities.monthlyCapacityUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Capacity Unit (Optional)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g., Units, Tons, Projects" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="businessCapabilities.certifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certifications (Optional)</FormLabel>
              <FormControl>
                <Textarea rows={2} placeholder="e.g., ISO 9001, BIS, DGMS (enter names, comma-separated)" {...field} />
              </FormControl>
              <FormDescription>Enter certification names separated by commas. Upload actual files in the final step.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
