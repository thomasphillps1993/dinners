import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Get AI-powered dinner suggestions
export const getDinnerSuggestions = async () => {
  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: "Give me some dinner suggestions for a family of four.",
      max_tokens: 150,
    });
    return response.choices[0].text.trim();
  } catch (error) {
    console.error("Error getting AI suggestions: ", error);
    return "Sorry, I couldn't fetch suggestions at the moment.";
  }
};
