import { GenerateRtcTokenResponse } from "./useGenerateToken";
import { agoraClient } from "@/utils/agoraClient";
import AgoraRTC, { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import toast from "react-hot-toast";
import { useVideoCall } from "@/contexts/RoomCtx";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;

export const useJoinRoom = () => {
  const { setUsers, setLocalTracks } = useVideoCall();

  // const handleUserJoined = async (
  //   user: IAgoraRTCRemoteUser,
  //   mediaType: "video" | "audio"
  // ) => {
  //   console.log("MABLE USER PUBLISHED", user, mediaType);

  //   await agoraClient.subscribe(user, mediaType);

  //   if (mediaType === "video" && user.videoTrack) {
  //     console.log("MABLE NEW USER JOINED", user);

  //     setUsers((previousUsers) => {
  //       const existingUserIndex = previousUsers.findIndex(
  //         (u) => u.uid === user.uid
  //       );

  //       if (existingUserIndex !== -1) {
  //         const updatedUsers = [...previousUsers];

  //         updatedUsers[existingUserIndex] = user;

  //         return updatedUsers;
  //       } else return [...previousUsers, user];
  //     });
  //   }

  //   if (mediaType === "audio" && user.audioTrack) {
  //     user.audioTrack.play();
  //   }

  //   toast.success("USER JOINED ROOM");
  // };

  const handleJoinRoom = async (data: GenerateRtcTokenResponse) => {
    const newUserUID = Math.floor(Math.random());

    if (
      agoraClient.connectionState === "CONNECTED" ||
      agoraClient.connectionState === "CONNECTING"
    ) {
      return;
    }

    // agoraClient.on("user-published", handleUserJoined);

    const uid = await agoraClient.join(
      APP_ID,
      data.channel,
      data.token,
      newUserUID
    );

    const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    const [audioTrack, videoTrack] = tracks;

    setLocalTracks(tracks);

    setUsers((previousUsers) => [
      ...previousUsers,
      {
        uid,
        videoTrack,
        audioTrack,
        hasVideo: true,
        hasAudio: false,
      } as unknown as IAgoraRTCRemoteUser,
    ]);

    agoraClient.publish(tracks);
  };

  return { joinRoom: handleJoinRoom };
};
