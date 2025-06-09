
"use client";

import type { FC } from 'react';
import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import type { RegistrationFormData } from '@/lib/schemas/registration-schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X, Landmark, Trash2, PlusCircle } from 'lucide-react';

interface FinancialLegalInfoStepProps {
  form: UseFormReturn<RegistrationFormData>;
}

const CURRENCY_OPTIONS = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SGD", "AED"];

const generateFinancialYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const options = [];
  // Current financial year (e.g., if 2024, then 2024-25)
  options.push(`${currentYear}-${(currentYear + 1).toString().slice(-2)}`);
  // Previous 20 financial years
  for (let i = 0; i < 20; i++) {
    const yearStart = currentYear - 1 - i;
    const yearEnd = currentYear - i;
    options.push(`${yearStart}-${yearEnd.toString().slice(-2)}`);
  }
  return options;
};

const FINANCIAL_YEAR_OPTIONS = generateFinancialYearOptions();


const FileInputControl: FC<{ field: any; placeholder: string }> = ({ field, placeholder }) => {
  const { name, value, onChange, ref } = field;
  return (
    <>
      <Input
        type="file"
        id={name}
        onChange={(e) => onChange(e.target.files?.[0]?.name || '')}
        className="w-full text-sm file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
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
  const { control, watch, setValue } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "financialLegalInfo.annualTurnovers",
  });

  const watchIsBlacklisted = watch('financialLegalInfo.isBlacklistedOrLitigation');
  const watchHasPan = watch('financialLegalInfo.hasPan');
  const watchHasGstin = watch('financialLegalInfo.hasGstin');
  const watchHasMsmeUdyam = watch('financialLegalInfo.hasMsmeUdyam');
  const watchHasNsic = watch('financialLegalInfo.hasNsic');
  
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
          control={control}
          name="financialLegalInfo.hasPan"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      setValue('financialLegalInfo.pan', '', { shouldValidate: true });
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
            control={control}
            name="financialLegalInfo.pan"
            render={({ field }) => (
              <FormItem className="pl-10"> 
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
          control={control}
          name="financialLegalInfo.hasGstin"
          render={({ field }) => (
             <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      setValue('financialLegalInfo.gstin', '', { shouldValidate: true });
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
            control={control}
            name="financialLegalInfo.gstin"
            render={({ field }) => (
              <FormItem className="pl-10"> 
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
          control={control}
          name="financialLegalInfo.hasMsmeUdyam"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      setValue('financialLegalInfo.msmeUdyamNumber', '', { shouldValidate: true });
                      setValue('financialLegalInfo.msmeUdyamCertificate', '', { shouldValidate: true });
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
          <div className="pl-10 space-y-4">
            <FormField
              control={control}
              name="financialLegalInfo.msmeUdyamNumber"
              render={({ field }) => (
                <FormItem> 
                  <FormLabel>MSME/Udyam Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter MSME/Udyam registration number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="financialLegalInfo.msmeUdyamCertificate"
              render={({ field }) => (
                <FormItem> 
                  <FormLabel>MSME/Udyam Certificate File Name (Optional)</FormLabel>
                  <FormControl>
                     <FileInputControl field={field} placeholder="MSME/Udyam Certificate file" />
                  </FormControl>
                  <FormDescription>Select your MSME/Udyam certificate file. Use this field to add the file name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={control}
          name="financialLegalInfo.hasNsic"
          render={({ field }) => (
             <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      setValue('financialLegalInfo.nsicNumber', '', { shouldValidate: true });
                      setValue('financialLegalInfo.nsicCertificate', '', { shouldValidate: true });
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
          <div className="pl-10 space-y-4">
            <FormField
              control={control}
              name="financialLegalInfo.nsicNumber"
              render={({ field }) => (
                <FormItem> 
                  <FormLabel>NSIC Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter NSIC registration number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="financialLegalInfo.nsicCertificate"
              render={({ field }) => (
                <FormItem> 
                  <FormLabel>NSIC Certificate File Name (Optional)</FormLabel>
                  <FormControl>
                     <FileInputControl field={field} placeholder="NSIC Certificate file" />
                  </FormControl>
                  <FormDescription>Select your NSIC certificate file. Use this field to add the file name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Annual Turnover (Optional)</h4>
          {fields.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-md space-y-4 relative">
              <FormLabel className="text-md font-semibold block mb-2">Turnover Entry #{index + 1}</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <FormField
                  control={control}
                  name={`financialLegalInfo.annualTurnovers.${index}.financialYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Financial Year</FormLabel>
                       <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FINANCIAL_YEAR_OPTIONS.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
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
                <FormField
                  control={control}
                  name={`financialLegalInfo.annualTurnovers.${index}.currency`}
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
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ financialYear: '', amount: '', currency: '' })}
            className="mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Turnover Year
          </Button>
           <FormDescription>
             You can add multiple financial year turnover entries. Please provide accurate figures.
           </FormDescription>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField
            control={control}
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
            control={control}
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


    