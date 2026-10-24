import { ErrorMessage, Field, Form, Formik } from "formik";
import groq from "groq";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "yup-phone";
import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short")
    .max(120, "Too long")
    .required("Full name is required"),
  emailAddress: Yup.string()
    .email("Invalid email")
    .required("Email address is required"),
  phoneNumber: Yup.string()
    .label("Phone number")
    .phone("Invalid phone")
    .required("Valid Phone number is Required"),
  message: Yup.string().min(2, "Too short").required("Message is Required"),
});

function Contact({ contact }) {
  const [state, setState] = useState("initial");
  const contactForm = {
    name: "",
    emailAddress: "",
    phoneNumber: "",
    message: "",
  };

  return (
    <Layout
      title={contact.seo_title || "Contact | RAVENS"}
      description={contact.seo_description || "Contact us"}
    >
      <section
        className="contact-page"
        style={{
          "--contact-image": contact.poster
            ? `url(${urlForSanitySource(contact.poster).width(1800).url()})`
            : "none",
        }}
      >
        <div className="site-container contact-page-inner">
          <div className="contact-intro">
            <p className="hero-eyebrow">Start here</p>
            <h1>{contact.title || "Get in touch"}</h1>
            <p>
              Tell us what you are planning. We will find the right crew and
              equipment for the shot.
            </p>
          </div>
          <div>
            {state === "initial" && (
              <Formik
                initialValues={contactForm}
                validationSchema={contactSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const response = await fetch("/api/contact", {
                      method: "post",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(values),
                    });
                    if (response?.status === 201) setState("submitted");
                    else toast.error("Message could not be sent");
                  } catch (error) {
                    toast.error("Message could not be sent");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="contact-form">
                    <label htmlFor="contact-name">
                      Full name
                      <Field
                        as="input"
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                      />
                      <ErrorMessage
                        name="name"
                        className="form-error"
                        component="span"
                      />
                    </label>
                    <label htmlFor="contact-email">
                      Email address
                      <Field
                        as="input"
                        id="contact-email"
                        name="emailAddress"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                      />
                      <ErrorMessage
                        name="emailAddress"
                        className="form-error"
                        component="span"
                      />
                    </label>
                    <label htmlFor="contact-phone">
                      Phone number
                      <Field
                        as="input"
                        id="contact-phone"
                        name="phoneNumber"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(801) 555-0123"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        className="form-error"
                        component="span"
                      />
                    </label>
                    <label htmlFor="contact-message">
                      Your project
                      <Field
                        as="textarea"
                        id="contact-message"
                        name="message"
                        rows="5"
                        placeholder="Tell us about the shot, location, and timing"
                      />
                      <ErrorMessage
                        name="message"
                        className="form-error"
                        component="span"
                      />
                    </label>
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Sending…" : "Send message ↗"}
                    </button>
                  </Form>
                )}
              </Formik>
            )}
            {state === "submitted" && (
              <div className="contact-success" role="status">
                We have received your message and will be in touch shortly.
                Thanks.
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      contact: await getClient().fetch(groq`
        *[_type == "contact"][0]{
          title,
          poster,
        }
      `),
    },
  };
}

export default Contact;
