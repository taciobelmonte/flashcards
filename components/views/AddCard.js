import React, {Component} from 'react'
import {Alert, View, Text, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import {saveCardToDeck, getNotification} from './../../actions'
import {Main, TextColor, TextInputStyled, TextParagraph, ButtonStyled, Correct }
from './../../utils/stylesheets'
import {setLocalNotification, clearAllNotifications} from './../../utils/helpers'

class AddCard extends Component {

    state = {
        question: '',
        answer:'',
        title:''
    };

    //Function to store question/answer on state
    handleTextChange = (value, type) => {
        if(type === 'question'){
            this.setState({question: value});
        }else{
            this.setState({answer: value});
        }
    };

    componentDidMount(){
        this.props.getNotification();
        this.setState({title: this.props.navigation.state.params.title});
    }

    //Function to save card / Also implies validation here
    saveCard = (event, question, answer) => {

        if(question === '' || question === undefined && answer === '' || answer === undefined){
             Alert.alert( 'Error', 'Both fields are empty! Try to put some value.',
                 [{text: 'OK'}],
             );
        }else if(question === '' && question === undefined){

            Alert.alert( 'Error', 'Question field is empty! Try to put some value.',
                [{text: 'OK'}],
            );

        }else if(answer === '' || answer === undefined){

            Alert.alert( 'Error', 'Answer field is empty! Try to put some value.',
                [{text: 'OK'}],
            );

        }else{

            //Call addNewCard to update store
             this.props.saveCardToDeck(this.state.title, question, answer);

            //Set local notification
            if(this.props.notification === 'true' || this.props.notification === true){
                clearAllNotifications();
                setLocalNotification();
            }

            //Launches an alert confirmation
             Alert.alert( 'Confirmation', 'Card has been added with success to ' + this.state.title + ' deck.',
                 [{text: 'OK', onPress: () => {this.props.navigation.navigate('SingleDeck', {title: this.state.title, refresh: this.props.navigation.state.params.refreshProps()})}}],
             );

            //Set question and answer states to empty
             this.setState({question: '', answer:''});
        }
    };

    render() {
        const {question, answer} = this.state;
        const {notification} = this.props;

        console.log('NOTIFICATION', notification);

        return (
            <Main>
                <TextColor><FontAwesome name='plus-square' size={30} color='#fff'></FontAwesome> Add Card</TextColor>

                <TextParagraph>Insert a question below</TextParagraph>

                <TextInputStyled
                    value={question}
                    placeholder="Insert a question here..."
                    editable = {true}
                    onChangeText={(value) => this.handleTextChange(value, 'question')} />
                <TextParagraph>Insert an answer below</TextParagraph>

                <TextInputStyled
                    value={answer}
                    placeholder="Insert an answer here..."
                    editable = {true}
                    onChangeText={(value) => this.handleTextChange(value, 'answer')} />

                <ButtonStyled onPress={(event) =>this.saveCard(event, question, answer)} style={{backgroundColor:'#1bb869'}}>
                    <Correct>Submit</Correct>
                </ButtonStyled>

            </Main>
        )
    }
}

function mapStateToProps(state){
    return{
        decks:state,
        notification:state
    }
}

function mapDispatchToProps(dispatch){
    return {
        getNotification: () => dispatch(getNotification()),
        saveCardToDeck: (deckTitle, question, answer) => dispatch(saveCardToDeck(deckTitle, question, answer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);