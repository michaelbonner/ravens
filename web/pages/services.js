import Layout from "../components/layout";
import client from "../lib/client";
import groq from "groq";
import urlForSanitySource from "../lib/urlForSanitySource";
import Link from "next/link";
import Image from "next/image";

const Services = (props) => {
  const { services = [] } = props;
  console.log(services)
  return (
    <Layout title="Services | RAVENS">
      <div className="prose text-center mx-auto pt-12">
        <div className="">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase">Services</h1>
          {services.map((service) => {            
            return (
              <section key={service._id} className="pt-8 mt-12">
                <div className="relative h-60 md:h-96 lg:h-screen mb-12">
                  <Image
                    className="w-full"
                    src={urlForSanitySource(service.poster).width(1200).height(400).url()}
                    layout="fill"
                  />
                </div>
                <div  className="mb-12">
                  <h2 className="font-bold text-3xl uppercase">{service.title}</h2>
                  {/* {...service.summary} */}
                  {/* <div dangerouslySetInnerHTML={{ __html: service.summary }} ></div> */}
                </div>
                <div>
                  <Link className="pt-12 mt-12" href={`/service/${service.slug.current}`}>
                    <a className="rounded-full font-bold uppercase tracking-wider border border-white py-3 px-8 hover:bg-gold hover:text-black transition-all">
                      Full Details
                    </a>
                  </Link>
                </div>
              </section>
            )}
          )}
        </div>

        <hr className="border-t-2 w-96 mx-auto border-gold my-16" />

      </div>
    </Layout>
  );
}

Services.getInitialProps = async () => ({
  services: await client.fetch(groq`
    *[_type == "services"]|order(_createdAt desc)
  `),
});

export default Services;