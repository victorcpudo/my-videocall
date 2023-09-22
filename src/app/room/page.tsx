"use client";

import { VideoRoom } from "@/components/VideoRoom";
import React from "react";
import { useVideoCall } from "../../contexts/RoomCtx";
import { VideoRoomHeader } from "@/components/VideoRoomHeader";
import { VideoRoomFooter } from "@/components/VideoRoomFooter";

const RoomPage = () => {
  const { isJoined } = useVideoCall();

  return (
    <div className="flex flex-col justify-center w-full max-h-screen">
      <VideoRoomHeader />

      {isJoined && <VideoRoom />}

      <VideoRoomFooter />
    </div>
  );
};

export default RoomPage;
