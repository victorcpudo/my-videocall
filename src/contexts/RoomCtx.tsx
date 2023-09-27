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
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  useEffect(() => {
    if (channelName && channelName.length > 0) {
      setIsJoined(true);
    }
  }, [channelName]);

  const values = useMemo(
    () => ({
      isJoined,
      users,
      localTracks,
      trackState,
      setIsJoined,
      setTrackState,
      setUsers,
      setLocalTracks,
    }),
    [isJoined, users, localTracks, trackState]
  );

  return <RoomCtx.Provider value={values}>{children}</RoomCtx.Provider>;
};
