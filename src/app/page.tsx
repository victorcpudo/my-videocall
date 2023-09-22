"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useVideoCall } from "../contexts/RoomCtx";
import { Button } from "@/components/Button";

export default function Home() {
  const params = useSearchParams();
  const initialState = params.get("channelName") || "";
  const [channelName, setChannelName] = useState(initialState);
  const { isJoined, setIsJoined } = useVideoCall();

  const { push } = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!isJoined && !initialState && (
        <div className="flex flex-col gap-4">
          <label htmlFor="channelName">Room name</label>

          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="py-2 px-3 text-green-900 bg-green-50 rounded-lg"
          />

          <Button
            onClick={() => {
              if (channelName && channelName.length > 0) {
                push(`/room?channelName=${channelName}`);

                setIsJoined(true);
              } else {
                alert("ERROR");
              }
            }}
            colorScheme="emerald"
          >
            create video room
          </Button>
        </div>
      )}

      {!isJoined && initialState.length > 0 && (
        <Button
          onClick={() => {
            if (channelName && channelName.length > 0) {
              setIsJoined(true);
            } else {
              alert("ERROR");
            }
          }}
          colorScheme="emerald"
        >
          join {channelName}
        </Button>
      )}
    </main>
  );
}
