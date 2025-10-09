'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Download, Github, Globe, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';

const Hero = ({ personalInfo, socialLinks }) => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const getSocialIcon = (platform) => {
    const iconProps = { className: "w-5 h-5" };
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github {...iconProps} />;
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      case 'twitter':
        return <Twitter {...iconProps} />;
      case 'instagram':
        return <Instagram {...iconProps} />;
      default:
        return <Globe {...iconProps} />;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:bg-purple-600"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:bg-yellow-600"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:bg-pink-600"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-48 h-48 md:w-56 md:h-56 mx-auto mb-8 rounded-full bg-primary p-1">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
              {personalInfo.avatar && isValidUrl(personalInfo.avatar) ? (
                <Image 
                  src={personalInfo.avatar} 
                  alt={personalInfo.name}
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl md:text-7xl font-bold text-foreground">
                  {personalInfo.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
            {personalInfo.name}
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-light text-muted-foreground mb-6">
            {personalInfo.title}
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {personalInfo.bio}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 border-2 border-gray-500 text-white rounded-full font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </button>
          
          <a
            href={personalInfo.resume}
            download
            className="px-8 py-3 border-2 border-border text-foreground rounded-full font-medium hover:bg-muted transition-all duration-300 transform hover:scale-105 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center space-x-6"
        >
          {Object.entries(socialLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-card/70 text-blue-500 backdrop-blur-md border border-border rounded-full flex items-center justify-center hover:bg-card/90 transition-all duration-300 transform hover:scale-110"
              title={platform.charAt(0).toUpperCase() + platform.slice(1)}
            >
              {getSocialIcon(platform)}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </motion.button>
    </section>
  );
};

export default Hero;
