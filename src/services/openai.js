import { OpenAI } from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: This exposes API key in browser; consider using a backend proxy.
});

// Get AI-powered dinner suggestions
export const getDinnerSuggestions = async () => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // 🔄 Updated model from "text-davinci-003" to "gpt-3.5-turbo" (or use "gpt-4-turbo")
      messages: [{ role: "user", content: "Give me some dinner suggestions for a family of four." }],
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error getting AI suggestions: ", error);
    return "Sorry, I couldn't fetch suggestions at the moment.";
  }
};
