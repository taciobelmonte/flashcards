import {
    GET_NOTIFICATION_STATUS,
    CHANGE_NOTIFICATION_STATUS
} from '../actions'

export default function NotificationReducer (state = false, action) {
    switch (action.type) {
        case GET_NOTIFICATION_STATUS :
            console.log("GET_NOTIFICATION_STATUS => ", action.payload);
            return action.payload;
        case CHANGE_NOTIFICATION_STATUS :
            console.log("CHANGE_NOTIFICATION_STATUS => ", action.payload);
            return action.payload;
        default :
            return state;
    }
}
