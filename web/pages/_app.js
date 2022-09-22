import { useEffect } from "react";
import TagManager from "react-gtm-module";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: `GTM-NLX4T58` });
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
