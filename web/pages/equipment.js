import Layout from "../components/layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout title="Equipment | RAVENS">
      <div className="prose text-center max-w-5xl mx-auto">
        <div >
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase">Equipment</h1>
          <section className="mt-16">
            <header className="relative mb-12">
              <Image 
                src="/images/altax-groundview.png"
                alt="FREEFLY ALTA X // AERIAL PLATFORM"
                layout="intrinsic"
                width={450}
                height={300}
              />
            </header>

            <div className="md:px-32 mb-20">
              <h2 className="font-bold mt-12 mb-3 text-2xl uppercase">FREEFLY ALTA X // AERIAL PLATFORM</h2>
              <p className="py-4 text-sm">Designed to get cinema camera packages into the air, the Freefly Alta X is the king of the roost. With a top speed of 60 mph, 10 min flight time, and camera configurable on both top and bottom, this bird is on the cutting edge of aerial cinema technology.</p>
              <p className="py-4 text-sm">Check out the more specific payload specs below:</p>

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
                  <tr>
                    <td  className="pb-4 pt-4 text-xs text-left">ALTA X W/ Batteries</td>
                    <td  className="pb-4 pt-4 text-xs">38.39 lbs</td>
                    <td  className="pb-4 pt-4 text-xs">16.61 lbs</td>
                    <td  className="pb-4 pt-4 text-xs">24.61 lbs</td>
                  </tr>
                  <tr>
                    <td  className="pb-4 pt-4 text-xs text-left">MOVI PRO GIMBAL</td>
                    <td  className="pb-4 pt-4 text-xs">5.84 lbs</td>
                    <td  className="pb-4 pt-4 text-xs">10.77 lbs</td>
                    <td  className="pb-4 pt-4 text-xs">18.77 lbs</td>
                  </tr>
                  <tr>
                    <td  className="pb-4 pt-4 text-xs text-left">RONIN 2 GIMBAL</td>
                    <td  className="pb-4 pt-4 text-xs">11 lbs</td>
                    <td  className="pb-4 pt-4 text-xs">5.61 lbs</td>
                    <td  className="pb-4 pt-4 text-xs">13.61 lbs</td>
                  </tr>
                  <tr>
                    <td  className="pb-4 pt-4 text-xs text-left">ALTA X W/ Batteries</td>
                    <td  className="pb-4 pt-4 text-xs">38.39 lbs</td>
                    <td  className="pb-4 pt-4 text-xs">16.61 lbs</td>
                    <td  className="pb-4 pt-4 text-xs">24.61 lbs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="md:px-28 lg:px-60">
              <p className="text-left text-sm pb-6"><span className="font-bold">REM PAYLOAD:</span> The remaining available payload for additional equipment (lenses, media, FIZ’s, etc) within FAA guidelines.</p>
              <p className="text-left text-sm"><span className="font-bold">EXT PAYLOAD:</span> The remaining available payload for additional equipment (lenses, media, FIZ’s, etc) based on platform capability during Summer days in the SLC valley (90 F | 5000 ft elevation).</p>
            </div>
            <hr className="border-b-1 w-1/2 m-auto mt-16 border-gold"/>
          </section>


          <section className="mb-16">
            <header className="relative mb-12">
              <Image 
                src="/images/land-rover-discovery-front.png"
                alt="Land Rover // Vehicle Tracking"
                layout="intrinsic"
                width={450}
                height={300}
              />
            </header>

            <div className="md:px-32">
              <h2 className="font-bold mb-3 text-2xl uppercase">LAND ROVER // VEHICLE TRACKING</h2>
              <p className="py-4 text-sm">This sporty little beast makes brutally difficult tracking shots look effortless. With a top speed of 90 mph, 250 mile range, and camera configurable on both front & rear, this vehicle unlocks the possibilities.</p>
            </div>

            <hr className="border-b-1 w-1/2 m-auto mt-16 border-gold"/>
          </section>

          <section className="">
            <header className="relative mb-12">
              <Image 
                src="/images/phantom-flex-4k.jpg"
                alt="PHANTOM FLEX 4K // HIGH-SPEED"
                layout="intrinsic"
                width={450}
                height={300}
              />     
            </header>
            
            <div className="md:px-32 mt-12">
              <h2 className=" mb-3 font-bold text-2xl uppercase">PHANTOM FLEX 4K // HIGH-SPEED</h2>
              <p className="py-4 text-sm">Nothing beats the Phantom Flex 4K for quality in the 1200 fps range. Made for specialists, this camera system requires an operator to make full use of it’s potential.</p>
            </div>

            <hr className="border-b-1 w-1/2 m-auto mt-16 border-gold"/>
          </section>
        </div>

      </div>
    </Layout>
  );
}
