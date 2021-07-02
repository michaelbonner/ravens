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
  const { servicePage = {}, services = [] } = props;
  const sortedServices = services?.sort((a, b) => (a.order > b.order ? 1 : -1));

  return (
    <Layout
      title="Services | RAVENS"
      heroContent={heroContent()}
      heroImage={urlForSanitySource(servicePage.poster).url()}
    >
      <div className="text-center max-w-5xl pt-12 mt-6 mx-8 lg:mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sortedServices.map((service, index) => {
            return (
              <Link
                href={`/service/${service.slug?.current}`}
                key={service._id}
              >
                <a
                  className={`py-5 flex flex-col justify-between px-5 ${
                    index + 1 !== services.length ? `border-b-2` : ``
                  } lg:border-2 border-gold hover:border-gray-500 transition-all ease-in duration-300 bg-opacity-50 bg-gradient-to-t from-transparent to-transparent hover:to-gray-900`}
                >
                  <h3 className="text-2xl font-bold lg:px-10">
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

                  <button className="rounded-full font-bold uppercase border border-white py-3 px-6 hover:bg-gold hover:text-black transition-all">
                    All Options
                  </button>
                </a>
              </Link>
            );
          })}
        </div>

        <hr className="border-t-2 w-full lg:w-96 mx-auto border-gold my-16" />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const servicePage = await getClient().fetch(groq`
  *[_type == "services-page"][0]{
    title,
    poster
  }
`);
  const services = await getClient().fetch(groq`
    *[_type == "services"]|order(order asc)
  `);

  return {
    props: {
      servicePage,
      services,
    },
  };
}

export default Services;
