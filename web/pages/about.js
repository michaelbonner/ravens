import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";
import groq from "groq";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import StandardHR from "../components/standard-hr";

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
    >
      <div className="container mx-auto text-center">
        <div className="max-w-5xl mx-auto mt-16">
          <section className="md:px-32 mb-20 user-text">
            <BlockContent blocks={about.text} />
          </section>

          <section className="text-center max-w-5xl mb-20 mx-8 lg:mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {about?.people?.map((person) => {
                return (
                  <article key={person._id}>
                    <header>
                      <img
                        alt={person.name}
                        src={urlForSanitySource(person.image).width(300).url()}
                      />
                      <p className="uppercase text-gold tracking-wider font-bold mb-2 mt-4">
                        {person.name}
                        <br />
                        {person.title}
                      </p>
                      <BlockContent blocks={person.text} />
                    </header>
                  </article>
                );
              })}
            </div>
          </section>

          <StandardHR />

          <section className="md:px-32 mb-20 user-text">
            <BlockContent blocks={about.locations} />
          </section>

          <StandardHR />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      about: await getClient().fetch(groq`
        *[_type == "about"][0]{
          title,
          poster,
          text,
          locations,
          title,
          people[]->
        }
      `),
    },
  };
}

export default About;
