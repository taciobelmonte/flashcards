import React from 'react';
import { View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Main, TextColor, TextParagraph } from './../../utils/stylesheets'
import styled from 'styled-components/native'
import SingleDeck from './SingleDeck'
import {connect} from 'react-redux'

import {fetchDecks} from './../../actions'
import {filterDecks} from './../../utils/helpers'

const DeckCard = styled.TouchableOpacity`
    padding:20px 10px;
    background:#fff;
    margin:20px auto 10px auto;
    width:95%;
    border-radius:5px;
    box-shadow:1px 1px 5px #a3a3a3;
`;

const TextHeadline = styled.Text`
    color:#08586f;
    font-size:26px;
    text-align:center;
    padding:5px;
    font-family:'Avenir-Black';
    width:100%;
`;

class MainView extends React.Component {

    componentDidMount(){
        this.props.fetchDecks();
    }

    render() {
        const { decks } = this.props;
        let card;

        return (
            <Main>
                <TextColor><FontAwesome name='home' size={30} color='#fff'></FontAwesome> DECKS</TextColor>
                <ScrollView>
                    {decks && decks.map( (item) => (
                        <DeckCard key={item.index} onPress={() => this.props.navigation.navigate('SingleDeck', {title:item.title})}>
                            <TextHeadline>{item.title}</TextHeadline>
                            <TextParagraph>{item.quizLength}{item.quizLength===1 ? ' card ' : ' cards' }</TextParagraph>
                        </DeckCard>
                    ))}
                    {decks.length === 0 && (
                        <TextParagraph style={{marginTop:50}}>No decks! Add a new one clicking in the plus button below.</TextParagraph>
                    )}
                </ScrollView>
            </Main>
        );
    }
}

function mapStateToProps(state){
   return{
       decks: filterDecks(state)
   }
}

function mapDispatchToProps(dispatch){
    return {
        fetchDecks: () => dispatch(fetchDecks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);