import Layout from "../../components/layout";
import { getClient } from "../../lib/sanity";
import urlForSanitySource from "../../lib/urlForSanitySource";
import BlockContent from "@sanity/block-content-to-react";
import groq from "groq";
import Link from "next/link";
import Image from "next/image";
import FourOhFour from "../404";

const heroContent = (title) => {
  return (
    <h1 className="absolute inset-0 flex justify-center items-center">
      <span className="text-4xl text-center text-white  uppercase mx-4 lg:mx-0 mt-24 lg:mt-0 border-2 border-gold py-3 px-8">
        {title}
      </span>
    </h1>
  );
};

const BannerBlocks = (section, index) => {
  return (
    <div>
      <div className="relative mb-12">
        <img
          className="w-full"
          src={urlForSanitySource(section.image).height(600).url()}
        />
      </div>

      <div className="text-center max-w-5xl mx-auto mb-12">
        <BlockContent blocks={section.text} />
      </div>
    </div>
  );
};

const GoldBarBlocks = (section, index) => {
  return <hr className="border-t-2 w-full lg:w-96 mx-auto border-gold my-16" />;
};

const HighlightBlocks = (section, index) => {
  return (
    <div className="text-center max-w-5xl mx-auto mb-12">
      <div className="relative mb-6">
        <img
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
  lensesPayloadTable: (section, index) => LensesTable(section, index),
  payloadContent: (section, index) => RemExtPayloadContent(section, index),
};

const Service = ({ services, service }) => {
  if (!service) {
    return <FourOhFour />;
  }
  const { pageSections, title, poster } = service;

  const relatedServices = service.related_services || [];

  const relatedServicesToDisplay =
    relatedServices.length > 0
      ? relatedServices
      : services
          .filter((otherService) => service._id !== otherService._id)
          .filter((otherService, index) => index < 2);

  return (
    <Layout
      title={`${title} | RAVENS Special Film Tactics`}
      heroContent={heroContent(title)}
      heroImage={urlForSanitySource(poster).width(1600).url()}
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
        <div className="lg:flex lg:space-x-4 items-stretch justify-center text-center mt-6">
          {relatedServicesToDisplay.map((otherService) => {
            return (
              <Link
                key={otherService._id}
                href={`/service/${otherService.slug?.current}`}
              >
                <a className="mx-auto lg:mx-0 my-2 py-12 flex flex-col justify-between max-w-xs rounded-lg border border-gray-800 hover:border-gray-500 transition-all duration-300">
                  <h3 className="text-2xl font-bold">{otherService.title}</h3>
                  <div className="flex items-center my-8">
                    <div className="h-38 w-3/4 mx-auto">
                      <Image
                        src={urlForSanitySource(otherService.thumb)
                          .width(otherService.thumbWidth || 450)
                          .url()}
                        layout="intrinsic"
                        width={otherService.thumbWidth || 450}
                        height={otherService.thumbHeight || 300}
                      />
                    </div>
                  </div>
                  <div>
                    <BlockContent blocks={otherService.homeSummary} />
                    <div className="mt-6">
                      <p className="inline-block rounded-full font-bold uppercase tracking-wider border border-white pt-3 pb-2 px-8 hover:bg-gold hover:text-black transition-all">
                        View Details
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
        <hr className="border-t-2 w-full lg:w-96 mx-auto border-gold my-16" />
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
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;

  return {
    props: {
      services: await getClient().fetch(groq`
        *[_type == "services"]|order(order asc)
      `),
      service: await getClient().fetch(
        groq`
        *[_type == "services" && slug.current == $slug][0]{
          _id,
          pageSections,
          slug,
          summary,
          thumb,
          thumbWidth,
          thumbHeight,
          title,
          poster,
          related_services[]->
        }
        `,
        { slug }
      ),
    },
  };
}

export default Service;
