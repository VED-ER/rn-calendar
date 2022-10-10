import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import { format, isToday } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { DAY_VIEW } from '../navigations/routes';

const MonthDay = ({ date, height, index, events }) => {
    const [currentDayEvents, setCurrentDayEvents] = useState([]);
    const navigation = useNavigation();
    const today = isToday(date);

    if (events.length > 0) {
        const e = events.filter(e => e.date === date.toISOString());
        setCurrentDayEvents(e);
        // console.log(date.toIsoString());
        // console.log(typeof events[0].date);
        // console.log(events);
    }
    console.log(date, '  ', currentDayEvents);
    return (
        <Pressable style={[styles.container, {
            height: height / 6,
            borderBottomWidth: index > 34 ? 0 : 1
        }]}
            android_ripple={{ color: 'lightgray' }}
            onPress={() => navigation.navigate(DAY_VIEW)}
        >
            <View >
                <View style={today ? styles.activeDay : {}}>
                    <Text style={today ? styles.dayNumberActive : styles.dayNumber}>{format(date, "d")}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default MonthDay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "lightgray"
    },
    dayNumber: {
        textAlign: 'center'
    },
    dayNumberActive: {
        textAlign: 'center',
        color: 'white'
    },
    activeDay: {
        backgroundColor: 'darkblue',
        borderRadius: 20,
        width: 20
    }
});