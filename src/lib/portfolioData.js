import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// Default portfolio data structure
export const defaultPortfolioData = {
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
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with modern UI/UX',
      image: '/project1.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/yourusername/project1',
      featured: true
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application',
      image: '/project2.jpg',
      technologies: ['Next.js', 'Firebase', 'Tailwind CSS'],
      liveUrl: 'https://example2.com',
      githubUrl: 'https://github.com/yourusername/project2',
      featured: true
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

