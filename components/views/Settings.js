import React from 'react';
import { View, Text, ScrollView, DatePickerIOS, Switch, AsyncStorage} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {Main, TextColor, TextParagraph} from './../../utils/stylesheets'
import {connect} from 'react-redux'
import {getNotification, changeNotificationStatus} from './../../actions'
import {setLocalNotification, clearAllNotifications, saveNotificationTime} from './../../utils/helpers'

class Settings extends React.Component {

    state = {
        input: false,
        NotificationTime: new Date()
    };

    constructor(props) {
        super(props);
        this.setDate = this.setDate.bind(this);
    }

    //Set new time
    setDate(newTime) {

        if(this.props.notification === 'true' || this.props.notification === true){
            this.setState({NotificationTime: newTime});
        }
    }

    componentDidMount(){

        //Updates store to get notification status
        this.props.getNotification();
    }

    changeStatus = (status) => {
        this.props.changeNotificationStatus(status);
    };


    //Change switch button
    changeSwitch = () =>{

         if(this.props.notification === 'true' || this.props.notification === true){
             console.log('removeu status');

             //Change notification status to false
             this.changeStatus(false);

         }else{
             console.log('salvou status');

             //Change notification status
             this.changeStatus(true);

             //Clear all notifications
             clearAllNotifications();

             //Set new time for notifications
             setLocalNotification(this.state.NotificationTime);
         }
    };

    render() {
        const {notification} = this.props;


        return (
            <Main>
                <TextColor><Ionicons name='ios-settings' size={30} color='#fff'></Ionicons> SETTINGS</TextColor>

                <Main style={{justifyContent: 'center', alignItems: 'center',}}>
                    <TextParagraph>Enable Notifications</TextParagraph>
                    <Switch style={{flex:2}} value={notification} onValueChange={this.changeSwitch} />
                </Main>

                {notification && (
                    <View>
                        <TextParagraph>Select a time for notifications</TextParagraph>
                        <DatePickerIOS
                            date={this.state.NotificationTime}
                            onDateChange={this.setDate}
                            mode="time"
                        />
                    </View>
                )}
            </Main>
        );
    }
}

function mapStateToProps(state){
    return{
        notification:state.notification
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeNotificationStatus: (status) => dispatch(changeNotificationStatus(status)),
        getNotification: () => dispatch(getNotification()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
