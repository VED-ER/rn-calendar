import { createDrawerNavigator } from "@react-navigation/drawer";
import DayView from "../screens/DayView";
import MonthViewScreen from "../screens/MonthViewScreen";
import { DAY_VIEW, MONTH_VIEW } from "./routes";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator >
            <Drawer.Screen
                name={MONTH_VIEW}
                component={MonthViewScreen}
                options={{
                    headerShadowVisible: false,
                    headerTitleAlign: 'left',
                    drawerLabel: 'Month',

                }}
            />
            <Drawer.Screen
                name={DAY_VIEW}
                component={DayView}
                options={{
                    drawerLabel: 'Day',

                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;