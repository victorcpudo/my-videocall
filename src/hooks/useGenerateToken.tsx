import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

const functionsUrl = process.env.NEXT_PUBLIC_DEV_FUNCTIONS_URL as string;

export type GenerateRtcTokenResponse = { token: string; channel: string };

export const useGenerateToken = () => {
  const params = useSearchParams();
  const channelName = (params.get("channelName") as string) || "";

  return useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["callPatient"],
    queryFn: async () => {
      if (!channelName || channelName.length === 0) return;

      console.info("Generating authentication token for the video call");

      const res = await fetch(
        `${functionsUrl}/generateAgoraToken?channelName=${channelName}`
      );

      const data = (await res.json()) as GenerateRtcTokenResponse;

      return {
        token: data.token,
        channel: channelName,
      };
    },
    onSuccess: (data) => {
      if (data) console.info("Token generated!");
    },
    onError: (error) => {
      console.log("AGORA ERROR", error);
    },
  });
};
