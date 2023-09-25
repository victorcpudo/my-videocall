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

  const handleToggleCamera = async () => {
    setIsVideoOn(!isVideoOn);
  };

  return (
    <footer className="fixed bottom-0 flex gap-4 w-full justify-between p-6 bg-gray-950 bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity z-50">
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
