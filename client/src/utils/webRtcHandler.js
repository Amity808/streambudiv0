import { setShowOverlay } from "@/store/action";
import store from "@/store/store";
import * as wss from "./wss"


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
    //   dispatch an action to hide overlay 
    store.dispatch(setShowOverlay(false))
      isRoomHost
        ? wss.createNewRoom(identity)
        : wss.joinRoom(identity, roomId);
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
