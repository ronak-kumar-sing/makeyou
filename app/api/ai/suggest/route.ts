import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `SYSTEM:
You are the AI engine of the "AI Todo Assistant". Your task is to analyze user input and generate structured actionable todos for the currently selected PROJECT — not global.

RULES:
1. All suggestions, todos, and subtasks must be attached to ONLY the currently selected project (project_id provided in input). Never create cross-project items.
2. If the user describes new features (e.g., donation integration, Razorpay, admin panel, gallery, login system, blog pages, e-commerce functions, SEO, marketing etc.), treat them as MODULES and suggest them as optional add-on tasks.
3. If user message is unclear, ask up to 2 short questions and then generate suggestions.
4. Every suggestion must include:
   id, title, description, price (INR), estimate_minutes, priority (P1–P4), tags[], subtasks[] (each with estimate_minutes).
5. Support INDIAN market pricing only (₹).
6. If user mentions "website", "donation", "NGO", "campaign", "portfolio", "business", etc., infer the project type and adjust modules and pricing accordingly.
7. The response must RETURN JSON ONLY — no plain text — using schema below.

JSON SCHEMA:
{
  "project_id": "<same project_id received or 'default'>",
  "context": "<short summary>",
  "suggestions": [
    {
      "id": "s1",
      "title": "string",
      "description": "string",
      "price": number,
      "estimate_minutes": number,
      "priority": "P1" | "P2" | "P3" | "P4",
      "tags": ["string"],
      "subtasks": [
        {"title": "string", "estimate_minutes": number}
      ],
      "confidence": number (0–1),
      "followup_questions": ["optional..."]
    }
  ]
}

BEHAVIOR:
• If user adds new requests later (e.g., "Add Razorpay also"), the AI must not resuggest the whole website; instead suggest ONLY new modular items.
• If user says "complete planning" or "full list", generate a full roadmap of tasks for the project.
• If a suggestion depends on another module, include short rationale.
• Always optimize for minimum user effort and max clarity.

TONE:
Professional, concise, Indian market context.

OUTPUT:
Return JSON following the schema exactly.
No explanations. No markdown.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { context, budget, timeline, type, pages, project_id, projectDescription, language } = body;

    if (!context && !budget && !type && !projectDescription) {
      return NextResponse.json(
        { error: 'Please provide context or project details' },
        { status: 400 }
      );
    }

    // Build user prompt
    const lang = language || 'en';
    const langInstruction = lang === 'hi'
      ? '\n\nIMPORTANT: Respond in Hindi language. All suggestions, titles, and descriptions must be in Hindi.'
      : '\n\nIMPORTANT: Respond in English language.';

    let userPrompt = `PROJECT_ID: ${project_id || 'default'}\n`;
    userPrompt += `USER REQUEST: ${projectDescription || context || 'Help me plan a project'}\n\n`;
    if (budget) userPrompt += `Budget: ₹${budget}\n`;
    if (timeline) userPrompt += `Timeline: ${timeline} days\n`;
    if (type) userPrompt += `Project Type: ${type}\n`;
    if (pages) userPrompt += `Number of Pages: ${pages}\n`;
    userPrompt += langInstruction;
    userPrompt += `\nProvide suggestions as JSON only (no markdown, no extra text).`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: userPrompt }
    ]);

    const response = result.response;
    let text = response.text();

    // Clean up response - remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Parse JSON
    const data = JSON.parse(text);

    // Add timestamp if not present
    if (!data.meta) {
      data.meta = { generated_at: new Date().toISOString() };
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('AI Suggestion Error:', error);

    // Return a fallback response
    return NextResponse.json({
      context: 'Error generating suggestions',
      suggestions: [
        {
          id: 's1',
          title: 'Standard Business Website',
          description: 'A professional website with essential pages and features',
          price: 15000,
          currency: 'INR',
          estimate_minutes: 720,
          priority: 'P1',
          tags: ['website', 'business', 'cms'],
          subtasks: [
            { title: 'Design homepage', estimate_minutes: 120 },
            { title: 'Create content', estimate_minutes: 180 },
            { title: 'Development', estimate_minutes: 300 },
            { title: 'Testing & launch', estimate_minutes: 120 }
          ],
          confidence: 0.85,
          rationale: 'A balanced solution for most business needs'
        }
      ],
      meta: { generated_at: new Date().toISOString() },
      error: error.message
    });
  }
}
