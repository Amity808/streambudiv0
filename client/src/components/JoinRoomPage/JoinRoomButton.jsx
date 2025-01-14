import React from 'react'
import { useRouter } from 'next/router';
const Button = ({ buttonText, cancelButton = false, OnClickHandler}) => {
    const buttonClass = cancelButton ?
     'join_room_cancel_button' : 
     'join_room_success_button';

    return (
        <button onClick={OnClickHandler} className={buttonClass}>
            {buttonText}
        </button>
    )
}

const JoinRoomButton = ({ handleJoinRoom, isRoomHost }) => {
    const successButtonText = isRoomHost ? 'Host' : 'Join';

    const router = useRouter()

    const pushToIntroductionPage = () => {
        router.push("/");
    }
  return (
    <div className='join_room_buttons_container'>
        <Button buttonText={successButtonText} OnClickHandler={handleJoinRoom} />
        <Button 
        buttonText={'Cancel'}
        cancelButton
        OnClickHandler={pushToIntroductionPage}
        />
    </div>
  )
}

export default JoinRoomButton