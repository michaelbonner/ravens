import Layout from "../components/layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout title="Contact | RAVENS">
      <div className="prose text-center max-w-5xl mx-auto pt-12">
        <div className="py-12">
          <h2 className="font-bold text-3xl">Services</h2>
          <p className="pt-8 mt-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            scelerisque fringilla nibh at scelerisque. Praesent efficitur erat
            sem, in pulvinar massa pulvinar sit amet. Suspendisse potenti.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Aliquam et tempor nulla, eu porta nibh. Nam
            consectetur, neque quis tincidunt euismod, nulla sapien mollis diam,
            vel posuere ligula elit vitae quam. Cras sodales magna consectetur,
            interdum augue sit amet, viverra libero. Sed sollicitudin nibh ac
            est pretium ultrices. Nulla faucibus posuere elit, quis interdum leo
            rutrum ac. Fusce consequat pellentesque neque, ut maximus mauris
            malesuada at. Donec laoreet porta est, eu rhoncus purus imperdiet
            eget.
          </p>
        </div>

        <hr className="border-2 border-gold my-8" />
      </div>
    </Layout>
  );
}
