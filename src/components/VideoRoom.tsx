"use client";

import React, { useCallback, useEffect } from "react";

import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

import { agoraClient } from "@/utils/agoraClient";
import { useGenerateToken } from "@/hooks/useGenerateToken";
import toast from "react-hot-toast/headless";
import { useVideoCall } from "@/contexts/RoomCtx";
import { LoadingRoom } from "./LoadingRoom";

import { Videos } from "./Videos";
import { useJoinRoom } from "@/hooks/useJoinRoom";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;

export const VideoRoom = () => {
  const { data, isLoading } = useGenerateToken();
  const { users, localTracks, setUsers } = useVideoCall();
  const { joinRoom } = useJoinRoom();

  const handleUserLeft = useCallback(() => {
    (user: IAgoraRTCRemoteUser, reason: string) => {
      console.log("MABLE REASON", reason);

      setUsers((previousUsers) =>
        previousUsers.filter((u) => u.uid !== user.uid)
      );

      toast.custom("USER LEFT ROOM", {
        className: "bg-blue-700 text-blue-100",
      });
    };
  }, [setUsers]);

  // Handles every user joining the call (local or remote)
  useEffect(() => {
    let mounted = true;

    if (mounted && data && data.token) {
      joinRoom(data);
    }
  }, [data]);

  if (isLoading || !data) return <LoadingRoom />;

  return <>{localTracks && <Videos users={users} tracks={localTracks} />}</>;
};
