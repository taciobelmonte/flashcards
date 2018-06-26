import React from 'react';
import { View, Text, ScrollView, DatePickerIOS, Switch, AsyncStorage} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {ButtonStyled, Correct, Question, Answer} from './../../utils/stylesheets'
import {setLocalNotification, clearAllNotifications} from './../../utils/helpers'
import {getNotification} from './../../actions'
import {connect} from 'react-redux'

class Results extends React.Component {

    //Function to calculate percentage of right answers
    calculatePercentage = (total, totalCorrect) => {
        return (100*totalCorrect/total);
    };

    componentDidMount(){
        this.props.getNotification();


        if(this.props.notification === '' || this.props.notification === 'true' || this.props.notification === true){

            if(this.props.finalized){
                clearAllNotifications();

                //Retrieve current time
                return AsyncStorage.getItem("time").then((value) => {
                    if(value !== null || value !== false){
                        return value;
                    }
                }).then(res => {

                    console.log("ParseDate", JSON.parse(res));
                    setLocalNotification(new Date(JSON.parse(res)));
                });
            }
        }
    }

    render() {
        const {questions, resetQuiz, totalCorrect, notification, finalized} = this.props;

        return (
            <View>
                <Question>You answered {questions[0].length} question{questions[0].length === 1 ? '' : 's' } and your percentage was {this.calculatePercentage(questions[0].length, totalCorrect)}%</Question>
                <ButtonStyled onPress={() => resetQuiz} style={{backgroundColor:'#1bb869'}}>
                    <Correct>Restart Quiz</Correct>
                </ButtonStyled>

                <ButtonStyled onPress={() => this.props.navigation.goBack()} style={{backgroundColor:'#f6b63a'}}>
                    <Answer>Back to Deck</Answer>
                </ButtonStyled>
            </View>
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
        getNotification: () => dispatch(getNotification()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
