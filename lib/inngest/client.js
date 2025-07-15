import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "mindmapr",
  name: "MindMapr",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
