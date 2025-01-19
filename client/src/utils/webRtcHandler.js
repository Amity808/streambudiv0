import { setShowOverlay } from "@/store/action";
import store from "@/store/store";
import * as wss from "./wss"
import Peer from "simple-peer";

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

let peers = {};
let streams = [];

const getConfiguration = () => {
  return {
    iceServers: [
      {
        // to get information about internet servers
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  }
}

export const prepareNewPeerConnection = (connUserSocketId, isIntiator) => {
  const configuration = getConfiguration();

  peers[connUserSocketId] = new Peer({
    initiator: isIntiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on('signal', (data) => {
    // webRTC offer , webRTC answer (SDP information), ice Candidate

    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    wss.signalPeerData(signalData);
  })
  peers[connUserSocketId].on('stream', (stream) => {
    console.log('new stream came')
    addStream(stream, connUserSocketId);
    streams = [...streams, stream]
  })

}


export const handleSignalingData = (data) => {
  // add signal in data to peer connection
  peers[data.connUserSocketId].signal(data.signal)
}

const addStream = (stream, connUserSocketId) => {
  // display incoming streams

}