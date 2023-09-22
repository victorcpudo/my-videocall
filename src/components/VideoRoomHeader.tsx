import { useVideoCall } from "@/contexts/RoomCtx";
import { agoraClient } from "@/utils/agoraClient";
import { useSearchParams } from "next/navigation";
import React from "react";

export const VideoRoomHeader = () => {
  const { get } = useSearchParams();
  const channelName = get("channelName");
  const { users } = useVideoCall();

  let isRoomCreator = false;

  if (users) {
    isRoomCreator = users.length > 0 && users[0].uid === agoraClient.uid;
  }

  return (
    <header className="flex gap-4 w-full justify-between items-center p-6 bg-gray-950">
      <h1>{channelName}</h1>

      <p>You are a {agoraClient.role} in this call</p>

      {isRoomCreator && <p>You are the creator of this call</p>}

      <div className="w-16 h-16 bg-green-300 rounded-full" />
    </header>
  );
};
