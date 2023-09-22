"use client";

import { IAgoraRTCRemoteUser, ILocalTrack } from "agora-rtc-sdk-ng";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";

export interface RoomCtxType {
  isJoined: boolean;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  isVideoOn: boolean;
  setIsVideoOn: React.Dispatch<React.SetStateAction<boolean>>;
  users: IAgoraRTCRemoteUser[];
  setUsers: React.Dispatch<React.SetStateAction<IAgoraRTCRemoteUser[]>>;
  roomCreator: IAgoraRTCRemoteUser | null;
  setRoomCreator: React.Dispatch<
    React.SetStateAction<IAgoraRTCRemoteUser | null>
  >;
}

export const useVideoCall = () => {
  return useContext(RoomCtx);
};

export const RoomCtx = React.createContext({} as RoomCtxType);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useSearchParams();
  const channelName = params.get("channelName");
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [roomCreator, setRoomCreator] = useState<IAgoraRTCRemoteUser | null>(
    null
  );

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
      roomCreator,
      setIsJoined,
      setIsVideoOn,
      setIsMuted,
      setUsers,
      setRoomCreator,
    }),
    [isJoined, isVideoOn, isMuted, roomCreator, users]
  );

  return <RoomCtx.Provider value={values}>{children}</RoomCtx.Provider>;
};
