"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BrainCircuit, Database, LineChart, Network, Cpu, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const ExpertiseCard = ({
  title,
  subtitle,
  icon: Icon,
  children,
  techniques,
  className = "",
}: any) => (
  <Card className={`rounded-none border-neutral-200 bg-neutral-50 shadow-none flex flex-col justify-between ${className}`}>
    <CardHeader>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-neutral-900 text-white rounded-none">
          <Icon size={20} />
        </div>
        <CardTitle className="font-mono text-xs tracking-widest uppercase font-semibold">
          {title}
        </CardTitle>
      </div>
      <div className="text-2xl text-neutral-900 pt-2">{subtitle}</div>
    </CardHeader>
    <CardContent>
      <p className="text-neutral-600 font-light leading-relaxed text-base mb-4">
        {children}
      </p>
      {techniques && (
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
            Techniques
          </div>
          <div className="flex flex-wrap gap-2">
            {techniques.map((tech: string, i: number) => (
              <span key={i} className="text-xs bg-white border border-neutral-200 px-2 py-1 text-neutral-600">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export default function ExpertisePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans">
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-white/90 backdrop-blur-sm border-b border-neutral-100">
        <Link
          href="/"
          className="font-mono font-bold tracking-tighter text-xl flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} />
          BLOOMSBURY
        </Link>
      </nav>

      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight">
            Full-Stack <br /> Intelligence.
          </h1>
          <p className="text-lg text-neutral-600 mb-24 max-w-2xl font-light">
            From data acquisition to causal reasoning. We don't just build models—we engineer understanding.
          </p>
        </FadeIn>

        {/* The Differentiator */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5">
            <FadeIn>
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                01 — The Edge
              </h2>
              <h3 className="text-4xl md:text-5xl mb-8 leading-tight">
                Economists who code.
              </h3>
              <p className="text-neutral-600 font-light text-lg leading-relaxed mb-8">
                Most AI engineers can tell you <em>what</em> will happen. We can tell you <em>why</em>. Our economics and mathematics foundation allows us to move beyond pattern recognition to causal understanding—answering counterfactuals that drive real alpha.
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-7">
            <FadeIn delay={0.2}>
              <div className="bg-neutral-50 border border-neutral-200 p-8">
                <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
                  Background
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-neutral-900 font-medium mb-2">Education</div>
                    <div className="text-neutral-600 font-light">Oxford, LSE, Berkeley, JKU</div>
                  </div>
                  <div>
                    <div className="text-neutral-900 font-medium mb-2">Disciplines</div>
                    <div className="text-neutral-600 font-light">Mathematics, CS, Economics</div>
                  </div>
                  <div>
                    <div className="text-neutral-900 font-medium mb-2">Structure</div>
                    <div className="text-neutral-600 font-light">Research Lab, not Agency</div>
                  </div>
                  <div>
                    <div className="text-neutral-900 font-medium mb-2">Approach</div>
                    <div className="text-neutral-600 font-light">First Principles, Not Heuristics</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="border-t border-neutral-200 pt-24 mb-24">
          <FadeIn>
            <div className="mb-16 max-w-3xl">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                02 — Core Capabilities
              </h2>
              <h3 className="text-4xl md:text-5xl mb-6">
                What We Do
              </h3>
              <p className="text-lg text-neutral-600 font-light">
                End-to-end intelligence engineering—from sourcing hard-to-get data to building causal models that explain the why behind outcomes.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Causal Intelligence */}
            <FadeIn delay={0.1}>
              <ExpertiseCard
                title="Causal Intelligence"
                subtitle="Understanding Why, Not Just What"
                icon={BrainCircuit}
                techniques={[
                  "Bayesian Networks",
                  "Causal Graphs (DAGs)",
                  "Structural Causal Models",
                  "Counterfactual Reasoning",
                  "Instrumental Variables",
                  "G-estimation"
                ]}
                className="h-full bg-white border border-neutral-200"
              >
                We operationalize Pearl's Causal Hierarchy to answer questions most ML models can't: "What would happen if...?" This is the difference between correlation and causation—and the foundation of real decision intelligence.
              </ExpertiseCard>
            </FadeIn>

            {/* Custom Embeddings */}
            <FadeIn delay={0.2}>
              <ExpertiseCard
                title="Custom Embeddings"
                subtitle="Domain-Specific Representations"
                icon={Network}
                techniques={[
                  "Talent Embeddings",
                  "Asset Embeddings",
                  "Multi-Modal Embeddings",
                  "Graph Embeddings",
                  "Transformers",
                  "Contrastive Learning"
                ]}
                className="h-full bg-white border border-neutral-200"
              >
                We build purpose-built vector representations for any domain—talent, artworks, financial assets, products. Generic embeddings fail in specialized contexts. Custom embeddings capture what matters in your world.
              </ExpertiseCard>
            </FadeIn>

            {/* Deep Learning & AI */}
            <FadeIn delay={0.3}>
              <ExpertiseCard
                title="Deep Learning & AI"
                subtitle="Enterprise-Grade Solutions"
                icon={Cpu}
                techniques={[
                  "Fine-tuning",
                  "Quantization",
                  "Digital Clones",
                  "LLM Agents",
                  "Multi-Modal Models",
                  "RL from Human Feedback"
                ]}
                className="h-full bg-white border border-neutral-200"
              >
                From fine-tuning foundation models to building digital clones and AI agents—we deploy cutting-edge deep learning for real business problems. Enterprise-scale, production-ready.
              </ExpertiseCard>
            </FadeIn>

            {/* Machine Learning */}
            <FadeIn delay={0.4}>
              <ExpertiseCard
                title="Machine Learning"
                subtitle="Classical Methods, Rigorous Validation"
                icon={Target}
                techniques={[
                  "LightGBM",
                  "Random Forests",
                  "K-Means Clustering",
                  "Classification",
                  "Time Series Forecasting"
                ]}
                className="h-full bg-white border border-neutral-200"
              >
                Sometimes the best solution isn't deep learning. We deploy classical ML with rigorous cross-validation, feature engineering, and interpretability. The right tool for the right problem.
              </ExpertiseCard>
            </FadeIn>

            {/* Data Engineering */}
            <FadeIn delay={0.5}>
              <ExpertiseCard
                title="Data Engineering"
                subtitle="Getting the Data Others Can't"
                icon={Database}
                techniques={[
                  "Web Scraping",
                  "Data Mining",
                  "Alternative Data Sources",
                  "API Integration",
                  "ETL Pipelines",
                  "Data Quality"
                ]}
                className="h-full bg-white border border-neutral-200"
              >
                We source data from unusual places—legal grey areas, legacy systems, unstructured archives. If the data exists, we can get it. If it doesn't, we'll help you create it.
              </ExpertiseCard>
            </FadeIn>

            {/* Analytics & BI */}
            <FadeIn delay={0.6}>
              <ExpertiseCard
                title="Analytics & Business Intelligence"
                subtitle="Data into Decisions"
                icon={LineChart}
                techniques={[
                  "BI Dashboards",
                  "Data Visualization",
                  "KPI Design",
                  "A/B Testing",
                  "Statistical Analysis",
                  "Reporting Automation"
                ]}
                className="h-full bg-white border border-neutral-200"
              >
                Beautiful dashboards are useless without insight. We design analytics systems that answer business questions, inform strategy, and automate reporting—turning data into competitive advantage.
              </ExpertiseCard>
            </FadeIn>

            {/* Advanced Systems */}
            <FadeIn delay={0.7}>
              <ExpertiseCard
                title="Advanced Systems"
                subtitle="Infrastructure for Intelligence"
                icon={TrendingUp}
                techniques={[
                  "AI Agents",
                  "Prediction Markets",
                  "Multi-Agent Systems",
                  "Reinforcement Learning",
                  "Blockchain Integration",
                  "Decentralized Systems"
                ]}
                className="h-full bg-white border border-neutral-200"
              >
                We build the infrastructure layer for intelligent systems—from AI agent orchestration to prediction markets. Complex, multi-agent environments that operate autonomously at scale.
              </ExpertiseCard>
            </FadeIn>
          </div>
        </div>

        {/* Case Studies Teaser */}
        <div className="border-t border-neutral-200 pt-24">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              <div className="md:col-span-5">
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                  03 — Applied Work
                </h2>
                <h3 className="text-4xl mb-6">Real Problems, Real Solutions</h3>
                <p className="text-neutral-600 text-lg font-light mb-8">
                  From quantifying the unquantifiable in art markets to building talent embeddings for screening thousands of applicants—we solve problems that sit at the intersection of economics, AI, and complex systems.
                </p>
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest border-b border-neutral-900 pb-1 hover:opacity-70 transition-opacity"
                >
                  View Research Agenda
                </Link>
              </div>
              <div className="md:col-span-7 space-y-6">
                <FadeIn delay={0.1}>
                  <div className="border border-neutral-200 p-6">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
                      Art Market Intelligence
                    </h4>
                    <p className="text-neutral-900 mb-3 text-lg">
                      Causal investment engine for alternative assets
                    </p>
                    <p className="text-neutral-600 font-light text-sm">
                      Moving beyond hedonic regression to understand the sociological and institutional drivers of art appreciation through Bayesian Networks and Graph Neural Networks.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="border border-neutral-200 p-6">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
                      Talent Screening System
                    </h4>
                    <p className="text-neutral-900 mb-3 text-lg">
                      Embedding-based applicant evaluation at scale
                    </p>
                    <p className="text-neutral-600 font-light text-sm">
                      Custom talent embeddings combined with causal graphs to quantify hiring intuitions—processing thousands of applicants while preserving human judgment.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div className="border border-neutral-200 p-6">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
                      Prediction Markets Infrastructure
                    </h4>
                    <p className="text-neutral-900 mb-3 text-lg">
                      Blockchain-based information aggregation
                    </p>
                    <p className="text-neutral-600 font-light text-sm">
                      Building decentralized prediction markets from scratch—combining mechanism design, blockchain technology, and behavioral economics.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="px-6 md:px-12 py-12 border-t border-neutral-100 mt-12 text-center font-mono text-xs text-neutral-400">
        © 2026 Bloomsbury Technology Ltd.
      </footer>
    </main>
  );
}
