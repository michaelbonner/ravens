import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "yup-phone";
import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import groq from "groq";
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
  const successContainer = useRef(null);

  useEffect(() => {
    const bgImage = urlForSanitySource(contact.poster).width(1600);
    document.querySelector(
      ".ui-header-and-content"
    ).style.backgroundImage = `url(${bgImage})`;
    document.querySelector(
      ".ui-header-and-content"
    ).style.backgroundPosition = `50% 25%`;
    document.querySelector(
      ".ui-header-and-content"
    ).style.backgroundSize = `cover`;

    return () => {
      document.querySelector(
        ".ui-header-and-content"
      ).style.backgroundImage = ``;
      document.querySelector(
        ".ui-header-and-content"
      ).style.backgroundPosition = ``;
      document.querySelector(
        ".ui-header-and-content"
      ).style.backgroundSize = ``;
    };
  }, [contact.poster]);

  return (
    <Layout
      title={contact.seo_title || "Contact | RAVENS"}
      description={contact.seo_description || "Contact us"}
    >
      <div className="text-center max-w-5xl mx-auto">
        <div className="py-12">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-white border-b-2 border-white uppercase">
            {contact.title || "Contact"}
          </h1>
          <div className="relative mx-auto">
            <div className="py-16 px-4">
              <div className="max-w-lg mx-auto lg:max-w-none">
                {state === "initial" && (
                  <Formik
                    initialValues={contactForm}
                    validationSchema={contactSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      try {
                        const response = await fetch("/api/contact", {
                          method: "post",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(values),
                        });

                        if (response?.status === 201) {
                          setState("submitted");
                          setSubmitting(false);
                        } else {
                          setSubmitting(false);
                          toast.error("Save failed");
                        }
                      } catch (error) {
                        setSubmitting(false);
                        toast.error("Save failed");
                      }
                    }}
                  >
                    {({ isSubmitting, isValid }) => (
                      <Form className="grid grid-cols-1 gap-y-6 max-w-3xl mx-auto">
                        <div className="border-gray-300 rounded-md bg-white bg-opacity-90 relative">
                          <Field
                            as="input"
                            name="name"
                            placeholder="Full Name"
                            className="bg-transparent block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-black focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <ErrorMessage
                            name="name"
                            className="absolute right-2 top-0 text-left text-red-700 px-4 py-3"
                            component="div"
                          />
                        </div>

                        <div className="border-gray-300 rounded-md bg-white bg-opacity-90 relative">
                          <Field
                            as="input"
                            name="emailAddress"
                            placeholder="Email Address"
                            className="bg-transparent block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-black focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <ErrorMessage
                            name="emailAddress"
                            className="absolute right-2 top-0 text-left text-red-700 px-4 py-3"
                            component="div"
                          />
                        </div>

                        <div className="border-gray-300 rounded-md bg-white bg-opacity-90 relative">
                          <Field
                            as="input"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            className="bg-transparent block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-black focus:ring-indigo-500 focus:border-indigo-500"
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            className="absolute right-2 top-0 text-left text-red-700 px-4 py-3"
                            component="div"
                          />
                        </div>

                        <div className="border-gray-300 rounded-md bg-white bg-opacity-90 relative">
                          <Field
                            as="textarea"
                            name="message"
                            placeholder="Message"
                            rows="4"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 text-gray-500 placeholder-black focus:border-indigo-500 border-gray-300 rounded-md bg-transparent"
                          />
                          <ErrorMessage
                            name="message"
                            className="absolute right-2 top-0 text-left text-red-700 px-4 py-3"
                            component="div"
                          />
                        </div>

                        <button
                          type="submit"
                          className={`inline-block rounded-full font-bold uppercase tracking-wider border border-white py-2 px-8 bg-black bg-opacity-50 hover:bg-gold hover:text-black transition-all
                          ${isSubmitting || !isValid ? "opacity-50" : ""}
                        }`}
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}

                {state === "submitted" && (
                  <div
                    className="flex bg-black bg-opacity-70 mx-auto justify-center rounded-md shadow-md py-14 px-8 w-full max-w-3xl text-center border"
                    ref={successContainer}
                  >
                    <h2 className="font-medium text-xl tracking-wide">
                      We&apos;ve received your message and
                      <br />
                      will be in touch shortly. Thanks.
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
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
