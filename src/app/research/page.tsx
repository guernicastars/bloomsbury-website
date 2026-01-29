"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Network, BrainCircuit, Users, Cpu } from "lucide-react";
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

const BentoCard = ({
  title,
  subtitle,
  icon: Icon,
  children,
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
      <p className="text-neutral-600 font-light leading-relaxed text-base">
        {children}
      </p>
    </CardContent>
  </Card>
);

export default function ResearchPage() {
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
            Research <br /> Agenda.
          </h1>
          <p className="text-lg text-neutral-600 mb-24 max-w-2xl font-light">
            Our methodology bridges the gap between quantitative finance and sociological inquiry.
          </p>
        </FadeIn>

        {/* The Thesis / Noll Framework */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5">
            <FadeIn>
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                01 — The Thesis
              </h2>
              <h3 className="text-4xl md:text-5xl mb-8 leading-tight">
                Price is a construct. <br/> Value is a graph.
              </h3>
              <p className="text-neutral-600 font-light text-lg leading-relaxed mb-8">
                Traditional hedonic regression fails in illiquid,
                prestige-driven markets. We operationalize the{" "}
                <strong>Noll Framework</strong> to decode the sociological and
                institutional drivers of asset appreciation.
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FadeIn delay={0.2}>
                <div className="group">
                    <h4 className="text-2xl mb-3 group-hover:underline decoration-1 underline-offset-4">Active Price Management</h4>
                    <p className="text-base text-neutral-600 leading-relaxed">
                    Quantifying the "marketing premium" extracted by auction
                    houses through catalog placement and sentiment analysis.
                    </p>
                </div>
                </FadeIn>
                <FadeIn delay={0.3}>
                <div className="group">
                    <h4 className="text-2xl mb-3 group-hover:underline decoration-1 underline-offset-4">Institutional Gatekeeping</h4>
                    <p className="text-base text-neutral-600 leading-relaxed">
                    Tracking "Canonization" via museum exhibitions and critical
                    reviews using NLP and causal discovery.
                    </p>
                </div>
                </FadeIn>
                <FadeIn delay={0.4}>
                <div className="group">
                    <h4 className="text-2xl mb-3 group-hover:underline decoration-1 underline-offset-4">The Winner's Curse</h4>
                    <p className="text-base text-neutral-600 leading-relaxed">
                    Modeling bidder behavior and liquidity dry-ups to signal "Do
                    Not Bid" when market dynamics overheat.
                    </p>
                </div>
                </FadeIn>
                <FadeIn delay={0.5}>
                <div className="group">
                    <h4 className="text-2xl mb-3 group-hover:underline decoration-1 underline-offset-4">Provenance Networks</h4>
                    <p className="text-base text-neutral-600 leading-relaxed">
                    Detecting wash trading and "prestige transfer" through
                    Heterogeneous Graph Neural Networks.
                    </p>
                </div>
                </FadeIn>
            </div>
          </div>
        </div>

        {/* The Tech Stack */}
        <div className="border-t border-neutral-200 pt-24">
          <FadeIn>
            <div className="mb-16 max-w-3xl">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                02 — The Engine
              </h2>
              <h3 className="text-4xl md:text-5xl mb-6">
                Deep Tech for Alternative Assets
              </h3>
              <p className="text-lg text-neutral-600 font-light">
                  We don't just predict what happens; we understand why. By moving from correlation to causality, we answer the counterfactuals that define alpha.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Causal Inference */}
            <FadeIn delay={0.1}>
              <BentoCard
                title="Causal Inference"
                subtitle="Moving up Pearl's Ladder"
                icon={BrainCircuit}
                className="h-full bg-white border border-neutral-200"
              >
                Our <strong>Structural Causal Models (SCM)</strong> and <strong>Augmented Time Series</strong> architectures allow us to answer counterfactuals: "What would the price be if this artist hadn't had a MoMA retrospective?" This moves us from correlation (Seeing) to intervention (Doing).
              </BentoCard>
            </FadeIn>

            {/* MATMCD - LLM Agents */}
            <FadeIn delay={0.2}>
              <BentoCard
                title="MATMCD"
                subtitle="LLM-Augmented Discovery"
                icon={Cpu}
                className="h-full bg-white border border-neutral-200"
              >
                Our <strong>Multi-Agent Tool-augmented Multi-Modal Causal Discovery</strong> system deploys LLM agents to scrape unstructured text (catalogs, archives) and refine our causal graphs, creating a proprietary "Living SCM" of the art market.
              </BentoCard>
            </FadeIn>

            {/* Simulation / ABM */}
            <FadeIn delay={0.3}>
              <BentoCard
                title="Simulation"
                subtitle="Agent-Based Modeling"
                icon={Users}
                className="h-full bg-white border border-neutral-200"
              >
                We simulate auction rooms with heterogeneous agents (Collectors vs. Speculators) using <strong>Reinforcement Learning</strong> to identify liquidity risks and optimal bidding strategies in low-data environments.
              </BentoCard>
            </FadeIn>

            {/* Network Topology */}
            <FadeIn delay={0.4}>
              <BentoCard
                title="Network Topology"
                subtitle="Heterogeneous GNNs"
                icon={Network}
                className="h-full bg-white border border-neutral-200"
              >
                Value is path-dependent. We map the "invisible" connections of provenance using <strong>Graph Neural Networks</strong> to detect anomalies, wash trading, and prestige transfer across generations.
              </BentoCard>
            </FadeIn>
          </div>
        </div>
      </section>
      
      <footer className="px-6 md:px-12 py-12 border-t border-neutral-100 mt-12 text-center font-mono text-xs text-neutral-400">
        © 2026 Bloomsbury Technology Ltd.
      </footer>
    </main>
  );
}
