import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import groq from "groq";
import Link from "next/link";
import urlForSanitySource from "../lib/urlForSanitySource";
import { useState } from "react";

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

const WorkItem = ({ project, gridColumnsCount }) => {
  const [hovered, setHovered] = useState(false);
  let aspectHeight = `lg:aspect-h-4`;
  if (gridColumnsCount > 1) {
    aspectHeight = `lg:aspect-h-6`;
  } else if (gridColumnsCount) {
    aspectHeight = `lg:aspect-h-4`;
  }
  return (
    <Link href={`/work/${project.slug.current}`}>
      <a
        className={`relative w-full text-right flex justify-end items-end transition-all duration-500 aspect-w-16 aspect-h-6 ${aspectHeight}`}
        style={{
          background: `url(${urlForSanitySource(project.poster)
            .width(1200)
            .url()}) center center no-repeat`,
          backgroundSize: hovered ? "100%" : "105%",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`bg-transparent hover:bg-black absolute py-2 px-4 ease-out ${
            hovered ? `opacity-70` : `opacity-0`
          } inset-0 transition-all duration-300`}
        >
          <h2
            className={`absolute inset-y-4 inset-x-8 border-2 border-black hover:border-gold flex items-center justify-center text-3xl uppercase transition-all duration-500`}
          >
            <span
              className={`text-center px-4 py-2 ${
                gridColumnsCount > 2 ? "lg:text-xl xl:text-2xl" : "text-2xl"
              }`}
            >
              {project.clientName ? `${project.clientName} // ` : ""}
              {project.title}
            </span>
          </h2>
        </div>
      </a>
    </Link>
  );
};

const Work = (props) => {
  const { projects = [] } = props;
  const projectsCount = projects?.work.length ?? 0;
  const work = projects?.work.sort((a, b) => (a.order > b.order ? 1 : -1));

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
      heroImage={urlForSanitySource(projects.poster).url()}
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
        <hr className="border border-gold mb-8 mt-12" />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      projects: await getClient().fetch(groq`
        *[_type == "projects"][0]{
          title,
          poster,
          work[]->
        }
      `),
    },
  };
}

export default Work;
