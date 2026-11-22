import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, portfolioData } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Grounding context from the portfolio
    const developerName = portfolioData?.personalInfo?.name || 'The Developer';
    const title = portfolioData?.personalInfo?.title || 'Full Stack Developer';
    const email = portfolioData?.personalInfo?.email || 'N/A';
    const location = portfolioData?.personalInfo?.location || 'N/A';
    const skillsList = portfolioData?.skills?.map((s) => `${s.name} (${s.category}, ${s.level}%)`).join(', ') || 'Modern Full Stack Technologies';
    const projectsList = portfolioData?.projects?.map((p) => {
      return `• ${p.title} (${p.category || 'General'}): ${p.description}. Tech: ${p.technologies?.join(', ') || 'N/A'}. Metrics: ${p.metrics?.join(', ') || 'N/A'}`;
    }).join('\n') || 'Various full-stack web and mobile applications';

    const systemPrompt = `You are the interactive AI Portfolio Copilot for ${developerName}, a ${title}.
Your mission is to represent ${developerName} professionally, enthusiastically, and helpfully to recruiters, clients, and visitors.
Answer their questions accurately based on the portfolio data below:

Location: ${location}
Email: ${email}
Skills: ${skillsList}
Projects:
${projectsList}

Guidelines:
1. Be concise, polite, and articulate.
2. Format answers with clean markdown (bullet points, bold text).
3. If asked about hiring or contacting, provide the email (${email}) and encourage reaching out.
4. If asked about a specific technology, reference any projects or skills matching it.`;

    if (apiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `${systemPrompt}\n\nVisitor Question: "${message}"\n\nAI Response:`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const reply = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to local intelligent engine:', geminiErr);
      }
    }

    // Built-in intelligent fallback engine based on contextual knowledge
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('built')) {
      const topProjects = portfolioData?.projects?.slice(0, 3) || [];
      reply = `Here are some standout projects by **${developerName}**:\n\n` +
        topProjects.map((p) => `• **${p.title}** (${p.category || 'Featured'}): ${p.description}\n  *Tech Stack:* ${p.technologies?.join(', ')}`).join('\n\n') +
        `\n\nYou can explore complete case studies with problem breakdowns and architecture on the **Projects** page!`;
    } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack') || lower.includes('languages') || lower.includes('react') || lower.includes('next')) {
      const topSkills = portfolioData?.skills?.slice(0, 6)?.map((s) => s.name)?.join(', ') || 'React, Next.js, TypeScript, Node.js, Firebase, Tailwind CSS';
      reply = `**${developerName}** specializes in modern full-stack development:\n\n` +
        `• **Core Technologies:** ${topSkills}\n` +
        `• **Frontend:** Next.js (App Router), React 19, Tailwind CSS v4, Framer Motion\n` +
        `• **Backend & Cloud:** Node.js, Firebase/Firestore, REST & Streaming APIs, PostgreSQL/MongoDB\n` +
        `• **Specialties:** AI integration, responsive design systems, high-conversion web apps.`;
    } else if (lower.includes('hire') || lower.includes('contact') || lower.includes('email') || lower.includes('available') || lower.includes('reach')) {
      reply = `**${developerName}** is currently open to new opportunities, freelance contracts, and full-time roles!\n\n` +
        `• **Email:** [${email}](mailto:${email})\n` +
        `• **Location:** ${location}\n\n` +
        `Feel free to use the **Contact** page to submit a project inquiry or schedule an intro call.`;
    } else if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('gemini') || lower.includes('llm')) {
      reply = `**${developerName}** has hands-on experience integrating modern AI technologies:\n\n` +
        `• Built AI-powered tools using the **Gemini API** and LLMs for real-time analytics, natural language search, and automated case study generation.\n` +
        `• Proficient in streaming API responses, prompt engineering, and embedding AI assistants into production web apps.`;
    } else {
      reply = `Hello! I'm ${developerName}'s AI Portfolio Copilot. 🚀\n\n` +
        `I can help you explore:\n` +
        `• **Recent Projects:** Full-stack apps, AI dashboards, and mobile platforms\n` +
        `• **Technical Stack:** Next.js, React, Node.js, Firebase & AI integrations\n` +
        `• **Availability & Contact:** How to get in touch for hiring or collaborations\n\n` +
        `What would you like to know?`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI chat route error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing AI response' },
      { status: 500 }
    );
  }
}
