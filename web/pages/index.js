import Layout from "../components/layout";
import Image from "next/image";
import Link from "next/link";

const heroContent = () => {
  return (
    <h1 className="flex justify-center items-center h-80 mt-12 mb-48">
      <span className="w-96">
        <Image
          alt="SLC X KAUAI"
          height="346"
          src="/images/slc-x-kauai.png"
          title="SLC X Kauai"
          width="1896"
        />
      </span>
    </h1>
  );
};

export default function Home() {
  return (
    <Layout
      title="RAVENS | Special Film Tactics"
      heroContent={heroContent()}
      heroImage="/images/home-hero.jpg"
    >
      <div className="prose text-center max-w-2xl mx-auto pt-12">
        <div>
          <h2 className="font-bold text-3xl">SPECIALTY PRODUCTION UNIT</h2>
          <p className="pt-8 mt-8">
            As skilled technicians with a unique sensibility for storytelling,
            RAVENS are poised to execute nearly any mission from heavy lift
            aerials to pursuit tracking or technical phantom flex high speed
            work.{" "}
          </p>

          <p className="pt-8">
            If your production calls for specialty services we’d love to explore
            possibilities.
          </p>
          <p className="py-12">
            <Link href="/contact">
              <a className="rounded-full font-bold uppercase tracking-wider border border-white py-3 px-8 hover:bg-gold hover:text-black transition-all">
                Get in Touch
              </a>
            </Link>
          </p>
        </div>

        <hr className="border-2 border-gold my-6" />

        <div className="lg:grid grid-cols-3 gap-4">
          <div className="py-12">
            <h3 className="text-2xl font-bold">
              CINEMA
              <br />
              AERIALS
            </h3>
            <div className="h-32 flex items-center my-8">
              <div className="w-2/3 mx-auto">
                <Image
                  alt="AltaX Groundview"
                  height="513"
                  src="/images/altax-groundview.png"
                  width="1178"
                />
              </div>
            </div>
            <p className="leading-8">
              CINEMA PACKAGES &lt; 35LBS
              <br />
              MID-SIZE W/ RED KOMODO
              <br />
              FPV W/ RED OR BLACK MAGIC
            </p>
          </div>
          <div className="py-12">
            <h3 className="text-2xl font-bold">
              4K PHANTOMFLEX
              <br />
              HIGH-SPEED
            </h3>
            <div className="h-32 flex items-center my-8">
              <div className="w-2/3 mx-auto">
                <Image
                  alt="Phantom Flex 4k"
                  height="939"
                  src="/images/phantom-flex-4k.jpg"
                  width="1500"
                />
              </div>
            </div>
            <p className="leading-8">
              ACTION / AUTO
              <br />
              PRODUCT / TABLETOP
              <br />
              TEXTURES / EXPERIMENTAL
            </p>
          </div>
          <div className="py-12">
            <h3 className="text-2xl font-bold">
              PURSUIT
              <br />
              VEHICLES
            </h3>
            <div className="h-32 flex items-center my-8">
              <div className="w-2/3 mx-auto">
                <Image
                  alt="Land rover discovery front"
                  height="1067"
                  src="/images/land-rover-discovery-front.png"
                  width="1600"
                />
              </div>
            </div>
            <p className="leading-8">
              LAND ROVER W/ VVI LIGHT
              <br />
              CAN-AM 4X4 RIG
              <br />
              RUSSIAN ARM VEHICLE
            </p>
          </div>
        </div>

        <div className="py-6">
          <Link href="/services">
            <a className="rounded-full font-bold uppercase tracking-wider border border-white py-3 px-8 hover:bg-gold hover:text-black transition-all">
              All Options
            </a>
          </Link>
        </div>

        <hr className="border-2 border-gold my-8" />
      </div>
    </Layout>
  );
}
