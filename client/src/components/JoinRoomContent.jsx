import React, {useState} from 'react'
import JoinRooomInputs from './inputs/JoinRooomInputs';
import { connect } from 'react-redux';
import OnlyWithAudioCheck from './OnlyWithAudioCheck';
import { setConnectOnlyWithAudio, setIdentity, setRoomId } from '@/store/action';
import ErrorMessage from './ErrorMessage';
import JoinRoomButton from './JoinRoomPage/JoinRoomButton';
import { getRoomExists } from '@/utils/api';
import { useRouter } from 'next/router';
const JoinRoomContent = (props) => {
    const { isRoomHost, 
        setConnectOnlyWithAudio, 
        connectOnlyWithAudio, 
        setIdentityAction, setRoomIdAction } = props
    const [roomIdValue, setRoomIdValue] = useState('');
    const [nameValue, setNameValue] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    // handleJoinRoom, isRoomHost 

    const router = useRouter()

    const handleJoinRoom = async () => {
        // handle join room 
        setIdentityAction(nameValue)
        if(isRoomHost) {
            createRoom()
        } else {
            await joinRoom()
        }
    }


    const joinRoom = async () => {
        const responseMessage = await getRoomExists(roomIdValue);
        console.log("responseMessage: " + JSON.stringify(responseMessage));
        
        const { roomExists, full } = responseMessage;

        if(roomExists) {
            if(full) {
                setErrorMessage("Meeting is full. Please try again later")
            }else {
                // join a room
                // save in our redux store meeting id which was provided by user which would like join
                setRoomIdAction(roomIdValue)
                router.push('/room')

            }
        }else {
            setErrorMessage("Meeting not found. Check Your meeting ID")
        }
    }

    const createRoom = () => {
        router.push('/room')
    }
  return (
    <>
    <JoinRooomInputs 
    roomIdValue={roomIdValue} setRoomIdValue={setRoomIdValue}
    nameValue={nameValue} setNameValue={setNameValue} isRoomHost={isRoomHost}
     />
     <OnlyWithAudioCheck
     setConnectOnlyWithAudio={setConnectOnlyWithAudio}
     connectOnlyWithAudio={connectOnlyWithAudio}
     />
     <ErrorMessage errorMessage={errorMessage} />
     <JoinRoomButton  
     handleJoinRoom={handleJoinRoom} isRoomHost={isRoomHost} 
     />
    </>
  )
}

const mapStoreStateToProps = (state) => {
    return {
        ...state
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudio: (onlyWithAudio) => dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
        setIdentityAction: (identity) => dispatch(setIdentity(identity)),
        setRoomIdAction: (roomId) => dispatch(setRoomId(roomId))
    }
}


export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomContent)