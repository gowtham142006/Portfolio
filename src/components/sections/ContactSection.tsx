"use client";

import { useState } from "react";
import { Send, MapPin, Mail } from "lucide-react";
import { personal } from "@/data/personal";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

/* ================================================================
   CONTACT SECTION — Client Component (form state)
   Contact form + info cards.
   ================================================================ */

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  return (
    <SectionShell id="contact">
      <SectionHeading
        title="Get In Touch"
        subtitle="Let's connect"
        id="contact-heading"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
          </p>

          <div className="space-y-4">
            <Card variant="glass" padding="md" hover={false}>
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

            <Card variant="glass" padding="md" hover={false}>
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
          </div>
        </div>

        {/* Contact Form */}
        <Card variant="glass" padding="lg" hover={false}>
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand-success)]/10 flex items-center justify-center mx-auto mb-4">
                <Send size={20} className="text-[var(--color-brand-success)]" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-2">
                Message Sent!
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Thank you for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
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
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-colors resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={Send}
                glow
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </SectionShell>
  );
}
