import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppContext from '../store/AppContext';
import DayEvents from '../components/DayEvents';

const DayViewScreen = ({ navigation, route }) => {
    const [selectedDate, setSelectedDate] = useState();
    const [dayEvents, setDayEvents] = useState([]);

    const { events } = useContext(AppContext);

    useEffect(() => {
        if (route.params.dayDate) {
            const e = events.filter(e => e.date === route.params.dayDate);
            setDayEvents(e);
            setSelectedDate(new Date(route.params.dayDate));
        }
    }, [route?.params?.dayDate]);

    useEffect(() => {
        navigation.setOptions({
            title: selectedDate && format(selectedDate, 'MM/dd/yyyy')
        });
    }, [navigation, selectedDate]);

    return (
        <View style={styles.container}>
            <DayEvents events={dayEvents} />
        </View>
    );
};

export default DayViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
});