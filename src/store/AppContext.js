import React, { useState } from "react";


const AppContext = React.createContext({
    currentDate: null,
    setCurrentDate: () => { },

    events: [],
    setEvents: () => { }
});

export const AppContextProvider = ({ children }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    console.log('EVETNS ', events);
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