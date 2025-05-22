//ValidateProfile story
'use server';

/**
 * @fileOverview Validates a company profile using AI, flagging suspicious or inconsistent information.
 *
 * - validateProfile - Validates the provided company profile data.
 * - ValidateProfileInput - The input type for the validateProfile function.
 * - ValidateProfileOutput - The return type for the validateProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateProfileInputSchema = z.object({
  companyDetails: z.string().describe('Details about the company, including its name, address, and industry.'),
  businessCapabilities: z.string().describe('Description of the company\'s core competencies and services.'),
  financialInformation: z.string().describe('Summary of the company\'s financial status, including revenue and funding.'),
  tenderExperience: z.string().describe('Overview of the company\'s past experience with tenders and contracts.'),
  geographicReach: z.string().describe('Description of the company\'s operational area and geographic presence.'),
  digitalReadiness: z.string().describe('Assessment of the company\'s technological capabilities and digital infrastructure.'),
});
export type ValidateProfileInput = z.infer<typeof ValidateProfileInputSchema>;

const ValidateProfileOutputSchema = z.object({
  flags: z.array(
    z.object({
      field: z.string().describe('The field that was flagged.'),
      reason: z.string().describe('The reason why the field was flagged as suspicious or inconsistent.'),
    })
  ).describe('A list of flags indicating potential issues with the company profile data.'),
  isValid: z.boolean().describe('Whether the profile is valid or not based on the flags.'),
});
export type ValidateProfileOutput = z.infer<typeof ValidateProfileOutputSchema>;

export async function validateProfile(input: ValidateProfileInput): Promise<ValidateProfileOutput> {
  return validateProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateProfilePrompt',
  input: {schema: ValidateProfileInputSchema},
  output: {schema: ValidateProfileOutputSchema},
  prompt: `You are an AI assistant designed to validate company profiles and identify potential inconsistencies or suspicious information.

  Review the following company profile data and flag any fields that seem unusual, inconsistent, or potentially fraudulent. Provide a reason for each flag.

  Company Details: {{{companyDetails}}}
  Business Capabilities: {{{businessCapabilities}}}
  Financial Information: {{{financialInformation}}}
  Tender Experience: {{{tenderExperience}}}
  Geographic Reach: {{{geographicReach}}}
  Digital Readiness: {{{digitalReadiness}}}

  Return a JSON object containing a list of flags, where each flag includes the field name and the reason for the flag.  Also return an isValid flag representing whether the profile is deemed valid based on the presence of flags.
  `,
});

const validateProfileFlow = ai.defineFlow(
  {
    name: 'validateProfileFlow',
    inputSchema: ValidateProfileInputSchema,
    outputSchema: ValidateProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
