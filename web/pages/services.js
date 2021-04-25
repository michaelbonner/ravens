import Layout from "../components/layout";
import client from "../lib/client";
import groq from "groq";
import urlForSanitySource from "../lib/urlForSanitySource";
import Link from "next/link";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";

const Services = (props) => {
  const { services = [] } = props;

  return (
    <Layout title="Services | RAVENS">
      <div className="text-center pt-12 container mx-auto">
        <div className="">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase">
            Services
          </h1>
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
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      services: await client.fetch(groq`
        *[_type == "services"]|order(_createdAt desc)
      `),
    },
  };
}

export default Services;
