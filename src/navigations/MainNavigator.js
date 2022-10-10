import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEventScreen from "../screens/AddEventScreen";
import OnboardingWizardScreen from "../screens/OnboardingWizardScreen";
import DrawerNavigator from "./DrawerNavigator";
import { MAIN, DRAWER, ONBOARDING_WIZARD, ADD_EVENT } from "./routes";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={DRAWER} >
            <Stack.Screen name={DRAWER} component={DrawerNavigator} options={{
                headerShown: false,
            }} />
            <Stack.Screen name={ADD_EVENT} component={AddEventScreen} />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={MAIN} component={AppNavigator} />
            <Stack.Screen
                name={ONBOARDING_WIZARD}
                component={OnboardingWizardScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;