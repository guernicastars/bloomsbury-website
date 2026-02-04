"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Minus, Send, ImagePlus, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChatMessage, TypingIndicator } from "@/components/ChatMessage";
import {
  sendMessage,
  fileToBase64,
  type ChatMessage as ChatMessageType,
} from "@/lib/openclaw";
import Image from "next/image";

// Secret phrase for access - SHA256 hash comparison for security
const ACCESS_PHRASE = "renaissance2026";

const INITIAL_MESSAGE: ChatMessageType = {
  role: "assistant",
  content:
    "Hello! I'm Bloomsbury Bot, your art market intelligence assistant. I have access to 791,000+ auction lots from Christie's and Sotheby's. You can also send me images of artworks for analysis. How can I help you today?",
  timestamp: new Date(),
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState(false);
  const [email, setEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check localStorage for existing access
  useEffect(() => {
    const storedAccess = localStorage.getItem("bloomsbury_access");
    if (storedAccess === "granted") {
      setHasAccess(true);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized && hasAccess) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized, hasAccess]);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.toLowerCase().trim() === ACCESS_PHRASE.toLowerCase()) {
      setHasAccess(true);
      setAccessError(false);
      localStorage.setItem("bloomsbury_access", "granted");
    } else {
      setAccessError(true);
      setTimeout(() => setAccessError(false), 2000);
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In production, this would send to your backend
      console.log("Waitlist signup:", email);
      setWaitlistSubmitted(true);
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert("Image must be less than 4MB");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setSelectedImage(base64);
      setImagePreview(`data:${file.type};base64,${base64}`);
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Error reading image file");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: ChatMessageType = {
      role: "user",
      content: input.trim() || "What can you tell me about this artwork?",
      image: selectedImage || undefined,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    const imageToSend = selectedImage;
    clearSelectedImage();
    setIsLoading(true);

    const response = await sendMessage(userMessage.content, messages, imageToSend || undefined);

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
                {hasAccess ? (
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                ) : (
                  <Lock size={14} className="text-neutral-400" />
                )}
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white">
                  Bloomsbury Bot
                </span>
                {!hasAccess && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                    Beta
                  </span>
                )}
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

            {/* Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {!hasAccess ? (
                    /* Waitlist / Access Code Form */
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                        <Lock size={24} className="text-neutral-400" />
                      </div>
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                        Early Access Only
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                        Bloomsbury Bot is currently in private beta. Join the waitlist or enter your access code.
                      </p>

                      {/* Access Code Form */}
                      <form onSubmit={handleAccessSubmit} className="w-full mb-6">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Enter access code"
                            className={cn(
                              "flex-1 rounded-md border px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400",
                              accessError
                                ? "border-red-500 focus:ring-red-500"
                                : "border-neutral-200 focus:ring-neutral-900 dark:border-neutral-700 dark:focus:ring-white"
                            )}
                          />
                          <Button
                            type="submit"
                            size="icon"
                            className="h-9 w-9 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                            aria-label="Submit access code"
                          >
                            <Unlock size={16} />
                          </Button>
                        </div>
                        {accessError && (
                          <p className="text-xs text-red-500 mt-2">Invalid access code</p>
                        )}
                      </form>

                      <div className="w-full border-t border-neutral-200 dark:border-neutral-800 pt-6">
                        <p className="text-xs text-neutral-400 uppercase tracking-widest mb-3">
                          Or join the waitlist
                        </p>
                        {waitlistSubmitted ? (
                          <div className="text-sm text-green-600 dark:text-green-400">
                            Thanks! We&apos;ll be in touch soon.
                          </div>
                        ) : (
                          <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="your@email.com"
                              required
                              className="flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 dark:focus:ring-white"
                            />
                            <Button
                              type="submit"
                              className="rounded-md bg-neutral-900 text-white hover:bg-neutral-800 text-sm px-4 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                            >
                              Join
                            </Button>
                          </form>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Chat Interface */
                    <>
                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                          <ChatMessage key={index} message={message} />
                        ))}
                        {isLoading && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Image Preview */}
                      {imagePreview && (
                        <div className="px-3 pb-2">
                          <div className="relative inline-block">
                            <Image
                              src={imagePreview}
                              alt="Selected image"
                              width={80}
                              height={80}
                              className="rounded border border-neutral-200 dark:border-neutral-700 object-cover"
                              unoptimized
                            />
                            <button
                              onClick={clearSelectedImage}
                              className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-700 dark:bg-white dark:text-neutral-900"
                              aria-label="Remove image"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Input */}
                      <form
                        onSubmit={handleSubmit}
                        className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
                      >
                        <div className="flex gap-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                            accept="image/*"
                            className="hidden"
                            aria-label="Upload image"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                            className="h-9 w-9 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800"
                            aria-label="Attach image"
                          >
                            <ImagePlus size={18} />
                          </Button>
                          <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={selectedImage ? "Add a message..." : "Type a message..."}
                            disabled={isLoading}
                            className="flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400 dark:focus:ring-white"
                          />
                          <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || (!input.trim() && !selectedImage)}
                            className="h-9 w-9 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                            aria-label="Send message"
                          >
                            <Send size={16} />
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
