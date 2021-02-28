import Layout from "../components/layout";
import client from "../lib/client";
import urlForSanitySource from "../lib/urlForSanitySource";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";

const About = (props) => {
  const { about = [] } = props;
  return (
    <Layout title="About | RAVENS">
      <div className="prose text-center ">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase mb-12">About</h1>
          
					<div  className="relative h-60 md:h-96 lg:h-screen mb-12">
            <Image
                className="w-full"
                src="/images/about-bg.jpg"
                layout="fill"
            />
					</div>

					<div className="max-w-5xl mx-auto">
						<section className="md:px-32 mb-20">
							<h2 className="font-bold mt-12 mb-3 text-2xl uppercase">Who Are The Ravens?</h2>
							<p className="py-4 text-sm">With nearly 3 decades of combined experience, the RAVENS team is used to creating cinema magic on land, air, and sea. We hold ourselves to the highest standards of professionalism, dependability, subject knowledge, and skill. We are here to assist you in bringing your vision to life and maybe add a little special something along the way.</p>
						</section>

						<section className="md:px-32 mb-20">
							<h2 className="font-bold mt-12 mb-3 text-2xl uppercase">OFFICES IN SLC & KAUAI</h2>
							<p className="py-4 text-sm">es, you read that correctly. With our home base in Salt Lake City we have vast experience and connections in our local market. With a deep working knowledge of the island of Kauai, we have scouts and crew ready to capture some of the world’s most iconic locations. Of course, we’ve traveled the globe and aren’t afraid to explore new frontiers either.</p>
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

// Equipment.getInitialProps = async () => ({
//   equipment: await client.fetch(groq`
//     *[_type == "equipment"][0]
//   `),
// });

export default About