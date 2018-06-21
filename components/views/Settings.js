import React from 'react';
import { View, Text, ScrollView} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {Main, TextColor} from './../../utils/stylesheets'
import styled from 'styled-components/native'

export default class Settings extends React.Component {
    render() {
        return (
            <Main>
                <TextColor><Ionicons name='ios-settings' size={30} color='#fff'></Ionicons> SETTINGS</TextColor>
            </Main>
        );
    }
}