import React from 'react'

const dummyParicipant = [
    {
        identity: 'Jake'
    },
    {
        identity: 'Anna'
    },
    {
        identity: 'Lisa'
    },
    {
        identity: 'Mark'
    }
]


const SingleParticipant = (props) => {
    const { identity, lastItem, participant } = props;

    return (
        <>
            <p className='participants_paragraph'>{identity}</p>
            {!lastItem && <span className='participants_separator_line'></span>}
        </>
    )
}
const Participants = () => {
  return (
    <div className='participants_container'>
      {dummyParicipant.map((participant, index) => {
        return (
            <SingleParticipant key={participant.identity} 
            lastItem={dummyParicipant.length === index + 1} participant={participant} identity={participant.identity} />
        )
      })}
    </div>
  )
}

export default Participants
