import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, history = [], portfolioData } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'INVALID_REQUEST', message: 'Message string is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'API_KEY_MISSING',
          message:
            'Gemini API Key is not set in the environment. Please add GEMINI_API_KEY to your .env file to enable the live AI Portfolio Assistant.',
        },
        { status: 403 }
      );
    }

    // Initialize Google Gen AI with v1beta to enable developer instructions / systemInstruction
    const ai = new GoogleGenAI({ apiKey, apiVersion: 'v1beta' });

    // Build grounded context from portfolio data
    const pInfo = portfolioData?.personalInfo || {};
    const projects = portfolioData?.projects || [];
    const skills = portfolioData?.skills || [];
    const experience = portfolioData?.experience || [];
    const services = portfolioData?.services || [];

    const projectsSummary = projects
      .map(
        (p) =>
          `- [${p.title}](/projects/${p.id}) (${p.category}, ${p.year}): ${p.summary || p.description}. Tech: ${
            Array.isArray(p.technologies) ? p.technologies.join(', ') : ''
          }. Highlights: ${Array.isArray(p.highlights) ? p.highlights.join('; ') : 'N/A'}. Architecture: ${p.architectureNotes || 'N/A'}. Problem: ${p.problem || 'N/A'}. Solution: ${p.solution || 'N/A'}`
      )
      .join('\n');

    const skillsSummary = skills.map((s) => `${s.name} (${s.category || 'General'})`).join(', ');

    const experienceSummary = experience
      .map((e) => `- ${e.position} at ${e.company} (${e.duration}): ${e.description}`)
      .join('\n');

    const servicesSummary = services
      .map((s) => `- ${s.title}: ${s.description} (Starting: ${s.price || 'N/A'})`)
      .join('\n');

    const systemInstruction = `You are the AI Portfolio Assistant for ${pInfo.name || 'the portfolio owner'}, a ${
      pInfo.title || 'Full Stack Engineer'
    }.
Your mission is to welcome visitors, recruiters, and clients, and answer their questions with deep technical insight, clarity, and professionalism.

PORTFOLIO OWNER PROFILE:
- Name: ${pInfo.name || 'Sasanka'}
- Role: ${pInfo.title || 'Full Stack Engineer & System Architect'}
- Bio: ${pInfo.bio || ''}
- Location: ${pInfo.location || 'Remote'}
- Email: ${pInfo.email || ''}
- Contact/Inquiries: Available for full-time senior engineering roles, architectural advisory, and selective high-impact contracts.

PROJECTS ARCHIVE:
${projectsSummary}

SKILLS & SPECIALIZATIONS:
${skillsSummary}

EXPERIENCE:
${experienceSummary}

SERVICES OFFERED:
${servicesSummary}

GUIDELINES:
1. Always ground your answers strictly in the real projects, skills, and background provided above.
2. Whenever referencing a project, ALWAYS include a markdown link to its dedicated case study page using this exact format: [Project Title](/projects/<id>).
3. Keep responses concise, articulate, and structured (use bullet points or bold highlights where appropriate).
4. If asked about contact or hiring, provide their email (${pInfo.email}) or guide them to the contact section.
5. Never invent fictional companies, degrees, or clients not listed in the profile.`;

    // Format chat history
    const contents = [];
    if (Array.isArray(history)) {
      for (const turn of history.slice(-6)) {
        if (turn.role && turn.content) {
          contents.push({
            role: turn.role === 'user' ? 'user' : 'model',
            parts: [{ text: turn.content }],
          });
        }
      }
    }
    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in /api/ai/assistant:', error);
    return NextResponse.json(
      {
        error: 'AI_GENERATION_FAILED',
        message: error?.message || 'Failed to communicate with the AI model.',
      },
      { status: 500 }
    );
  }
}
