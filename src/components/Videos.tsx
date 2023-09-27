import {
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";

import { agoraClient } from "@/utils/agoraClient";
import { useEffect } from "react";
import { useRemoteUsers } from "@/hooks/useRemoteUsers";
import { useRemoteVideoTracks } from "@/hooks/useRemoteVideoTrack";

export const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { users, tracks } = props;
  const remoteUsers = useRemoteUsers();
  const videoTracks = useRemoteVideoTracks(remoteUsers);

  console.log("MABLE VIDEOS USERS", remoteUsers);

  if (videoTracks.isLoading) return <>Loading!</>;

  return (
    <div>
      <div id="videos">
        <article className="flex flex-col gap-2 p-4 w-full">
          <p>You</p>

          <VideoPlayer videoTrack={tracks[1]} />
        </article>

        {remoteUsers.length > 0 &&
          remoteUsers.map((user) => {
            if (user.videoTrack && user.uid !== agoraClient.uid) {
              return (
                <VideoPlayer
                  key={user.uid}
                  className="col-span-1 sm:col-span-2 p-4 w-full min-w-full"
                  videoTrack={user.videoTrack}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};
