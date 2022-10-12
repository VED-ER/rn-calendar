import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'EVENTS_DATA';

const AppContext = React.createContext({
    currentDate: null,
    setCurrentDate: () => { },

    events: [],
    setEvents: () => { }
});

export const AppContextProvider = ({ children }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const data = await AsyncStorage.getItem(KEY);
            if (data !== null) {
                setEvents(JSON.parse(data));
            }
        } catch (e) {
            console.log("ERROR");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const context = {
        currentDate,
        setCurrentDate,

        events,
        setEvents
    };

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;