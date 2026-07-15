"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import type { ContactData, LandingPageData } from "../types";
import JsonData from "../data/data.json";

interface Props {
  data?: ContactData;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", message: "" };
const emailjsConfig = {
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUB_KEY!,
};

const caseStudies = (JsonData as LandingPageData).CaseStudies;

export const Contact = ({ data }: Props) => {
  const contactForm = useRef(null);
  const [{ name, email, message }, setState] = useState<FormState>(initialState);
  const [statusMsg, setStatusMsg] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const projectSlug = searchParams.get("project");
    if (!projectSlug) return;
    const study = caseStudies.find((cs) => cs.slug === projectSlug);
    if (!study) return;
    setState((prev) => ({
      ...prev,
      message: `Hi, I came across your case study "${study.title}" (${study.tag}) and I'm interested in discussing a similar project for my business.`,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs
      .sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, contactForm.current!, {
        publicKey: emailjsConfig.publicKey,
      })
      .then(
        () => {
          setStatusMsg(`Thanks, ${name}! We'll be in touch shortly.`);
          clearState();
        },
        () => {
          setStatusMsg("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div id="contact">
      <div className="ai-contact-grid">
        <div className="ai-contact-form-col">
          <span className="ai-section-label">Get In Touch</span>
          <h2>Start the Conversation</h2>
          <p className="ai-contact-desc">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <form name="sentMessage" onSubmit={handleSubmit} ref={contactForm} noValidate>
            <input type="hidden" value="Consultation Request" name="title" />
            <div className="ai-form-row">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Your name"
                  value={name}
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="your@email.com"
                  value={email}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows={5}
                placeholder="Tell us about your project..."
                value={message}
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-custom btn-lg">
              Send Message
            </button>
            <p id="form-status" role="status" aria-live="polite">
              {statusMsg}
            </p>
          </form>
        </div>

        <div className="ai-contact-info-col">
          <h3 className="ai-contact-info-heading">Contact Info</h3>
          {data?.address && (
            <div className="ai-info-item">
              <span className="ai-info-badge" aria-hidden="true">
                <i className="fa-solid fa-location-dot" />
              </span>
              <div>
                <div className="ai-info-label">Address</div>
                <div className="ai-info-value">{data.address}</div>
              </div>
            </div>
          )}
          {data?.phone && (
            <div className="ai-info-item">
              <span className="ai-info-badge" aria-hidden="true">
                <i className="fa-solid fa-phone" />
              </span>
              <div>
                <div className="ai-info-label">Phone</div>
                <div className="ai-info-value">
                  <a href={`tel:${data.phone}`}>{data.phone}</a>
                </div>
              </div>
            </div>
          )}
          {data?.email && (
            <div className="ai-info-item">
              <span className="ai-info-badge" aria-hidden="true">
                <i className="fa-solid fa-envelope" />
              </span>
              <div>
                <div className="ai-info-label">Email</div>
                <div className="ai-info-value">
                  <a href={`mailto:${data.email}`}>{data.email}</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
