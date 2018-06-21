import { combineReducers } from 'redux';
import DeckReducer from './DeckReducer';

const reducer = combineReducers({
    decks: DeckReducer,
});

export default reducer;