import { GoogleGenAI } from "@google/genai";

export async function GenerateCourseLayout(promptText) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const model = "gemini-2.0-flash-lite";
  const config = {
    responseMimeType: "text/plain",
  };

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Generate a course tutorial on following detail with field as Course Name, Description, Along with Chapter Name, About, Duration:

Category: Programming, Topic: Python, Level: Basic, Duration: 1 hours, NoOfChapters: 5 in JSON format`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
                    {
                        "CourseName": "Introduction to Python Programming",
                        "Description": "This course provides a foundational understanding of Python programming.  You'll learn the core concepts, syntax, and basic functionalities needed to start writing Python code.  This course is perfect for beginners with no prior programming experience.",
                        "Category": "Programming",
                        "Topic": "Python",
                        "Level": "Basic",
                        "Duration": "1 hour",
                        "NoOfChapters": 5,
                        "Chapters": [
                          {
                            "ChapterName": "Chapter 1:  What is Python and Why Learn It?",
                            "About": "An introduction to Python, its history, popularity, and various applications.  We'll discuss why Python is a great language for beginners and explore its versatility in fields like web development, data science, and automation.",
                            "Duration": "10 minutes"
                          },
                          {
                            "ChapterName": "Chapter 2: Setting Up Your Environment and Basic Syntax",
                            "About": "Guidance on installing Python and choosing a suitable text editor or IDE.  We'll cover fundamental concepts like variables, data types (integers, floats, strings, booleans), comments, and basic input/output operations using the \`print()\` and \`input()\` functions.  Learn how to structure your code and understand Python's indentation.",
                            "Duration": "15 minutes"
                          },
                          {
                            "ChapterName": "Chapter 3:  Operators and Control Flow: Making Decisions",
                            "About": "Introduction to arithmetic, comparison, and logical operators.  We'll cover conditional statements (\`if\`, \`elif\`, \`else\`) to control the flow of your program. Learn to make decisions based on conditions.",
                            "Duration": "15 minutes"
                          },
                          {
                            "ChapterName": "Chapter 4: Working with Loops: Repetition is Key",
                            "About": "Explore the concept of loops (\`for\` and \`while\`) to repeat code blocks. Learn how to iterate through lists, strings, and ranges.  Understand the use of \`break\` and \`continue\` statements to control loop execution.",
                            "Duration": "15 minutes"
                          },
                          {
                            "ChapterName": "Chapter 5: Data Structures and Hands-on Practice",
                            "About": "Introduction to fundamental data structures like lists and their common methods. Practice applying the concepts learned through hands-on examples. You'll work through small coding exercises to solidify your understanding and build confidence.",
                            "Duration": "15 minutes"
                          }
                        ]
                      }
\`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: promptText,
        },
      ],
    },
  ];

  try {
    const responseStream = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullResponse = "";
    for await (const chunk of responseStream) {
      if (chunk.text) {
        fullResponse += chunk.text;
      }
    }
    return fullResponse;
  } catch (error) {
    console.error("An error occurred while calling the Gemini API:", error);
    throw error;
  }
}

export async function GenerateChapterContent(topicPrompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const model = "gemini-2.0-flash-lite";

  const schemaPrompt = `Here is the schema that your response must follow. Do not include any extra text or markdown. Respond ONLY with an array of JSON objects in this schema format.`;

  const schema = [
    {
      title: "The title...",
      explanation:
        "You can run Python code in two main ways. One is through the interactive interpreter... Save it as a `.py` file (e.g., `hello.py`).",
      Code: `<precode>\nprint("Hello, World!")\n</precode>`,
    },
  ];

  const promptInstruction = `Now generate chapter content for the particular chapter. Make sure the output strictly follows the above schema.`;

  try {
    const responseStream = await ai.models.generateContentStream({
      model,
      contents: [
        {
          role: "user",
          parts: [
            { text: topicPrompt },
            { text: schemaPrompt + JSON.stringify(schema) },
            { text: promptInstruction },
          ],
        },
      ],
    });

    let fullResponse = "";
    for await (const chunk of responseStream) {
      if (chunk.text) {
        fullResponse += chunk.text;
      }
    }

    return fullResponse;
  } catch (error) {
    console.error("An error occurred while calling the Gemini API:", error);
    throw error;
  }
}
