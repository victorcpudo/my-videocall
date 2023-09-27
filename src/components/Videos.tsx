import {
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
} from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";

import { agoraClient } from "@/utils/agoraClient";
import { useRemoteUsers } from "@/hooks/useRemoteUsers";
import { useRemoteVideoTracks } from "@/hooks/useRemoteVideoTrack";
import { RemoteUsers } from "./RemoteUsers";

export const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { tracks } = props;
  const remoteUsers = useRemoteUsers();
  const videoTracks = useRemoteVideoTracks(remoteUsers);

  console.log("MABLE REMOTE USERS", remoteUsers);

  if (videoTracks.isLoading) return <>Loading!</>;

  let gridTemplate = "col-span-2";

  if (remoteUsers.length === 2) {
    gridTemplate = "grid-cols-1";
  } else if (remoteUsers.length >= 3) {
    gridTemplate = "grid-cols-2";
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 h-full min-h-[75vh] max-h-[90vh]">
      <div
        className={`col-span-1 sm:col-span-2 grid ${gridTemplate} gap-4 p-8`}
      >
        {remoteUsers.map((user) => {
          if (user.videoTrack && user.uid !== agoraClient.uid) {
            return (
              <VideoPlayer
                key={user.uid}
                className="w-full min-w-full"
                videoTrack={user.videoTrack}
              />
            );
          } else return null;
        })}
      </div>

      <article className="flex flex-col gap-2 p-4 w-full">
        <p>You</p>

        <VideoPlayer videoTrack={tracks[1]} />
      </article>
    </section>
  );
};
