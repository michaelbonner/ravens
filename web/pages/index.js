import Layout from "../components/layout";
import Image from "next/image";
import Link from "next/link";
import { getClient } from "../lib/sanity";
import groq from "groq";
import BlockContent from "@sanity/block-content-to-react";
import urlForSanitySource from "../lib/urlForSanitySource";

const heroContent = () => {
  return (
    <h1 className="absolute inset-0 flex justify-center items-center">
      <span className="w-72 lg:w-96 mx-4 lg:mx-0 mt-24 lg:mt-0">
        <Image
          alt="SLC X KAUAI"
          height="346"
          src="/images/slc-x-kauai.png"
          title="SLC X Kauai"
          width="1896"
        />
      </span>
    </h1>
  );
};

const Home = (props) => {
  const { services = [] } = props;
  const { home = {} } = props;

  return (
    <Layout
      title="RAVENS | Special Film Tactics"
      heroContent={heroContent()}
      heroImage={urlForSanitySource(home.poster).url()}
      heroVideoUrl={`https://player.vimeo.com/video/536021758?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`}
    >
      <div className="text-center max-w-5xl mx-auto pt-12">
        <div className="lg:pt-12">
          <h2 className="font-bold text-3xl mb-12">{home.heading}</h2>
          <BlockContent blocks={home.text} />
          <p className="py-12">
            <Link href="/contact">
              <a className="rounded-full font-bold uppercase tracking-wider border border-white py-3 px-8 hover:bg-gold hover:text-black transition-all">
                Get in Touch
              </a>
            </Link>
          </p>
        </div>

        <hr className="border-2 border-gold my-6" />

        <div className="lg:grid grid-cols-3 gap-4">
          {services.map((service) => {
            return (
              <div key={service._id} className="py-12">
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <div className="flex items-center my-8">
                  <div className="h-38 w-3/4 mx-auto">
                    <Image
                      src={urlForSanitySource(service.thumb).width(400).url()}
                      layout="intrinsic"
                      width="400"
                      height="300"
                    />
                  </div>
                </div>
                <BlockContent blocks={service.homeSummary} />
              </div>
            );
          })}
        </div>

        <div className="py-6">
          <Link href="/services">
            <a className="rounded-full font-bold uppercase tracking-wider border border-white py-3 px-8 hover:bg-gold hover:text-black transition-all">
              All Options
            </a>
          </Link>
        </div>

        <hr className="border-2 border-gold my-8" />
      </div>
    </Layout>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      services: await getClient().fetch(groq`
        *[_type == "services"][0...3]|order(_createdAt desc)
      `),
      home: await getClient().fetch(groq`
        *[_type == "home"][0]
      `),
    },
  };
}

export default Home;
