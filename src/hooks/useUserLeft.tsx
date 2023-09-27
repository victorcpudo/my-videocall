import { useVideoCall } from "@/contexts/RoomCtx";
import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import toast from "react-hot-toast";

export const useUserLeft = () => {
  const { setUsers } = useVideoCall();

  const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );

    toast.custom("USER LEFT ROOM", {
      className: "bg-orange-700 text-orange-100",
    });
  };

  return { handleUserLeft };
};
