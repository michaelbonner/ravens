import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";
import groq from "groq";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";

const heroContent = () => {
  return (
    <h1 className="absolute inset-0 flex justify-center items-center">
      <span className="text-4xl text-center text-white  uppercase w-80 mx-4 lg:mx-0 mt-24 lg:mt-0 border-2 border-gold py-3 px-8">
        About
      </span>
    </h1>
  );
};

const About = (props) => {
  const { about = {} } = props;
  
  return (
    <Layout 
      title="About | RAVENS"
      heroContent={heroContent()}
      heroImage={urlForSanitySource(about.poster).url()}
      // heroImage="/images/about-bg-2.jpg"
    >
      <div className="container mx-auto text-center">
        <div className="max-w-5xl mx-auto mt-16">
          <section className="md:px-32 mb-20 user-text">
            <BlockContent blocks={about.text} />
          </section>

          <Link href="/contact">
            <a className="hidden lg:inline-block rounded-full font-bold uppercase tracking-wider border border-white py-2 px-8 hover:bg-gold hover:text-black transition-all">
              Get in Touch
            </a>
          </Link>
          <hr className="border-t-2 w-full lg:w-96 mx-auto border-gold my-16" />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      about: await getClient().fetch(groq`
        *[_type == "about"][0]
      `),
    },
  };
}

export default About;
