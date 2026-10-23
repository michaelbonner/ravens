/* eslint-disable @next/next/no-img-element */
import BlockContent from "@sanity/block-content-to-react";
import groq from "groq";
import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";

const heroContent = () => (
  <>
    <p className="hero-eyebrow">The people</p>
    <h1 className="hero-title">About</h1>
  </>
);

const About = (props) => {
  const { about = {} } = props;

  return (
    <Layout
      title={about.seo_title || "About | RAVENS"}
      heroContent={heroContent()}
      heroImage={urlForSanitySource(about.poster).url()}
      heroVideoUrl={
        about.video_id
          ? `https://player.vimeo.com/video/${about.video_id}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`
          : null
      }
      description={about.seo_description || "About RAVENS"}
    >
      <div className="site-container page-body">
        <section className="editorial-grid editorial-section">
          <div>
            <p className="section-kicker">About Ravens</p>
            <h2 className="section-heading">People behind the shot.</h2>
          </div>
          <div className="editorial-copy user-text">
            <BlockContent blocks={about.text} />
          </div>
        </section>
        {about.people?.length > 0 && (
          <section className="editorial-section">
            <p className="section-kicker">The crew</p>
            <div className="people-grid">
              {about.people.map((person) => (
                <article className="person-card" key={person._id}>
                  {person.image && (
                    <img
                      alt={person.name}
                      src={urlForSanitySource(person.image).width(700).url()}
                    />
                  )}
                  <h2>{person.name}</h2>
                  <p className="person-title">{person.title}</p>
                  <div className="person-bio">
                    <BlockContent blocks={person.text} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        {about.locations && (
          <section className="editorial-section editorial-grid border-t border-gray-700">
            <div>
              <p className="section-kicker">Where we work</p>
              <h2 className="section-heading">Based here. Ready anywhere.</h2>
            </div>
            <div className="editorial-copy user-text">
              <BlockContent blocks={about.locations} />
            </div>
          </section>
        )}
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
          video_id,
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
