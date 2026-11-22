import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, portfolioData } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Grounding context from the portfolio
    const developerName = portfolioData?.personalInfo?.name || 'Deeptha Ranaweera';
    const title = portfolioData?.personalInfo?.title || 'Full Stack Developer';
    const bio = portfolioData?.personalInfo?.bio || 'Passionate software engineer experienced in building scalable modern web, mobile, and AI solutions.';
    const email = portfolioData?.personalInfo?.email || 'N/A';
    const rawPhone = portfolioData?.personalInfo?.phone || '';
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
    const location = portfolioData?.personalInfo?.location || 'N/A';
    const skillsList = portfolioData?.skills?.map((s) => `${s.name} (${s.category}, ${s.level}%)`).join(', ') || 'Modern Full Stack Technologies';
    const projectsList = portfolioData?.projects?.map((p) => {
      return `• ${p.title} (${p.category || 'General'}): ${p.description}. Tech: ${p.technologies?.join(', ') || 'N/A'}. Metrics: ${p.metrics?.join(', ') || 'N/A'}`;
    }).join('\n') || 'Various full-stack web and mobile applications';

    const experienceList = portfolioData?.experience?.map((e) => {
      const ach = e.achievements?.map((a) => `  - ${a}`).join('\n') || '';
      const tech = e.technologies?.join(', ') || '';
      const metrics = e.metrics?.join(', ') || '';
      return `• ${e.position} at ${e.company} (${e.duration}, ${e.location || 'Remote'}):\n  ${e.description}${ach ? `\n  Key Achievements:\n${ach}` : ''}${tech ? `\n  Technologies: ${tech}` : ''}${metrics ? `\n  Impact: ${metrics}` : ''}`;
    }).join('\n\n') || 'Senior software engineering experience across modern web and AI platforms';

    const systemPrompt = `You are the interactive AI Portfolio Copilot for ${developerName}, a ${title}.
Your mission is to represent ${developerName} professionally, enthusiastically, and helpfully to recruiters, clients, and visitors.
Answer their questions accurately based on the portfolio data below:

Name: ${developerName}
Title: ${title}
Bio: ${bio}
Location: ${location}
Email: ${email}
Phone / WhatsApp: ${rawPhone}
Skills: ${skillsList}
Projects:
${projectsList}

Work Experience:
${experienceList}

Guidelines:
1. Be concise, polite, and articulate.
2. Format answers with clean markdown (bullet points, bold text).
3. If asked "who is ${developerName}", "who are you", or about their background, give an impressive introduction highlighting their role, top skills, current company/experience, and invite them to connect or view projects.
4. If asked about hiring or contacting, provide the email (${email}) and WhatsApp link (https://wa.me/${cleanPhone}) and encourage reaching out.
5. If asked about a specific technology, reference any projects, experience, or skills matching it.
6. If asked about work history, career, or past companies, highlight roles, achievements, and impact.`;

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

    const nameLower = developerName.toLowerCase();
    const isAskingAboutPerson =
      lower.includes('who is') ||
      lower.includes('who are') ||
      lower.includes('tell me about') ||
      lower.includes('about ' + nameLower) ||
      lower.includes('about you') ||
      lower.includes('about him') ||
      lower.includes('about the developer') ||
      lower.includes('introduce') ||
      lower.includes('bio') ||
      lower.includes('profile') ||
      lower.includes('deeptha') ||
      lower.includes('ranaweera');

    if (isAskingAboutPerson && !lower.includes('project') && !lower.includes('skill')) {
      const latestRole = portfolioData?.experience?.[0];
      const topProjects = portfolioData?.projects?.slice(0, 2) || [];
      const topSkills = portfolioData?.skills?.slice(0, 6)?.map((s) => s.name)?.join(', ') || 'Next.js, React, Node.js, Laravel, MySQL, Tailwind CSS';

      reply = `**${developerName}** is an innovative **${title}** based in **${location}**. 🚀\n\n` +
        `### 👨‍💻 Professional Profile\n` +
        `${bio}\n\n` +
        (latestRole
          ? `• **Current Position:** ${latestRole.position} at **${latestRole.company}** (${latestRole.duration})\n`
          : '') +
        `• **Core Technologies:** ${topSkills}\n` +
        (topProjects.length > 0
          ? `• **Featured Projects:** ${topProjects.map((p) => `*${p.title}*`).join(', ')}\n`
          : '') +
        `\n### 💬 Direct Connect\n` +
        `Would you like to connect directly or discuss an upcoming project?\n` +
        (cleanPhone
          ? `• **WhatsApp:** [Chat Directly with ${developerName} on WhatsApp](https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(developerName)},%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!)\n`
          : '') +
        `• **Email:** [${email}](mailto:${email})\n\n` +
        `You can ask me more about specific projects, technical experience, or click the WhatsApp link above to send an instant message!`;
    } else if (
      lower.includes('whatsapp') ||
      lower.includes('direct connect') ||
      lower.includes('connect with me') ||
      lower.includes('connect directly') ||
      lower.includes('chat directly') ||
      lower.includes('chat with') ||
      lower.includes('phone') ||
      lower.includes('call')
    ) {
      reply = `You can connect directly with **${developerName}** on WhatsApp! 📱\n\n` +
        (cleanPhone
          ? `👉 **[Click Here to Open WhatsApp Chat](https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(developerName)},%20I'm%20visiting%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you!)**\n\n`
          : (rawPhone ? `• **Phone:** ${rawPhone}\n\n` : '')) +
        `• **Direct Email:** [${email}](mailto:${email})\n` +
        `• **Location:** ${location}\n\n` +
        `Clicking the link will open WhatsApp so you can start a conversation right away!`;
    } else if (lower.includes('experience') || lower.includes('career') || lower.includes('company') || lower.includes('companies') || lower.includes('job') || lower.includes('employment') || lower.includes('history') || (lower.includes('work') && !lower.includes('project'))) {
      const experiences = portfolioData?.experience || [];
      if (experiences.length > 0) {
        reply = `Here is **${developerName}'s** professional work experience:\n\n` +
          experiences.map((exp) => {
            let details = `### **${exp.position}** — *${exp.company}*\n` +
              `🗓️ ${exp.duration} | 📍 ${exp.location || 'Remote'}\n\n` +
              `${exp.description}\n`;
            if (exp.achievements && exp.achievements.length > 0) {
              details += `\n**Key Achievements:**\n` + exp.achievements.map((a) => `• ${a}`).join('\n');
            }
            if (exp.technologies && exp.technologies.length > 0) {
              details += `\n\n**Tech Stack:** ${exp.technologies.join(', ')}`;
            }
            if (exp.metrics && exp.metrics.length > 0) {
              details += `\n**Impact:** ${exp.metrics.join(' • ')}`;
            }
            return details;
          }).join('\n\n---\n\n') +
          `\n\nFor more details, visit the **About** section of the portfolio!`;
      } else {
        reply = `**${developerName}** has extensive engineering experience across modern web and AI applications. Visit the **About** page to explore career highlights!`;
      }
    } else if (lower.includes('project') || lower.includes('portfolio') || lower.includes('built') || lower.includes('apps')) {
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
