import React, { useState} from 'react'

const LeaveRoomButton = () => {
  const handleRoomDisconnection = () => {
    const siteURL = window.location.origin;
    window.location.href = siteURL
  }
  return (
    <div className='video_button_container'>
      <button onClick={handleRoomDisconnection} className='video_button_end'>
        Leave Room
      </button>
    </div>
  )
}

export default LeaveRoomButton
