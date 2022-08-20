/* eslint-disable @next/next/no-img-element */
import BlockContent from "@sanity/block-content-to-react";
import groq from "groq";
import Link from "next/link";
import Layout from "../components/layout";
import ReelVideoPlayer from "../components/reel-video-player";
import StandardHR from "../components/standard-hr";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";

const heroContent = () => {
  return (
    <h1 className="absolute inset-0 flex justify-center items-center">
      <span className="w-64 lg:w-1/3 mx-4 lg:mx-0 mt-24 lg:mt-0 border-2 border-gold py-3 px-8">
        <img
          alt="SLC X KAUAI"
          height="300"
          src="/images/slc-x-kauai.svg"
          title="SLC X Kauai"
          width="1600"
        />
      </span>
    </h1>
  );
};

const Home = (props) => {
  const { home = {} } = props;
  const services = home.services || [];
  const reelVideo = home.reel_video_id;
  const reelVideoWidth = home.reel_video_width_aspect_ratio;
  const reelVideoHeight = home.reel_video_height_aspect_ratio;
  return (
    <Layout
      title={home.seo_title || "RAVENS | Special Film Tactics"}
      heroContent={heroContent()}
      heroImage={urlForSanitySource(home.poster).url()}
      heroVideoUrl={`https://player.vimeo.com/video/${home.video_id}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`}
      fadeIn={true}
      description={
        home.seo_description ||
        "We are skilled technicians with a unique sensibility for storytelling. RAVENS can execute nearly any mission from heavy lift aerials to pursuit tracking or technical phantom flex high speed work."
      }
    >
      <div className="text-center max-w-5xl pt-12 mt-6 mx-8 lg:mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            return (
              <Link
                key={service._id}
                href={`/service/${service.slug?.current}`}
              >
                <a
                  className={`py-12 flex flex-col justify-between ${
                    index + 1 !== services.length ? `border-b-2` : ``
                  } lg:border-2 border-gold hover:border-gray-500 transition-all ease-in duration-300 bg-gradient-to-t from-transparent to-transparent hover:to-gray-700`}
                >
                  <h2 className="text-3xl font-bold lg:px-10">
                    {service.title}
                  </h2>
                  <div className="flex flex-1 items-center my-8">
                    <div className="h-38 w-3/4 mx-auto">
                      <img
                        alt={service.title}
                        src={urlForSanitySource(service.thumb).width(450).url()}
                      />
                    </div>
                  </div>
                  <div className="leading-8">
                    <BlockContent blocks={service.homeSummary} />
                  </div>
                </a>
              </Link>
            );
          })}
        </div>

        <div className="py-8 mt-8">
          <Link href="/services">
            <a className="rounded-full font-bold uppercase tracking-wider border-2 border-white py-3 px-8 hover:bg-gold hover:text-black transition-all">
              All Options
            </a>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <StandardHR />

          <div className="lg:pt-12">
            <h2 className="font-bold text-3xl mb-12">{home.heading}</h2>
            <BlockContent blocks={home.text} />
            <p className="py-12">
              <Link href="/about">
                <a className="rounded-full font-bold uppercase tracking-wider border-2 border-white py-3 px-8 hover:bg-gold hover:text-black transition-all">
                  Learn More
                </a>
              </Link>
            </p>
          </div>

          <StandardHR />
        </div>
        {home.reel_video_id && (
          <div className="mx-auto">
            {home.reel_heading && (
              <div>
                <h2 className="font-bold text-3xl uppercase">
                  {home.reel_heading}
                </h2>
              </div>
            )}
            <ReelVideoPlayer
              video={reelVideo}
              videoWidthAspectRatio={reelVideoWidth}
              videoHeightAspectRatio={reelVideoHeight}
            />
            <StandardHR />
          </div>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      home: await getClient().fetch(groq`
        *[_type == "home"][0]{
          video_id,
          poster,
          heading,
          text,
          services[]->,
          reel_heading,
          reel_video_id,
          reel_video_width_aspect_ratio,
          reel_video_height_aspect_ratio
        }
      `),
    },
  };
}

export default Home;
