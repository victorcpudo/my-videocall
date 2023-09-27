import { useVideoCall } from "@/contexts/RoomCtx";
import { agoraClient } from "@/utils/agoraClient";
import { useRouter } from "next/navigation";

export const useControls = () => {
  const { push } = useRouter();
  const { localTracks, trackState, setIsJoined, setUsers, setTrackState } =
    useVideoCall();

  const toggleMedia = async (type: "audio" | "video") => {
    if (type === "audio") {
      await localTracks[0].setEnabled(!trackState.audio);

      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await localTracks[1].setEnabled(!trackState.video);

      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leave = async () => {
    await agoraClient.leave();

    agoraClient.removeAllListeners();

    localTracks[0].close();

    localTracks[1].close();

    setIsJoined(false);

    setUsers([]);

    push("/");
  };

  return { trackState, toggleMedia, leave };
};
