import Layout from "../components/layout";

const FourOhFour = () => {
  return (
    <Layout title="404 | RAVENS">
      <div className="site-container page-body">
        <p className="section-kicker">Page not found</p>
        <h1 className="section-heading">Nothing here.</h1>
        <p className="page-lede">
          The page you are looking for could not be found.
        </p>
      </div>
    </Layout>
  );
};

export default FourOhFour;
