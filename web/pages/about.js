import Layout from "../components/layout";
import client from "../lib/client";
import urlForSanitySource from "../lib/urlForSanitySource";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";

import BlockContent from "@sanity/block-content-to-react";

const About = (props) => {
  const { about = {} } = props;
console.log(about)
  return (
    <Layout title="About | RAVENS">
      <div className="prose text-center ">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase mb-12">About</h1>
					<div  className="relative h-60 md:h-96 lg:h-screen mb-12">
						<Image
							className="w-full"
  						src={urlForSanitySource(about.poster).url()}
							layout="fill"
						/>
					</div>

					<div className="max-w-5xl mx-auto">
						<section className="md:px-32 mb-20">
              <BlockContent blocks={about.text} />
						</section>

						<Link href="/contact">
							<a className="hidden lg:inline-block rounded-full font-bold uppercase tracking-wider border border-white py-2 px-8 hover:bg-gold hover:text-black transition-all">
								Get in Touch
							</a>
						</Link>
						<hr className="border-t-2 w-96 mx-auto border-gold my-16" />
					</div>
      </div>
    </Layout>
  );
}

About.getInitialProps = async () => ({
  about: await client.fetch(groq`
    *[_type == "about"][0]
  `),
});

export default About