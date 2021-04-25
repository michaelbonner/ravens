import Layout from "../components/layout";
import client from "../lib/client";
import urlForSanitySource from "../lib/urlForSanitySource";
import groq from "groq";
import Image from "next/image";

const Equipment = (props) => {
  const { equipment = [] } = props;
  const platformTableRows = equipment?.platformTableRows ?? [];
  const cameraTableRows = equipment?.cameraTableRows ?? [];
  const lensesTableRows = equipment?.lensesTableRows ?? [];

  return (
    <Layout title="Equipment | RAVENS">
      <div className="text-center max-w-5xl mx-auto">
        <div>
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase">
            Equipment
          </h1>
          <section className="mt-16">
            <header className="relative mb-12">
              <Image
                src={urlForSanitySource(equipment.aerialImage)
                  .width(450)
                  .height(300)
                  .url()}
                layout="intrinsic"
                width="450"
                height="300"
              />
            </header>

            <div className="md:px-32 mb-20">
              <h2 className="font-bold mt-12 mb-3 text-2xl uppercase">
                {equipment.aerialContentHeading}
              </h2>
              <p className="py-4 text-sm">{equipment.aerialContent}</p>

              <table className="min-w-full mt-8 ">
                <thead>
                  <tr className="border-b">
                    <th className="text-sm pb-4 text-left">Platform</th>
                    <th className="text-sm pb-4">Weight</th>
                    <th className="text-sm pb-4">
                      REM Payload <br />
                      (55 lb Limit)
                    </th>
                    <th className="text-sm pb-4">
                      EXT Payload <br />
                      (63 lb)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {platformTableRows.map((row) => {
                    return (
                      <tr key={row._key}>
                        <td className="pb-3 pt-3 text-xs text-left">
                          {row.platform}
                        </td>
                        <td className="pb-3 pt-3 text-xs">{row.weight}</td>
                        <td className="pb-3 pt-3 text-xs">{row.remPayload}</td>
                        <td className="pb-3 pt-3 text-xs">{row.extPayload}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <table className="min-w-full mt-8 ">
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
                  {cameraTableRows.map((row) => {
                    return (
                      <tr key={row._key}>
                        <td className="pb-3 pt-3 text-xs text-left">
                          {row.camera}
                        </td>
                        <td className="pb-3 pt-3 text-xs">{row.weight}</td>
                        <td className="pb-3 pt-3 text-xs">{row.remPayload}</td>
                        <td className="pb-3 pt-3 text-xs">{row.extPayload}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <table className="min-w-full mt-8 ">
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
                  {lensesTableRows.map((row) => {
                    return (
                      <tr key={row._key}>
                        <td className="pb-3 pt-3 text-xs text-left">
                          {row.lenses}
                        </td>
                        <td className="pb-3 pt-3 text-xs">{row.weight}</td>
                        <td className="pb-3 pt-3 text-xs">{row.remPayload}</td>
                        <td className="pb-3 pt-3 text-xs">{row.extPayload}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:px-28 lg:px-60">
              <p className="text-left text-sm pb-6">
                <span className="font-bold">REM PAYLOAD:</span>{" "}
                {equipment.remContent}
              </p>
              <p className="text-left text-sm">
                <span className="font-bold">EXT PAYLOAD:</span>{" "}
                {equipment.extContent}
              </p>
            </div>
            <hr className="border-b-1 w-1/2 m-auto mt-16 border-gold" />
          </section>

          <section className="mb-16">
            <header className="relative mb-12">
              <Image
                src={urlForSanitySource(equipment.vehicleImage)
                  .width(450)
                  .height(300)
                  .url()}
                layout="intrinsic"
                width="450"
                height="300"
              />
            </header>

            <div className="md:px-32">
              <h2 className="font-bold mb-3 text-2xl uppercase">
                {equipment.vehicleContentHeading}
              </h2>
              <p className="py-4 text-sm">{equipment.vehicleContent}</p>
            </div>

            <hr className="border-b-1 w-1/2 m-auto mt-16 border-gold" />
          </section>

          <section className="">
            <header className="relative mb-12">
              <Image
                src={urlForSanitySource(equipment.highSpeedImage)
                  .width(450)
                  .height(300)
                  .url()}
                layout="intrinsic"
                width="450"
                height="300"
              />
            </header>

            <div className="md:px-32 mt-12">
              <h2 className=" mb-3 font-bold text-2xl uppercase">
                {equipment.highSpeedContentHeading}
              </h2>
              <p className="py-4 text-sm">{equipment.highSpeedContent}</p>
            </div>

            <hr className="border-b-1 w-1/2 m-auto mt-16 border-gold" />
          </section>
        </div>
      </div>
    </Layout>
  );
};

Equipment.getInitialProps = async () => ({
  equipment: await client.fetch(groq`
    *[_type == "equipment"][0]
  `),
});

export default Equipment;
