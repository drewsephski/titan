"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CanvasRevealEffect } from "./dot-matrix";
import { MiniNavbar } from "./navbar";

interface SignInPageProps {
  className?: string;
}

export const SignInPage = ({ className }: SignInPageProps) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [initialCanvasVisible, setInitialCanvasVisible] = useState(true);
  const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep("code");
    }
  };

  useEffect(() => {
    if (step === "code") {
      setTimeout(() => {
        codeInputRefs.current[0]?.focus();
      }, 500);
    }
  }, [step]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        codeInputRefs.current[index + 1]?.focus();
      }

      if (index === 5 && value) {
        const isComplete = newCode.every(digit => digit.length === 1);
        if (isComplete) {
          setReverseCanvasVisible(true);

          setTimeout(() => {
            setInitialCanvasVisible(false);
          }, 50);

          setTimeout(() => {
            setStep("success");
          }, 2000);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackClick = () => {
    setStep("email");
    setCode(["", "", "", "", "", ""]);
    setReverseCanvasVisible(false);
    setInitialCanvasVisible(true);
  };

  return (
    <div className={cn("flex w-[100%] flex-col min-h-screen bg-black relative", className)}>
      <div className="absolute inset-0 z-0">
        {initialCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [255, 255, 255],
                [255, 255, 255],
              ]}
              dotSize={6}
              reverse={false}
            />
          </div>
        )}

        {reverseCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={4}
              containerClassName="bg-black"
              colors={[
                [255, 255, 255],
                [255, 255, 255],
              ]}
              dotSize={6}
              reverse={true}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,1)_0%,_transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <MiniNavbar />

        <div className="flex flex-1 flex-col lg:flex-row">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full mt-[150px] max-w-sm">
              <AnimatePresence mode="wait">
                {step === "email" ? (
                  <EmailStep
                    email={email}
                    setEmail={setEmail}
                    onSubmit={handleEmailSubmit}
                  />
                ) : step === "code" ? (
                  <CodeStep
                    code={code}
                    codeInputRefs={codeInputRefs}
                    onCodeChange={handleCodeChange}
                    onKeyDown={handleKeyDown}
                    onBackClick={handleBackClick}
                  />
                ) : (
                  <SuccessStep />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmailStep = ({
  email,
  setEmail,
  onSubmit
}: {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) => (
  <motion.div
    key="email-step"
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="space-y-6 text-center"
  >
    <div className="space-y-1">
      <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">Drew Sepeczi</h1>
      <p className="text-[1.8rem] text-white/70 font-light">Full Stack Developer</p>
    </div>

    <div className="space-y-4">
      <a href="#contact" className="backdrop-blur-[2px] w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full py-3 px-4 transition-colors">
        <span>Get in Touch</span>
      </a>

      <div className="flex items-center gap-4">
        <div className="h-px bg-white/10 flex-1" />
        <span className="text-white/40 text-sm">or</span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      <form onSubmit={onSubmit}>
        <div className="relative">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full backdrop-blur-[1px] text-white border-1 border-white/10 rounded-full py-3 px-4 focus:outline-none focus:border focus:border-white/30 text-center"
            required
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 text-white w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group overflow-hidden"
          >
            <span className="relative w-full h-full block overflow-hidden">
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
                →
              </span>
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0">
                →
              </span>
            </span>
          </button>
        </div>
      </form>
    </div>

    <p className="text-xs text-white/40 pt-10">
      By signing up, you agree to our <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Terms</Link> and <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Privacy Policy</Link>.
    </p>
  </motion.div>
);

const CodeStep = ({
  code,
  codeInputRefs,
  onCodeChange,
  onKeyDown,
  onBackClick
}: {
  code: string[];
  codeInputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  onCodeChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBackClick: () => void;
}) => (
  <motion.div
    key="code-step"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="space-y-6 text-center"
  >
    <div className="space-y-1">
      <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">We sent you a code</h1>
      <p className="text-[1.25rem] text-white/50 font-light">Please enter it</p>
    </div>

    <div className="w-full">
      <div className="relative rounded-full py-4 px-5 border border-white/10 bg-transparent">
        <div className="flex items-center justify-center">
          {code.map((digit, i) => (
            <div key={i} className="flex items-center">
              <div className="relative">
                <input
                  ref={(el) => {
                    codeInputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={e => onCodeChange(i, e.target.value)}
                  onKeyDown={e => onKeyDown(i, e)}
                  className="w-8 text-center text-xl bg-transparent text-white border-none focus:outline-none focus:ring-0 appearance-none"
                  style={{ caretColor: 'transparent' }}
                />
                {!digit && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <span className="text-xl text-white">0</span>
                  </div>
                )}
              </div>
              {i < 5 && <span className="text-white/20 text-xl">|</span>}
            </div>
          ))}
        </div>
      </div>
    </div>

    <div>
      <motion.p
        className="text-white/50 hover:text-white/70 transition-colors cursor-pointer text-sm"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        Resend code
      </motion.p>
    </div>

    <div className="flex w-full gap-3">
      <motion.button
        onClick={onBackClick}
        className="rounded-full bg-white text-black font-medium px-8 py-3 hover:bg-white/90 transition-colors w-[30%]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        Back
      </motion.button>
      <motion.button
        className={`flex-1 rounded-full font-medium py-3 border transition-all duration-300 ${
          code.every(d => d !== "")
          ? "bg-white text-black border-transparent hover:bg-white/90 cursor-pointer"
          : "bg-[#111] text-white/50 border-white/10 cursor-not-allowed"
        }`}
        disabled={!code.every(d => d !== "")}
      >
        Continue
      </motion.button>
    </div>

    <div className="pt-16">
      <p className="text-xs text-white/40">
        By signing up, you agree to our <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Terms</Link> and <Link href="#" className="underline text-white/40 hover:text-white/60 transition-colors">Privacy Policy</Link>.
      </p>
    </div>
  </motion.div>
);

const SuccessStep = () => (
  <motion.div
    key="success-step"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
    className="space-y-6 text-center"
  >
    <div className="space-y-1">
      <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">You&apos;re in!</h1>
      <p className="text-[1.25rem] text-white/50 font-light">Welcome to my portfolio</p>
    </div>

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="py-10"
    >
      <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-white to-white/70 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </motion.div>

    <p className="text-white/60 text-sm">
      Thank you for your interest. I&apos;ll be in touch soon!
    </p>
  </motion.div>
);
