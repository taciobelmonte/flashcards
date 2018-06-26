import { combineReducers } from 'redux';
import DeckReducer from './DeckReducer';
import NotificationReducer from './NotificationReducer';

const reducer = combineReducers({
    decks: DeckReducer,
    notification: NotificationReducer
});

export default reducer;