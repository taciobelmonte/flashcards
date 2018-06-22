import React from 'react';
import { View, Text, ScrollView, DatePickerIOS, Switch} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {Main, TextColor, TextParagraph} from './../../utils/stylesheets'
import {setLocalNotification, clearAllNotifications} from './../../utils/helpers'

export default class Settings extends React.Component {

    state = {
        input:false,
        NotificationTime: new Date()
    };

    constructor(props) {
        super(props);
        this.state = { NotificationTime: new Date() };
        this.setDate = this.setDate.bind(this);
    }

    //Set new time
    setDate(newTime) {
        this.setState({NotificationTime: newTime});
        setLocalNotification(newTime);
    }

    //Change switch button
    changeSwitch = () =>{
        clearAllNotifications();
        this.setState((state) =>({
            input:!state.input
        }));
    };

    render() {
        const {input} = this.state;
        return (
            <Main>
                <TextColor><Ionicons name='ios-settings' size={30} color='#fff'></Ionicons> SETTINGS</TextColor>

                <Main style={{justifyContent: 'center', alignItems: 'center',}}>
                    <TextParagraph>Enable Notifications</TextParagraph>
                    <Switch style={{flex:2}} value={input} onValueChange={this.changeSwitch} />
                </Main>

                {input && (
                    <View>
                        <TextParagraph>Select a day and time for notification</TextParagraph>
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

