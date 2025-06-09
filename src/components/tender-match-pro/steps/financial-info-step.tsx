
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Landmark } from 'lucide-react';

interface FinancialLegalInfoStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const CURRENCY_OPTIONS = ["USD", "INR"];

export const FinancialLegalInfoStep: FC<FinancialLegalInfoStepProps> = ({ form }) => {
  const watchIsBlacklisted = form.watch('financialLegalInfo.isBlacklistedOrLitigation');
  const watchHasPan = form.watch('financialLegalInfo.hasPan');
  const watchHasGstin = form.watch('financialLegalInfo.hasGstin');
  const watchHasMsme = form.watch('financialLegalInfo.hasMsmeUdyamNsic');


  const renderTurnoverFields = (fyLabel: string, amountFieldName: keyof RegistrationFormData['financialLegalInfo'], currencyFieldName: keyof RegistrationFormData['financialLegalInfo'] ) => (
    <div className="space-y-2 p-3 border rounded-md">
      <FormLabel className="text-md font-semibold">{fyLabel}</FormLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={amountFieldName}
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
        <FormField
          control={form.control}
          name={currencyFieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
  
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Landmark className="mr-2 h-6 w-6 text-primary" />
          Financial & Legal Information
        </CardTitle>
        <CardDescription>Provide your company's financial and legal details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="financialLegalInfo.hasPan"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Do you have a PAN (Permanent Account Number)?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      form.setValue('financialLegalInfo.pan', '', { shouldValidate: true });
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {watchHasPan && (
          <FormField
            control={form.control}
            name="financialLegalInfo.pan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN Number (Optional)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter PAN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="financialLegalInfo.hasGstin"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Do you have a GSTIN?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      form.setValue('financialLegalInfo.gstin', '', { shouldValidate: true });
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {watchHasGstin && (
          <FormField
            control={form.control}
            name="financialLegalInfo.gstin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GSTIN Number (Optional)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter GSTIN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="financialLegalInfo.hasMsmeUdyamNsic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Do you have an MSME/Udyam/NSIC Registration?</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      form.setValue('financialLegalInfo.msmeUdyamNsicNumber', '', { shouldValidate: true });
                      form.setValue('financialLegalInfo.msmeUdyamNsicCertificate', '', { shouldValidate: true });
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {watchHasMsme && (
          <>
            <FormField
              control={form.control}
              name="financialLegalInfo.msmeUdyamNsicNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MSME/Udyam/NSIC Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter registration number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialLegalInfo.msmeUdyamNsicCertificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MSME/Udyam/NSIC Certificate File Name (Optional)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter certificate file name" {...field} />
                  </FormControl>
                  <FormDescription>Use this field to add the file name of your MSME/Udyam/NSIC certificate. Actual file uploads are handled separately.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Annual Turnover for Last 3 Financial Years (Optional)</h4>
          {renderTurnoverFields("FY1 (e.g., 2022-23)", "financialLegalInfo.annualTurnoverFY1Amount", "financialLegalInfo.annualTurnoverFY1Currency")}
          {renderTurnoverFields("FY2 (e.g., 2021-22)", "financialLegalInfo.annualTurnoverFY2Amount", "financialLegalInfo.annualTurnoverFY2Currency")}
          {renderTurnoverFields("FY3 (e.g., 2020-21)", "financialLegalInfo.annualTurnoverFY3Amount", "financialLegalInfo.annualTurnoverFY3Currency")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField
            control={form.control}
            name="financialLegalInfo.netWorthAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Net Worth (Optional)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g., 1000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="financialLegalInfo.netWorthCurrency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Net Worth Currency (Optional)</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="financialLegalInfo.isBlacklistedOrLitigation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Is the company blacklisted or in litigation?</FormLabel>
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
        {watchIsBlacklisted && (
          <FormField
            control={form.control}
            name="financialLegalInfo.blacklistedDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details of Blacklisting/Litigation (Optional)</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Provide details if yes..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
};

