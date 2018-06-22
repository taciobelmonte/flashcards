import React, {Component} from 'react'
import { View, Text, ScrollView, TouchableOpacity} from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import {Main, ButtonStyled, OtherView, Correct, Question, AnswerParagraph, Incorrect, Answer, Progress} from './../../utils/stylesheets'
import { connect } from 'react-redux'
import {fetchDecks} from './../../actions'
import {filterDecks} from './../../utils/helpers'

class QuizView extends Component {

    state = {
        currentQuestion: 0,
        finalized: false,
        showAnswer: false,
        showButtons: false,
        totalCorrect:0,
    };

    componentDidMount(){
        this.props.fetchDecks();
    }

    setAnswer = (event, answer) => {
        if(answer === 'correct')
            this.setState({totalCorrect: this.state.totalCorrect+1});

        if(this.state.currentQuestion === this.props.questions[0].length-1){
            this.setState({ finalized: true, showAnswer:false, showButtons:false});
        }else{
            this.setState({ currentQuestion: this.state.currentQuestion+1, showAnswer:false, showButtons:false });
        }
    };

    showAnswer = () =>{
        this.setState({ showAnswer: true, showButtons:true});
    };

    resetQuiz = () => {
        this.setState({
            currentQuestion: 0,
            finalized: false,
            showAnswer: false,
            showButtons: false,
            totalCorrect:0,
        });
    };

    //Function to calculate percentage of right answers
    calculatePercentage = (total, totalCorrect) => {
        return (100*totalCorrect/total);
    };

    static navigationOptions = ({navigation}) =>{
        return {
            title: "Quiz for " + navigation.state.params.title,
            headerTitleStyle:{
                color: '#e44549',
                fontFamily: 'Futura',
                fontSize: 26
            }
        }
    };

    render() {
        const {questions} = this.props;
        const {finalized, showAnswer, showButtons, totalCorrect, currentQuestion} = this.state;

        return (
            <Main>

                {questions[0][currentQuestion] && (
                    <Main>
                        <Progress>{currentQuestion+1}/{questions[0].length}</Progress>
                        <OtherView>

                            {finalized && (
                                <View>
                                    <Question>You answered {questions[0].length} question{questions[0].length === 1 ? '' : 's' } and your percentage was {this.calculatePercentage(questions[0].length, totalCorrect)}%</Question>
                                    <ButtonStyled onPress={() => this.resetQuiz()} style={{backgroundColor:'#1bb869'}}>
                                        <Correct>Restart Quiz</Correct>
                                    </ButtonStyled>

                                    <ButtonStyled onPress={() => this.props.navigation.goBack()} style={{backgroundColor:'#f6b63a'}}>
                                        <Answer>Back to Deck</Answer>
                                    </ButtonStyled>
                                </View>
                            )}

                            {!finalized && (
                                <Question>Question: {questions[0][currentQuestion].question}</Question>
                            )}

                            {showAnswer && (
                                <AnswerParagraph>Answer: {questions[0][currentQuestion].answer}</AnswerParagraph>
                            )}

                            {showButtons && (
                                <View>
                                    <ButtonStyled onPress={(event) => this.setAnswer(event, 'correct')} style={{backgroundColor:'#1bb869'}}>
                                        <Correct>Correct</Correct>
                                    </ButtonStyled>

                                    <ButtonStyled onPress={(event) => this.setAnswer(event, 'incorrect')} style={{backgroundColor:'#e44549'}}>
                                        <Incorrect>Incorrect</Incorrect>
                                    </ButtonStyled>
                                </View>
                            )}

                            {!showButtons && !finalized && (
                                <ButtonStyled onPress={this.showAnswer} style={{backgroundColor:'#f6b63a'}}>
                                    <Answer>Show Answer</Answer>
                                </ButtonStyled>
                            )}
                        </OtherView>
                    </Main>
                )}
            </Main>
        )
    }
}

function mapStateToProps(state, ownProps){
    return{
        questions:filterDecks(state).filter(item => item.title === ownProps.navigation.state.params.title).map(item=> item.questions)
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchDecks: () => dispatch(fetchDecks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);