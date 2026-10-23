/* eslint-disable @next/next/no-img-element */
import BlockContent from "@sanity/block-content-to-react";
import groq from "groq";
import Link from "next/link";
import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";

const heroContent = () => (
  <>
    <p className="hero-eyebrow">What we do</p>
    <h1 className="hero-title">Services</h1>
  </>
);

const Services = (props) => {
  const { servicePage = {}, services = [] } = props;
  const sortedServices = services?.sort((a, b) => (a.order > b.order ? 1 : -1));

  return (
    <Layout
      title={servicePage.seo_title || "Services | RAVENS"}
      heroContent={heroContent()}
      heroImage={urlForSanitySource(servicePage.poster).url()}
      heroVideoUrl={
        servicePage.video_id
          ? `https://player.vimeo.com/video/${servicePage.video_id}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`
          : null
      }
      description={
        servicePage.seo_description ||
        "If your production calls for specialty services we’d love to explore possibilities."
      }
    >
      <section className="editorial-section">
        <div className="site-container">
          <div className="editorial-grid">
            <div>
              <p className="section-kicker">Our capabilities</p>
              <h2 className="section-heading">For the shots that take more.</h2>
            </div>
            <p className="editorial-copy">
              Specialty crews, technical equipment, and the experience to make
              ambitious images possible.
            </p>
          </div>
          <div className="service-grid">
            {sortedServices.map((service, index) => (
              <Link
                href={`/service/${service.slug?.current}`}
                key={service._id}
              >
                <a className="service-card">
                  <div className="service-card-image">
                    {service.thumb && (
                      <img
                        alt=""
                        src={urlForSanitySource(service.thumb).width(750).url()}
                      />
                    )}
                  </div>
                  <p className="service-number">
                    Service {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{service.title}</h3>
                  <div className="service-description">
                    <BlockContent blocks={service.summary} />
                  </div>
                  <span className="service-card-link">
                    Explore service <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const servicePage = await getClient().fetch(groq`
  *[_type == "services-page"][0]{
    title,
    video_id,
    poster
  }
`);
  const services = await getClient().fetch(groq`
    *[_type == "services"][!(_id in path('drafts.**'))]|order(order asc)
  `);

  return {
    props: {
      servicePage,
      services,
    },
  };
}

export default Services;
