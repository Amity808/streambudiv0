const Actions = {
    SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
    SET_CONNECT_ONLY_WITH_AUDIO: 'SET_CONNECT_ONLY_WITH_AUDIO',
    SET_IDENTITY: 'SET_IDENTITY',
    SET_ROOM_ID: 'SETROOM_ID',
    SET_SHOW_OVERLAY: 'SET_SHOW_OVERLAY',
    "SET_PARTICIPANTS": "SET_PARTICIPANTS",
}

export const setIsRoomHost = (isRoomHost) => {
    return {
        type: Actions.SET_IS_ROOM_HOST,
        isRoomHost
    }
}


export const setConnectOnlyWithAudio = (onlyWithAudio) => {
    return {
        type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
        onlyWithAudio
    }
}

export const setIdentity = (identity) => {
    return {
        type: Actions.SET_IDENTITY,
        identity
    }
}

export const setRoomId = (roomId) => {
    return {
        type: Actions.SET_ROOM_ID,
        roomId
    }
}


export const setShowOverlay = (showOverlay) => {
    return {
        type: Actions.SET_SHOW_OVERLAY,
        showOverlay
    }
}

export const setParticipants = (participant) => {
    return {
        type: Actions.SET_PARTICIPANTS,
        participant
    }
}
export default Actions