import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import groq from "groq";
import Link from "next/link";
import urlForSanitySource from "../lib/urlForSanitySource";
import { useState } from "react";

const heroContent = () => {
  return (
    <h1 className="absolute inset-0 flex justify-center items-center">
      <span className="text-4xl text-center text-white  uppercase w-80 mx-4 lg:mx-0 mt-24 lg:mt-0 border-2 border-gold py-3 px-8">
        Work
      </span>
    </h1>
  );
};


const WorkItem = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/work/${project.slug.current}`}>
      <a
        className="relative w-full text-right flex justify-end items-end mt-8 transition-all duration-500"
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
            hovered ? `opacity-90` : `opacity-0`
          } inset-0 transition-all duration-300`}
        >
          <h2
            className={`absolute inset-y-4 inset-x-8 lg:inset-y-10 lg:inset-x-16 border-2 border-black hover:border-gold flex items-center justify-center text-3xl uppercase transition-all duration-500`}
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
    <Layout 
      title="Contact | RAVENS"
      heroContent={heroContent()}
      heroImage="/images/work-bg.png"
    >
      <div className="container mx-auto">
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
