import React, { useState } from 'react'

const MicButton = () => {
    const [isMicMuted, setIsMicMuted] = useState(false)
    const handleMicButtonPress = () => {
        setIsMicMuted(!isMicMuted)
    }
  return (
    <div className=' video_button_container'>
      <img src={ isMicMuted ? `micOff.svg` : `mic.svg`} 
      className='video_button_image' onClick={handleMicButtonPress} alt="" />
    </div>
  )
}

export default MicButton
