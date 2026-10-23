import BlockContent from "@sanity/block-content-to-react";
import groq from "groq";
import dynamic from "next/dynamic";
import Link from "next/link";
import Layout from "../components/layout";
import ServiceCard from "../components/service-card";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";

const VideoPlayer = dynamic(() => import("../components/video-player"), {});

const Home = ({ home = {} }) => {
  const services = home.services || [];

  return (
    <Layout
      title={home.seo_title || "RAVENS | Special Film Tactics"}
      heroContent={
        <>
          <p className="hero-eyebrow">Salt Lake City & Kauai</p>
          <h1 className="hero-title">Special film tactics.</h1>
          <p className="hero-description">
            Skilled technicians with a distinct eye for storytelling. Built for
            the shots that take more.
          </p>
          <Link href="/work">
            <a className="hero-link">
              Explore our work <span aria-hidden="true">↗</span>
            </a>
          </Link>
        </>
      }
      heroImage={
        home.poster ? urlForSanitySource(home.poster).width(2000).url() : null
      }
      heroVideoId={home.video_id}
      description={
        home.seo_description ||
        "RAVENS creates specialty film work, from aerials to pursuit tracking and high speed photography."
      }
    >
      <section className="editorial-section">
        <div className="site-container">
          <div className="editorial-grid services-intro">
            <div>
              <p className="section-kicker">What we do</p>
              <h2 className="section-heading">Built for the difficult shot.</h2>
            </div>
            <p className="editorial-copy">
              From heavy lift aerials to pursuit tracking and technical high
              speed work, our crews bring the equipment and the instincts to get
              the shot.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <ServiceCard
                key={service._id}
                service={service}
                number={index + 1}
                summary={service.homeSummary}
              />
            ))}
          </div>
          <Link href="/services">
            <a className="text-link all-services-link">
              All options <span aria-hidden="true">↗</span>
            </a>
          </Link>
        </div>
      </section>

      {(home.heading || home.text) && (
        <section className="editorial-section warm-section">
          <div className="site-container editorial-grid">
            <div>
              <p className="section-kicker">About Ravens</p>
              <h2 className="section-heading">{home.heading}</h2>
            </div>
            <div className="editorial-copy">
              <BlockContent blocks={home.text} />
              <Link href="/about">
                <a className="text-link">
                  Learn more <span aria-hidden="true">↗</span>
                </a>
              </Link>
            </div>
          </div>
        </section>
      )}

      {home.reel_video_id && (
        <section className="editorial-section reel-section">
          <div className="site-container">
            <div className="reel-heading">
              <p className="section-kicker">On film</p>
              <h2 className="section-heading">
                {home.reel_heading || "The reel"}
              </h2>
            </div>
            <VideoPlayer
              poster={home.poster}
              title={home.reel_heading}
              videoId={home.reel_video_id}
              videoHeightAspectRatio={home.reel_video_height_aspect_ratio}
              videoWidthAspectRatio={home.reel_video_width_aspect_ratio}
              leftReelText={home.left_reel_text}
              rightReelText={home.right_reel_text}
              autoPlay={false}
            />
          </div>
        </section>
      )}
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      home: await getClient().fetch(groq`
        *[_type == "home"][0]{
          video_id, poster, heading, text, services[]->,
          reel_heading, left_reel_text, right_reel_text,
          reel_video_id, reel_video_width_aspect_ratio, reel_video_height_aspect_ratio
        }
      `),
    },
  };
}

export default Home;
