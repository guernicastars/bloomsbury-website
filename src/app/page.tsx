"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Components ---

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// --- Main Page Component ---

export default function BloomsburyPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main
      ref={targetRef}
      className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans"
    >
      {/* Navigation - Fixed with Background */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-white/90 backdrop-blur-sm border-b border-neutral-100">
        <div className="font-mono font-bold tracking-tighter text-xl">
          BLOOMSBURY TECHNOLOGY
        </div>
        <div className="hidden md:flex gap-8 items-center font-mono text-xs uppercase tracking-widest text-neutral-600">
          <a href="/expertise" className="hover:text-neutral-900 transition-colors">
            Expertise
          </a>
          <a href="/research" className="hover:text-neutral-900 transition-colors">
            Research
          </a>
          <a href="#team" className="hover:text-neutral-900 transition-colors">
            Team
          </a>
          <a href="/whitepapers" className="hover:text-neutral-900 transition-colors">
            Whitepapers
          </a>
          <Button variant="outline" className="rounded-none border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white" asChild>
            <a href="#contact">Partner</a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pt-32 pb-16 border-b border-neutral-100 overflow-hidden">
        <div className="max-w-2xl z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] mb-8"
          >
            Quantifying the <br />
            <span className="italic text-neutral-400">Unquantifiable.</span>
          </motion.h1>
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4, duration: 0.8 }}
             className="max-w-lg"
          >
            <p className="text-lg font-light text-neutral-600 leading-relaxed mb-6">
              We are building the first <strong>Causal and Behavioral Investment Engine</strong> for the global art market. Moving beyond simple price correlation, we engineer alpha by understanding the <em>why</em> behind asset appreciation.
            </p>
            <div className="flex gap-4">
               <a href="/research" className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest border-b border-neutral-900 pb-1 hover:opacity-70 transition-opacity">
                  Read our Research Agenda <ArrowRight size={14}/>
               </a>
            </div>
          </motion.div>
        </div>

        {/* Abstract Visual Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-12 opacity-10 md:opacity-100 pointer-events-none md:pointer-events-auto"
        >
          <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="text-neutral-100 fill-current">
            <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="300" cy="300" r="250" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M300,50 L300,550 M50,300 L550,300" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <rect x="200" y="200" width="200" height="200" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" transform="rotate(45 300 300)" />
          </svg>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="animate-bounce text-neutral-400" />
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-neutral-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <FadeIn>
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                02 — Expertise
              </h2>
              <h3 className="text-4xl mb-6">Beyond Pattern Recognition.</h3>
              <p className="text-neutral-600 text-lg mb-8 font-light">
                We don't just fit models—we understand causality. Our economics foundation allows us to answer the questions most ML engineers can't: <em>why</em> things happen, not just <em>what</em> will happen.
              </p>
              <a
                href="/expertise"
                className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest border-b border-neutral-900 pb-1 hover:opacity-70 transition-opacity"
              >
                View Full Expertise <ArrowRight size={14}/>
              </a>
            </FadeIn>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                title: "Causal Intelligence",
                desc: "Bayesian Networks, Causal Graphs, Structural Models. Understanding the why behind outcomes.",
                icon: "∴",
              },
              {
                title: "Custom Embeddings",
                desc: "Talent, assets, domain-specific vector representations. Purpose-built for your context.",
                icon: "⊕",
              },
              {
                title: "Deep Learning & AI",
                desc: "Fine-tuning, quantization, digital clones. Enterprise-grade AI solutions.",
                icon: "⧉",
              },
              {
                title: "Machine Learning",
                desc: "CatBoost, LightGBM, Random Forests. Classical methods with rigorous validation.",
                icon: "∇",
              },
              {
                title: "Data Engineering",
                desc: "Scraping, mining, sourcing from unusual sources. We get the data others can't.",
                icon: "⊞",
              },
              {
                title: "Analytics & BI",
                desc: "Dashboards, consulting, strategic insights. Turn data into decisions.",
                icon: "◈",
              },
              {
                title: "Advanced Systems",
                desc: "AI Agents, Prediction Markets. Building the infrastructure for intelligent systems.",
                icon: "⬡",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div className="border border-neutral-100 p-6 hover:border-neutral-900 transition-colors group">
                  <div className="text-3xl mb-4 text-neutral-300 group-hover:text-neutral-900 transition-colors font-light">
                    {item.icon}
                  </div>
                  <h4 className="font-mono text-sm uppercase tracking-widest mb-3 text-neutral-900">
                    {item.title}
                  </h4>
                  <p className="text-neutral-600 font-light text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <FadeIn>
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                03 — The Lab
              </h2>
              <h3 className="text-4xl mb-6">Built by Research.</h3>
              <p className="text-neutral-600 text-lg mb-8 font-light">
                We are structured not as a typical startup, but as a specialized
                research lab. Our talent density is our primary asset.
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className="bg-neutral-50 p-6 border border-neutral-100">
                  <span className="block text-neutral-400 mb-2 uppercase tracking-widest">
                    Pedigree
                  </span>
                  <span className="text-base">Oxford, LSE, Berkeley</span>
                </div>
                <div className="bg-neutral-50 p-6 border border-neutral-100">
                  <span className="block text-neutral-400 mb-2 uppercase tracking-widest">
                    Focus
                  </span>
                  <span className="text-base">Maths, CS, Economics</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
            {[
              {
                name: "Eugene Shcherbinin",
                role: "CEO",
                email: "eugene.shcherbinin@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/eugene-shcherbinin/",
                desc: "Business Development & Strategy. Berkeley/LSE.",
              },
              {
                name: "Maxim Kalpin",
                role: "CTO",
                email: "maxim.kalpin@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/maxim-kalpin/",
                desc: "Data Engineering & Infrastructure. JKU.",
              },
              {
                name: "Eugene Brotons Batista",
                role: "COO",
                email: "eugene.brotonsbatista@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/eugenia-brotons-batista/",
                desc: "Operations & Strategy Execution. LSE.",
              },
              {
                name: "Delphine Provost",
                role: "VP",
                email: "delphine.provost@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/delphine-provost-72a35b251/",
                desc: "Strategy & Operations Management. LSE.",
              },
              {
                name: "Paulina Sielska",
                role: "VP",
                email: "paulina.sielska@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/paulina-sielska-6082aa1b8/",
                desc: "Research Strategy & Operations. LSE.",
              },
              {
                name: "Nikita Berezin",
                role: "Financial Structuring",
                email: "nikita.berezin@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/nikita-berezin-44b5a2141/",
                desc: "Financial Structuring & Compliance. LSE.",
              },
              {
                name: "Nikol Savova",
                role: "Quant Research",
                email: "nikol.savova@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/nikolsavova/",
                desc: "Causal Inference & ML. Oxford Mathematics.",
              },
              {
                name: "Andrew Vavrunek",
                role: "VC Relations",
                email: "andrew.vavrunek@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/andrewvavrunek/",
                desc: "Investor Relations & Partnerships. UCSC / LSE.",
              },
            ].map((member, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div className="flex flex-col border-b border-neutral-100 pb-4">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                             <h4 className="text-lg font-medium text-neutral-900">{member.name}</h4>
                             <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                                {member.role}
                             </span>
                        </div>
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-300 hover:text-[#0077b5] transition-colors"
                        >
                            <Linkedin size={18} />
                        </a>
                    </div>
                  
                  <p className="text-neutral-500 font-light text-sm mb-3">{member.desc}</p>
                  
                  <a
                      href={`mailto:${member.email}`}
                      className="text-[10px] font-mono text-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                      {member.email}
                    </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer
        id="contact"
        className="bg-neutral-900 text-white py-24 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-7xl mb-8 tracking-tight">
              Join the <br /> Paradigm Shift.
            </h2>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:eugene.shcherbinin@bloomsburytech.com"
                className="group flex items-center gap-4 text-xl hover:text-neutral-300 transition-colors"
              >
                <span className="border-b border-neutral-700 pb-1 group-hover:border-white transition-colors">
                  eugene.shcherbinin@bloomsburytech.com
                </span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>

          <div className="mt-16 md:mt-0 font-mono text-xs text-neutral-500 grid grid-cols-2 gap-12">
            <div>
              <h5 className="text-white mb-4 uppercase tracking-widest">
                Offices
              </h5>
              <p>London, UK</p>
              <p>San Francisco, CA</p>
            </div>
            <div>
              <h5 className="text-white mb-4 uppercase tracking-widest">
                Connect
              </h5>
              <a
                href="https://www.linkedin.com/company/bloomsbury-technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a href="/expertise" className="block hover:text-white transition-colors">
                Expertise
              </a>
              <a href="/whitepapers" className="block hover:text-white transition-colors">
                Whitepapers
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-neutral-800 flex justify-between items-end font-mono text-xs text-neutral-600">
          <p>© 2026 Bloomsbury Technology Ltd.</p>
          <p>Pre-Seed | Confidential</p>
        </div>
      </footer>
    </main>
  );
}