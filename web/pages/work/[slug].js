import groq from "groq";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactPlayer from "react-player";
import Layout from "../../components/layout";
import StandardHR from "../../components/standard-hr";
import WorkItem from "../../components/work-item";
import { getClient } from "../../lib/sanity";
import urlForSanitySource from "../../lib/urlForSanitySource";
import FourOhFour from "../404";

const BackgroundFallback = ({ image }) => {
  return <img className="w-full" src={image} />;
};

const projectQuery = groq`
*[_type == "project" && slug.current == $slug][0]{
  _id,
  behindTheScenes,
  clientName,
  credits,
  frames,
  poster,
  slug,
  title,
  video_id,
  extraPaddingOnVideo
}
`;

const Project = ({ project = {}, projects = [] }) => {
  const [showVideo, setShowVideo] = useState(false);
  const router = useRouter();
  if (!router.isFallback && !project.title) {
    return <FourOhFour />;
  }

  const {
    behindTheScenes = [],
    clientName = "",
    credits = [],
    frames = [],
    title = "",
    poster = "",
    video_id = null,
    extraPaddingOnVideo = false,
  } = project;
  const fullTitle = clientName ? `${clientName} | ${title}` : title;

  const currentProjectIndex = projects
    .map(function (x) {
      return x._id;
    })
    .indexOf(project._id);

  const nextProjectIndex =
    projects.length === currentProjectIndex + 1 ? 0 : currentProjectIndex + 1;
  const nextProject = projects[nextProjectIndex];
  const previousProjectIndex =
    currentProjectIndex === 0 ? projects.length - 1 : currentProjectIndex - 1;
  const previousProject = projects[previousProjectIndex];

  return (
    <Layout title={`${fullTitle} | RAVENS Special Film Tactics`}>
      <article className="container mx-auto">
        <div className="flex justify-center">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold">
            {fullTitle}
          </h1>
        </div>
        {video_id ? (
          <div
            className={`aspect-w-16 aspect-h-9 transition-all duration-700 ${
              showVideo ? `opacity-100` : `opacity-0`
            }${extraPaddingOnVideo ? ` mt-12 lg:mt-28` : ``}`}
          >
            <ReactPlayer
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen={true}
              controls={true}
              frameBorder="0"
              height={`100%`}
              title="RAVENS"
              url={`https://player.vimeo.com/video/${video_id}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
              width={`100%`}
              fallback={
                <BackgroundFallback
                  image={urlForSanitySource(poster).width(1200).url()}
                />
              }
              onReady={() => {
                setTimeout(() => {
                  setShowVideo(true);
                }, [100]);
              }}
            ></ReactPlayer>
          </div>
        ) : (
          <img
            className="w-full mt-14"
            src={urlForSanitySource(poster).width(1200).url()}
          />
        )}
        {credits && credits.length > 0 && (
          <>
            <h2 className="font-bold text-3xl text-center my-12 uppercase">
              Credits
            </h2>
            {credits.map((credit, index) => {
              if (credit.role === "space") {
                return <div key={index} className="h-4" />;
              }
              return (
                <div className="grid grid-cols-2 gap-12 font-bold" key={index}>
                  <div className="text-right">{credit.role}</div>
                  <div>{credit.value}</div>
                </div>
              );
            })}
            <StandardHR />
          </>
        )}

        <div className="max-w-7xl mx-auto">
          {frames && frames.length > 0 && (
            <>
              <h2 className="font-bold text-3xl text-center my-12 uppercase">
                Frames
              </h2>
              <div className="lg:grid grid-cols-2 gap-12">
                {frames.map((image) => {
                  return (
                    <Image
                      className="w-full overflow-hidden"
                      key={image._key}
                      width="717"
                      height="300"
                      src={urlForSanitySource(image)
                        .width(717)
                        .height(300)
                        .url()}
                    />
                  );
                })}
              </div>
            </>
          )}

          {behindTheScenes && behindTheScenes.length > 0 && (
            <>
              <h2 className="font-bold text-3xl text-center my-12 uppercase">
                Behind the Scenes
              </h2>
              <div className="lg:grid grid-cols-2 gap-12">
                {behindTheScenes.map((image) => {
                  return (
                    <Image
                      className="w-full overflow-hidden"
                      key={image._key}
                      width="717"
                      height="300"
                      src={urlForSanitySource(image)
                        .width(717)
                        .height(300)
                        .url()}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>

        <StandardHR />
        <div className="mt-12 mb-24">
          <h2 className="font-bold text-3xl text-center my-12 uppercase">
            Other Work
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 gap-x-12">
            <div>
              <WorkItem project={previousProject} />
            </div>
            <div>
              <WorkItem project={nextProject} />
            </div>
          </div>
        </div>
        <StandardHR />
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `
    *[_type == "project"]{slug}
  `
  );

  return {
    paths: paths
      .filter((path) => {
        return path;
      })
      .map((path) => {
        return { params: { slug: path.slug.current } };
      }),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  try {
    const projects = await getClient().fetch(groq`
      *[_type == "project"]|order(order asc)
    `);
    const project = await getClient().fetch(projectQuery, { slug });
    return {
      props: { project, projects },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default Project;
