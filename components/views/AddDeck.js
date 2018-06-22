import React, {Component} from 'react';
import { Keyboard, Alert, View, Text, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { Main, TextColor, TextInputStyled, TextParagraph, ButtonStyled, Correct } from './../../utils/stylesheets'

import {addNewDeck} from './../../actions'

class AddDeck extends Component {

    state = {
        input: ''
    };

    handleTextChange = (input) => {
        this.setState({input});
    };

    addDeck = (event, input) => {

        if(input === '' || input === undefined){
            Alert.alert( 'Error', 'You have not inserted a title',
                [{text: 'OK'}],
            );
        }else{

            //Call addNewDeck to update store
            this.props.addNewDeck(input);

            //Launches a alert confirmation
            Alert.alert( 'Confirmation', 'Deck has been added with success!',
                [{text: 'OK', onPress: () => {this.props.navigation.goBack(Keyboard.dismiss())}},],
            );

            //Set input state to empty
            this.setState({input: ''});
        }
    };

    render() {
        const {input} = this.state;

        return (
            <Main>
                <TextColor><FontAwesome name='plus-square' size={30} color='#fff'></FontAwesome> ADD NEW DECK</TextColor>
                <TextParagraph>What is the title of your new deck?</TextParagraph>

                <TextInputStyled
                    value={input}
                    placeholder="Insert a Deck title here..."
                    editable = {true}
                    onChangeText={this.handleTextChange} />

                <ButtonStyled onPress={(event) =>this.addDeck(event, input)} style={{backgroundColor:'#1bb869'}}>
                    <Correct>Create Deck</Correct>
                </ButtonStyled>

            </Main>
        )
    }
}

function mapStateToProps(state){
    return{
        decks:state
    }
}

function mapDispatchToProps(dispatch){
    return {
        addNewDeck: (deck) => dispatch(addNewDeck(deck)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);