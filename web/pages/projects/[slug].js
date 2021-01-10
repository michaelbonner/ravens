import imageUrlBuilder from "@sanity/image-url";
import Layout from "../../components/layout";
import client from "../../lib/client";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Project = (props) => {
  const {
    behindTheScenes = [],
    clientName = "",
    credits = [],
    frames = [],
    title = "",
    poster = "",
  } = props;
  const fullTitle = clientName ? `${clientName} | ${title}` : title;

  return (
    <Layout title={`${fullTitle} | RAVENS Special Film Tactics`}>
      <article>
        <div className="flex justify-center">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold">
            {fullTitle}
          </h1>
        </div>
        <img className="w-full mt-14" src={urlFor(poster).width(1200).url()} />
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
        <hr className="border-t-2 w-96 mx-auto border-gold mt-12" />

        <h2 className="font-bold text-3xl text-center my-12 uppercase">
          Frames
        </h2>
        <div className="lg:grid grid-cols-2 gap-12">
          {frames.map((image) => {
            return (
              <div>
                <img className="w-full" src={urlFor(image).width(800).url()} />
              </div>
            );
          })}
        </div>

        <h2 className="font-bold text-3xl text-center my-12 uppercase">
          Behind The Scenes
        </h2>
        <div className="lg:grid grid-cols-2 gap-12">
          {behindTheScenes.map((image) => {
            return (
              <div className="w-full max-h-60 overflow-hidden">
                <img src={urlFor(image).width(800).url()} />
              </div>
            );
          })}
        </div>
        <hr className="border-t-2 w-96 mx-auto border-gold mt-20" />
      </article>
    </Layout>
  );
};

Project.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.query;
  return await client.fetch(
    `
    *[_type == "project" && slug.current == $slug][0]{behindTheScenes, clientName, credits, frames, poster, title}
  `,
    { slug }
  );
};

export default Project;
