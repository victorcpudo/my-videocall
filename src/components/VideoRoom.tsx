"use client";

import React, { useEffect } from "react";

import AgoraRTC, {
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  ILocalVideoTrack,
  UID,
} from "agora-rtc-sdk-ng";

import { VideoPlayer } from "./VideoPlayer";
import { agoraClient } from "@/utils/agoraClient";
import {
  GenerateRtcTokenResponse,
  useGenerateToken,
} from "@/hook/useGenerateToken";
import toast from "react-hot-toast/headless";
import { useVideoCall } from "@/contexts/RoomCtx";
import { LoadingRoom } from "./LoadingRoom";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;

export interface VideoRoomUser {
  uid: UID;
  videoTrack: ILocalVideoTrack;
  audioTrack: ILocalAudioTrack;
}

export const VideoRoom = () => {
  const { data, isLoading } = useGenerateToken();
  const { users, localTracks, setUsers, setLocalTracks } = useVideoCall();

  const handleUserJoined = async (
    user: IAgoraRTCRemoteUser,
    mediaType: "video" | "audio"
  ) => {
    await agoraClient.subscribe(user, mediaType);

    if (mediaType === "video") {
      console.log("NEW USER JOINED", user);

      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio" && user.audioTrack) {
      user.audioTrack.play();
    }

    toast.success("USER JOINED ROOM");
  };

  const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );

    toast.custom("USER LEFT ROOM", {
      className: "bg-blue-700 text-blue-100",
    });
  };

  const handleJoinVideoRoom = async (data: GenerateRtcTokenResponse) => {
    const newUserUID = Math.floor(Math.random());

    if (
      agoraClient.connectionState === "CONNECTED" ||
      agoraClient.connectionState === "CONNECTING"
    ) {
      return;
    }

    agoraClient.on("user-published", handleUserJoined);

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

  // Handles every user joining the call (local or remote)
  useEffect(() => {
    let mounted = true;

    if (mounted && data && data.token) {
      handleJoinVideoRoom(data);

      agoraClient.on("user-left", handleUserLeft);
    }

    return () => {
      if (localTracks) {
        for (let localTrack of localTracks) {
          localTrack.stop();
          localTrack.close();
        }

        agoraClient.off("user-published", handleUserJoined);

        if (agoraClient.connectionState === "CONNECTED") {
          agoraClient.off("user-left", handleUserLeft);

          agoraClient.unpublish(localTracks).then(() => agoraClient.leave());
        }

        mounted = false;
      }
    };
  }, [data, localTracks]);

  if (isLoading || !data) return <LoadingRoom />;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 h-full min-h-[75vh] max-h-screen">
      {users.map((user) => {
        if (user.uid !== agoraClient.uid) {
          console.log("OTHER USER", user);
          return (
            <article
              key={user.uid}
              className="col-span-1 sm:col-span-2 flex flex-col gap-2 p-4 w-full min-w-full"
            >
              <p>Other person</p>

              <VideoPlayer user={user} />
            </article>
          );
        }
        return null; // Return null for now, we will handle the "You" component next
      })}

      {/* Now render the "You" */}

      {users.map((user) => {
        if (user.uid === agoraClient.uid) {
          return (
            <article key={user.uid} className="flex flex-col gap-2 p-4 w-full">
              <p>You</p>
              <p>uid: {user.uid}</p>
              <VideoPlayer user={user} />
            </article>
          );
        }
        return null; // Return null if the user isn't the logged-in user
      })}
    </section>
  );
};
