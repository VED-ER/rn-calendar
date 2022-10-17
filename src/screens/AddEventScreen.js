import React, { useContext, useEffect } from 'react';
import AppContext from '../store/AppContext';
import EventForm from '../components/EventForm';

const AddEventScreen = ({ navigation }) => {
    const { setCurrentDate } = useContext(AppContext);

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    return <EventForm navigation={navigation} />;
};

export default AddEventScreen;
