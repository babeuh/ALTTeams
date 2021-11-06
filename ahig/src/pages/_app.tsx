import "../styles/globals.css";
import "nprogress/nprogress.css";

import Router from "next/router";
import NProgress from "nprogress";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
  //console.log("%c[ROUTER]", "color: purple", `Navigating to ${url}`);
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const queryClient = new QueryClient();

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
