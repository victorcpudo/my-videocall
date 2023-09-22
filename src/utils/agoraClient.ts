import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";

let agoraClient: IAgoraRTCClient;

if (typeof window === "object") {
  agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
}

export { agoraClient };
