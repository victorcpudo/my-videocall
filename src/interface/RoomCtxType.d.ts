import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

export interface RoomCtxType {
  isJoined: boolean;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  trackState: {
    video: boolean;
    audio: boolean;
  };
  setTrackState: React.Dispatch<
    React.SetStateAction<{
      video: boolean;
      audio: boolean;
    }>
  >;
  users: IAgoraRTCRemoteUser[];
  setUsers: React.Dispatch<React.SetStateAction<IAgoraRTCRemoteUser[]>>;
  localTracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setLocalTracks: React.Dispatch<
    React.SetStateAction<[IMicrophoneAudioTrack, ICameraVideoTrack]>
  >;
}
