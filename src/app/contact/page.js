'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { getPortfolioData } from '@/lib/portfolioData';

const BUDGET_OPTIONS = ['< $2k', '$2k - $5k', '$5k - $10k', '$10k+'];

export default function ContactPage() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    budget: '$2k - $5k',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        budget: '$2k - $5k',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading contact info...</p>
        </div>
      </div>
    );
  }

  const personalInfo = portfolioData?.personalInfo || {};
  const socialLinks = portfolioData?.socialLinks || {};

  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Let&apos;s Build Something Great</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Get In Touch
          </h1>
          <p className="text-muted-foreground text-base">
            Have a project in mind, need technical advisory, or interested in collaborating? Send a message and I&apos;ll respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Social */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-card border border-border shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-foreground">Contact Details</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase">Email</span>
                    <p className="text-sm font-semibold text-foreground break-all">{personalInfo.email}</p>
                  </div>
                </div>

                {personalInfo.phone && (
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-muted-foreground uppercase">Phone</span>
                      <p className="text-sm font-semibold text-foreground">{personalInfo.phone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase">Location</span>
                    <p className="text-sm font-semibold text-foreground">{personalInfo.location || 'Remote'}</p>
                  </div>
                </div>
              </div>

              {/* Social profiles */}
              <div className="pt-4 border-t border-border">
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">
                  Find Me Online
                </h4>
                <div className="flex gap-2">
                  {socialLinks.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Need an instant answer?</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Click the <strong>Ask AI</strong> copilot at the bottom-right to immediately verify my tech stack fit or summarize key project deliverables!
              </p>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-card border border-border shadow-xs">
              <h3 className="text-xl font-bold text-foreground mb-6">Send a Message</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-green-500/10 border border-green-500/20 text-center space-y-3"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                  <h4 className="text-xl font-bold text-foreground">Message Received!</h4>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reaching out. I&apos;ll review your message and reply as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry / Job Opportunity"
                      className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setFormData((prev) => ({ ...prev, budget: opt }))}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            formData.budget === opt
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-muted/40 border-border text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your goals, timelines, or requirements..."
                      className="w-full px-4 py-2.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary text-foreground resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
