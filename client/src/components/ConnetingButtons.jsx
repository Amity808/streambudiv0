import React from 'react'
import ConnectingButton from './ConnectingButton'
import { useRouter } from 'next/navigation'

const ConnetingButtons = () => {

    const router = useRouter()

    const pushToJoinRoomPage = () => {
        router.push("/join-room")
    }


    const pushToJoinRoomPageAsHost = () => {
        router.push("/join-room?host=true")
    }
  return (
    <div className='connecting_buttons_container'>
      <ConnectingButton buttonText={"Join a Meeting"} onClickHandler={pushToJoinRoomPage} />
      <ConnectingButton createRoomButton buttonText={"Host a Meeting"} onClickHandler={pushToJoinRoomPageAsHost} />
    </div>
  )
}

export default ConnetingButtons
