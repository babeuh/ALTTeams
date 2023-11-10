import React, { useEffect } from "react";
import { useTauriStore } from "../../modules/hooks/stores/useTauriStore";

export const TitlebarComponent = () => {
  const tauriStore = useTauriStore();

  return (
    <>
      {tauriStore.state.is ? (
        <div
          data-tauri-drag-region
          className="bg-primary-800 text-primary-100 w-full h-5 select-none flex justify-end"
        >
          <h4 className="ml-2" data-tauri-drag-region>
            ALTTeams
          </h4>
          <div className="w-full" data-tauri-drag-region></div>
          <div
            className="hover:bg-primary-600 inline-flex justify-center items-center w-5 h-5"
            onClick={() => {
              tauriStore.state.api.window.appWindow.minimize();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="1.24"
              viewBox="0 0 15 1.24"
              fill="currentColor"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="svg8">
                  <g id="rect917">
                    <rect width="15" height="1.24" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div
            className="hover:bg-primary-600 inline-flex justify-center items-center w-5 h-5"
            onClick={() => {
              tauriStore.state.api.window.appWindow.toggleMaximize();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="currentColor"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="svg8">
                  <g id="rect81">
                    <path d="M15,15H0V0H15ZM1.24,13.76H13.76V1.24H1.24Z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div
            className="hover:bg-accent inline-flex justify-center items-center w-5 h-5"
            onClick={() => {
              tauriStore.state.api.window.appWindow.close();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="currentColor"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="svg8">
                  <g id="g926">
                    <g id="path920">
                      <path d="M14.34,15a.65.65,0,0,1-.46-.19L.19,1.12a.67.67,0,0,1,0-.93.67.67,0,0,1,.93,0L14.81,13.88a.67.67,0,0,1,0,.93A.66.66,0,0,1,14.34,15Z" />
                    </g>
                    <g id="path922">
                      <path d="M.65,15a.65.65,0,0,1-.46-.19.67.67,0,0,1,0-.93L13.88.19a.67.67,0,0,1,.93,0,.67.67,0,0,1,0,.93L1.12,14.81A.66.66,0,0,1,.65,15Z" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      ) : null}
    </>
  );
};
