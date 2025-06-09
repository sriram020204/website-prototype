
"use client";

import type { FC } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X, Landmark } from 'lucide-react';

interface FinancialLegalInfoStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const CURRENCY_OPTIONS = ["USD", "INR"];

const FileInputControl: FC<{ field: any; placeholder: string }> = ({ field, placeholder }) => {
  const { name, value, onChange, ref } = field;
  return (
    <>
      <Input
        type="file"
        id={name}
        onChange={(e) => onChange(e.target.files?.[0]?.name || '')}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
        ref={ref}
        aria-label={placeholder}
      />
      {value && (
         <div className="mt-2 text-sm flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <span className="text-muted-foreground mr-2 shrink-0">Selected:</span>
            <span className="truncate break-all" title={value}>{value}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-2 px-1.5 py-0.5 h-auto shrink-0"
            onClick={() => onChange('')}
            aria-label={`Clear ${placeholder}`}
          >
            <X className="h-3 w-3 mr-1" /> Clear
          </Button>
        </div>
      )}
    </>
  );
};

export const FinancialLegalInfoStep: FC<FinancialLegalInfoStepProps> = ({ form }) => {
  const watchIsBlacklisted = form.watch('financialLegalInfo.isBlacklistedOrLitigation');
  const watchHasPan = form.watch('financialLegalInfo.hasPan');
  const watchHasGstin = form.watch('financialLegalInfo.hasGstin');
  const watchHasMsmeUdyam = form.watch('financialLegalInfo.hasMsmeUdyam');
  const watchHasNsic = form.watch('financialLegalInfo.hasNsic');


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
        <CardDescription>Provide your company's financial and legal details. For documents, you'll select the file but only its name is recorded here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="financialLegalInfo.hasPan"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      form.setValue('financialLegalInfo.pan', '', { shouldValidate: true });
                    }
                  }}
                  id={field.name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                  Do you have a PAN (Permanent Account Number)?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        {watchHasPan && (
          <FormField
            control={form.control}
            name="financialLegalInfo.pan"
            render={({ field }) => (
              <FormItem className="pl-10"> {/* Adjusted padding for alignment with checkbox */}
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
             <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      form.setValue('financialLegalInfo.gstin', '', { shouldValidate: true });
                    }
                  }}
                  id={field.name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                  Do you have a GSTIN?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        {watchHasGstin && (
          <FormField
            control={form.control}
            name="financialLegalInfo.gstin"
            render={({ field }) => (
              <FormItem className="pl-10"> {/* Adjusted padding */}
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
          name="financialLegalInfo.hasMsmeUdyam"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      form.setValue('financialLegalInfo.msmeUdyamNumber', '', { shouldValidate: true });
                      form.setValue('financialLegalInfo.msmeUdyamCertificate', '', { shouldValidate: true });
                    }
                  }}
                  id={field.name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                  Do you have an MSME/Udyam Registration?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        {watchHasMsmeUdyam && (
          <>
            <FormField
              control={form.control}
              name="financialLegalInfo.msmeUdyamNumber"
              render={({ field }) => (
                <FormItem className="pl-10"> {/* Adjusted padding */}
                  <FormLabel>MSME/Udyam Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter MSME/Udyam registration number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialLegalInfo.msmeUdyamCertificate"
              render={({ field }) => (
                <FormItem className="pl-10"> {/* Adjusted padding */}
                  <FormLabel>MSME/Udyam Certificate File Name (Optional)</FormLabel>
                  <FormControl>
                     <FileInputControl field={field} placeholder="MSME/Udyam Certificate file" />
                  </FormControl>
                  <FormDescription>Select your MSME/Udyam certificate file. Use this field to add the file name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="financialLegalInfo.hasNsic"
          render={({ field }) => (
             <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      form.setValue('financialLegalInfo.nsicNumber', '', { shouldValidate: true });
                      form.setValue('financialLegalInfo.nsicCertificate', '', { shouldValidate: true });
                    }
                  }}
                  id={field.name}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor={field.name} className="font-normal">
                   Do you have an NSIC Registration?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        {watchHasNsic && (
          <>
            <FormField
              control={form.control}
              name="financialLegalInfo.nsicNumber"
              render={({ field }) => (
                <FormItem className="pl-10"> {/* Adjusted padding */}
                  <FormLabel>NSIC Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter NSIC registration number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="financialLegalInfo.nsicCertificate"
              render={({ field }) => (
                <FormItem className="pl-10"> {/* Adjusted padding */}
                  <FormLabel>NSIC Certificate File Name (Optional)</FormLabel>
                  <FormControl>
                     <FileInputControl field={field} placeholder="NSIC Certificate file" />
                  </FormControl>
                  <FormDescription>Select your NSIC certificate file. Use this field to add the file name.</FormDescription>
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
                  Is the company blacklisted or in litigation?
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        {watchIsBlacklisted && (
          <FormField
            control={form.control}
            name="financialLegalInfo.blacklistedDetails"
            render={({ field }) => (
              <FormItem className="pl-10"> {/* Adjusted padding */}
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

    