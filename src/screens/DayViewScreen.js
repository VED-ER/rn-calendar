import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppContext from '../store/AppContext';
import DayEvents from '../components/DayEvents';
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DayViewScreen = ({ navigation, route }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dayEvents, setDayEvents] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const isFocused = useIsFocused();
    const { events } = useContext(AppContext);

    const hideDatePicker = () => {
        setShowDatePicker(false);
    };

    const handleDateConfirm = (date) => {
        setShowDatePicker(false);
        setSelectedDate(date);
    };

    useEffect(() => {
        if (route?.params?.dayDate) {
            const e = events.filter(e => e.date === route.params.dayDate);
            setDayEvents(e);
            setSelectedDate(new Date(route.params.dayDate));
        }
    }, [route?.params?.dayDate]);

    useEffect(() => {
        const e = events.filter(e => e.date === selectedDate.toDateString());
        setDayEvents(e);
    }, [selectedDate, isFocused]);

    useEffect(() => {
        navigation.setOptions({
            title: selectedDate && format(selectedDate, 'MM/dd/yyyy'),
            headerRight: () => (
                <View>
                    <Pressable
                        android_ripple={{ color: 'lightgray' }}
                        onPress={() => setShowDatePicker(true)}
                        style={{ marginRight: 20 }}
                    >
                        <MaterialIcons
                            name="calendar-today"
                            size={24}
                            color="black"
                        />
                    </Pressable>
                </View>
            )
        });
    }, [navigation, selectedDate]);

    return (
        <View style={styles.container}>
            {dayEvents.length > 0 ?
                <DayEvents events={dayEvents} navigation={navigation} />
                :
                <View style={styles.noEventsContainer}>
                    <Image source={require('../assets/noeventscalendar.png')} style={styles.imageStyle} />
                    <Text>This date has no events.</Text>
                </View>
            }
            <DateTimePickerModal
                date={selectedDate}
                isVisible={showDatePicker}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

export default DayViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    noEventsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: 120,
        height: 120,
        marginBottom: 20
    }
});