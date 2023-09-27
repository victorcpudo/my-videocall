import { ICameraVideoTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export const VideoPlayer = ({
  videoTrack,
  className,
}: {
  videoTrack: ICameraVideoTrack | IRemoteVideoTrack;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && videoTrack) {
      videoTrack.play(ref.current);
    }
  }, [videoTrack]);

  return <div ref={ref} className={twMerge(`aspect-video`, className)}></div>;
};
