"use client";

import { RoomCtxType } from "@/interface/RoomCtxType";
import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";

export const useVideoCall = () => {
  return useContext(RoomCtx);
};

export const RoomCtx = React.createContext({} as RoomCtxType);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useSearchParams();
  const channelName = params.get("channelName");
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [localTracks, setLocalTracks] =
    useState<[IMicrophoneAudioTrack, ICameraVideoTrack]>();
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  useEffect(() => {
    if (channelName && channelName.length > 0) {
      setIsJoined(true);
    }
  }, [channelName]);

  const values = useMemo(
    () => ({
      isJoined,
      isVideoOn,
      isMuted,
      users,
      localTracks,
      setIsJoined,
      setIsVideoOn,
      setIsMuted,
      setUsers,
      setLocalTracks,
    }),
    [isJoined, isVideoOn, isMuted, users, localTracks]
  );

  return <RoomCtx.Provider value={values}>{children}</RoomCtx.Provider>;
};
