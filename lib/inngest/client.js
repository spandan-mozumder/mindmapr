import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'mindmapr',
  name: 'MindMapr',
  credentials: {
    gemini: {
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    },
  },
});
