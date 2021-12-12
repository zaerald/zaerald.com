import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import { useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";

function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(false);

  TopBarProgress.config({
    barColors: {
      "0": "#007acc",
      "1.0": "#007acc",
    },
    shadowBlur: 5,
  });

  Router.events.on("routeChangeStart", () => {
    setProgress(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
  });

  return (
    <>
      {progress && <TopBarProgress />}
      <Component {...pageProps} />
    </>
  );
}

export default App;

