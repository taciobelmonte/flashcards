export const GET_NOTIFICATION_STATUS = 'GET_NOTIFICATION_STATUS';
export const CHANGE_NOTIFICATION_STATUS = 'CHANGE_NOTIFICATION_STATUS';

import {getNotificationStatus, changeStatus} from './../utils/helpers'

export function getNotification(date) {
    return dispatch => {
        getNotificationStatus(date)
            .then(res => dispatch(getNotificationSuccess(res)))
    }
}

//Function called after retrieving data
export function getNotificationSuccess(payload){
    return {
        type: GET_NOTIFICATION_STATUS,
        payload:payload
    }
}

export function changeNotificationStatus(status) {
    return dispatch => {
        changeStatus(status)
            .then(res => dispatch(changeNotificationStatusSuccess(res)))
    }
}

export function changeNotificationStatusSuccess(payload){
    return {
        type: CHANGE_NOTIFICATION_STATUS,
        payload:payload
    }
}