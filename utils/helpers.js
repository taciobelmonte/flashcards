//Function to go over deck objects and then filter with the valuable information
export const filterDecks = ({decks}) =>
    Object.keys(decks).map((key, index) => ({
        index: index,
        quizLength: decks[key].quizLength,
        title: decks[key].title,
        questions: decks[key].questions,
    }));