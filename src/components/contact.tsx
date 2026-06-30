import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import type { ContactData, SocialLinks } from "../types";

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
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUB_KEY,
}

export const Contact = ({ data }: Props) => {
  const contactForm = useRef(null);
  const [{ name, email, message }, setState] = useState<FormState>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* replace below with your own Service ID, Template ID and Public Key from your EmailJS account */
    emailjs
      .sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, contactForm.current, {
        publicKey: emailjsConfig.publicKey,
      })
      .then(
        () => {
          console.log("SUCCESS!");
          clearState();
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" onSubmit={handleSubmit} ref={contactForm}>
                <input type="hidden" value={"Consultation Request"} name="title"/>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows={4}
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {data ? data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {data ? data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope"></i> Email
                </span>{" "}
                {data ? data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            {data?.social &&
              <div className="row">
                <div className="social">
                  <ul>
                    {data.social.links.map((social: SocialLinks, idx: number) => (
                    <li key={social.link + '_' + idx} >
                      <a href={social.link}>
                        <i className={'fa fab ' + social.icon}></i>
                      </a>
                    </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
          </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2026 Avanti Insieme Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
