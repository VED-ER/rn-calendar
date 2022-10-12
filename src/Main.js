import React from 'react';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './navigations/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AppContext, { AppContextProvider } from './store/AppContext';

export default function Main() {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <AppContextProvider>
                    <AppContext.Consumer>
                        {() => <MainNavigator />}
                    </AppContext.Consumer>
                </AppContextProvider>
            </NavigationContainer>
        </>
    );
}