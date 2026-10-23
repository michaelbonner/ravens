/* eslint-disable @next/next/no-img-element */
import groq from "groq";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Layout from "../../components/layout";
import StandardHR from "../../components/standard-hr";
import WorkItem from "../../components/work-item";
import { getClient } from "../../lib/sanity";
import urlForSanitySource from "../../lib/urlForSanitySource";
import FourOhFour from "../404";

const ProjectVideo = ({
  title,
  poster,
  videoId,
  videoHeightAspectRatio,
  videoWidthAspectRatio,
  extraPaddingOnVideo,
}) => {
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [slowLoad, setSlowLoad] = useState(false);
  const posterUrl = poster
    ? urlForSanitySource(poster).width(1200).format("webp").quality(75).url()
    : null;

  useEffect(() => {
    if (videoReady) return;
    const timeout = setTimeout(() => setSlowLoad(true), 15000);
    return () => clearTimeout(timeout);
  }, [videoReady]);

  return (
    <div className="max-w-6xl mx-auto">
      <div
        className={`project-video-stage ${
          extraPaddingOnVideo ? "mt-12 lg:mt-28" : "mt-8"
        }`}
        style={{
          aspectRatio: `${videoWidthAspectRatio} / ${videoHeightAspectRatio}`,
        }}
      >
        {!videoReady && (
          <div className="project-video-loading">
            {posterUrl && (
              <img
                alt={`${title} video poster`}
                src={posterUrl}
                loading="eager"
              />
            )}
            <div className="project-video-loading-content" role="status">
              {!videoError && (
                <span className="project-video-spinner" aria-hidden="true" />
              )}
              <span>
                {videoError
                  ? "Video unavailable"
                  : slowLoad
                    ? "Still loading video"
                    : "Loading video"}
              </span>
              {(videoError || slowLoad) && (
                <a
                  href={`https://vimeo.com/${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on Vimeo ↗
                </a>
              )}
            </div>
          </div>
        )}
        <div className={`project-video-player ${videoReady ? "is-ready" : ""}`}>
          <ReactPlayer
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen={true}
            controls={true}
            frameBorder="0"
            height="100%"
            title={title}
            url={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
            width="100%"
            onReady={() => setVideoReady(true)}
            onError={() => {
              setVideoReady(false);
              setVideoError(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const projectQuery = groq`
*[_type == "project" && slug.current == $slug][0]{
  _id,
  behindTheScenes,
  clientName,
  credits,
  extraPaddingOnVideo,
  frames,
  poster,
  slug,
  title,
  video_id,
  videoHeightAspectRatio,
  videoWidthAspectRatio,
}
`;

/*
prevent purging of aspect ratio
aspect-w-1	aspect-h-1
aspect-w-2	aspect-h-2
aspect-w-3	aspect-h-3
aspect-w-4	aspect-h-4
aspect-w-5	aspect-h-5
aspect-w-6	aspect-h-6
aspect-w-7	aspect-h-7
aspect-w-8	aspect-h-8
aspect-w-9	aspect-h-9
aspect-w-10	aspect-h-10
aspect-w-11	aspect-h-11
aspect-w-12	aspect-h-12
aspect-w-13	aspect-h-13
aspect-w-14	aspect-h-14
aspect-w-15	aspect-h-15
aspect-w-16	aspect-h-16
*/

const Project = ({ project = {}, projects = [] }) => {
  const router = useRouter();
  if (!router.isFallback && !project.title) {
    return <FourOhFour />;
  }

  const {
    behindTheScenes = [],
    clientName = "",
    credits = [],
    extraPaddingOnVideo = false,
    frames = [],
    poster = "",
    title = "",
    video_id = null,
  } = project;

  const videoHeightAspectRatio = project.videoHeightAspectRatio || "9";
  const videoWidthAspectRatio = project.videoWidthAspectRatio || "16";

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
    <Layout
      title={
        project.seo_description || `${fullTitle} | RAVENS Special Film Tactics`
      }
      description={
        project.seo_description || `${fullTitle} | RAVENS Special Film Tactics`
      }
    >
      <article className="site-container project-detail">
        <div className="project-heading">
          <p className="section-kicker">Selected work</p>
          <h1 className="section-heading">{fullTitle}</h1>
        </div>
        {video_id ? (
          <ProjectVideo
            key={video_id}
            title={title}
            poster={poster}
            videoId={video_id}
            videoHeightAspectRatio={videoHeightAspectRatio}
            videoWidthAspectRatio={videoWidthAspectRatio}
            extraPaddingOnVideo={extraPaddingOnVideo}
          />
        ) : (
          <div className="max-w-6xl mx-auto">
            <div
              className={`aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio} transition-all duration-700 ${
                extraPaddingOnVideo ? `mt-12 lg:mt-28` : `mt-8`
              }`}
            >
              <img
                alt="Poster image"
                className="w-full h-full"
                src={urlForSanitySource(poster).width(1200).url()}
              />
            </div>
          </div>
        )}
        <div className="container mx-auto">
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
                  <div
                    className="grid grid-cols-2 gap-12 font-bold"
                    key={index}
                  >
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
                  {frames.map((image, index) => {
                    return (
                      <Image
                        alt={`Frames ${index + 1}`}
                        className="w-full overflow-hidden"
                        height="300"
                        key={image._key}
                        src={urlForSanitySource(image)
                          .width(717)
                          .height(300)
                          .url()}
                        width="717"
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
                  {behindTheScenes.map((image, index) => {
                    return (
                      <Image
                        alt={`Behind the scenes ${index + 1}`}
                        className="w-full overflow-hidden"
                        height="300"
                        key={image._key}
                        src={urlForSanitySource(image)
                          .width(717)
                          .height(300)
                          .url()}
                        width="717"
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <StandardHR />
          <div className="mt-12 mb-24 mx-4 lg:mx-0">
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
        </div>
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
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  try {
    const projects = await getClient().fetch(groq`
      *[_type == "project"][!(_id in path('drafts.**'))]|order(order asc)
    `);
    const project = await getClient().fetch(projectQuery, { slug });
    return {
      props: { project, projects },
      notFound: !project,
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default Project;
