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
      <span className="w-80 lg:w-1/3 mx-4 lg:mx-0 mt-24 lg:mt-0 border-2 border-gold py-3 px-8">
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

  return (
    <Layout
      title="RAVENS | Special Film Tactics"
      heroContent={heroContent()}
      heroImage={urlForSanitySource(home.poster).url()}
      heroVideoUrl={`https://player.vimeo.com/video/536021758?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`}
      fadeIn={true}
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
                  } lg:border-2 border-gold hover:border-gray-500 transition-all ease-in duration-300 bg-opacity-50 bg-gradient-to-t from-transparent to-transparent hover:to-gray-900`}
                >
                  <h3 className="text-3xl font-bold lg:px-10">
                    {service.title}
                  </h3>
                  <div className="flex flex-1 items-center my-8">
                    <div className="h-38 w-3/4 mx-auto">
                      <Image
                        src={urlForSanitySource(service.thumb)
                          .width(service.thumbWidth || 450)
                          .url()}
                        layout="intrinsic"
                        width={service.thumbWidth || 450}
                        height={service.thumbHeight || 300}
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
          <hr className="border border-gold my-8" />

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

          <hr className="border border-gold my-8" />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      home: await getClient().fetch(groq`
        *[_type == "home"][0]{
          poster,
          heading,
          text,
          services[]->
        }
      `),
    },
  };
}

export default Home;
