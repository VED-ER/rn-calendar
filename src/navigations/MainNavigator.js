import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AddEventScreen from "../screens/AddEventScreen";
import EditEventScreen from "../screens/EditEventScreen";
import OnboardingWizardScreen from "../screens/OnboardingWizardScreen";
import DrawerNavigator from "./DrawerNavigator";
import { MAIN, DRAWER, ONBOARDING_WIZARD, ADD_EVENT, EDIT_EVENT } from "./routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import * as Splash from 'expo-splash-screen'
import { ONBOARDING_WIZARD_SEEN } from "../data/constants";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={DRAWER} >
            <Stack.Screen name={DRAWER} component={DrawerNavigator} options={{
                headerShown: false,
            }} />
            <Stack.Screen
                name={ADD_EVENT}
                component={AddEventScreen}
                options={{
                    title: 'Add Event'
                }}
            />
            <Stack.Screen
                name={EDIT_EVENT}
                component={EditEventScreen}
                options={{
                    title: 'Edit Event'
                }}
            />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    const [inited, setInited] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        getOnboardingWizardStatus()
    }, [])

    useEffect(() => {
        if (inited) {
            Splash.hideAsync()
        }
    }, [inited])

    const getOnboardingWizardStatus = async () => {
        try {
            const wizardSeen = await AsyncStorage.getItem(ONBOARDING_WIZARD_SEEN);
            if (wizardSeen !== null) navigation.reset({ index: 0, routes: [{ name: MAIN }] })
        } catch (e) {
            Alert.alert('Error', 'An error occured');
        } finally {
            setTimeout(() => {
                setInited(true)
                // waiting for the initial (month) screen to be rendered
            }, 500) 
        }

    }

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name={ONBOARDING_WIZARD}
                component={OnboardingWizardScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name={MAIN} component={AppNavigator} options={{ animation: 'none' }} />
        </Stack.Navigator>
    );
};

export default MainNavigator;