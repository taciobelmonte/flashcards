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
         title: 'Test your knowledge in a Quiz!',
         body: '👋 See you performance at the end!',
         ios: {
             sound: true,
         }
     }
}

//Credits: Code gotten from Udacifitness lesson
export function setLocalNotification(time) {
    console.log('chamou notificacao');
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync();

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
