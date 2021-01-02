import Layout from "../components/layout";

const heroContent = () => {
  return (
    <h1 className="flex justify-center items-center h-80 mt-12 mb-48">
      <img className="h-16" src="/images/slc-x-kauai.png" alt="SLC X KAUAI" />
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
      <div className="prose text-center max-w-5xl mx-auto pt-12">
        <div className="py-12">
          <h2 className="font-bold text-3xl">MASTERS OF OUR CRAFT</h2>
          <p className="pt-8 mt-12">
            You need more than just a tool or a technique. You need a skilled
            technician with an eye for beauty and a heart for storytelling. The
            RAVENS team can execute anything you need from aerials to vehicle
            pursuit to high speed cinematography, and add that special something
            to your story.
          </p>

          <p className="pt-8">
            If you have a production challenge, we are the people to talk to. If
            you have a story to tell, we are the only ones to talk to.
          </p>
          <p className="py-12">
            <a
              className="rounded-full uppercase tracking-wider border-2 border-white py-2 px-8"
              href="/"
            >
              Get in Touch
            </a>
          </p>
        </div>

        <hr className="border-2 border-gold my-8" />

        <div className="lg:grid grid-cols-3 gap-4 py-24">
          <div className="py-12">
            <h3 className="text-2xl font-bold">
              CINEMA
              <br />
              AERIALS
            </h3>
            <div className="h-32 flex items-center my-8">
              <img
                className="w-2/3 mx-auto"
                src="/images/altax-groundview.png"
                alt="AltaX Groundview"
              />
            </div>
            <p>
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
              <img
                className="w-2/3 mx-auto"
                src="/images/phantom-flex-4k.jpg"
                alt="AltaX Groundview"
              />
            </div>
            <p>
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
              <img
                className="w-2/3 mx-auto"
                src="/images/land-rover-discovery-front.png"
                alt="AltaX Groundview"
              />
            </div>
            <p>
              LAND ROVER W/ VVI LIGHT
              <br />
              CAN-AM 4X4 RIG
              <br />
              RUSSIAN ARM VEHICLE
            </p>
          </div>
        </div>

        <hr className="border-2 border-gold my-8" />

        <div className="py-12">
          <h2 className="font-bold text-3xl my-12 uppercase">Client Reviews</h2>
          <p>
            True professionals. They walked on set and you knew they meant
            business from the way they dressed to how they handled their
            equipment. This is a classy group. You can do no better than RAVENS.
          </p>
          <p>- Ryan Smith -</p>
          <img
            className="w-52 mx-auto"
            src="/images/customer-review-5-star.png"
            alt="5 stars"
          />
          <p className="py-12">
            <a
              className="rounded-full uppercase tracking-wider border-2 border-white py-2 px-8"
              href="https://g.page/bootpack/review?rc"
            >
              Give One
            </a>
          </p>
        </div>

        <hr className="border-2 border-gold my-8" />
      </div>
    </Layout>
  );
}
