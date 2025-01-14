import { Stream } from "twilio/lib/twiml/VoiceResponse";

const defaultConstraints = {
  audio: true,
  video: true,
};

let localStream;

export const getLocalPreviemAndInitConnection = async (
  isRoomHost,
  identity,
  roomId = null
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
        console.log("Successfully recieve local stream")
      localStream = stream;
      showLoaclVideoPreview(localStream);
    //   isRoomHost
    //     ? wss.createNewRoom(identity)
    //     : wss.joinRoom(roomId, identity);
    })
    .catch((err) => {
        console.log(" errorwhen trying to get access to the media stream")
        console.log(err);
    }
    );
};

const showLoaclVideoPreview = (stream) => {
  // logic to show local video preview
};
