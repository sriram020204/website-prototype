"use client";

import { useEffect, useCallback } from 'react';
import type { UseFormReturn, FieldValues, Path } from 'react-hook-form';

export function useFormPersistence<T extends FieldValues>(
  form: UseFormReturn<T>,
  storageKey: string
) {
  const { watch, reset, formState: { isSubmitSuccessful } } = form;

  const loadFromStorage = useCallback(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Ensure all keys defined in the schema are present in parsedData,
        // otherwise, react-hook-form might not update controlled components correctly.
        // This is a shallow merge, assuming one level of nesting for top-level form sections.
        const defaultValues = form.formState.defaultValues as T;
        const mergedData = { ...defaultValues, ...parsedData };
        
        // Specifically reset each top-level key to ensure deep updates
        // This helps if a section was empty and now has data or vice-versa.
        Object.keys(defaultValues || {}).forEach(key => {
          const sectionKey = key as Path<T>;
          if (parsedData[key]) {
            form.setValue(sectionKey, parsedData[key]);
          }
        });
        // Fallback reset if individual setValue calls aren't enough
        reset(mergedData, { keepDefaultValues: false });

      } catch (error) {
        console.error("Failed to parse stored form data:", error);
        localStorage.removeItem(storageKey);
      }
    }
  }, [reset, storageKey, form]);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch, storageKey]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      localStorage.removeItem(storageKey);
    }
  }, [isSubmitSuccessful, storageKey]);
}
