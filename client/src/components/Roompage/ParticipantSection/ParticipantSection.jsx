import React from 'react'
import ParticipantLabel from './ParticipantLabel'
import Participants from './Participants'
const ParticipantSection = () => {
  return (
    <div className='participants_section_container'>
      <ParticipantLabel />
      <Participants />
    </div>
  )
}

export default ParticipantSection
