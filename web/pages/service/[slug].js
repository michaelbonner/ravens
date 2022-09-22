/* eslint-disable @next/next/no-img-element */
import BlockContent from "@sanity/block-content-to-react";
import groq from "groq";
import Link from "next/link";
import Layout from "../../components/layout";
import StandardHR from "../../components/standard-hr";
import { getClient } from "../../lib/sanity";
import urlForSanitySource from "../../lib/urlForSanitySource";
import FourOhFour from "../404";

const heroContent = (title) => {
  return (
    <h1 className="absolute inset-0 flex justify-center items-center">
      <span className="text-3xl lg:text-4xl text-center text-white  uppercase mx-4 lg:mx-0 mt-24 lg:mt-0 border-2 border-gold py-3 px-8 bg-black bg-opacity-25">
        {title}
      </span>
    </h1>
  );
};

const BannerBlocks = (section, index) => {
  return (
    <div>
      <div className="relative mb-12">
        {section.image && (
          <img
            alt="Banner image"
            className="w-full"
            src={urlForSanitySource(section.image).height(600).url()}
          />
        )}
      </div>

      <div className="text-center max-w-5xl mx-auto mb-12">
        <BlockContent blocks={section.text} />
      </div>
    </div>
  );
};

const GoldBarBlocks = (section, index) => {
  return <StandardHR />;
};

const HighlightBlocks = (section, index) => {
  return (
    <div className="text-center max-w-5xl mx-auto mb-12">
      <div className="relative mb-6">
        <img
          alt={section.heading}
          src={urlForSanitySource(section.image).width(500).url()}
          className="mx-auto"
        />
      </div>

      <div className="text-center">
        <h2 className="font-bold text-2xl uppercase mb-8">{section.heading}</h2>
        <BlockContent blocks={section.text} />
      </div>
    </div>
  );
};

const PlatformTable = (section, index) => {
  return (
    <div className="text-center max-w-5xl mx-auto mb-12">
      <table className="min-w-full mt-8">
        <thead>
          <tr className="border-b">
            <th className="text-sm pb-4 text-left" width="40%">
              Platform
            </th>
            <th className="text-sm pb-4" width="20%">
              Weight
            </th>
            <th className="text-sm pb-4" width="20%">
              REM Payload <br />
              (55 lb Limit)
            </th>
            <th className="text-sm pb-4" width="20%">
              EXT Payload <br />
              (63 lb)
            </th>
          </tr>
        </thead>
        <tbody>
          {section.platformTableRows?.map((row) => {
            return (
              <tr key={row._key}>
                <td className="pb-3 pt-3 text-xs text-left" width="40%">
                  {row.platform}
                </td>
                <td className="pb-3 pt-3 text-xs" width="20%">
                  {row.weight}
                </td>
                <td className="pb-3 pt-3 text-xs" width="20%">
                  {row.remPayload}
                </td>
                <td className="pb-3 pt-3 text-xs" width="20%">
                  {row.extPayload}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const CameraTable = (section, index) => {
  return (
    <div className="text-center max-w-5xl mx-auto mb-12">
      <table className="min-w-full mt-8">
        <thead>
          <tr className="border-b">
            <th className="text-sm pb-4 text-left">CAMERA</th>
            <th className="text-sm pb-4">Weight</th>
            <th className="text-sm pb-4">
              REM Payload <br />
              (w/ MOVI PRO)
            </th>
            <th className="text-sm pb-4">
              EXT Payload <br />
              (w/ MOVI PRO)
            </th>
          </tr>
        </thead>
        <tbody>
          {section.cameraTableRows?.map((row) => {
            return (
              <tr key={row._key}>
                <td className="pb-3 pt-3 text-xs text-left" width="40%">
                  {row.camera}
                </td>
                <td className="pb-3 pt-3 text-xs" width="20%">
                  {row.weight}
                </td>
                <td className="pb-3 pt-3 text-xs" width="20%">
                  {row.remPayload}
                </td>
                <td className="pb-3 pt-3 text-xs" width="20%">
                  {row.extPayload}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const CameraResolutionAndFpsTable = (section, index) => {
  return (
    <div className="text-center max-w-md mx-auto mb-12">
      <table className="min-w-full mt-8">
        <thead>
          <tr className="border-b">
            <th className="text-sm pb-4 text-left">Resolution</th>
            <th className="text-sm pb-4">FPS</th>
          </tr>
        </thead>
        <tbody>
          {section.cameraResolutionAndFpsRows?.map((row) => {
            return (
              <tr key={row._key}>
                <td className="pb-3 pt-3 text-xs text-left">
                  {row.resolution}
                </td>
                <td className="pb-3 pt-3 text-xs">{row.fps}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const LensesTable = (section, index) => {
  return (
    <div className="text-center max-w-5xl mx-auto mb-12">
      <table className="min-w-full mt-8">
        <thead>
          <tr className="border-b">
            <th className="text-sm pb-4 text-left">LENSES</th>
            <th className="text-sm pb-4">Weight</th>
            <th className="text-sm pb-4">
              REM Payload <br />
              (w/ ARRI MINI LF)
            </th>
            <th className="text-sm pb-4">
              EXT Payload <br />
              (w/ ARRI MINI LF)
            </th>
          </tr>
        </thead>
        <tbody>
          {section.lensesTableRows?.map((row) => {
            return (
              <tr key={row._key}>
                <td className="pb-3 pt-3 text-xs text-left" width="40%">
                  {row.lense}
                </td>
                <td className="pb-3 pt-3 text-xs" width="20%">
                  {row.weight}
                </td>
                <td className="pb-3 pt-3 text-xs" width="20%">
                  {row.remPayload}
                </td>
                <td className="pb-3 pt-3 text-xs" width="20%">
                  {row.extPayload}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const RemExtPayloadContent = (section, index) => {
  return (
    <div className="mx-auto lg:w-1/2">
      <p className="text-left text-sm pb-6">
        <span className="font-bold">REM PAYLOAD:</span> {section.remContent}
      </p>
      <p className="text-left text-sm">
        <span className="font-bold">EXT PAYLOAD:</span> {section.extContent}
      </p>
    </div>
  );
};

const Blocks = {
  banner: (section, index) => BannerBlocks(section, index),
  content: (section, index) => ContentBlocks(section, index),
  goldBar: (section, index) => GoldBarBlocks(section, index),
  highlight: (section, index) => HighlightBlocks(section, index),
  platformPayloadTable: (section, index) => PlatformTable(section, index),
  cameraPayloadTable: (section, index) => CameraTable(section, index),
  cameraResolutionAndFpsTable: (section, index) =>
    CameraResolutionAndFpsTable(section, index),
  lensesPayloadTable: (section, index) => LensesTable(section, index),
  payloadContent: (section, index) => RemExtPayloadContent(section, index),
};

const Service = ({ services, service }) => {
  if (!service) {
    return <FourOhFour />;
  }
  const { pageSections, title, poster, video_id } = service;

  const relatedServices = service.related_services || [];

  const relatedServicesToDisplay =
    relatedServices.length > 0
      ? relatedServices
      : services
          .filter((otherService) => service._id !== otherService._id)
          .filter((otherService, index) => index < 2);

  return (
    <Layout
      title={service.seo_title || `${title} | RAVENS Special Film Tactics`}
      heroContent={heroContent(title)}
      heroVideoUrl={
        video_id
          ? `https://player.vimeo.com/video/${video_id}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`
          : ``
      }
      heroImage={urlForSanitySource(poster).width(1600).url()}
      description={service.seo_description || service.title}
    >
      <article className="container mx-auto">
        <div className="mx-auto user-text">
          {pageSections?.map((section, index) => {
            return (
              <div key={index}>{Blocks[section._type](section, index)}</div>
            );
          })}
        </div>
      </article>
      <div>
        <h3 className="text-3xl font-bold text-center">OTHER SERVICES</h3>
        <div className="text-center max-w-5xl pt-12 mt-6 lg:mx-auto">
          <div className="flex justify-center mx-auto space-x-6 flex-wrap">
            {relatedServicesToDisplay.map((otherService, index) => {
              return (
                <Link
                  href={`/service/${otherService.slug?.current}`}
                  key={otherService._id}
                >
                  <a
                    className={`mb-8 lg:mb-0 py-8 lg:py-5 flex flex-col justify-between px-5 w-full sm:w-1/3 ${
                      index + 1 !== relatedServicesToDisplay.length
                        ? `border-b-2`
                        : ``
                    } lg:border-2 border-gold hover:border-gray-500 transition-all ease-in duration-300 bg-gradient-to-t from-transparent to-transparent hover:to-gray-700`}
                  >
                    <h3 className="text-2xl font-bold lg:px-10">
                      {otherService.title}
                    </h3>
                    <div className="flex flex-1 items-center my-8">
                      <div className="h-38 w-3/4 mx-auto">
                        <img
                          alt={otherService.title}
                          src={urlForSanitySource(otherService.thumb)
                            .width(450)
                            .url()}
                        />
                      </div>
                    </div>
                    <div className="leading-8 text-sm mb-5">
                      <BlockContent blocks={otherService.summary} />
                    </div>

                    <button className="rounded-full font-bold uppercase border border-white py-3 px-6 hover:bg-gold hover:text-black transition-all">
                      All Options
                    </button>
                  </a>
                </Link>
              );
            })}
          </div>

          <StandardHR />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `
    *[_type == "services"]{slug}
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

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"

  const { slug = "" } = context.params;
  const service = await getClient().fetch(
    groq`
    *[_type == "services" && slug.current == $slug][0]{
      _id,
      pageSections,
      slug,
      summary,
      thumb,
      title,
      poster,
      video_id,
      related_services[]->
    }
    `,
    { slug }
  );

  return {
    props: {
      services: await getClient().fetch(groq`
        *[_type == "services"][!(_id in path('drafts.**'))]|order(order asc)
      `),
      service,
    },
    notFound: !service,
  };
}

export default Service;
