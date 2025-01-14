import React, { useEffect } from 'react'
import "./JoinRoomPage.css"
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { connect } from 'react-redux';
import { setIsRoomHost } from '@/store/action';
import JoinRoomTitle from '../JoinRoomTitle';
import JoinRoomContent from '../JoinRoomContent';

const JoinRoomPage = (props) => {
    const {setIsRoomHostAction, isRoomHost} = props;

    // const router = useRouter().sea

    const search = useSearchParams()

    useEffect(() => {
        const isRoomHost = search.get('host') 
        console.log(isRoomHost);
        
        if(isRoomHost) {
            // setting redux user is host 
            setIsRoomHostAction(true);
        }
    },[])
  return (
    <div className='join_room_page_container'>
        <div className='join_room_page_panel'>
    <JoinRoomTitle isRoomHost={isRoomHost} />
    <JoinRoomContent />
        </div>
    </div>
  )
}


const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    }
}
export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage)