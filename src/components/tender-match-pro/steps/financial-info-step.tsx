
"use client";

import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Landmark, Trash2, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FinancialLegalInfoStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const CURRENCY_OPTIONS = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SGD", "AED"];

const MAX_YEARS_HISTORY = 20; 

export const FinancialLegalInfoStep: FC<FinancialLegalInfoStepProps> = ({ form }) => {
  const { control, watch, setValue } = form;
  const { toast } = useToast();
  const [financialYearOptions, setFinancialYearOptions] = useState<{label: string, value: string}[]>([]);

  useEffect(() => {
    const generateFinancialYearOptions = () => {
      const currentYear = new Date().getFullYear();
      const options = [];
      // Create options like "2024-25", "2023-24", etc.
      for (let i = 0; i <= MAX_YEARS_HISTORY; i++) {
        const startYear = currentYear - i;
        const endYearShort = (startYear + 1).toString().slice(-2);
        const yearString = `${startYear}-${endYearShort}`;
        options.push({ label: yearString, value: yearString });
      }
      return options;
    };
    setFinancialYearOptions(generateFinancialYearOptions());
  }, []);


  const { fields, append, remove } = useFieldArray({
    control,
    name: "financialLegalInfo.annualTurnovers",
  });

  const watchIsBlacklisted = watch('financialLegalInfo.isBlacklistedOrLitigation');
  
  const handleAddTurnoverYear = () => {
    if (fields.length >= MAX_YEARS_HISTORY + 1) {
      toast({
        title: "Limit Reached",
        description: `You can add turnover data for up to ${MAX_YEARS_HISTORY + 1} financial years.`,
        variant: "default",
      });
      return;
    }
    append({ financialYear: '', amount: '' });
  };
  
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Landmark className="mr-2 h-6 w-6 text-primary" />
          Financial & Legal Information
        </CardTitle>
        <CardDescription>
          Provide your company's financial and legal details. 
          Check the boxes to confirm possession of registrations.
          Net Worth and at least one Annual Turnover entry are required.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="financialLegalInfo.hasPan"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id={field.name}
                  aria-describedby={`${field.name}-description`}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                  Do you have a PAN?
                </FormLabel>
                <FormDescription id={`${field.name}-description`}>
                  Permanent Account Number
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="financialLegalInfo.hasGstin"
          render={({ field }) => (
             <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id={field.name}
                  aria-describedby={`${field.name}-description`}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                  Do you have a GSTIN?
                </FormLabel>
                 <FormDescription id={`${field.name}-description`}>
                  Goods and Services Tax Identification Number
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="financialLegalInfo.hasMsmeUdyam"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id={field.name}
                  aria-describedby={`${field.name}-description`}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                  Do you have an MSME/Udyam Registration?
                </FormLabel>
                 <FormDescription id={`${field.name}-description`}>
                  Micro, Small and Medium Enterprises / Udyam Registration
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="financialLegalInfo.hasNsic"
          render={({ field }) => (
             <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id={field.name}
                  aria-describedby={`${field.name}-description`}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                   Do you have an NSIC Registration?
                </FormLabel>
                <FormDescription id={`${field.name}-description`}>
                  National Small Industries Corporation
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField
            control={control}
            name="financialLegalInfo.netWorthAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Net Worth Amount</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g., 1000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="financialLegalInfo.netWorthCurrency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Net Worth &amp; Annual Turnover Currency</FormLabel>
                 <Select onValueChange={field.onChange} value={field.value || ''}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {CURRENCY_OPTIONS.map(currency => (
                        <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormDescription>This currency will apply to Net Worth and all Annual Turnover entries.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Annual Turnover</h4>
          <FormDescription>
             At least one entry is required. Please select the financial year from the dropdown and enter the amount.
             Amounts will use the Net Worth currency selected above.
           </FormDescription>
          {fields.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-md space-y-4 relative">
              <FormLabel className="text-md font-semibold block mb-2">Turnover Entry #{index + 1}</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <FormField
                  control={control}
                  name={`financialLegalInfo.annualTurnovers.${index}.financialYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financial Year</FormLabel>
                       <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select financial year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {financialYearOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`financialLegalInfo.annualTurnovers.${index}.amount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="e.g., 5000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {fields.length > 0 && ( 
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2"
                  aria-label={`Remove turnover entry ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="default"
            onClick={handleAddTurnoverYear}
            className="mt-2"
            disabled={fields.length >= MAX_YEARS_HISTORY + 1}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Turnover Year
          </Button>
           {fields.length >= MAX_YEARS_HISTORY + 1 && (
            <p className="text-sm text-muted-foreground">
              Maximum {MAX_YEARS_HISTORY + 1} financial years can be added.
            </p>
          )}
        </div>
        
        <FormField
          control={control}
          name="financialLegalInfo.isBlacklistedOrLitigation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked)
                    if (!checked) {
                        setValue('financialLegalInfo.blacklistedDetails', '', { shouldValidate: true });
                    }
                  }}
                  id={field.name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                  Is the company blacklisted or in litigation?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        {watchIsBlacklisted && (
          <FormField
            control={control}
            name="financialLegalInfo.blacklistedDetails"
            render={({ field }) => (
              <FormItem className="pl-10"> 
                <FormLabel>Details of Blacklisting/Litigation</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Provide details" {...field} />
                </FormControl>
                <FormDescription>Required if 'Yes' is selected above.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
};

