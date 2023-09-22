import { useVideoCall } from "@/contexts/RoomCtx";
import { agoraClient } from "@/utils/agoraClient";
import { useRouter } from "next/navigation";
import React from "react";

export const VideoRoomFooter = () => {
  const { push } = useRouter();
  const {
    isMuted,
    isVideoOn,
    localTracks,
    setIsJoined,
    setUsers,
    setIsMuted,
    setIsVideoOn,
  } = useVideoCall();

  const handleToggleMicrofone = () => {
    localTracks[0].setMuted(!localTracks[0].muted);

    setIsMuted(!isMuted);
  };

  const handleToggleCamera = () => {
    localTracks[1].setMuted(!localTracks[1].muted);

    setIsVideoOn(!isVideoOn);
  };

  return (
    <footer className="flex gap-4 w-full justify-between p-6 bg-slate-950">
      <button
        className="w-16 h-16 bg-gray-900 text-gray-100 rounded-full"
        onClick={() => {
          handleToggleMicrofone();
        }}
      >
        {isMuted ? "unmute" : "mute"}
      </button>

      <button
        className="w-16 h-16 bg-red-500 text-gray-100 rounded-full"
        onClick={() => {
          setIsJoined(false);

          setUsers([]);

          push("/");
        }}
      >
        end call
      </button>

      <button
        className="w-16 h-16 bg-gray-900 text-gray-100 rounded-full"
        onClick={() => {
          handleToggleCamera();
        }}
      >
        {isVideoOn ? "camera on" : "camera off"}
      </button>
    </footer>
  );
};
