import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import SingleDeck from './SingleDeck'
import {connect} from 'react-redux'

import {
    Main,
    TextColor,
    TextParagraph,
    DeckCard,
    TextHeadline } from './../../utils/stylesheets'

import {fetchDecks} from './../../actions'
import {filterDecks} from './../../utils/helpers'

class MainView extends React.Component {

    state = {
        opacity: new Animated.Value(0)
    };

    componentDidMount(){
        const {opacity} = this.state;

        //Loads decks on Store
        this.props.fetchDecks();

        Animated.timing(opacity, { toValue:1, duration: 1000})
            .start()
    }

    refreshMainView = () => {
        this.props.fetchDecks();
    };

    render() {
        const { decks } = this.props;
        const { opacity } = this.state;

        // console.log("DECKS",decks);
        return (
            <Main>
                <Animated.View style={{opacity}}>
                    <TextColor><FontAwesome name='home' size={30} color='#fff'></FontAwesome> DECKS</TextColor>
                </Animated.View>

                <Animated.ScrollView style={{opacity}}>
                    {decks && decks.map( (item) => (
                        <DeckCard key={item.index} onPress={() => this.props.navigation.navigate('SingleDeck', {title:item.title, refresh: this.refreshMainView})}>
                            <TextHeadline>{item.title}</TextHeadline>
                            <TextParagraph>{item.quizLength}{item.quizLength===1 ? ' card ' : ' cards' }</TextParagraph>
                        </DeckCard>
                    ))}
                    {decks.length === 0 && (
                        <TextParagraph style={{marginTop:50}}>No decks! Add a new one clicking in the plus button below.</TextParagraph>
                    )}
                </Animated.ScrollView>
            </Main>
        );
    }
}

function mapStateToProps(state){
   return{
       decks: filterDecks(state).filter((item) => item.quizLength !== undefined)
   }
}

function mapDispatchToProps(dispatch){
    return {
        fetchDecks: () => dispatch(fetchDecks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);