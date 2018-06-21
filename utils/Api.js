import { AsyncStorage } from 'react-native'

//Function to retrieve all decks
export function getDecks() {
    return AsyncStorage.getAllKeys().then((keys) => {
        return AsyncStorage.multiGet(keys).then(stores => {
            return stores.map( (result, index, store) => {
                let key = result[0];
                let object = {key, data: JSON.parse(store[index][1]) };
                return object;
            });
        });
    });;
}

//Function to save a new deck
export const saveDeck = (deckTitle) =>{
    try{
       return AsyncStorage.mergeItem(deckTitle, JSON.stringify({ title: deckTitle, quizLength:0, questions: [] }));
    }catch(e){
        console.log("Error", e);
    }
};

//Function to save a card in a deck
export function saveCardToDeck(title, question, answer ) {
    try{
        return AsyncStorage.getItem(title, (err, res) => {
            let data = JSON.parse(res);

            let questions = data.questions;
            questions.push({question:question, answer:answer});
            return AsyncStorage.mergeItem(title, JSON.stringify({title: title, quizLength:data.quizLength+1, questions: questions }));
        });
    }catch(e){
        console.log('error', e);
    }
}