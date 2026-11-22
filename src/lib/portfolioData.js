import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// Default portfolio data structure
export const defaultPortfolioData = {
  theme: {
    light: {
      background: '#ffffff',
      foreground: '#111827',
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      secondary: '#6b7280',
      secondaryForeground: '#ffffff',
      accent: '#10b981',
      accentForeground: '#06281f',
      muted: '#f3f4f6',
      mutedForeground: '#374151',
      card: '#ffffff',
      cardForeground: '#111827',
      border: '#e5e7eb',
      input: '#e5e7eb',
      ring: '#93c5fd'
    },
    dark: {
      background: '#0a0a0a',
      foreground: '#e5e7eb',
      primary: '#60a5fa',
      primaryForeground: '#0b1220',
      secondary: '#9ca3af',
      secondaryForeground: '#0b0f19',
      accent: '#34d399',
      accentForeground: '#06281f',
      muted: '#111827',
      mutedForeground: '#9ca3af',
      card: '#0b0f19',
      cardForeground: '#e5e7eb',
      border: '#1f2937',
      input: '#374151',
      ring: '#2563eb'
    }
  },
  personalInfo: {
    name: 'Your Name',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with expertise in modern web technologies.',
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Your City, Country',
    avatar: '/avatar.jpg',
    resume: '/resume.pdf'
  },
  socialLinks: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    instagram: 'https://instagram.com/yourusername'
  },
  skills: [
    { name: 'JavaScript', level: 90, category: 'Frontend' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'Python', level: 75, category: 'Backend' },
    { name: 'TypeScript', level: 85, category: 'Frontend' },
    { name: 'Next.js', level: 90, category: 'Frontend' }
  ],
  projects: [
    {
      id: '1',
      title: 'AI Smart Analytics & SaaS Dashboard',
      category: 'AI & Machine Learning',
      createdAt: '2025-11-20',
      description: 'An enterprise AI-driven analytics platform providing real-time data visualisations, automated insights, and predictive churn forecasting.',
      summary: 'Engineered an end-to-end analytics platform integrating Gemini API for real-time natural language query interpretation.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      technologies: ['Next.js 15', 'TypeScript', 'Gemini API', 'Tailwind CSS', 'Recharts', 'PostgreSQL'],
      liveUrl: 'https://example.com/ai-analytics',
      githubUrl: 'https://github.com/yourusername/ai-analytics',
      featured: true,
      metrics: ['99.9% Uptime', '15k+ Monthly Queries', '40% Faster Reporting'],
      caseStudy: {
        role: 'Lead Full Stack & AI Engineer',
        timeline: '3 Months (2025)',
        overview: 'A high-impact enterprise tool that translates complex financial and behavioral metrics into actionable intelligence using generative AI models.',
        problem: 'Traditional business intelligence tools produce static reports that take hours to interpret, causing executives to miss critical trend anomalies.',
        solution: 'Built an interactive dashboard with instant natural language search powered by LLM models, automated vector indexing, and dynamic charting.',
        architecture: 'Next.js App Router frontend with server actions, streaming response API pipelines, and high-performance caching for real-time dashboard updates.',
        features: [
          'Natural language query assistant with instant chart rendering',
          'Automated anomaly detection alerts via webhook notifications',
          'Multi-tenant role-based access control with audited log trails',
          'Dark and light high-contrast accessible data themes'
        ]
      }
    },
    {
      id: '2',
      title: 'Full-Stack Modern E-Commerce Platform',
      category: 'Full Stack',
      createdAt: '2025-10-15',
      description: 'A lightning-fast e-commerce solution with modern UI/UX, microservices checkout, real-time inventory synchronization, and Stripe billing.',
      summary: 'Production-ready headless commerce store with sub-second page loads and seamless mobile-first checkout flow.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
      technologies: ['React 19', 'Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      liveUrl: 'https://example.com/shop',
      githubUrl: 'https://github.com/yourusername/ecommerce-platform',
      featured: true,
      metrics: ['$120k+ GMV Processed', '1.2s Avg Page Load', '99.95% Checkout Success'],
      caseStudy: {
        role: 'Full Stack Architect',
        timeline: '4 Months (2025)',
        overview: 'A scalable e-commerce engine designed for high conversion, global currency support, and automated inventory sync across warehouses.',
        problem: 'Legacy e-commerce monolith was sluggish, suffered cart abandonments during traffic surges, and lacked modern payment methods.',
        solution: 'Migrated to Next.js App Router with server-rendered product catalogs, edge-cached product pages, and Stripe Checkout webhooks.',
        architecture: 'Microservices architecture with Next.js frontend, Node/Express inventory backend, and MongoDB Atlas with Redis caching.',
        features: [
          'One-click Stripe & Apple Pay payment integration',
          'Instant faceted product filtering with zero layout shift',
          'Real-time inventory stock alerts and automated reordering',
          'Comprehensive admin portal for order tracking & refunds'
        ]
      }
    },
    {
      id: '3',
      title: 'Collaborative Task & Team Management Hub',
      category: 'Web Apps',
      createdAt: '2025-08-10',
      description: 'A real-time workspace for agile development teams featuring Kanban boards, live presence cursor tracking, and Firebase sync.',
      summary: 'Real-time collaborative workspace supporting drag-and-drop workflow automation and encrypted team chat.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      technologies: ['Next.js', 'Firebase', 'Framer Motion', 'Tailwind CSS', 'WebSockets'],
      liveUrl: 'https://example.com/task-hub',
      githubUrl: 'https://github.com/yourusername/task-manager',
      featured: false,
      metrics: ['5,000+ Active Teams', '<50ms Sync Latency', '4.9/5 User Rating'],
      caseStudy: {
        role: 'Frontend & Realtime Engineer',
        timeline: '2 Months (2025)',
        overview: 'A project management platform built to simplify team sprints, backlog prioritization, and cross-timezone collaboration.',
        problem: 'Distributed engineering teams struggled with fragmented tools for tickets, sprint planning, and live standups.',
        solution: 'Developed a unified board combining real-time Firebase syncing, drag-and-drop Kanban states, and granular milestone tracking.',
        architecture: 'Firestore real-time listeners combined with optimistic UI updates and Framer Motion spring physics for tactile interactions.',
        features: [
          'Drag-and-drop Kanban columns with multi-lane organization',
          'Live collaborative cursor indicators and user presence',
          'Rich markdown issue descriptions with file attachment previews',
          'Sprint velocity and burndown progress indicators'
        ]
      }
    },
    {
      id: '4',
      title: 'Cross-Platform Health & Fitness Tracker',
      category: 'Mobile Apps',
      createdAt: '2025-05-02',
      description: 'A mobile fitness application tracking workouts, nutrition habits, and recovery metrics with Bluetooth sensor sync and AI coach.',
      summary: 'Modern mobile application built with React Native and Expo, offering offline-first habit tracking and AI health advice.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
      technologies: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'HealthKit'],
      liveUrl: 'https://example.com/fitness',
      githubUrl: 'https://github.com/yourusername/fitness-tracker',
      featured: false,
      metrics: ['20k+ Downloads', '4.8 App Store Rating', '85% Daily Retention'],
      caseStudy: {
        role: 'Mobile App Developer',
        timeline: '3 Months (2025)',
        overview: 'An intuitive wellness companion designed to motivate users through personalized streak milestones and biometric analysis.',
        problem: 'Most fitness trackers overwhelm users with complex charts without delivering simple, actionable next steps.',
        solution: 'Engineered a clean mobile app with smart reminders, biometric HealthKit synchronization, and tailored daily goals.',
        architecture: 'React Native with offline SQLite persistence, background sync workers, and secure biometric authentication.',
        features: [
          'Apple Health & Google Fit biometric synchronization',
          'Personalized AI workout generation based on muscle recovery',
          'Interactive hydration and calorie macro counters',
          'Haptic feedback and smooth gesture-driven UI'
        ]
      }
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Company',
      position: 'Senior Developer',
      duration: '2022 - Present',
      description: 'Led development of multiple web applications',
      location: 'Remote'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University Name',
      degree: 'Bachelor of Computer Science',
      duration: '2018 - 2022',
      location: 'City, Country'
    }
  ],
  services: [
    {
      id: '1',
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js.',
      icon: 'code',
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Performance Optimization',
        'Cross-browser Compatibility'
      ],
      price: '$500+',
      priceNote: 'Starting from'
    },
    {
      id: '2',
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that provide exceptional user experiences.',
      icon: 'palette',
      features: [
        'User Research',
        'Wireframing',
        'Prototyping',
        'Design Systems'
      ],
      price: '$300+',
      priceNote: 'Starting from'
    },
    {
      id: '3',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: 'smartphone',
      features: [
        'React Native',
        'Flutter',
        'Native iOS/Android',
        'App Store Deployment'
      ],
      price: '$800+',
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

// Firebase operations
export const getPortfolioData = async () => {
  try {
    console.log('Attempting to get portfolio data from Firebase...');
    const docRef = doc(db, 'portfolio', 'data');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('Portfolio data found in Firebase:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No portfolio data found, initializing with default data...');
      // Initialize with default data if no data exists
      await setDoc(docRef, defaultPortfolioData);
      console.log('Default portfolio data initialized in Firebase');
      return defaultPortfolioData;
    }
  } catch (error) {
    console.error('Error getting portfolio data:', error);
    console.log('Returning default portfolio data due to error');
    return defaultPortfolioData;
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

/**
 * Sorts projects based on selection.
 * Defaults to 'newest' so newly created projects always show at the top.
 */
export const sortProjects = (projects = [], sortBy = 'newest') => {
  if (!Array.isArray(projects)) return [];
  const list = [...projects];

  switch (sortBy) {
    case 'newest':
      return list.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        if (dateB !== dateA) return dateB - dateA;
        // Fallback to numeric or string ID comparison
        return (b.id || '').toString().localeCompare((a.id || '').toString(), undefined, { numeric: true });
      });

    case 'featured':
      return list.sort((a, b) => {
        if (Boolean(b.featured) !== Boolean(a.featured)) {
          return b.featured ? 1 : -1;
        }
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });

    case 'title':
      return list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

    default:
      return list;
  }
};

/**
 * Extracts unique categories from a projects list.
 * Always includes 'All' at index 0.
 */
export const getCategories = (projects = []) => {
  if (!Array.isArray(projects)) return ['All'];
  const categories = new Set();
  projects.forEach((p) => {
    if (p.category && p.category.trim()) {
      categories.add(p.category.trim());
    }
  });
  return ['All', ...Array.from(categories)];
};


