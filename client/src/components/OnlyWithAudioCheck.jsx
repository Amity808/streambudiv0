import React from 'react'

const OnlyWithAudioCheck = ({ setConnectOnlyWithAudio, connectOnlyWithAudio }) => {
    const handleConnectionTypeChange = () => {
        // change info in our store about connection type
        setConnectOnlyWithAudio(!connectOnlyWithAudio);
    }


  return (
    <div className='checkbox_container'>
        <div className='checkbox_connection' onClick={handleConnectionTypeChange}>
            {connectOnlyWithAudio && (
                            <img src="check.png" alt="" className='checkbox_image' />

            )}
        </div>
        <p className='checkbox_container_paragraph'>Only audio</p>
    </div>
  )
}

export default OnlyWithAudioCheck