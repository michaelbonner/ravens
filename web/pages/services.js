import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import groq from "groq";
import urlForSanitySource from "../lib/urlForSanitySource";
import Link from "next/link";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";

const heroContent = () => {
  return (
    <h1 className="absolute inset-0 flex justify-center items-center">
      <span className="text-4xl text-center text-white  uppercase w-80 mx-4 lg:mx-0 mt-24 lg:mt-0 border-2 border-gold py-3 px-8">
        Services
      </span>
    </h1>
  );
};

const Services = (props) => {
  const { services = [] } = props;    

  return (
    <Layout 
      title="Services | RAVENS"
      heroContent={heroContent()}
      heroImage="/images/services-bg.png"
    >
      <div className="text-center max-w-5xl pt-12 mt-6 mx-8 lg:mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            return (
              <article 
                className={`py-5 flex flex-col justify-between px-5 ${
                index + 1 !== services.length ? `border-b-2` : ``
              } lg:border-2 border-gold`}
                key={service._id}
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
                <div className="leading-8 text-sm mb-5">
                  <BlockContent blocks={service.summary} />
                </div>

                <Link
                  className="pt-12 mt-12"
                  href={`/service/${service.slug?.current}`}
                >
                  <a className="rounded-full font-bold uppercase border border-white py-3 px-6 hover:bg-gold hover:text-black transition-all">
                    All Options
                  </a>
                </Link>
              </article>
            );
          })}
        </div>

        <hr className="border-t-2 w-full lg:w-96 mx-auto border-gold my-16" />
      </div>
      {/* <div className="text-center pt-12 container mx-auto">
        <div className="">
          {services.map((service) => {
            return (
              <section key={service._id} className="pt-8 mt-12 user-text">
                <div className="relative mb-12">
                  <Link href={`/service/${service.slug.current}`}>
                    <a>
                      <Image
                        src={urlForSanitySource(service.poster)
                          .width(1536)
                          .height(400)
                          .url()}
                        height="400"
                        width="1536"
                      />
                    </a>
                  </Link>
                </div>
                <div className="mb-12 max-w-5xl mx-auto">
                  <h2 className="font-bold text-3xl uppercase mb-6">
                    <Link href={`/service/${service.slug.current}`}>
                      <a>{service.title}</a>
                    </Link>
                  </h2>
                  <BlockContent blocks={service.summary} />
                </div>
                <div className="mb-12">
                  <Link
                    className="pt-12 mt-12"
                    href={`/service/${service.slug.current}`}
                  >
                    <a className="rounded-full font-bold uppercase tracking-wider border border-white py-3 px-8 hover:bg-gold hover:text-black transition-all">
                      Full Details
                    </a>
                  </Link>
                </div>
              </section>
            );
          })}
        </div>

        <hr className="border-t-2 w-full lg:w-96 mx-auto border-gold my-16" />
      </div> */}
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      services: await getClient().fetch(groq`
        *[_type == "services"]|order(_createdAt desc)
      `),
    },
  };
}

export default Services;
