import { Pressable, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Month from '../components/Month';
import {
    addMonths,
    addWeeks,
    daysToWeeks,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    startOfMonth,
    startOfWeek,
    subMonths
} from 'date-fns';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AppContext from '../store/AppContext';

export default function MonthViewScreen({ navigation }) {
    const [height, setHeight] = useState(1);

    const { currentDate, setCurrentDate, events } = useContext(AppContext);

    const firstWeekStart = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const lastWeekEnd = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
    const currentMonthDays = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });

    const checkNumberOfWeeks = (days) => {
        const numOfWeeks = daysToWeeks(days.length);

        if (numOfWeeks < 6) {
            const sixthWeek = addWeeks(days[days.length - 1], 1);
            const monthDaysWithSixthWeek = eachDayOfInterval({ start: firstWeekStart, end: sixthWeek });

            return monthDaysWithSixthWeek;
        }
        return days;
    };

    const onLayout = (event) => {
        setHeight(event.nativeEvent.layout.height);
    };

    const nextMonthBtnHandler = () => {
        setCurrentDate(prevDate => addMonths(prevDate, 1));
    };

    const prevMonthBtnHandler = () => {
        setCurrentDate(prevDate => subMonths(prevDate, 1));
    };

    const todayBtnHandler = () => {
        setCurrentDate(new Date());
    };


    useEffect(() => {
        navigation.setOptions({
            title: format(currentDate, 'MMMM yyyy'),
            headerRight: () => (
                <View style={styles.headerContainer}>
                    <Pressable android_ripple={{ color: 'lightgray' }} onPress={todayBtnHandler} >
                        <MaterialIcons
                            name="calendar-today"
                            size={24}
                            color="black"
                        />
                    </Pressable>
                    <View style={styles.headerInnerContainer}>
                        <Pressable android_ripple={{ color: 'lightgray' }} onPress={prevMonthBtnHandler}>
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                size={34}
                                color="black"
                            />
                        </Pressable>
                        <Pressable android_ripple={{ color: 'lightgray' }} onPress={nextMonthBtnHandler}>
                            <MaterialIcons
                                name="keyboard-arrow-right"
                                size={34}
                                color="black"
                            />
                        </Pressable>
                    </View>
                </View>
            )
        });
    }, [navigation, currentDate]);

    return (
        <View style={styles.container} onLayout={onLayout}>
            <Month
                days={checkNumberOfWeeks(currentMonthDays)}
                height={height - 40}
                events={events}
                currentDate={currentDate}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        width: 120
    },
    headerInnerContainer: {
        flexDirection: 'row',
        width: 75,
        justifyContent: 'space-between'
    }
});