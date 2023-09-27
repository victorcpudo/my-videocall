"use client";

import { VideoRoom } from "@/components/VideoRoom";
import React from "react";
import { useVideoCall } from "../../contexts/RoomCtx";
import { VideoRoomHeader } from "@/components/VideoRoomHeader";
import { Controls } from "@/components/Controls";
import { AgoraRTCProvider } from "@/hooks/useRTCClient";
import { agoraClient } from "@/utils/agoraClient";

const RoomPage = () => {
  const { isJoined } = useVideoCall();

  return (
    <AgoraRTCProvider client={agoraClient}>
      <div className="flex flex-col justify-center w-full max-h-screen">
        <VideoRoomHeader />

        {isJoined && <VideoRoom />}

        <Controls />
      </div>
    </AgoraRTCProvider>
  );
};

export default RoomPage;
