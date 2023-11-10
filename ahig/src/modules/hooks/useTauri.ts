import { useRouter } from "next/router";
import { useEffect } from "react";
import { log } from "../lib/log";
import { useTauriKeyStore } from "./stores/useTauriKeyStore";
import { useTauriStore } from "./stores/useTauriStore";

export const useTauri = () => {
  const router = useRouter();
  const tauriStore = useTauriStore();
  const tauriKeyStore = useTauriKeyStore();

  const doTauriThings = async () => {
    const tauri_api = await import("@tauri-apps/api");
    const tauriInfo = {
      name: await tauri_api.app.getName(),
      version: await tauri_api.app.getVersion(),
      tauriVersion: await tauri_api.app.getTauriVersion(),
    };

    tauri_api.window.appWindow.setDecorations(false);

    let size = (await tauri_api.window.currentMonitor()).size;
    let width = size.width / 2;
    let height = size.height / 2;
    let hasSetSize = tauriStore.state.hasSetSize;

    // If we already set size once, don't do it again in case user resized it
    if (!hasSetSize) {
      tauri_api.window.appWindow.setSize(
        new tauri_api.window.LogicalSize(width, height)
      );
      hasSetSize = true;
    }

    //Save some tauri info
    tauriStore.setState({
      api: tauri_api,
      info: tauriInfo,
      is: true,
      hasSetSize: hasSetSize,
      isMaximized: await tauri_api.window.appWindow.isMaximized(),
    });
  };

  useEffect(() => {
    if (router.query.tauri_key !== undefined) {
      // Check if we have it in query (first time it arrives), this is first so that we don't run into an old key

      log("TAURI", `Key located in query: ${router.query.tauri_key}`);
      // Store it for next time
      tauriKeyStore.setTauriKey({
        tauriKey: router.query.tauri_key.toString(),
      });

      // Do our logic
      window.__TAURI_INVOKE_KEY__ = Number(router.query.tauri_key);
      doTauriThings();
    } else if (tauriKeyStore.tauriKey !== "") {
      // Check if it is in the tauri store

      log("TAURI", `Key is stored: ${tauriKeyStore.tauriKey}`);
      // Do our logic
      window.__TAURI_INVOKE_KEY__ = Number(tauriKeyStore.tauriKey);
      doTauriThings();
    } else {
      // Key is not stored or contained in the query, assume we aren't on tauri: do nothing

      log("TAURI", "Key not found");
    }
    // Needs to be router.query so it updates on url updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
};
