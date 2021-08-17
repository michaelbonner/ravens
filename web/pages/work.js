import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import groq from "groq";
import urlForSanitySource from "../lib/urlForSanitySource";
import StandardHR from "../components/standard-hr";
import WorkItem from "../components/work-item";

const gridColumnCount = (itemCount) => {
  if (itemCount > 6) {
    return 4;
  }
  if (itemCount === 6 || itemCount === 5) {
    return 3;
  }
  if (itemCount === 4) {
    return 2;
  }

  return 1;
};

const heroContent = () => {
  return (
    <h1 className="absolute inset-0 flex justify-center items-center">
      <span className="text-4xl text-center text-white  uppercase w-80 mx-4 lg:mx-0 mt-24 lg:mt-0 border-2 border-gold py-3 px-8">
        Work
      </span>
    </h1>
  );
};

const Work = ({ projectsPage = {}, projects = [] }) => {
  const projectsCount = projects.length ?? 0;
  const work = projects.sort((a, b) => (a.order > b.order ? 1 : -1));

  // options - lg:grid-cols-4 | lg:grid-cols-3 | lg:grid-cols-2 | lg:grid-cols-1
  const gridClassName = `lg:grid-cols-${gridColumnCount(projectsCount)}`;
  const containerClasses = `grid ${gridClassName}${
    gridColumnCount(projectsCount) < 2
      ? " mt-12 container mx-auto gap-y-8"
      : " gap-y-8 lg:gap-y-0"
  }`;
  const gridColumnsCount = gridColumnCount(projectsCount);

  return (
    <Layout
      title="Contact | RAVENS"
      heroContent={heroContent()}
      heroImage={urlForSanitySource(projectsPage.poster).url()}
      heroVideoUrl={
        projectsPage.video_id
          ? `https://player.vimeo.com/video/${projectsPage.video_id}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`
          : null
      }
      description="Explore some of the work of RAVENS"
    >
      <div className={containerClasses}>
        {work.map((project) => {
          return (
            <WorkItem
              gridColumnsCount={gridColumnsCount}
              project={project}
              key={project._id}
            />
          );
        })}
      </div>
      <div className="container mx-auto">
        <StandardHR />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const projectsPage = await getClient().fetch(groq`
    *[_type == "projects"][0]{
      title,
      video_id,
      poster,
    }
  `);
  const projects = await getClient().fetch(groq`
    *[_type == "project"]|order(order asc)
  `);
  return {
    props: {
      projectsPage,
      projects,
    },
  };
}

export default Work;
