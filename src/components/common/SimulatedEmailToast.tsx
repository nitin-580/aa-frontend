"use client";
import React, { useEffect, useState } from "react";
import { Mail, Check, X } from "lucide-react";

interface EmailDetail {
  to: string;
  subject: string;
  body: string;
}

export default function SimulatedEmailToast() {
  const [emails, setEmails] = useState<EmailDetail[]>([]);

  useEffect(() => {
    const handleEmail = (e: any) => {
      const { to, subject, body } = e.detail;
      setEmails((prev) => [...prev, { to, subject, body }]);
    };

    window.addEventListener("simulated-email", handleEmail);
    return () => window.removeEventListener("simulated-email", handleEmail);
  }, []);

  const removeEmail = (index: number) => {
    setEmails((prev) => prev.filter((_, idx) => idx !== index));
  };

  if (emails.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4 max-w-md w-full px-4 sm:px-0">
      {emails.map((email, idx) => (
        <div 
          key={idx} 
          className="bg-gray-900 border border-red-500 rounded-xl shadow-2xl p-5 text-white animate-slide-in relative flex flex-col"
        >
          <button 
            onClick={() => removeEmail(idx)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center gap-3 border-b border-gray-800 pb-3 mb-3">
            <div className="bg-red-900 p-2 rounded-lg text-white">
              <Mail size={18} />
            </div>
            <div>
              <span className="text-xs text-red-400 font-bold uppercase tracking-widest block">Simulated Email Sent</span>
              <span className="text-xs text-gray-300">To: {email.to}</span>
            </div>
          </div>

          <p className="text-sm font-bold mb-2 text-white">{email.subject}</p>
          <p className="text-xs text-gray-400 leading-relaxed font-mono whitespace-pre-wrap max-h-40 overflow-y-auto bg-black/40 p-2.5 rounded-lg border border-gray-800">
            {email.body}
          </p>

          <div className="mt-3 flex justify-between items-center text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
            <span>SVNIT Email Simulator v1.0</span>
            <span className="text-green-500 flex items-center gap-1 font-bold">
              <Check size={10} /> Dispatched
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
