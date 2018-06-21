import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import Flashcard from './components/Flashcard'

const composeEnhancers = compose;

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result
};

//Create Store
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk),
        applyMiddleware(logger)
    )
);

export default class App extends React.Component {
    render() {

        console.ignoredYellowBox = ['Remote debugger'];

        return (
            <Provider store={store}>
                <Flashcard/>
            </Provider>
        );
    }
}
