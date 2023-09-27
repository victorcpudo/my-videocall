import { useControls } from "@/hooks/useControls";

import React from "react";

export const Controls = () => {
  const { trackState, toggleMedia, leave } = useControls();

  return (
    <footer className="fixed bottom-0 flex gap-4 w-full justify-between p-6 bg-gray-950 bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity z-50">
      <button
        className={`w-16 h-16 text-gray-100 rounded-full ${
          trackState.audio ? "bg-gray-900" : "bg-red-500"
        }`}
        onClick={() => toggleMedia("audio")}
      >
        {trackState.audio ? "mute" : "unmute"}
      </button>

      <button
        className="w-16 h-16 bg-red-500 text-gray-100 rounded-full"
        onClick={() => leave()}
      >
        end call
      </button>

      <button
        className={`w-16 h-16 text-gray-100 rounded-full ${
          trackState.video ? "bg-gray-900" : "bg-red-500"
        }`}
        onClick={() => toggleMedia("video")}
      >
        {trackState.video ? "camera off" : "camera on"}
      </button>
    </footer>
  );
};
