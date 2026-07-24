"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, Mail } from "lucide-react";
import { personal } from "@/data/personal";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE } from "@/lib/animations";

/* ================================================================
   CONTACT SECTION — Client Component (form state)
   Glass contact form with animated inputs, staggered entrance,
   gradient focus borders, and scroll reveal.
   ================================================================ */

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission — replace with actual API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });

    // Reset success message
    setTimeout(() => setSubmitted(false), 5000);
  }

  const inputClasses =
    "w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] focus:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all duration-300";

  return (
    <SectionShell id="contact">
      <SectionHeading
        title="Get In Touch"
        subtitle="Let's connect"
        id="contact-heading"
      />

      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <motion.div
          className="space-y-6"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: DURATION.slow, ease: EASE.smooth }}
        >
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
          </p>

          <div className="space-y-4">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.normal, ease: EASE.smooth, delay: 0.2 }}
            >
              <Card variant="glass" padding="md" hover={true}>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-[var(--color-brand-primary)]/10">
                    <Mail size={20} className="text-[var(--color-brand-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Email</p>
                    <a href={`mailto:${personal.email}`} className="text-sm font-medium hover:text-[var(--color-brand-primary)] transition-colors">
                      {personal.email}
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.normal, ease: EASE.smooth, delay: 0.3 }}
            >
              <Card variant="glass" padding="md" hover={true}>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-[var(--color-brand-secondary)]/10">
                    <MapPin size={20} className="text-[var(--color-brand-secondary)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Location</p>
                    <p className="text-sm font-medium">{personal.location}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: DURATION.slow, ease: EASE.smooth, delay: 0.15 }}
        >
          <Card variant="glass" padding="lg" hover={false}>
            {submitted ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE.smooth }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-[var(--color-brand-success)]/10 flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                >
                  <Send size={20} className="text-[var(--color-brand-success)]" />
                </motion.div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map((field, i) => (
                  <motion.div
                    key={field.id}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: DURATION.normal, ease: EASE.smooth, delay: 0.3 + i * 0.1 }}
                  >
                    <label htmlFor={field.id} className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formState[field.id as keyof typeof formState]}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: DURATION.normal, ease: EASE.smooth, delay: 0.5 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell me about your project or idea..."
                  />
                </motion.div>

                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: DURATION.normal, ease: EASE.smooth, delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={Send}
                    glow
                    disabled={isSubmitting}
                    className="w-full btn-shine"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </SectionShell>
  );
}
