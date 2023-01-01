import React, { useEffect, useReducer, useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { EVENTS_DATA } from "../data/constants";


const AppContext = React.createContext({
    currentDate: null,
    setCurrentDate: () => { },

    events: [],
    setEvents: () => { },
    addEvent: () => { },
    deleteEvent: () => { },
    editEvent: () => { }
});

const eventsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            // brand new array and object to make a brand new state snapshot
            return [...state, { ...action.payload }];
        case 'EDIT':
            const editEventIndex = state.findIndex(e => e.id === action.payload.id);
            const editEvent = state[editEventIndex];
            const editedEvent = { ...editEvent, ...action.payload.data };
            const editedEvents = [...state];
            editedEvents[editEventIndex] = editedEvent;
            return editedEvents;
        case 'DELETE':
            return state.filter(e => e.id !== action.payload);
        case 'INIT':
            return action.payload;
        default:
            return state;
    }
};

export const AppContextProvider = ({ children }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const [eventsState, dispatch] = useReducer(eventsReducer, []);

    const firstUpdate = useRef(true);

    const addEvent = (event) => {
        dispatch({ type: 'ADD', payload: event });
    };

    const deleteEvent = (eventId) => {
        dispatch({ type: 'DELETE', payload: eventId });
    };

    const editEvent = (eventId, event) => {
        dispatch({ type: 'EDIT', payload: { id: eventId, data: event } });
    };

    const writeData = async () => {
        try {
            await AsyncStorage.setItem(EVENTS_DATA, JSON.stringify(eventsState));
        } catch (e) {
            Alert.alert('Error', 'An error occured');
        }
    };

    const fetchEvents = async () => {
        try {
            const data = await AsyncStorage.getItem(EVENTS_DATA);
            if (data !== null) {
                dispatch({ type: 'INIT', payload: JSON.parse(data) });
            }
        } catch (e) {
            Alert.alert('Error', 'An error occured');
        }
    };

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        writeData();
    }, [eventsState]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const context = {
        currentDate,
        setCurrentDate,

        events: eventsState,
        addEvent,
        deleteEvent,
        editEvent
    };

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;