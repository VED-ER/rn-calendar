import { StyleSheet, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './navigations/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function Main() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <MainNavigator />
            </NavigationContainer>
        </>
    );
}