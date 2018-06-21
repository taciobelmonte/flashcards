import {
    FETCH_DECK,
    ADD_NEW_DECK,
    ADD_NEW_CARD
} from '../actions'

const initialState = {
    // React: {
    //     title: 'React',
    //     questions: [
    //         {
    //             question: 'What is React?',
    //             answer: 'A library for managing user interfaces'
    //         },
    //         {
    //             question: 'Where do you make Ajax requests in React?',
    //             answer: 'The componentDidMount lifecycle event'
    //         }
    //     ]
    // },
    // JavaScript: {
    //     title: 'JavaScript',
    //     questions: [
    //         {
    //             question: 'What is a closure?',
    //             answer: 'The combination of a function and the lexical environment within which that function was declared.'
    //         }
    //     ]
    // }
};

export default function DeckReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_DECK :
            console.log("FETCH DECK => ", action.payload);
            return action.payload.map(item => item.data);

        case ADD_NEW_DECK :
            console.log("ADD_NEW_DECK => ", action.payload);
            return {
                ...state,
                [action.payload]: {
                    title: action.payload,
                    quizLength: 0,
                    questions: [],
                },
            };
            return state;
        case ADD_NEW_CARD :
            console.log("ADD_NEW_CARD => ", action.payload);
            return state;
        default :
            return state
    }
}
