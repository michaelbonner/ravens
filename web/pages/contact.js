import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "yup-phone";
import Layout from "../components/layout";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short")
    .max(120, "Too long")
    .required("Full name is required"),
  emailAddress: Yup.string()
    .email("Invalid email")
    .required("Email address is required"),
  phoneNumber: Yup.string()
    .phone("Invalid phone")
    .required("Valid Phone number is Required"),
  message: Yup.string().min(2, "Too short").required("Message is Required"),
});

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: "",
    emailAddress: "",
    phoneNumber: "",
    message: "",
  });

  useEffect(() => {
    document.querySelector("body").classList.add("contact");
  });

  return (
    <Layout title="Contact | RAVENS" backgroundClass="">
      <div className="prose text-center max-w-5xl mx-auto">
        <div className="py-12">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-white border-b-2 border-white uppercase">
            Contact
          </h1>
          <div className="relative mx-auto">
            <div className="py-16 px-4">
              <div className="max-w-lg mx-auto lg:max-w-none">
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
                        toast("Saved contact form details", {
                          type: toast.TYPE.SUCCESS,
                        });
                        setSubmitting(false);
                      }
                    } catch (error) {
                      setSubmitting(false);
                      toast("Save failed", {
                        type: toast.TYPE.ERROR,
                      });
                    }
                  }}
                >
                  {({ isSubmitting, errors }) => (
                    <Form className="grid grid-cols-1 gap-y-6">
                      <Field
                        as="input"
                        name="name"
                        placeholder="Full Name"
                        className="block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-black  focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="name"
                        className="text-red-700"
                        component="div"
                      />

                      <Field
                        as="input"
                        name="emailAddress"
                        placeholder="Email Address"
                        className="block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-black  focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="emailAddress"
                        className="text-red-700"
                        component="div"
                      />

                      <Field
                        as="input"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className="block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-black  focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        className="text-red-700"
                        component="div"
                      />

                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Message"
                        rows="4"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 text-gray-500 placeholder-black focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="message"
                        className="text-red-700"
                        component="div"
                      />

                      <button
                        type="submit"
                        className={`inline-block rounded-full font-bold uppercase tracking-wider border border-white py-2 px-8 hover:bg-gold hover:text-black transition-all
                          isSubmitting ? 'opacity-25' : 
                        }`}
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
