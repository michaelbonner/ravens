import Layout from "../components/layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout title="Services | RAVENS">
      <div className="prose text-center mx-auto pt-12">
        <div className="py-12">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase">Services</h1>

          <section className="pt-8 mt-12">
            <header class="relative h-screen mb-12">
              <Image 
                src="/images/services-aerial.jpg"
                alt="Aerial Cinema"
                layout="fill"
              />              
            </header>
            <div>
              <h2 className="font-bold text-3xl uppercase">Aerial Cinema</h2>
              <p className="py-4">The tougher and more technical the shot, the better.</p>
              <p className="py-4">We offer a variety of platforms for any aerial need or budget. We have a well-oiled team with the experience and taste to get you the shot you want or better. Ready to travel anywhere in the world for production, but local to the beautiful vistas of Utah. See some of the options we provide:</p>
              <ul className="list-none">
                <li>HEAVY LIFT DRONE PLATFORM - FREEFLY ALTA X</li>
                <li>MID-SIZE DRONE PLATFORM - FREEFLY ASTRO</li>
                <li>SMALL DRONE PLATFORM - DJI MAVIC 2 PRO</li>
                <li>FPV CINEMA DRONE PLATFORM - SICARIO W/ RED KOMODO</li>
                <li>HELICOPTER AERIALS - CUSTOM PLATFORMS</li>
              </ul>
            </div>
          </section>

          <section className="pt-8 mt-12">
            <header class="relative h-screen mb-12">
              <Image 
                src="/images/services-pursuit-tracking.jpg"
                alt="Aerial Cinema"
                layout="fill"
              />              
            </header>
            <div>
              <h2 className="font-bold text-3xl uppercase">PURSUIT TRACKING</h2>
              <p className="py-4">Laying it all on the line, in the pursuit of glory.</p>
              <p className="py-4">We offer a variety of platforms for any pursuit need or budget. We have a well-oiled team with the experience and taste to get you the shot you want or better. Ready to travel anywhere in the world for production, but local to the beautiful vistas of Utah. See some of the options we provide:</p>
              <ul className="list-none">
                <li>AWD STREET & OFF-ROAD TRACKING - LAND ROVER RIG</li>
                <li>RUGGED/NARROW OFF-ROAD TRACKING - CAN-AM 4X4</li>
                <li>RUSSIAN ARM TRACKING - COMING SOON</li>
              </ul>
            </div>
          </section>

          <section className="pt-8 mt-12">
            <header class="relative h-screen mb-12">
              <Image 
                src="/images/services-super-slow-motion.jpg"
                alt="Aerial Cinema"
                layout="fill"
              />              
            </header>
            <div>
              <h2 className="font-bold text-3xl uppercase">SUPER SLOW-MOTION</h2>
              <p className="py-4">Revealing unseen wonders through high-speed cinematography.</p>
              <p className="py-4">We are experts at maximizing the Phantom Flex 4K platform to capture the secrets of movement <br/> hidden to the human eye. Tone and texture are a specialty. Story is our foundation.</p>
            </div>
          </section>
          
        </div>
        <hr className="border-2 border-gold my-8" />
      </div>
    </Layout>
  );
}
