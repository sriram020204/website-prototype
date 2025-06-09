
"use client";

import type { FC } from 'react';
import React, { useEffect, useState, useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Landmark } from 'lucide-react';

interface FinancialLegalInfoStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const CURRENCY_OPTIONS = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SGD", "AED"];

const MAX_DISPLAY_YEARS = 10; // Display last 10 financial years

export const FinancialLegalInfoStep: FC<FinancialLegalInfoStepProps> = ({ form }) => {
  const { control, watch, setValue, formState: { errors } } = form;

  const financialYearStrings = useMemo(() => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < MAX_DISPLAY_YEARS; i++) {
      const startYear = currentYear - i;
      const endYearShort = (startYear + 1).toString().slice(-2);
      years.push(`${startYear}-${endYearShort}`);
    }
    return years;
  }, []);

  // Ensure form state has the financialYear property for each turnover entry
  useEffect(() => {
    const currentTurnovers = watch('financialLegalInfo.annualTurnovers');
    if (currentTurnovers && currentTurnovers.length === MAX_DISPLAY_YEARS) {
      let changed = false;
      const updatedTurnovers = currentTurnovers.map((entry, index) => {
        const expectedYear = financialYearStrings[index];
        if (entry.financialYear !== expectedYear) {
          changed = true;
          return { ...entry, financialYear: expectedYear };
        }
        return entry;
      });
      if (changed) {
        setValue('financialLegalInfo.annualTurnovers', updatedTurnovers, { shouldValidate: false, shouldDirty: false });
      }
    }
  }, [financialYearStrings, setValue, watch]);


  const watchIsBlacklisted = watch('financialLegalInfo.isBlacklistedOrLitigation');
  
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
          Net Worth and the latest year's Annual Turnover are required.
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
          <h4 className="text-lg font-medium">Annual Turnover (Last {MAX_DISPLAY_YEARS} Years)</h4>
          <FormDescription>
             Turnover for the latest financial year ({financialYearStrings[0]}) is required. Other years are optional.
             Amounts will use the Net Worth currency selected above.
          </FormDescription>
          <div className="space-y-3">
            {financialYearStrings.map((yearLabel, index) => (
              <div key={yearLabel} className="p-3 border rounded-md">
                <FormField
                  control={control}
                  name={`financialLegalInfo.annualTurnovers.${index}.amount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={`turnover-amount-${index}`}>
                        Financial Year: {yearLabel}
                        {index === 0 && <span className="text-destructive">*</span>}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          id={`turnover-amount-${index}`}
                          type="text" 
                          placeholder="e.g., 5000000" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`financialLegalInfo.annualTurnovers.${index}.financialYear`}
                  render={({ field }) => (
                    <Input type="hidden" {...field} />
                  )}
                />
              </div>
            ))}
          </div>
           {/* Display general error for annualTurnovers array if any */}
            {errors.financialLegalInfo?.annualTurnovers && !errors.financialLegalInfo?.annualTurnovers?.[0]?.amount && (
                <p className="text-sm font-medium text-destructive">
                    {errors.financialLegalInfo.annualTurnovers.message || errors.financialLegalInfo.annualTurnovers.root?.message}
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
