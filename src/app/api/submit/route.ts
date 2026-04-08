import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import Groq from "groq-sdk";

// Initialize Notion Client
const notion = process.env.NOTION_API_KEY ? new Client({ auth: process.env.NOTION_API_KEY }) : null;
const databaseId = process.env.NOTION_DATABASE_ID || "";

// Initialize Groq Client
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

export async function POST(req: Request) {
  try {
    const { course, topic, question } = await req.json();

    console.log(`Received Question for ${course}: ${topic}`);

    let generatedLessonPlan = `Today's Focus: ${topic}\n\n1. Explain the core concept: What exactly is happening under the hood.\n2. Common Pitfall: Why students struggle here.\n3. Live Coding: Demonstrate the fix step-by-step.`;

    // --- CALL GROQ FOR LESSON PLAN ---
    if (groq) {
      try {
        const messages: any[] = [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `I am an undergraduate learning assistant (ULA/TA) for ${course}. A student is struggling with the topic: "${topic}".\nTheir specific question/confusion is: "${question}".\nGenerate a brief, bulleted 3-part lesson plan or guide that I can use in my office hours session to effectively teach them this concept and get them un-stuck. It should be directly tailored to solving their exact confusion. IMPORTANT: Provide the response in PLAIN TEXT only. DO NOT USE MARKDOWN BOLDING (NO ASTERISKS **).`
              }
            ]
          }
        ];

        const chatCompletion = await groq.chat.completions.create({
          messages: messages,
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: 1024,
        });

        if (chatCompletion.choices[0]?.message?.content) {
          // Strip any accidental asterisks the AI might have included
          generatedLessonPlan = chatCompletion.choices[0].message.content.replace(/\*\*/g, "");
        }

      } catch (aiError) {
        console.error("Groq API failed, falling back to mock:", aiError);
      }
    }

    // --- NOTION API INTEGRATION ---
    if (notion && databaseId) {
      // Split lesson plan by newlines and create blocks
      const planBlocks = generatedLessonPlan
        .split("\n")
        .filter(line => line.trim().length > 0)
        .map(line => {
          // Check if line is a header or list item
          if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
            return {
              object: "block",
              type: "bulleted_list_item",
              bulleted_list_item: {
                rich_text: [{ type: "text", text: { content: line.trim().substring(2).substring(0, 2000) } }],
              },
            };
          }
          if (line.match(/^\d+\./)) {
             return {
              object: "block",
              type: "numbered_list_item",
              numbered_list_item: {
                rich_text: [{ type: "text", text: { content: line.replace(/^\d+\.\s*/, "").substring(0, 2000) } }],
              },
            };
          }
          return {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [{ type: "text", text: { content: line.substring(0, 2000) } }],
            },
          };
        });

      const childrenBlocks: any[] = [
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [{ type: "text", text: { content: "AI Generated Lesson Plan (Groq Llama-3)" } }],
          },
        },
        ...planBlocks,
        {
          object: "block",
          type: "divider",
          divider: {},
        },
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [{ type: "text", text: { content: "Student Queries" } }],
          },
        },
      ];

      childrenBlocks.push({
        object: "block",
        type: "toggle",
        toggle: {
          rich_text: [{ type: "text", text: { content: `Questions about: ${topic}` } }],
          children: [
            {
              object: "block",
              type: "quote",
              quote: {
                rich_text: [{ type: "text", text: { content: question } }],
              },
            },
          ],
        },
      });

      await notion.pages.create({
        parent: { page_id: databaseId }, 
        properties: {
          title: {
            title: [
              {
                text: {
                  content: `Clarify: ${course} - ${topic}`,
                },
              },
            ],
          },
        },
        children: childrenBlocks,
      });
      console.log("Successfully created Notion page");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
