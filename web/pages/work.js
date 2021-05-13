import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import groq from "groq";
import Link from "next/link";
import urlForSanitySource from "../lib/urlForSanitySource";
import { useState } from "react";

const WorkItem = ({ project }) => {
  const [hovered, setHovered] = useState(true);
  return (
    <Link href={`/work/${project.slug.current}`}>
      <a
        className="relative w-full text-right flex justify-end items-end mt-8 transition-all duration-300"
        style={{
          height: "20vw",
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
            hovered ? `block` : `hidden`
          } inset-0 transition-all duration-200`}
        >
          <h2
            className={`absolute inset-8 lg:inset-16 border-2 border-black hover:border-gold flex items-center justify-center text-3xl uppercase transition-all duration-700`}
          >
            <span>
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
  return (
    <Layout title="Contact | RAVENS">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase">
            Work
          </h1>
        </div>
        {projects.map((project) => {
          return <WorkItem project={project} key={project._id} />;
        })}
        <hr className="border border-gold mb-8 mt-12" />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      projects: await getClient().fetch(groq`
        *[_type == "project"]|order(date desc)
      `),
    },
  };
}

export default Work;
