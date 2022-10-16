import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppContext from '../store/AppContext';
import DayEvents from '../components/DayEvents';
import { useIsFocused } from '@react-navigation/native';

const DayViewScreen = ({ navigation, route }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dayEvents, setDayEvents] = useState([]);

    const isFocused = useIsFocused();
    const { events } = useContext(AppContext);

    useEffect(() => {
        if (route.params.dayDate) {
            const e = events.filter(e => e.date === route.params.dayDate);
            setDayEvents(e);
            setSelectedDate(new Date(route.params.dayDate));
        } else {
            const e = events.filter(e => e.date === selectedDate.toDateString());
            setDayEvents(e);
        }
    }, [route?.params?.dayDate, isFocused]);

    useEffect(() => {
        navigation.setOptions({
            title: selectedDate && format(selectedDate, 'MM/dd/yyyy')
        });
    }, [navigation, selectedDate]);

    return (
        <View style={styles.container}>
            <DayEvents events={dayEvents} navigation={navigation} />
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