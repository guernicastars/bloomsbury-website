"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Network,
  BrainCircuit,
  BarChart3,
  Lock,
  Users,
  Cpu,
  ChevronDown,
  Linkedin,
} from "lucide-react";

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

const BentoCard = ({
  title,
  subtitle,
  icon: Icon,
  children,
  className = "",
}: any) => (
  <div
    className={`bg-neutral-50 border border-neutral-200 p-8 rounded-none hover:border-neutral-400 transition-colors duration-300 ${className}`}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-neutral-900 text-white rounded-none">
        <Icon size={20} />
      </div>
      <h3 className="font-mono text-lg tracking-tight font-semibold uppercase">
        {title}
      </h3>
    </div>
    <h4 className="text-xl font-serif text-neutral-800 mb-4">{subtitle}</h4>
    <p className="text-neutral-600 font-light leading-relaxed text-sm">
      {children}
    </p>
  </div>
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
      {/* Navigation - Minimalist like Maynard Metrics */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="font-mono font-bold tracking-tighter text-xl">
          BLOOMSBURY TECHNOLOGY
        </div>
        <div className="hidden md:flex gap-8 items-center font-mono text-xs uppercase tracking-widest">
          <a href="#thesis" className="hover:opacity-50 transition-opacity">
            Thesis
          </a>
          <a href="#stack" className="hover:opacity-50 transition-opacity">
            The Stack
          </a>
          <a href="#team" className="hover:opacity-50 transition-opacity">
            Team
          </a>
          <a href="#" className="hover:opacity-50 transition-opacity">
            Whitepapers
          </a>
          <a
            href="#contact"
            className="hover:opacity-50 transition-opacity border border-white px-4 py-2 hover:bg-white hover:text-black"
          >
            Partner
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 border-b border-neutral-100">
        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif tracking-tight leading-[0.9] mb-8"
          >
            Quantifying the <br />
            <span className="italic text-neutral-400">Unquantifiable.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl text-lg md:text-xl font-mono text-neutral-600 leading-relaxed"
          >
            We are building the first{" "}
            <span className="text-black font-semibold">
              Causal and Behavioral Investment Engine
            </span>{" "}
            for the global art market. Moving beyond correlation to
            counterfactuals, we engineer alpha in alternative assets.
          </motion.p>
        </div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="animate-bounce text-neutral-400" />
        </motion.div>
      </section>

      {/* The Thesis / Noll Framework */}
      <section id="thesis" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <FadeIn>
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
                01 — The Thesis
              </h2>
              <h3 className="text-4xl font-serif mb-6">
                Price is a construct. Value is a graph.
              </h3>
              <p className="text-neutral-600 font-light mb-6">
                Traditional hedonic regression fails in illiquid,
                prestige-driven markets. We operationalize the{" "}
                <strong>Noll Framework</strong> to decode the sociological and
                institutional drivers of asset appreciation.
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0.2}>
              <div className="border-l-2 border-neutral-900 pl-6 py-2">
                <h4 className="font-bold mb-2">Active Price Management</h4>
                <p className="text-sm text-neutral-600">
                  Quantifying the "marketing premium" extracted by auction
                  houses through catalog placement and sentiment analysis.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="border-l-2 border-neutral-200 pl-6 py-2">
                <h4 className="font-bold mb-2">Institutional Gatekeeping</h4>
                <p className="text-sm text-neutral-600">
                  Tracking "Canonization" via museum exhibitions and critical
                  reviews using NLP and causal discovery.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="border-l-2 border-neutral-200 pl-6 py-2">
                <h4 className="font-bold mb-2">The Winner's Curse</h4>
                <p className="text-sm text-neutral-600">
                  Modeling bidder behavior and liquidity dry-ups to signal "Do
                  Not Bid" when market dynamics overheat.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="border-l-2 border-neutral-200 pl-6 py-2">
                <h4 className="font-bold mb-2">Provenance Networks</h4>
                <p className="text-sm text-neutral-600">
                  Detecting wash trading and "prestige transfer" through
                  Heterogeneous Graph Neural Networks.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Tech Stack - Topology/Bento Style */}
      <section id="stack" className="bg-neutral-100 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-16">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
                02 — The Engine
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif">
                Deep Tech for Alternative Assets
              </h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(250px,auto)]">
            {/* Causal Inference - Large Block */}
            <FadeIn delay={0.1}>
              <BentoCard
                title="Causal Inference"
                subtitle="Moving up Pearl's Ladder"
                icon={BrainCircuit}
                className="md:col-span-2 h-full bg-white"
              >
                We don't just predict <em>what</em> happens; we understand{" "}
                <em>why</em>. Our{" "}
                <strong>Structural Causal Models (SCM)</strong> and{" "}
                <strong>Augmented Time Series</strong> architectures allow us to
                answer counterfactuals: "What would the price be if this artist
                hadn't had a MoMA retrospective?" This moves us from correlation
                (Seeing) to intervention (Doing).
              </BentoCard>
            </FadeIn>

            {/* ABM */}
            <FadeIn delay={0.2}>
              <BentoCard
                title="Simulation"
                subtitle="Agent-Based Modeling"
                icon={Users}
                className="md:col-span-1 h-full bg-white"
              >
                We simulate auction rooms with heterogeneous agents (Collectors
                vs. Speculators) using <strong>Reinforcement Learning</strong>{" "}
                to identify liquidity risks and optimal bidding strategies.
              </BentoCard>
            </FadeIn>

            {/* Knowledge Graphs */}
            <FadeIn delay={0.3}>
              <BentoCard
                title="Network Topology"
                subtitle="Heterogeneous GNNs"
                icon={Network}
                className="md:col-span-1 h-full bg-white"
              >
                Value is path-dependent. We map the "invisible" connections of
                provenance using Graph Neural Networks to detect anomalies and
                prestige transfer.
              </BentoCard>
            </FadeIn>

            {/* LLM Agents */}
            <FadeIn delay={0.4}>
              <BentoCard
                title="MATMCD"
                subtitle="LLM-Augmented Discovery"
                icon={Cpu}
                className="md:col-span-2 h-full bg-white"
              >
                Our{" "}
                <strong>
                  Multi-Agent Tool-augmented Multi-Modal Causal Discovery
                </strong>{" "}
                system deploys LLM agents to scrape unstructured text (catalogs,
                archives) and refine our causal graphs, creating a proprietary
                "Living SCM" of the art market.
              </BentoCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <FadeIn>
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">
                03 — The Lab
              </h2>
              <h3 className="text-4xl font-serif mb-6">Built by Research.</h3>
              <p className="text-neutral-600 text-lg mb-8">
                We are structured not as a typical startup, but as a specialized
                research lab. Our talent density is our primary asset, drawing
                from the world's top quantitative institutions.
              </p>

              <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                <div className="bg-neutral-50 p-4 border border-neutral-100">
                  <span className="block text-neutral-400 text-xs mb-1">
                    Pedigree
                  </span>
                  Oxford, LSE, Berkeley
                </div>
                <div className="bg-neutral-50 p-4 border border-neutral-100">
                  <span className="block text-neutral-400 text-xs mb-1">
                    Focus
                  </span>
                  Maths, CS, Economics
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
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
                name: "Nikita Berezin",
                role: "CTO",
                email: "nikita.berezin@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/nikita-berezin-44b5a2141/",
                desc: "Financial Structuring & Compliance.",
              },
              {
                name: "Delphine Provost",
                role: "COO",
                email: "delphine.provost@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/delphine-provost-72a35b251/",
                desc: "Operations & Management. LSE.",
              },
              {
                name: "Eugene Brotons Batista",
                role: "Vice President",
                email: "eugene.brotonsbatista@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/eugenia-brotons-batista/",
                desc: "Strategy & Operations.",
              },
              {
                name: "Nikol Savova",
                role: "VP, Head of Quant Research",
                email: "nikol.savova@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/nikolsavova/",
                desc: "Causal Inference & ML. Final year Oxford Mathematics.",
              },
              {
                name: "Andrew Vavrunek",
                role: "VC Relations",
                email: "andrew.vavrunek@bloomsburytech.com",
                linkedin: "https://www.linkedin.com/in/andrewvavrunek/",
                desc: "Investor Relations & Partnerships.",
              },
            ].map((member, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="group border-b border-neutral-100 pb-6 hover:pl-2 transition-all duration-300 cursor-default">
                  <div className="flex flex-col mb-1">
                    <h4 className="text-lg font-medium">{member.name}</h4>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-neutral-500 font-light text-sm mb-2">{member.desc}</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[10px] font-mono text-neutral-400 hover:text-black transition-colors"
                    >
                      {member.email}
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-[#0077b5] transition-colors"
                    >
                      <Linkedin size={14} />
                    </a>
                  </div>
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
            <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight">
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
              <a href="#" className="block hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="block hover:text-white transition-colors">
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
