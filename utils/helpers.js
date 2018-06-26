import {AsyncStorage} from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'flashCards:notifications';

//Function to go over deck objects and then filter with the valuable information
export const filterDecks = ({decks}) =>
    Object.keys(decks).map((key, index) => ({
        index: index,
        quizLength: decks[key].quizLength,
        title: decks[key].title,
        questions: decks[key].questions,
    }));

 //Function to clear notifications
 export function clearAllNotifications() {
     console.log('limpou notificacoes');
     return AsyncStorage.removeItem(NOTIFICATION_KEY).then( Notifications.cancelAllScheduledNotificationsAsync );
 }

 //Function to create Notification
function createNotification(){
     return {
         title: 'It is time to take a quiz!',
         body: '👋 Just for let you know that some quizzes are waiting for you to do!',
         ios: {
             sound: true,
         }
     }
}

export function changeStatus(status){
    try{
        if(status === true){
            AsyncStorage.setItem('NotificationStatus', 'true');
        }else{
            AsyncStorage.setItem('NotificationStatus', 'false');
        }
        return AsyncStorage.getItem('NotificationStatus').then((value) => {
            if(value === null || value === undefined || value === 'false' || value === false){
                return false;
            }else{
                return true;
            }
        });
    }catch(e){
        console.log("error", e);
        return false;
    }
}

 export function getNotificationStatus(){
     try{
         return AsyncStorage.getItem('NotificationStatus').then((value) => {
             if(value === null || value === undefined || value === 'false' || value === false){
                 return false;
             }else{
                 return true;
             }
         });
     }catch(e){
         console.log("error", e);
         return false;
     }
 }

//Credits: Code gotten from Udacifitness lesson
export function setLocalNotification(time) {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync();

                         time.setDate(time.getDate()+1);
                         // console.log("notificacao vai acontecer ", time);
                         // console.log("salvou asssim",JSON.stringify(time));
                        //
                        AsyncStorage.setItem('time', JSON.stringify(time));

                        Notifications.scheduleLocalNotificationAsync(createNotification(), {
                            time: time,
                            repeat: 'day',
                        });
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }
                });
            }
        });
}

