"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Download, FileText } from "lucide-react";
import Link from "next/link";

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

const projects = [
  {
    tag: "Production",
    title: "Polymarket Intelligence Platform",
    desc: "Real-time data pipeline and analytics dashboard for prediction markets. Continuous collection of prices, trades, and orderbook depth from Polymarket's CLOB. GNN-TCN forecasting model, information flow analysis, and manipulation detection.",
    tech: ["ClickHouse", "Python", "Next.js", "GNN-TCN", "Causal Inference"],
    status: "Live",
    link: "https://polymarket-omega-inky.vercel.app",
  },
  {
    tag: "Research",
    title: "Art Market Valuation Engine",
    desc: "ML-driven price prediction for fine art auctions. Our quantile models achieve 72% accuracy on realized prices — a 42.6 percentage point improvement over expert estimates. Built on 13,609 Sotheby's lots (2020–2025) across 85 features.",
    tech: ["LightGBM", "SHAP", "Hedonic Pricing", "Quantile Regression"],
    status: "Complete",
  },
  {
    tag: "Production",
    title: "Sotheby's Data Pipeline",
    desc: "Research-grade ETL architecture: Bronze (raw HTML) → Silver (LLM-assisted extraction) → Gold (ML features). Automated scraping, FX normalisation, and feature engineering with human-in-the-loop review.",
    tech: ["Playwright", "Ollama", "SQLite", "LLM Extraction"],
    status: "Operational",
  },
  {
    tag: "Research",
    title: "West Africa FTZ Network Analysis",
    desc: "Graph neural network analysis of free trade zone networks in West Africa. Temporal and network-based signal detection, with interactive Plotly dashboards for visualisation.",
    tech: ["GNN", "Network Analysis", "Signal Detection", "Plotly"],
    status: "Complete",
  },
  {
    tag: "Infrastructure",
    title: "Causal Knowledge Graph",
    desc: "A Republic of AI Agents architecture implementing Pearl's causal hierarchy. Philosopher-kings generate hypotheses, merchant agents gather data, warrior agents test and deploy. Built on directed acyclic graphs with do-calculus.",
    tech: ["FastAPI", "NetworkX", "Pearl's Do-Calculus", "D3.js"],
    status: "In Development",
  },
  {
    tag: "Community",
    title: "DISTRIBUTE//AI Hackathon",
    desc: "A collaborative hackathon to build a decentralised, encrypted, incentive-aligned LLM on blockchain. Four tracks: CS/ML, Cryptography, Mechanism Design, Engineering. London hub + global satellite nodes.",
    tech: ["Distributed ML", "FHE", "Mechanism Design", "Smart Contracts"],
    status: "April 2026",
    link: "https://hackathon.bloomsburytech.com",
  },
];

const papers = [
  {
    title: "The Cassandra and the Commander: Strategic Divergence in Decision-Dependent Forecasting",
    date: "Jan 2026",
    url: "/whitepapers/bloomsbury_2_forecasting.pdf",
  },
  {
    title: "The Noll Framework: Operationalizing Art Market Analysis",
    date: "Q1 2026",
    url: "/whitepapers/bloomsbury_auction.pdf",
  },
  {
    title: "The Efficiency Trap: Market Microstructure in Alternative Assets",
    date: "Q1 2026",
    url: "/whitepapers/maynard_efficiency_trap.pdf",
  },
];

export default function WorkPage() {
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

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight">
            Work.
          </h1>
          <p className="text-lg text-neutral-600 mb-6 max-w-2xl font-light">
            Production systems, research, and infrastructure. From causal ML
            engines to prediction market analytics to decentralised AI.
          </p>
        </FadeIn>
      </section>

      {/* Projects */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pb-24">
        <FadeIn>
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-12">
            01 — Projects
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-px bg-neutral-200 border border-neutral-200">
          {projects.map((p, i) => (
            <FadeIn key={i} delay={0.05 * i}>
              <div className="group bg-white p-8 md:p-10 hover:bg-neutral-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
                      <span>{p.tag}</span>
                      <span className="w-px h-3 bg-neutral-300" />
                      <span
                        className={
                          p.status === "Live" || p.status === "Operational"
                            ? "text-green-600"
                            : p.status === "Complete"
                            ? "text-neutral-600"
                            : "text-neutral-400"
                        }
                      >
                        {p.status}
                      </span>
                    </div>
                    <h3 className="text-2xl mb-3">{p.title}</h3>
                    <p className="text-neutral-600 font-light leading-relaxed max-w-3xl text-base mb-4">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 border border-neutral-200 px-2.5 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border border-neutral-900 text-neutral-900 font-mono text-xs uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all shrink-0"
                    >
                      <ArrowUpRight size={14} />
                      Visit
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Papers */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto pb-24">
        <FadeIn>
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-12">
            02 — Published Research
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
          {papers.map((paper, i) => (
            <FadeIn key={i} delay={0.05 * i}>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-8 hover:bg-neutral-50 transition-colors flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
                    <FileText size={14} />
                    <span>{paper.date}</span>
                  </div>
                  <h3 className="text-lg mb-4 group-hover:underline decoration-1 underline-offset-4">
                    {paper.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-400 group-hover:text-neutral-900 transition-colors mt-4">
                  <Download size={14} />
                  PDF
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      <footer className="px-6 md:px-12 py-12 border-t border-neutral-100 text-center font-mono text-xs text-neutral-400">
        © 2026 Bloomsbury Technology Ltd.
      </footer>
    </main>
  );
}
