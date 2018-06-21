import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableOpacity} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { Main, ButtonStyled, TextColor, Correct, OtherView} from './../../utils/stylesheets'

import {fetchDecks} from './../../actions'
import {filterDecks} from './../../utils/helpers'

class SingleDeck extends Component {

    static navigationOptions = ({navigation}) =>{
        const { title } = navigation.state.params;

        return {
            title: title,
            headerTitleStyle:{
                color: '#e44549',
                fontFamily: 'Futura',
                fontSize: 26
            }
        }
    };

    componentDidMount(){
        this.props.fetchDecks();
    }

    render() {
        const { decks } = this.props;
        return (
            <Main>
                <TextColor>{decks[0].quizLength}{decks[0].quizLength===1 ? ' card' : ' cards'}</TextColor>
                <OtherView>
                    <ButtonStyled onPress={() => this.props.navigation.navigate('AddCard', {title: this.props.navigation.state.params.title})} style={{backgroundColor:'#2699c8'}}>
                        <Correct style={{backgroundColor:'#2699c8'}}>Add new question</Correct>
                    </ButtonStyled>

                    <ButtonStyled onPress={() => this.props.navigation.navigate('QuizView', {title: this.props.navigation.state.params.title})} style={{backgroundColor:'#1bb869'}}>
                        <Correct style={{backgroundColor:'#1bb869'}}>Start a Quiz</Correct>
                    </ButtonStyled>
                </OtherView>
            </Main>
        );
    }
}

function mapStateToProps(state, ownProps){
    return{
        decks:filterDecks(state).filter(item => item.title === ownProps.navigation.state.params.title)
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchDecks: () => dispatch(fetchDecks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleDeck);