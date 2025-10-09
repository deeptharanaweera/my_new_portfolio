'use client';

import { motion } from 'framer-motion';
import { Calendar, Mail, MapPin, Phone } from 'lucide-react';

const About = ({ personalInfo, experience, education }) => {
  return (
    <section id="about" className="py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, experience, and passion for technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 "
          >
            <div className="bg-card border-2 border-border p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Personal Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <span className="text-muted-foreground">{personalInfo.email}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span className="text-muted-foreground">{personalInfo.phone}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-card border-2 border-border p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Experience</h3>
              
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-[#083fe3] pl-6"
                  >
                    <h4 className="text-xl font-semibold">{exp.position}</h4>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {exp.duration}
                    </p>
                    <p className="text-muted-foreground mt-2">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education & Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-card border-2 border-border p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-[#0dff05] pl-6"
                  >
                    <h4 className="text-xl font-semibold">{edu.degree}</h4>
                    <p className="text-primary font-medium">{edu.institution}</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {edu.duration}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">{edu.location}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-card border-2 border-border p-8 rounded-2xl">
              <h3 className="text-2xl font-bold ">My Story</h3>
              <hr className='w-20.5 mb-4 text-4xl'/>
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate developer who loves creating innovative solutions and bringing ideas to life through code. 
                With a strong foundation in modern web technologies, I enjoy tackling complex challenges and building 
                user-friendly applications that make a difference.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
