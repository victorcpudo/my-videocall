import { agoraClient } from "@/utils/agoraClient";
import React from "react";

export const LoadingRoom = () => {
  if (
    agoraClient.connectionState === "CONNECTING" ||
    agoraClient.connectionState === "DISCONNECTING" ||
    agoraClient.connectionState === "RECONNECTING" ||
    agoraClient.connectionState === "DISCONNECTED"
  )
    return (
      <div className="flex flex-col justify-center">
        <h1>Loading</h1>
      </div>
    );

  return (
    <div className="flex flex-col justify-center">
      <h1>Loading</h1>
    </div>
  );
};
