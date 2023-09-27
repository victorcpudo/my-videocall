import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";
import { agoraClient } from "@/utils/agoraClient";

export const RemoteUsers = ({ users }: { users: IAgoraRTCRemoteUser[] }) => {
  if (users.length === 1) {
    const user = users[0];
    if (user.videoTrack && user.uid !== agoraClient.uid) {
      return (
        <VideoPlayer
          key={user.uid}
          className="col-span-1 sm:col-span-2 p-4 w-full min-w-full"
          videoTrack={user.videoTrack}
        />
      );
    }
  } else if (users.length > 1) {
    return (
      <div className="col-span-1 sm:col-span-2 grid grid-cols-1 gap-2">
        {users.map((user) => {
          if (user.videoTrack && user.uid !== agoraClient.uid) {
            return (
              <VideoPlayer
                key={user.uid}
                className="p-4 w-full min-w-full"
                videoTrack={user.videoTrack}
              />
            );
          } else return null;
        })}
      </div>
    );
  }

  return null;
};
