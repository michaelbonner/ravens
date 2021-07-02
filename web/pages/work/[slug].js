import groq from "groq";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactPlayer from "react-player";
import Layout from "../../components/layout";
import { getClient, usePreviewSubscription } from "../../lib/sanity";
import urlForSanitySource from "../../lib/urlForSanitySource";
import FourOhFour from "../404";

const BackgroundFallback = ({ image }) => {
  return <img className="w-full" src={image} />;
};

const projectQuery = groq`
*[_type == "project" && slug.current == $slug][0]{
  behindTheScenes,
  clientName,
  credits,
  frames,
  poster,
  slug,
  title,
  video_id
}
`;

const Project = (data, preview) => {
  const [showVideo, setShowVideo] = useState(false);
  const router = useRouter();
  if (!router.isFallback && !data.title) {
    return <FourOhFour />;
  }

  const { data: project } = usePreviewSubscription(projectQuery, {
    params: { slug: data.slug?.current },
    initialData: data,
    enabled: preview,
  });

  const {
    behindTheScenes = [],
    clientName = "",
    credits = [],
    frames = [],
    title = "",
    poster = "",
    video_id = null,
  } = data;
  const fullTitle = clientName ? `${clientName} | ${title}` : title;

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
            }`}
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
            <hr className="border-t-2 w-full lg:w-96 mx-auto border-gold mt-12" />
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
                BTS
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

        <hr className="border-t-2 w-full lg:w-96 mx-auto border-gold mt-20" />
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

export async function getStaticProps({ params, preview = false }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  try {
    const cmsData = await getClient(preview).fetch(projectQuery, { slug });
    if (!cmsData) {
      return {
        preview,
        props: {},
      };
    }
    return {
      props: cmsData,
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default Project;
