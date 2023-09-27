import type {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  UID,
} from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";

export interface massUserProps {
  user: IAgoraRTCRemoteUser;
  mediaType: "audio" | "video";
}

export interface AgoraRTCProviderProps {
  readonly client: IAgoraRTCClient;
  readonly children?: ReactNode;
}

export type FetchArgs = (() => Promise<JoinOptions>) | JoinOptions;

/**
 * Parameters used to join a channel.
 */
export interface JoinOptions {
  /**
   * The App ID of your Agora project.
   */
  appid: string;

  /**
   * The name of the channel to join. See [`IAgoraRTCClient.join`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#join) for details.
   */
  channel: string;

  /**
   * The token used for authentication. If token-based authentication is enabled for your project, a valid token must be provided. If token-based authentication is not enabled, you can pass `null`. See [`IAgoraRTCClient.join`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#join) for details.
   */
  token: string | null;

  /**
   * The user ID. If not provided, the Agora server assigns a number `uid` for you. See [`IAgoraRTCClient.join`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#join) for details.
   */
  uid?: UID | null;
}
