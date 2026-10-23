import groq from "groq";
import Layout from "../components/layout";
import ServiceCard from "../components/service-card";
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
      heroVideoId={servicePage.video_id}
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
              <ServiceCard
                key={service._id}
                service={service}
                number={index + 1}
                summary={service.summary}
              />
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
