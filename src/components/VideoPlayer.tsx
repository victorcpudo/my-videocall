import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export const VideoPlayer = ({
  user,
  className,
}: {
  user: IAgoraRTCRemoteUser;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && user.videoTrack) {
      user.videoTrack.play(ref.current);
    }
  }, [user.videoTrack]);

  useEffect(() => {
    if (ref.current && user.audioTrack) {
      user.audioTrack.play();
    }
  }, [user.audioTrack]);

  return <div ref={ref} className={twMerge(`aspect-video`, className)}></div>;
};
