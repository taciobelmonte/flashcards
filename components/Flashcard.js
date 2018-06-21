import React from 'react';
import { View, Text, StatusBar, ScrollView} from 'react-native'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import MainView from './../components/views/MainView'
import Settings from './../components/views/Settings'
import SingleDeck from './../components/views/SingleDeck'
import QuizView from './../components/views/QuizView'
import AddDeck from './../components/views/AddDeck'
import AddCard from './../components/views/AddCard'

function CardStatusBar ({backgroundColor, ...props}){
    return(
        <View style={{backgroundColor, height:Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}></StatusBar>
        </View>
    )
}

const Tabs = createBottomTabNavigator({
    MainView:{
        screen: MainView,
        navigationOptions:{
            title:"Home",
            tabBarIcon: ({tintColor}) => <FontAwesome name='home' size={30} color={tintColor}></FontAwesome>,
            activeTintColor: '#fff',
            header:null
        }
    },
    AddDeck:{
        screen:AddDeck,
        navigationOptions:{
            title:"Create Deck",
            tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square-o' size={30} color={tintColor}></FontAwesome>,
            activeTintColor: '#fff',
            header:null
        }
    },
    Settings:{
        screen:Settings,
        navigationOptions:{
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-settings' size={30} color={tintColor}></Ionicons>,
            activeTintColor: '#fff'
        }
    }
}, {
    tabBarOptions:{
        style:{
            height:60,
            backgroundColor:"#fff"
        },
        activeTintColor: '#ff6c70',
        animationEnabled:true
    }
});

const MainNavigator = createStackNavigator({
    MainView:{
        screen: Tabs,
        navigationOptions:{
            header:null
        }
    },
    AddDeck:{
        screen:AddDeck,
        title:"Add New Deck",
        navigationOptions:{
            activeTintColor: '#fff',
            header:null
        }
    },
    AddCard:{
        screen:AddCard,
        navigationOptions:{
            headerTintColor:'#e44549',
            headerStyle:{
                backgroundColor:'#ffc4c6'
            }
        }
    },
    SingleDeck:{
        screen:SingleDeck,
        navigationOptions:{
            headerTintColor:'#e44549',
            headerStyle:{
                backgroundColor:'#ffc4c6'
            }
        }
    },
    QuizView:{
        screen:QuizView,
        navigationOptions:{
            headerTintColor:'#e44549',
            headerStyle:{
                backgroundColor:'#ffc4c6'
            }
        }
    }
});

export default class App extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <CardStatusBar backgroundColor='#e44549' />
                <MainNavigator />
            </View>
        );
    }
}