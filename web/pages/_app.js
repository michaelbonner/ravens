import "../styles/globals.css";
import TagManager from "react-gtm-module";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.VERCEL_ENV === "production") {
      TagManager.initialize({ gtmId: `GTM-NLX4T58` });
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
