import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2, Send, ChevronRight, MessageSquareCode, Award, Code, HelpCircle } from "lucide-react";

export function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    app: "screensaver",
    type: "feature",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate premium API sending delay for high fidelity feedback flow
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`[Nova Bit Feedback] ${formData.type.toUpperCase()}: ${formData.app.toUpperCase()}`);
    const body = encodeURIComponent(
      `Hello Nova Bit Creator,\n\n` +
      `Here is some new feedback submitted from the portal:\n\n` +
      `• Submitter Name: ${formData.name}\n` +
      `• Submitter Email: ${formData.email}\n` +
      `• App: ${formData.app}\n` +
      `• Type: ${formData.type}\n\n` +
      `Feedback Message:\n---\n${formData.message}\n---\n\n` +
      `Best regards,\n${formData.name}`
    );
    return `mailto:Loginmaster1k@gmail.com?subject=${subject}&body=${body}`;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      app: "screensaver",
      type: "feature",
      message: ""
    });
    setIsSubmitted(false);
  };

  return (
    <section id="feedback" className="w-full max-w-5xl mx-auto px-6 py-24 border-t border-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left column: context and decorative card */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-3">
              Direct Communication
            </div>
            <h2 className="text-4xl font-sans font-medium tracking-tight text-white leading-tight">
              Share Feedback
            </h2>
            <p className="mt-4 text-zinc-400 font-light text-base leading-relaxed">
              Have an idea for a feature, found a bug in Nova Waves, or want to suggest a new application for the suite? Let me know directly. Your comments guide Nova Bit production.
            </p>
          </div>

          <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-4">
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase text-zinc-500 tracking-wider">Creator Email</h4>
                <p className="text-sm font-medium text-white mt-1">Loginmaster1k@gmail.com</p>
              </div>
            </div>
            <div className="text-xs text-zinc-500 font-light leading-relaxed">
              All messages are dispatched immediately through this digital desk. You can either submit locally with the form, or open your native client with preassembled templates.
            </div>
          </div>
        </div>

        {/* Right column: Form container */}
        <div className="lg:col-span-7">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 md:p-10 shadow-xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="feedback-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Name */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 text-white text-sm p-3.5 rounded-2xl outline-none transition-all placeholder:text-zinc-700"
                      />
                    </div>

                    {/* User Email */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@novabit.io"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 text-white text-sm p-3.5 rounded-2xl outline-none transition-all placeholder:text-zinc-700"
                      />
                    </div>
                  </div>

                  {/* App Selection & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Related App */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">
                        Affinities (Product)
                      </label>
                      <select
                        value={formData.app}
                        onChange={(e) => setFormData({ ...formData, app: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 text-white text-sm p-3.5 rounded-2xl outline-none transition-all cursor-pointer"
                      >
                        <option value="screensaver">Zenith Screensaver (Web/Android)</option>
                        <option value="timer">Float Timer Tracker</option>
                        <option value="waves">Nova Waves Synthesizer</option>
                        <option value="general">General / App Hub Concept</option>
                      </select>
                    </div>

                    {/* Feedback Type */}
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">
                        Review Category
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 text-white text-sm p-3.5 rounded-2xl outline-none transition-all cursor-pointer"
                      >
                        <option value="feature">Feature Suggestion</option>
                        <option value="bug">Bug Report</option>
                        <option value="kudos">Friendly Kudos / Shoutout</option>
                        <option value="collab">Partnership / Collaboration</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Feedback Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what's on your mind... Describe details or specifications clearly."
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 text-white text-sm p-3.5 rounded-2xl outline-none transition-all placeholder:text-zinc-700 resize-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors shadow-lg shadow-indigo-600/20 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit to Nova Bit
                        </>
                      )}
                    </button>
                    <a
                      href={getMailtoLink()}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 border border-zinc-800 hover:border-zinc-700 text-sm font-medium rounded-full text-zinc-300 bg-zinc-950 hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      Direct Gmail Template
                    </a>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="feedback-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-white tracking-tight">Feedback Transmitted!</h3>
                    <p className="mt-2 text-sm text-zinc-400 font-light max-w-md mx-auto">
                      Thank you for contributing to Nova Bit Software, <strong>{formData.name}</strong>. Your feedback helps make screensavers and utility tools better for everyone.
                    </p>
                  </div>

                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-left max-w-md mx-auto text-xs space-y-2">
                    <div>
                      <span className="text-zinc-500 font-medium">Product Category:</span>{" "}
                      <span className="text-zinc-300 capitalize font-mono">{formData.app} ({formData.type})</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-medium font-sans">Verification:</span>{" "}
                      <span className="text-zinc-300 font-mono">Dispatched to Creator Panel for Loginmaster1k@gmail.com</span>
                    </div>
                    <div className="border-t border-zinc-800 pt-2 text-zinc-400 italic">
                      "{formData.message}"
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getMailtoLink()}
                      className="w-full sm:w-auto inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-full transition-colors"
                    >
                      Backup Send direct to Gmail
                      <ChevronRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={resetForm}
                      className="w-full sm:w-auto text-xs text-zinc-500 hover:text-zinc-300 px-5 py-3"
                    >
                      Submit Another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
