'use server';
/**
 * @fileOverview A flow that suggests plausible keywords and a vague hint for a given topic.
 *
 * - suggestTopicKeywordsAndHints - A function that takes a topic and returns keywords and a hint.
 * - SuggestTopicKeywordsAndHintsInput - The input type for the suggestTopicKeywordsAndHints function.
 * - SuggestTopicKeywordsAndHintsOutput - The return type for the suggestTopicKeywordsAndHints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTopicKeywordsAndHintsInputSchema = z.object({
  topic: z.string().describe('The topic to generate keywords and a hint for.'),
});
export type SuggestTopicKeywordsAndHintsInput = z.infer<typeof SuggestTopicKeywordsAndHintsInputSchema>;

const SuggestTopicKeywordsAndHintsOutputSchema = z.object({
  keywords: z.array(z.string()).describe('An array of keywords related to the topic.'),
  hint: z.string().describe('A vague hint related to the topic for the impostor.'),
});
export type SuggestTopicKeywordsAndHintsOutput = z.infer<typeof SuggestTopicKeywordsAndHintsOutputSchema>;

export async function suggestTopicKeywordsAndHints(input: SuggestTopicKeywordsAndHintsInput): Promise<SuggestTopicKeywordsAndHintsOutput> {
  return suggestTopicKeywordsAndHintsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTopicKeywordsAndHintsPrompt',
  input: {schema: SuggestTopicKeywordsAndHintsInputSchema},
  output: {schema: SuggestTopicKeywordsAndHintsOutputSchema},
  prompt: `You are a game master for the game "Blend In!". Your role is to suggest keywords related to a central topic, and also to generate a vague hint for the impostor player.

Topic: {{{topic}}}

Suggest 5 keywords related to the topic, and a vague hint that is related to the topic, but not so obvious that the impostor will be easily discovered. The hint should be understandable by someone with no prior knowledge of the topic.

Keywords: 
-keyword1
-keyword2
-keyword3
-keyword4
-keyword5

Vague Hint: <vague hint here>`,
});

const suggestTopicKeywordsAndHintsFlow = ai.defineFlow(
  {
    name: 'suggestTopicKeywordsAndHintsFlow',
    inputSchema: SuggestTopicKeywordsAndHintsInputSchema,
    outputSchema: SuggestTopicKeywordsAndHintsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
