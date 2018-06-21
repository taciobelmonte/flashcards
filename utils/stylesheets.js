import styled from 'styled-components/native'

export const Main = styled.View`
    flex:1;
    background-color:#fff;
`;

export const TextColor = styled.Text`
    background:#fff;
    box-shadow:1px 1px 5px #000;
    font-size:26px;
    z-index:11;
    background:#ff6c70;
    padding:30px;
    margin-bottom:10px;
    color:#fff;
    position:relative;
    font-family:'Avenir-Black';
    text-align:center;
    width:100%;
`;

export const ButtonStyled = styled.TouchableOpacity`
    padding:10px 40px;
    background:#fff;
    height:60px;
    margin:10px;
    border-radius:5px;
    box-shadow:1px 1px 5px #a3a3a3;
`;

export const TextInputStyled = styled.TextInput`
    padding:10px 40px;
    background:#fff;
    height:60px;
    margin:10px;
    border-radius:5px;
    color:#e44549;
    font-size:16px;
    font-family:'Avenir-Black';
    text-align:center;
    box-shadow:1px 1px 5px #a3a3a3;
`;

export const TextParagraph = styled.Text`
    color:#08586f;
    background:#fff;
    margin:20px 0 0 0;
    font-size:20px;
    align-items:stretch;
    text-align:center;
    padding:5px 10px;
    width:100%;
    font-family:'Avenir-Black';
`;

export const OtherView = styled.View`
    flex:1;
    justify-content:center;
`;

export const Correct = styled.Text`
    color:#fff;
    background:#1bb869;
    font-size:18px;
    text-align:center;
    padding:10px 5px;
    font-family:'Avenir-Black';
`;