import React, { useState} from 'react'

const SwitchToScreenSharing = () => {
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false)

    const handleScreenSharingToggle = () => {
        setIsScreenSharingActive(!isScreenSharingActive)
    }
  return (
    <div className='video_button_container'>
        <img src={'switchToScreenSharing.svg'} onClick={handleScreenSharingToggle} 
        className='video_button_image' alt="" />
        
    </div>
  )
}

export default SwitchToScreenSharing