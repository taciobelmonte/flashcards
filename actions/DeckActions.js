export const FETCH_DECK = 'FETCH_DECK';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';
import * as Api from '../utils/Api'

export function fetchDecks() {
    return dispatch => {
        Api.getDecks()
            .then(res => dispatch(getDecksSuccess(res)))
    }
}

export function getDecksSuccess(payload){
    return {
        type: FETCH_DECK,
        payload:payload
    }
}

export function addNewDeck(deck) {
     return dispatch => {
         Api.saveDeck(deck)
             .then(res => dispatch(addNewDeckSuccess(deck)))
     }
}

export function addNewDeckSuccess(payload){
    return {
        type: ADD_NEW_DECK,
        payload: payload
    }
}

export function saveCardToDeck(deckTitle, question, answer) {
    return dispatch => {
        Api.saveCardToDeck(deckTitle, question, answer)
            .then(res => dispatch(addNewCardSuccess(res)))
    }
}

export function addNewCardSuccess(payload){
    return {
        type: ADD_NEW_CARD,
        payload: payload
    }
}
