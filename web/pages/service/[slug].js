import Image from "next/image";
import Layout from "../../components/layout";
import client from "../../lib/client";
import urlForSanitySource from "../../lib/urlForSanitySource";
import BlockContent from '@sanity/block-content-to-react'
// const BlockContent = require('@sanity/block-content-to-react')

const Service = (props) => {
  const {
    pageSections = [],
    title = "",
  } = props;

  const BannerBlocks = (section, index) => {
    return (
      <div key={index}>
        <div  className="relative h-60 md:h-96 lg:h-screen mb-12">
          <Image
            className="w-full"
            src={urlForSanitySource(section.image).height(600).url()}
            layout="fill"
          />                
        </div>

        <div className="text-center max-w-5xl mx-auto mb-12" key={index}>
          <BlockContent blocks={section.text} />
        </div>
      </div>
    )
  }
  
  const HighlightBlocks = (section, index) => { 
    return (
      <div className="text-center max-w-5xl mx-auto mb-12" key={index}>
        <div className="relative mb-6">
          <img 
            src={urlForSanitySource(section.image).width(500).url()}
            className="mx-auto"
          />                    
        </div>
              
        <div className="text-center">
          <h2 className="font-bold text-2xl uppercase mb-8">{section.heading}</h2>
          <BlockContent blocks={section.text} />
          <hr className="border-t-2 w-96 mx-auto border-gold my-16" />
        </div>
      </div>
    )
  }

  const PlatformTable = (section, index) => {
    return (
      <div className="text-center max-w-5xl mx-auto mb-12" key={index}>
        <table className="min-w-full mt-8 ">
          <thead>
            <tr className="border-b">
              <th className="text-sm pb-4 text-left">Platform</th>
              <th className="text-sm pb-4">Weight</th>
              <th className="text-sm pb-4">REM Payload <br/>(55 lb Limit)</th>
              <th className="text-sm pb-4">EXT Payload <br/>(63 lb)</th>
            </tr>
          </thead>
          <tbody>
          {section.platformTableRows.map((row) => {
            return (<tr key={row._key} >
              <td  className="pb-3 pt-3 text-xs text-left">{row.platform}</td>
              <td  className="pb-3 pt-3 text-xs">{row.weight}</td>
              <td  className="pb-3 pt-3 text-xs">{row.remPayload}</td>
              <td  className="pb-3 pt-3 text-xs">{row.extPayload}</td>
            </tr>)
          })}
          </tbody>
        </table>
      </div>
    )
  }

  const CameraTable = (section, index) => {
    return (
      <div className="text-center max-w-5xl mx-auto mb-12" key={index}>
        <table className="min-w-full mt-8 ">
          <thead>
            <tr className="border-b">
              <th className="text-sm pb-4 text-left">CAMERA</th>
              <th className="text-sm pb-4">Weight</th>
              <th className="text-sm pb-4">REM Payload <br/>(w/ MOVI PRO)</th>
              <th className="text-sm pb-4">EXT Payload <br/>(w/ MOVI PRO)</th>
            </tr>
          </thead>
          <tbody>
          {section.cameraTableRows.map((row) => {
            return (<tr key={row._key} >
              <td  className="pb-3 pt-3 text-xs text-left">{row.camera}</td>
              <td  className="pb-3 pt-3 text-xs">{row.weight}</td>
              <td  className="pb-3 pt-3 text-xs">{row.remPayload}</td>
              <td  className="pb-3 pt-3 text-xs">{row.extPayload}</td>
            </tr>)
          })}
          </tbody>
        </table>
      </div>
    )
  }

  const LensesTable = (section, index) => {
    return (
      <div className="text-center max-w-5xl mx-auto mb-12" key={index}>
        <table className="min-w-full mt-8 ">
          <thead>
            <tr className="border-b">
              <th className="text-sm pb-4 text-left">LENSES</th>
              <th className="text-sm pb-4">Weight</th>
              <th className="text-sm pb-4">REM Payload <br/>(w/ ARRI MINI LF)</th>
              <th className="text-sm pb-4">EXT Payload <br/>(w/ ARRI MINI LF)</th>
            </tr>
          </thead>
          <tbody>
          {section.lensesTableRows.map((row) => {
            return (<tr key={row._key} >
              <td  className="pb-3 pt-3 text-xs text-left">{row.lense}</td>
              <td  className="pb-3 pt-3 text-xs">{row.weight}</td>
              <td  className="pb-3 pt-3 text-xs">{row.remPayload}</td>
              <td  className="pb-3 pt-3 text-xs">{row.extPayload}</td>
            </tr>)
          })}
          </tbody>
        </table>
      </div>
    )
  }

  const RemExtPayloadContent = (section, index) => {  
    return (
      <div className="mx-auto lg:w-1/2" key={index}>
        <p className="text-left text-sm pb-6"><span className="font-bold">REM PAYLOAD:</span> {section.remContent}</p>
        <p className="text-left text-sm"><span className="font-bold">EXT PAYLOAD:</span> {section.extContent}</p>
      </div>
    )
  }

  const Blocks = {
    banner: (section, index) => BannerBlocks(section, index),
    content: (section, index) => ContentBlocks(section, index),
    highlight: (section, index) => HighlightBlocks(section, index),
    platformPayloadTable: (section, index) => PlatformTable(section, index),
    cameraPayloadTable: (section, index) => CameraTable(section, index),
    lensesPayloadTable: (section, index) => LensesTable(section, index),
    payloadContent: (section, index) => RemExtPayloadContent(section, index)
  }

  

  return (
    <Layout title={`${title} | RAVENS Special Film Tactics`}>
      <article>
        <div className="flex justify-center mb-12">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold">
            {title}
          </h1>
        </div>

        <div className="mx-auto">
          {pageSections.map((section, index) => {
            return Blocks[section._type](section,index)
          })}
        </div>

      </article>
    </Layout>
  );
};

Service.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.query;
  return await client.fetch(
    `
    *[_type == "services" && slug.current == $slug][0]{summary, pageSections, title}
  `,
    { slug }
  );
};

export default Service;
