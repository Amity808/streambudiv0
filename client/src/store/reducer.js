import Actions from "./action";

const initState = {
    identity: '',
    isRoomHost: false,
    connectOnlyWithAudio: false,
    roomId: null,
    showOverlay: true,
    participants: []
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case Actions.SET_IS_ROOM_HOST:
            return {
                ...state,
                isRoomHost: action.isRoomHost
            };
        case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
            return {
                ...state,
                connectOnlyWithAudio: action.onlyWithAudio
            }
        case Actions.SET_ROOM_ID:
            return {
                ...state,
                roomId: action.roomId
            }
        case Actions.SET_IDENTITY:
            return {
                ...state,
                identity: action.identity
            }
        case Actions.SET_SHOW_OVERLAY:
            return {
                ...state,
                showOverlay: action.showOverlay
            }
        case Actions.SET_PARTICIPANTS:
            return {
                ...state,
                participants: action.participants
            }
            default:
                return state;
    }
}

export default reducer;