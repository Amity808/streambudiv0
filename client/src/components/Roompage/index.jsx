import React, { useEffect } from 'react'
import './RoomPage.css'
import ParticipantSection from './ParticipantSection/ParticipantSection'
import VideoSection from './VideoSection/VideoSection'
import ChatSection from './ChatSection/ChatSection'
import RoomLabel from './RoomLabel'
import { connect } from 'react-redux'
import * as webRtchandler from "../../utils/webRtcHandler"
const RoomPage = ({ roomId, isRoomHost, identity }) => {

    useEffect(() => {
        webRtchandler.getLocalPreviemAndInitConnection(
            isRoomHost, identity, roomId
        );
    }, [])
  return (
    <div className='room_container'>
      <ParticipantSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
    </div>
  )
}

const mapStoreStateToProps = (state) => {
    return {
     ...state,

    }
}

export default connect(mapStoreStateToProps)(RoomPage);
