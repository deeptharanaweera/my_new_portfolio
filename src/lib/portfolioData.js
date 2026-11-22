import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// Default project categories for taxonomy
export const defaultProjectCategories = [
  'Full Stack',
  'Web Platform',
  'Mobile App',
  'AI & Data',
  'Cloud Architecture'
];

// Default hero metrics proof strip
export const defaultHeroStats = [
  { label: 'Years Experience', value: '4+' },
  { label: 'Projects Shipped', value: '25+' },
  { label: 'Code Quality', value: '99.9%' },
  { label: 'Client Rating', value: '5.0★' }
];

// Default portfolio data structure
export const defaultPortfolioData = {
  theme: {
    light: {
      background: '#FAFAFA',
      foreground: '#09090B',
      primary: '#0061FC',
      primaryForeground: '#FFFFFF',
      secondary: '#71717A',
      secondaryForeground: '#FFFFFF',
      accent: '#10B981',
      accentForeground: '#06281F',
      muted: '#F4F4F5',
      mutedForeground: '#71717A',
      card: '#FFFFFF',
      cardForeground: '#09090B',
      border: '#E4E4E7',
      input: '#E4E4E7',
      ring: '#93C5FD'
    },
    dark: {
      background: '#050505',
      foreground: '#F4F4F5',
      primary: '#3B82F6',
      primaryForeground: '#050505',
      secondary: '#A1A1AA',
      secondaryForeground: '#050505',
      accent: '#34D399',
      accentForeground: '#050505',
      muted: '#121215',
      mutedForeground: '#A1A1AA',
      card: '#0D0D11',
      cardForeground: '#F4F4F5',
      border: '#27272A',
      input: '#27272A',
      ring: '#3B82F6'
    }
  },
  personalInfo: {
    name: 'Sasanka',
    title: 'Full Stack Engineer & System Architect',
    bio: 'Crafting resilient full-stack platforms, high-throughput microservices, and human-centered AI interfaces with modern TypeScript, Next.js, and cloud ecosystems.',
    email: 'contact@sasanka.dev',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    avatar: '',
    resume: '/resume.pdf'
  },
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com'
  },
  projectCategories: defaultProjectCategories,
  heroStats: defaultHeroStats,
  skills: [
    { name: 'TypeScript / JavaScript', level: 95, category: 'Frontend' },
    { name: 'React / Next.js', level: 95, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend' },
    { name: 'Node.js / Express', level: 90, category: 'Backend' },
    { name: 'Python & FastAPI', level: 85, category: 'Backend' },
    { name: 'PostgreSQL / Firestore', level: 88, category: 'Backend' },
    { name: 'Docker / Cloud Run', level: 82, category: 'Other' },
    { name: 'Gemini / LLM Workflows', level: 86, category: 'Other' }
  ],
  projects: [
    {
      id: '1',
      slug: 'pulse-commerce-engine',
      title: 'Pulse Commerce Engine',
      category: 'Full Stack',
      createdAt: '2026-11-20T10:00:00.000Z',
      year: '2026',
      role: 'Lead Full Stack Architect',
      status: 'Production',
      summary: 'High-concurrency headless e-commerce engine with sub-50ms checkout flows and edge-rendered catalog storefronts.',
      description: 'A modular, headless e-commerce platform architected for extreme concurrency during flash-sale volumes. Built using Next.js App Router, edge caching, and real-time inventory synchronization with distributed workers.',
      problem: 'Legacy monolithic architecture suffered 4-second checkout latencies and frequent stock overselling during synchronized product drops.',
      solution: 'Re-engineered the platform with an event-driven architecture using Redis pub/sub locks, edge compute caching for static catalog pages, and Stripe Custom Connect payments.',
      architectureNotes: 'Distributed checkout pipeline isolating inventory state in memory before transaction commit. Dynamic ISR routes handle 10,000+ SKU catalogs with near-zero origin hits.',
      highlights: [
        'Sub-50ms average page latency globally via Vercel Edge Runtime',
        'Zero oversell rate during 15,000 concurrent visitor flash sales',
        'Unified admin analytics dashboard with live WebSocket feeds'
      ],
      metrics: [
        { label: 'Latency Reduction', value: '78%' },
        { label: 'Concurrent Users', value: '15k' },
        { label: 'Uptime SLA', value: '99.98%' }
      ],
      image: '',
      gallery: [],
      technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/pulse-commerce',
      featured: true
    },
    {
      id: '2',
      slug: 'neural-canvas-workspace',
      title: 'Neural Canvas Workspace',
      category: 'AI & Data',
      createdAt: '2026-11-15T09:30:00.000Z',
      year: '2026',
      role: 'Full Stack & AI Engineer',
      status: 'Beta',
      summary: 'Collaborative real-time canvas empowering product teams to synthesize ideas into code specifications via grounded LLMs.',
      description: 'An infinite-canvas knowledge studio integrating multimodal Gemini models with real-time CRDT multi-user editing. Users can visually map concepts, generate UI previews live, and export production-ready component scaffolds.',
      problem: 'Product teams lost velocity translating whiteboard wireframes into structured technical specifications and UI boilerplate.',
      solution: 'Designed an interactive infinite canvas with Yjs-backed multi-cursor synchronization and streaming LLM code generation directly into sandbox previews.',
      architectureNotes: 'Uses WebSockets for real-time multiplayer state, WebAssembly vector indexing for fast canvas search, and streaming server-sent events for LLM code generation.',
      highlights: [
        'Multiplayer collaborative canvas with sub-20ms cursor sync latency',
        'Streamed UI generation directly executable in isolated iframe sandboxes',
        'Export to Next.js Tailwind components with single-click clipboard sync'
      ],
      metrics: [
        { label: 'Spec Draft Time', value: '-65%' },
        { label: 'Sync Latency', value: '<20ms' },
        { label: 'User Rating', value: '4.9/5' }
      ],
      image: '',
      gallery: [],
      technologies: ['React', 'TypeScript', 'Gemini API', 'Tailwind CSS', 'WebSockets'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/neural-canvas',
      featured: true
    },
    {
      id: '3',
      slug: 'orbit-cloud-metrics',
      title: 'Orbit Cloud Metrics & Observability',
      category: 'Cloud Architecture',
      createdAt: '2026-10-28T14:15:00.000Z',
      year: '2025',
      role: 'Backend & Cloud Engineer',
      status: 'Production',
      summary: 'Lightweight distributed telemetry collector and visual observability dashboard for containerized microservices.',
      description: 'An open-telemetry compatible telemetry aggregator that ingests distributed traces, formats error budgets, and alerts engineering teams to anomalous latency spikes before outages occur.',
      problem: 'Existing enterprise APM tools were prohibitively expensive and introduced heavy instrumentation overhead on serverless workers.',
      solution: 'Built a lightweight collector in Go and Node.js with clickhouse-backed analytical storage and a responsive Next.js observability cockpit.',
      architectureNotes: 'Ring-buffered trace ingestion processing 12,000 events/sec per node with sub-1% CPU overhead on measured containers.',
      highlights: [
        'Zero-dependency agent with sub-5MB memory footprint',
        'Real-time anomaly detection with webhook triggers',
        'Automated root-cause trace waterfall visualizer'
      ],
      metrics: [
        { label: 'Cost Savings', value: '62%' },
        { label: 'Events/sec', value: '12k' },
        { label: 'MTTD Reduction', value: '40%' }
      ],
      image: '',
      gallery: [],
      technologies: ['Node.js', 'TypeScript', 'ClickHouse', 'Docker', 'Tailwind CSS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/orbit-metrics',
      featured: false
    },
    {
      id: '4',
      slug: 'taskflow-pro-collaborative-hq',
      title: 'TaskFlow Pro HQ',
      category: 'Web Platform',
      createdAt: '2026-09-12T08:00:00.000Z',
      year: '2025',
      role: 'Frontend Lead',
      status: 'Production',
      summary: 'Keyboard-first project management system designed for engineering sprint planning and deep-focus task execution.',
      description: 'A fluid task management application built with optimistic UI mutations, offline-first local indexing, and customizable Kanban, Gantt, and tabular matrix views.',
      problem: 'Engineering teams suffered from context switching in clunky project trackers with slow page loads and complex form dialogues.',
      solution: 'Created a command-bar driven interface with instant keyboard navigation (Cmd+K), instant optimistic local caching, and seamless background sync.',
      architectureNotes: 'IndexedDB-backed local cache with reconciliation queue guaranteeing zero lost edits during intermittent network disconnects.',
      highlights: [
        'Complete keyboard accessibility with comprehensive shortcut system',
        '100% offline functionality with automated conflict resolution',
        'Customizable workflow automations and GitHub PR synchronization'
      ],
      metrics: [
        { label: 'Task Creation Time', value: '3x Faster' },
        { label: 'Offline Resiliency', value: '100%' },
        { label: 'Active Teams', value: '450+' }
      ],
      image: '',
      gallery: [],
      technologies: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/taskflow-pro',
      featured: false
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Vanguard Systems',
      position: 'Senior Full Stack Engineer',
      duration: '2024 - Present',
      description: 'Spearheaded modern web platform initiatives, architected real-time client-facing dashboards, and mentored junior engineers on TypeScript and distributed systems.',
      location: 'San Francisco, CA (Remote)'
    },
    {
      id: '2',
      company: 'Aether Labs',
      position: 'Full Stack Developer',
      duration: '2022 - 2024',
      description: 'Engineered high-scale REST & GraphQL APIs, built performant Next.js user interfaces, and integrated AI assistant capabilities across enterprise workflows.',
      location: 'New York, NY'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science & Engineering',
      duration: '2018 - 2022',
      location: 'California, USA'
    }
  ],
  services: [
    {
      id: '1',
      title: 'Full-Stack Web Engineering',
      description: 'Production-ready web applications architected for velocity, security, and scalability using Next.js, Node.js, and modern TypeScript.',
      icon: 'code',
      features: [
        'Server-Driven Architecture & Edge Computing',
        'High-Performance Database & Cache Design',
        'Robust Authentication, RBAC & API Integrations',
        'Automated CI/CD Pipelines & Observability'
      ],
      price: '$3,500+',
      priceNote: 'Project scope based'
    },
    {
      id: '2',
      title: 'AI Integration & Intelligent Systems',
      description: 'Custom AI agent pipelines, semantic search engines, and conversational copilots grounded in your proprietary company knowledge.',
      icon: 'zap',
      features: [
        'Gemini & Multimodal LLM Implementation',
        'RAG Knowledge Base & Vector Indexing',
        'Structured Output & Tool-Calling Workflows',
        'Latency & Token Optimization'
      ],
      price: '$2,800+',
      priceNote: 'Starting from'
    },
    {
      id: '3',
      title: 'UI/UX & Editorial Frontend Design',
      description: 'Modern, high-polish digital interfaces featuring fluid micro-interactions, dark studio aesthetics, and accessible design systems.',
      icon: 'palette',
      features: [
        'Editorial Bento Grid & Studio Aesthetic',
        'Full Responsive & Mobile First Tuning',
        'Framer Motion Micro-Interactions',
        'Lighthouse 95+ Performance Guarantee'
      ],
      price: '$2,000+',
      priceNote: 'Starting from'
    }
  ],
  visibility: {
    hero: true,
    about: true,
    services: true,
    skills: true,
    projects: true,
    contact: true
  }
};

/**
 * Normalizes portfolio data to guarantee all modern fields,
 * backwards-compatibility for legacy projects, and newest-first ordering.
 */
export const normalizePortfolioData = (data) => {
  if (!data) return defaultPortfolioData;

  const merged = { ...defaultPortfolioData, ...data };

  // Ensure personalInfo
  merged.personalInfo = {
    ...defaultPortfolioData.personalInfo,
    ...(data.personalInfo || {})
  };

  // Ensure socialLinks
  merged.socialLinks = {
    ...defaultPortfolioData.socialLinks,
    ...(data.socialLinks || {})
  };

  // Ensure heroStats
  if (!Array.isArray(merged.heroStats) || merged.heroStats.length === 0) {
    merged.heroStats = defaultHeroStats;
  }

  // Ensure categories
  const categoriesSet = new Set(defaultProjectCategories);
  if (Array.isArray(data.projectCategories)) {
    data.projectCategories.forEach(cat => cat && categoriesSet.add(cat.trim()));
  }

  // Normalize projects
  const rawProjects = Array.isArray(data.projects) ? data.projects : defaultPortfolioData.projects;

  const now = Date.now();
  const normalizedProjects = rawProjects.map((proj, idx) => {
    // Generate valid slug if missing
    const slug = proj.slug || (proj.title
      ? proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : `project-${proj.id || idx + 1}`);

    // Category
    const category = (proj.category && proj.category.trim()) || 'Web Platform';
    categoriesSet.add(category);

    // Date fallback (staggered descending if missing)
    const createdAt = proj.createdAt || new Date(now - idx * 86400000).toISOString();

    return {
      id: String(proj.id || idx + 1),
      slug,
      title: proj.title || 'Untitled Project',
      category,
      createdAt,
      year: proj.year || '2025',
      role: proj.role || 'Full Stack Developer',
      status: proj.status || 'Completed',
      summary: proj.summary || proj.description || '',
      description: proj.description || proj.summary || '',
      problem: proj.problem || '',
      solution: proj.solution || '',
      architectureNotes: proj.architectureNotes || '',
      highlights: Array.isArray(proj.highlights) ? proj.highlights : [],
      metrics: Array.isArray(proj.metrics) ? proj.metrics : [],
      image: proj.image || '',
      gallery: Array.isArray(proj.gallery) ? proj.gallery : [],
      technologies: Array.isArray(proj.technologies) ? proj.technologies.filter(Boolean) : [],
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      featured: Boolean(proj.featured)
    };
  });

  merged.projectCategories = Array.from(categoriesSet);
  merged.projects = sortProjectsNewestFirst(normalizedProjects);
  merged.skills = Array.isArray(data.skills) ? data.skills : defaultPortfolioData.skills;
  merged.experience = Array.isArray(data.experience) ? data.experience : defaultPortfolioData.experience;
  merged.education = Array.isArray(data.education) ? data.education : defaultPortfolioData.education;
  merged.services = Array.isArray(data.services) ? data.services : defaultPortfolioData.services;

  return merged;
};

/**
 * Sorts an array of projects newest-first based on createdAt.
 */
export const sortProjectsNewestFirst = (projects = []) => {
  return [...projects].sort((a, b) => {
    const timeA = new Date(a.createdAt || 0).getTime();
    const timeB = new Date(b.createdAt || 0).getTime();
    return timeB - timeA;
  });
};

/**
 * Finds a project by its id or its URL slug.
 */
export const findProjectByIdOrSlug = (projects = [], idOrSlug) => {
  if (!idOrSlug) return null;
  const target = String(idOrSlug).toLowerCase();
  return projects.find(p => String(p.id).toLowerCase() === target || String(p.slug).toLowerCase() === target) || null;
};

// Firebase operations
export const getPortfolioData = async () => {
  try {
    const docRef = doc(db, 'portfolio', 'data');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return normalizePortfolioData(docSnap.data());
    } else {
      await setDoc(docRef, defaultPortfolioData);
      return normalizePortfolioData(defaultPortfolioData);
    }
  } catch (error) {
    console.error('Error getting portfolio data from Firebase:', error);
    return normalizePortfolioData(defaultPortfolioData);
  }
};

export const updatePortfolioData = async (data) => {
  try {
    const docRef = doc(db, 'portfolio', 'data');
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating portfolio data:', error);
    return false;
  }
};

export const updatePersonalInfo = async (personalInfo) => {
  try {
    const docRef = doc(db, 'portfolio', 'data');
    await updateDoc(docRef, { personalInfo });
    return true;
  } catch (error) {
    console.error('Error updating personal info:', error);
    return false;
  }
};

export const updateSkills = async (skills) => {
  try {
    const docRef = doc(db, 'portfolio', 'data');
    await updateDoc(docRef, { skills });
    return true;
  } catch (error) {
    console.error('Error updating skills:', error);
    return false;
  }
};

export const updateProjects = async (projects) => {
  try {
    const docRef = doc(db, 'portfolio', 'data');
    await updateDoc(docRef, { projects });
    return true;
  } catch (error) {
    console.error('Error updating projects:', error);
    return false;
  }
};

export const updateServices = async (services) => {
  try {
    const docRef = doc(db, 'portfolio', 'data');
    await updateDoc(docRef, { services });
    return true;
  } catch (error) {
    console.error('Error updating services:', error);
    return false;
  }
};
