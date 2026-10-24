/* eslint-disable @next/next/no-img-element */
import groq from "groq";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Layout from "../../components/layout";
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
  const [videoAspectRatio, setVideoAspectRatio] = useState(
    `${videoWidthAspectRatio} / ${videoHeightAspectRatio}`
  );
  const posterUrl = poster
    ? urlForSanitySource(poster).width(1200).format("webp").quality(75).url()
    : null;

  useEffect(() => {
    if (videoReady) return;
    const timeout = setTimeout(() => setSlowLoad(true), 15000);
    return () => clearTimeout(timeout);
  }, [videoReady]);

  return (
    <div className="w-full">
      <div
        className={`project-video-stage ${
          extraPaddingOnVideo ? "mt-12 lg:mt-28" : "mt-8"
        }`}
        style={{ aspectRatio: videoAspectRatio }}
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
            onReady={(player) => {
              setVideoReady(true);
              const vimeoPlayer = player.getInternalPlayer();
              // Size the stage to the actual video so it never letterboxes
              Promise.all([
                vimeoPlayer.getVideoWidth(),
                vimeoPlayer.getVideoHeight(),
              ])
                .then(([width, height]) => {
                  if (width && height) {
                    setVideoAspectRatio(`${width} / ${height}`);
                  }
                })
                .catch(() => {});
            }}
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
          <div
            className={`project-video-stage ${
              extraPaddingOnVideo ? "mt-12 lg:mt-28" : "mt-8"
            }`}
            style={{
              aspectRatio: `${videoWidthAspectRatio} / ${videoHeightAspectRatio}`,
            }}
          >
            {poster && (
              <img
                alt={`${title} poster`}
                className="w-full h-full object-cover"
                src={urlForSanitySource(poster).width(1200).url()}
              />
            )}
          </div>
        )}
        {credits?.length > 0 && (
          <section className="project-section">
            <h2 className="section-kicker">Credits</h2>
            <dl className="project-credits">
              {credits.map((credit, index) =>
                credit.role === "space" ? (
                  <div className="project-credits-spacer" key={index} />
                ) : (
                  <div key={index}>
                    <dt>{credit.role}</dt>
                    <dd>{credit.value}</dd>
                  </div>
                )
              )}
            </dl>
          </section>
        )}

        {frames?.length > 0 && (
          <section className="project-section">
            <h2 className="section-kicker">Frames</h2>
            <div className="project-gallery">
              {frames.map((image, index) => (
                <Image
                  alt={`Frames ${index + 1}`}
                  height="300"
                  key={image._key}
                  src={urlForSanitySource(image).width(717).height(300).url()}
                  width="717"
                />
              ))}
            </div>
          </section>
        )}

        {behindTheScenes?.length > 0 && (
          <section className="project-section">
            <h2 className="section-kicker">Behind the Scenes</h2>
            <div className="project-gallery">
              {behindTheScenes.map((image, index) => (
                <Image
                  alt={`Behind the scenes ${index + 1}`}
                  height="300"
                  key={image._key}
                  src={urlForSanitySource(image).width(717).height(300).url()}
                  width="717"
                />
              ))}
            </div>
          </section>
        )}

        <section className="project-section">
          <h2 className="section-heading">Other Work</h2>
          <div className="work-grid">
            <WorkItem project={previousProject} />
            <WorkItem project={nextProject} />
          </div>
        </section>
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
