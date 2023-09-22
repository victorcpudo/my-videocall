import {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

export interface RoomCtxType {
  isJoined: boolean;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  isVideoOn: boolean;
  setIsVideoOn: React.Dispatch<React.SetStateAction<boolean>>;
  users: IAgoraRTCRemoteUser[];
  setUsers: React.Dispatch<React.SetStateAction<IAgoraRTCRemoteUser[]>>;
  localTracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setLocalTracks: React.Dispatch<
    React.SetStateAction<[IMicrophoneAudioTrack, ICameraVideoTrack]>
  >;
}
