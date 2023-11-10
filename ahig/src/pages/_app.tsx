import "../styles/globals.css";
import "nprogress/nprogress.css";

import Router from "next/router";
import NProgress from "nprogress";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { log } from "../modules/lib/log";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
  log("ROUTER", `Navigating to ${url}`)
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const queryClient = new QueryClient();

/** @ignore */
interface WindowDef {
  label: string;
}

/** @ignore */
declare global {
  interface Window {
    __TAURI__: {
      __windows: WindowDef[];
      __currentWindow: WindowDef;
    };
    __TAURI_INVOKE_KEY__: number

    rpc: {
      notify: (command: string, args?: { [key: string]: unknown }) => void;
    };
  }
}

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
