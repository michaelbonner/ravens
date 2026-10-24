import groq from "groq";
import Layout from "../components/layout";
import WorkItem from "../components/work-item";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";

const heroContent = () => (
  <>
    <p className="hero-eyebrow">Selected projects</p>
    <h1 className="hero-title">Work</h1>
  </>
);

const Work = ({ projectsPage = {}, projects = [] }) => {
  const work = projects.sort((a, b) => (a.order > b.order ? 1 : -1));

  return (
    <Layout
      title={projectsPage.seo_title || "Work | RAVENS"}
      heroContent={heroContent()}
      heroImage={urlForSanitySource(projectsPage.poster).url()}
      heroVideoId={projectsPage.video_id}
      description={
        projectsPage.seo_description || "Explore some of the work of RAVENS"
      }
    >
      <section className="site-container work-grid" aria-label="Selected work">
        {work.map((project) => (
          <WorkItem project={project} key={project._id} />
        ))}
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const projectsPage = await getClient().fetch(groq`
    *[_type == "projects"][0]{
      title,
      video_id,
      poster,
      seo_title,
      seo_description,
    }
  `);
  const projects = await getClient().fetch(
    groq`
    *[_type == "project"][!(_id in path('drafts.**'))]|order(order asc)
  `
  );
  return {
    props: {
      projectsPage,
      projects,
    },
  };
}

export default Work;
