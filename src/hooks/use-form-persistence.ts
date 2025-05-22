
"use client";

import { useEffect, useCallback } from 'react';
import type { UseFormReturn, FieldValues, Path, PathValue } from 'react-hook-form';

export function useFormPersistence<T extends FieldValues>(
  form: UseFormReturn<T>,
  storageKey: string
) {
  const { watch, reset, setValue, getValues, formState: { isSubmitSuccessful, defaultValues } } = form;

  const loadFromStorage = useCallback(() => {
    const storedDataString = localStorage.getItem(storageKey);
    if (storedDataString) {
      try {
        const parsedData = JSON.parse(storedDataString) as Partial<T>;
        const currentDefaultValues = defaultValues || ({} as T);

        // Iterate over the keys of the defaultValues to ensure structure
        // This helps in merging stored data with potentially new/changed default structure
        const mergedData = { ...currentDefaultValues };

        for (const key in currentDefaultValues) {
          const sectionKey = key as Path<T>;
          if (parsedData.hasOwnProperty(key)) {
            // If the stored data for a section is an object, merge it with defaults for that section
            if (typeof parsedData[sectionKey] === 'object' && parsedData[sectionKey] !== null && typeof currentDefaultValues[sectionKey] === 'object' && currentDefaultValues[sectionKey] !== null) {
               mergedData[sectionKey] = { ...currentDefaultValues[sectionKey], ...parsedData[sectionKey] } as PathValue<T, Path<T>>;
            } else {
              // Otherwise, just take the stored value
              mergedData[sectionKey] = parsedData[sectionKey] as PathValue<T, Path<T>>;
            }
          }
        }
        
        // Reset the form with the merged data.
        // This ensures that even if some fields were not in localStorage,
        // they get their default values.
        reset(mergedData, { keepDefaultValues: false });

      } catch (error) {
        console.error("Failed to parse stored form data:", error);
        localStorage.removeItem(storageKey); // Clear corrupted data
      }
    } else {
      // If no stored data, ensure form is reset to its initial default values
      // This is important if defaultValues are loaded asynchronously or change
       if (defaultValues) {
        reset(defaultValues);
      }
    }
  }, [reset, storageKey, defaultValues]);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]); // Rerun if defaultValues itself changes, e.g. loaded async

  useEffect(() => {
    const subscription = watch((value) => {
      // Only save if the form isn't about to be/being submitted or just succeeded
      if (!form.formState.isSubmitting && !form.formState.isSubmitSuccessful) {
        localStorage.setItem(storageKey, JSON.stringify(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, storageKey, form.formState.isSubmitting, form.formState.isSubmitSuccessful]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      localStorage.removeItem(storageKey);
      // Optionally, reset to initial default values after successful submission and clearing storage
      if (defaultValues) {
        reset(defaultValues);
      }
    }
  }, [isSubmitSuccessful, storageKey, reset, defaultValues]);
}
