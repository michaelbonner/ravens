/* eslint-disable @next/next/no-img-element */
import BlockContent from "@sanity/block-content-to-react";
import groq from "groq";
import Layout from "../../components/layout";
import ServiceCard from "../../components/service-card";
import StandardHR from "../../components/standard-hr";
import { getClient } from "../../lib/sanity";
import urlForSanitySource from "../../lib/urlForSanitySource";
import FourOhFour from "../404";

const heroContent = (title) => (
  <>
    <p className="hero-eyebrow">What we do</p>
    <h1 className="hero-title">{title}</h1>
  </>
);

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

const ContentBlocks = (section) => (
  <div className="service-prose">
    <BlockContent blocks={section.text} />
  </div>
);

const GoldBarBlocks = (section, index) => {
  return <StandardHR />;
};

const HighlightBlocks = (section, index) => {
  const isTextOnly = !section.heading && !section.image;

  return (
    <div
      className={
        isTextOnly
          ? "service-highlight-note"
          : "text-center max-w-5xl mx-auto mb-12"
      }
    >
      {section.image && (
        <div className="relative mb-6">
          <img
            alt={section.heading || ""}
            src={urlForSanitySource(section.image).width(500).url()}
            className="mx-auto"
          />
        </div>
      )}

      <div className="text-center">
        {section.heading && (
          <h2 className="font-bold text-2xl uppercase mb-8">
            {section.heading}
          </h2>
        )}
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
      heroVideoId={video_id}
      heroImage={urlForSanitySource(poster).width(1600).url()}
      description={service.seo_description || service.title}
    >
      <article className="site-container service-detail">
        <div className="service-detail-intro">
          <p className="section-kicker">The details</p>
          <div className="editorial-grid">
            <h2 className="section-heading">{title}</h2>
            <div className="editorial-copy">
              <BlockContent blocks={service.summary} />
            </div>
          </div>
        </div>
        {pageSections?.map((section, index) => (
          <section
            className={`service-block service-block-${section._type}`}
            key={section._key || index}
          >
            {Blocks[section._type]?.(section, index)}
          </section>
        ))}
      </article>
      {relatedServicesToDisplay.length > 0 && (
        <section className="editorial-section warm-section related-services">
          <div className="site-container">
            <p className="section-kicker">Keep exploring</p>
            <h2 className="section-heading">Other services</h2>
            <div className="service-grid">
              {relatedServicesToDisplay.map((otherService, index) => (
                <ServiceCard
                  key={otherService._id}
                  service={otherService}
                  number={index + 1}
                  summary={otherService.summary}
                />
              ))}
            </div>
          </div>
        </section>
      )}
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
