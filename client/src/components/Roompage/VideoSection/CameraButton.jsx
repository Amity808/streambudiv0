import React, { useState } from 'react'

const CameraButton = () => {
    const [isLocalVideoDisable, setIsLocalVideoDisable] = useState(false)

    const handleCameraButtonPress = () => {
        setIsLocalVideoDisable(!isLocalVideoDisable);
    }
  return (
    <div className='video_button_container'>
        <img src={ isLocalVideoDisable ? `camera.svg` : 'cameraOff.svg'}
        className='video_button_image' onClick={handleCameraButtonPress} alt="" />
    </div>
  )
}

export default CameraButton