"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Download, ExternalLink } from "lucide-react";
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

export default function WhitepapersPage() {
  const papers = [
    {
      title: "The Cassandra and the Commander: Strategic Divergence in Decision-Dependent Forecasting",
      abstract:
        "Refining the distinction between passive and active forecasting. We demonstrate how strategic actors maximize utility by diverging from base rates when the marginal elasticity of effort is high.",
      date: "Jan 2026",
      status: "Available",
      url: "/whitepapers/bloomsbury_2_forecasting.pdf",
    },
    {
      title: "The Noll Framework: Operationalizing Art Market Analysis",
      abstract:
        "An in-depth look at how we adapt Roger Noll's sports economics framework to decode the sociological and institutional drivers of asset appreciation in the art market.",
      date: "Q1 2026",
      status: "Available",
      url: "/whitepapers/bloomsbury_auction.pdf",
    },
    {
      title: "The Efficiency Trap: Market Microstructure in Alternative Assets",
      abstract:
        "An analysis of why traditional efficiency models fail in prestige-driven markets and how to exploit structural information asymmetries.",
      date: "Q1 2026",
      status: "Available",
      url: "/whitepapers/maynard_efficiency_trap.pdf",
    },
    {
      title: "Causal Inference in Low-Liquidity Environments",
      abstract:
        "methodologies for applying Structural Causal Models (SCM) to datasets with high sparsity and irregular time-intervals, moving beyond standard time-series analysis.",
      date: "Q1 2026",
      status: "Coming Soon",
      url: "",
    },
    {
      title: "Behavioral Alpha: Quantifying the Winner's Curse",
      abstract:
        "Using Agent-Based Modeling (ABM) to simulate auction room dynamics and identify optimal bidding strategies to avoid overpayment in heated markets.",
      date: "Q1 2026",
      status: "Coming Soon",
      url: "",
    },
    {
      title: "Understanding Prices at Art Auctions: A Conceptual Framework for the Auction Price Mechanism",
      abstract:
        "Noll, Laura Johanna (2022). The foundational theoretical framework providing a multi-dimensional approach to value construction and price mechanisms in global art markets.",
      date: "2022",
      status: "Reference",
      url: "https://www.alexandria.unisg.ch/handle/20.500.14171/108262",
    },
  ];

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

      <section className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight">
            Research & <br /> Whitepapers.
          </h1>
          <p className="text-lg text-neutral-600 mb-24 max-w-2xl font-light">
            Our methodology is open-source at the core. We believe in rigorous
            peer review and transparent quantitative frameworks.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8">
          {papers.map((paper, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div className="group border border-neutral-200 p-8 hover:border-neutral-900 transition-colors duration-300 bg-neutral-50">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 text-neutral-400 font-mono text-xs uppercase tracking-widest">
                      <FileText size={16} />
                      <span>{paper.date}</span>
                      <span className="w-px h-3 bg-neutral-300"></span>
                      <span>{paper.status}</span>
                    </div>
                    <h3 className="text-2xl mb-4 group-hover:underline decoration-1 underline-offset-4">
                      {paper.title}
                    </h3>
                    <p className="text-neutral-600 font-light leading-relaxed max-w-3xl text-base">
                      {paper.abstract}
                    </p>
                  </div>
                  <div className="flex items-center pt-2 md:pt-0">
                    {paper.status === "Reference" ? (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 border border-neutral-900 text-neutral-900 font-mono text-xs uppercase tracking-wider hover:bg-neutral-900 hover:text-white transition-all"
                      >
                        <ExternalLink size={16} />
                        Source
                      </a>
                    ) : paper.status === "Available" && paper.url ? (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                      >
                        <Download size={16} />
                        PDF
                      </a>
                    ) : (
                      <div className="px-6 py-3 border border-neutral-200 text-neutral-400 font-mono text-xs uppercase tracking-wider cursor-not-allowed">
                        {paper.status === "Available" ? "Missing URL" : "Restricted"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      
      <footer className="px-6 md:px-12 py-12 border-t border-neutral-100 mt-12 text-center font-mono text-xs text-neutral-400">
        © 2026 Bloomsbury Technology Ltd.
      </footer>
    </main>
  );
}
