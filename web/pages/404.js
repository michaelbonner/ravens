import Layout from "../components/layout";

const FourOhFour = () => {
  return (
    <Layout title="404 | RAVENS">
      <div className="container mx-auto text-center">
        <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase mb-12">
          404: Not Found
        </h1>
        <p>The page you are looking for could not be found.</p>
      </div>
    </Layout>
  );
};

export default FourOhFour;
