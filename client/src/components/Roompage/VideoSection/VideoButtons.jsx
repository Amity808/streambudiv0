import React from 'react'
import MicButton from './MicButton'
import CameraButton from './CameraButton'
import SwitchToScreenSharing from './SwitchToScreenSharing'
import LeaveRoomButton from './LeaveRoomButton'
const VideoButtons = (props) => {
    
  return (
    <div className='video_buttons_container'>
        <MicButton />
        <CameraButton />
        <LeaveRoomButton />
        <SwitchToScreenSharing />
    </div>
  )
}

export default VideoButtons