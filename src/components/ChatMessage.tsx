"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/lib/openclaw";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2.5 text-sm",
          isUser
            ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
            : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
        )}
      >
        {!isUser && (
          <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
            Bloomsbury Bot
          </span>
        )}
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start"
    >
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-4 py-3">
        <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
          Bloomsbury Bot
        </span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
