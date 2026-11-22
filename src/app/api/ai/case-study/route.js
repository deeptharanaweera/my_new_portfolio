import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { title, category, technologies, notes } = await request.json();

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'Project title is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'API_KEY_MISSING',
          message:
            'Gemini API Key is not set in the environment. Please add GEMINI_API_KEY to your .env file to enable the AI Case Study Writer.',
        },
        { status: 403 }
      );
    }

    const ai = new GoogleGenAI({ apiKey, apiVersion: 'v1beta' });

    const techString = Array.isArray(technologies) ? technologies.filter(Boolean).join(', ') : '';

    const prompt = `You are a high-end tech portfolio writer and case study specialist.
Generate a structured, editorial-grade engineering case study for this project.

Project Title: ${title}
Category: ${category || 'Full Stack'}
Technologies: ${techString || 'Modern Web Stack'}
Raw Notes / Context: ${notes || 'Production web application solving scaling, user experience, and real-time data challenges.'}

Produce a valid, strictly formatted JSON response with the following schema:
{
  "summary": "1-2 sentence compelling teaser describing what it does and the primary architectural value proposition.",
  "description": "2-3 paragraph comprehensive editorial narrative detailing the purpose, scope, and engineering depth.",
  "problem": "Clear problem statement explaining the technical or business bottlenecks the system was built to eliminate.",
  "solution": "Technical solution narrative detailing the architecture, design decisions, and execution.",
  "architectureNotes": "Deep-dive technical note on data flow, state management, caching, concurrency, or cloud infrastructure.",
  "highlights": ["3 to 4 concise bullet points detailing measurable engineering achievements or notable technical feats."],
  "metrics": [
    { "label": "Short Metric Label", "value": "Impactful Value (e.g. -45% or 99.9% or 10x)" },
    { "label": "Short Metric Label 2", "value": "Impactful Value 2" },
    { "label": "Short Metric Label 3", "value": "Impactful Value 3" }
  ]
}

Return ONLY clean, raw JSON. Do not wrap in markdown code blocks or backticks.`;

    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const rawText = response.text?.trim() || '{}';
    // Remove potential markdown code fences if model included them
    const sanitizedJson = rawText.replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(sanitizedJson);

    return NextResponse.json({
      summary: parsed.summary || '',
      description: parsed.description || '',
      problem: parsed.problem || '',
      solution: parsed.solution || '',
      architectureNotes: parsed.architectureNotes || '',
      highlights: Array.isArray(parsed.highlights) ? parsed.highlights : [],
      metrics: Array.isArray(parsed.metrics) ? parsed.metrics : [],
    });
  } catch (error) {
    console.error('Error in /api/ai/case-study:', error);
    return NextResponse.json(
      {
        error: 'AI_GENERATION_FAILED',
        message: error?.message || 'Failed to draft case study with AI.',
      },
      { status: 500 }
    );
  }
}
