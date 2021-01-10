import Layout from "../components/layout";
import Image from "next/image";
import client from "../lib/client";
import groq from "groq";
import Link from "next/link";
import urlForSanitySource from "../lib/urlForSanitySource";

const Home = (props) => {
  const { projects = [] } = props;
  return (
    <Layout title="Contact | RAVENS">
      <div className="flex justify-center">
        <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase">
          Work
        </h1>
      </div>
      {projects.map((project) => {
        return (
          <Link key={project._id} href={`/work/${project.slug.current}`}>
            <a
              className="w-full text-right flex justify-end items-end mt-8"
              style={{
                height: "20vw",
                background: `url(${urlForSanitySource(project.poster)
                  .width(1200)
                  .url()}) center center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <h3 className="py-2 px-4">
                {project.clientName ? `${project.clientName} // ` : ""}
                {project.title}
              </h3>
            </a>
          </Link>
        );
      })}
    </Layout>
  );
};

Home.getInitialProps = async () => ({
  projects: await client.fetch(groq`
    *[_type == "project"]|order(date desc)
  `),
});

export default Home;
