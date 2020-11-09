import "styles/globals.scss";
import { Firebase } from "../fb/index";

function MyApp({ Component, pageProps }) {


  return (
    <Firebase>
      <Component {...pageProps} />
    </Firebase>
  );
}

export default MyApp;
