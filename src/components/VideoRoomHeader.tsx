import { agoraClient } from "@/utils/agoraClient";
import { useSearchParams } from "next/navigation";
import React from "react";

export const VideoRoomHeader = () => {
  const { get } = useSearchParams();
  const channelName = get("channelName");

  return (
    <header className="flex gap-4 w-full justify-between items-center p-6 bg-gray-950">
      <h1>{channelName}</h1>

      <p>You are a {agoraClient.role} in this call</p>

      <div>
        {agoraClient.remoteUsers.map((user) => {
          return <p key={user.uid}>{user.uid}</p>;
        })}
      </div>
    </header>
  );
};
