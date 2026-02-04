"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Minus, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChatMessage, TypingIndicator } from "@/components/ChatMessage";
import { sendMessage, type ChatMessage as ChatMessageType } from "@/lib/openclaw";

const INITIAL_MESSAGE: ChatMessageType = {
  role: "assistant",
  content:
    "Hello! I'm Bloomsbury Bot, your art market intelligence assistant. I have access to 791,000+ auction lots from Christie's and Sotheby's. How can I help you today?",
  timestamp: new Date(),
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const response = await sendMessage(userMessage.content, messages);

    if (response.error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${response.error}. Please try again.`,
          timestamp: new Date(),
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.response,
          timestamp: new Date(),
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-neutral-900 text-white shadow-lg flex items-center justify-center hover:bg-neutral-800 transition-colors dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            aria-label="Open chat"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] rounded-lg border border-neutral-200 bg-white shadow-2xl overflow-hidden flex flex-col dark:border-neutral-800 dark:bg-neutral-900"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
                  Bloomsbury Bot
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  onClick={handleMinimize}
                  aria-label="Minimize chat"
                >
                  <Minus size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  onClick={handleClose}
                  aria-label="Close chat"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {/* Messages Container */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                      <ChatMessage key={index} message={message} />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form
                    onSubmit={handleSubmit}
                    className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
                  >
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        disabled={isLoading}
                        className="flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 dark:focus:ring-white"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !input.trim()}
                        className="h-9 w-9 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                        aria-label="Send message"
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
