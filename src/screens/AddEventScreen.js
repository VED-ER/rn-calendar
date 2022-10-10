import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'EVENTS_DATA';

const AddEventScreen = ({ navigation, route }) => {
    const [date, setDate] = useState(new Date());
    const [eventData, setEventData] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const days = JSON.parse(route.params.days);

    const saveEvent = async (data) => {
        try {
            const d = await AsyncStorage.getItem(KEY);
            if (d !== null) {
                const eventsArray = JSON.parse(d);
                eventsArray.push(data);
                await AsyncStorage.setItem(KEY, JSON.stringify(eventsArray));
            } else {
                console.log('no events if');

                await AsyncStorage.setItem(KEY, JSON.stringify([data]));
            }
        } catch (error) {
            Alert.alert('error', 'save error');
        }
    };

    const selectDatePressHandler = () => {
        setShowDatePicker(true);
    };

    const handleDateConfirm = (selectedDate) => {
        setDate(selectedDate);
        setShowDatePicker(false);
    };

    const hideDatePicker = () => {
        setShowDatePicker(false);
    };

    const handleStartTimePickerConfirm = (selectedTime) => {
        setEventData(prevData => ({ ...prevData, startTime: selectedTime }));
        setShowStartTimePicker(false);
    };

    const hideStartTimePicker = () => {
        setShowStartTimePicker(false);
    };

    const handleEndTimePickerConfirm = (selectedTime) => {
        setEventData(prevData => ({ ...prevData, endTime: selectedTime }));
        setShowEndTimePicker(false);
    };

    const hideEndTimePicker = () => {
        setShowEndTimePicker(false);
    };

    const handleColorSelect = (color) => {
        setEventData(prevData => ({ ...prevData, color: color }));
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <Pressable style={({ pressed }) => pressed && { opacity: 0.5 }} onPress={selectDatePressHandler}>
                        <Text style={{ fontSize: 16 }}>{format(date, 'MM/dd/yy')}</Text>
                    </Pressable>
                </View>
            )
        });
    }, [navigation, date]);

    const onSwitchValueChange = () => {
        setEventData(prevData => ({ ...prevData, allDay: !prevData.allDay }));
    };

    const addButtonHandler = () => {
        saveEvent({ ...eventData, date: date }).then(() => {
            navigation.goBack();
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.labelText}>Name</Text>
                <TextInput
                    style={styles.input}
                    onChange={(e) => setEventData(prevData => ({ ...prevData, name: e.nativeEvent.text }))}
                    value={eventData.name}
                    placeholder='Event name'
                />
            </View>
            <View style={styles.switchStyle}>
                <Switch
                    onValueChange={onSwitchValueChange}
                    value={eventData.allDay}
                />
                <Text>All day?</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>

                    <Text>Start time</Text>
                    <Pressable
                        disabled={eventData.allDay ? true : false}
                        onPress={() => setShowStartTimePicker(true)}
                        style={({ pressed }) => pressed && { opacity: 0.5 }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            maxWidth: '80%',
                            justifyContent: 'space-between',
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 10,
                            padding: 5,
                            marginTop: 5
                        }}>
                            <Text>{`${eventData?.startTime ? format(eventData.startTime, 'HH : mm aa') : '-- : -- --'} `}</Text>
                            <MaterialIcons name='access-time' size={24} />
                        </View>
                    </Pressable>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>End time</Text>
                    <Pressable
                        disabled={eventData.allDay ? true : false}
                        onPress={() => setShowEndTimePicker(true)}
                        style={({ pressed }) => pressed && { opacity: 0.5 }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            maxWidth: '80%',
                            justifyContent: 'space-between',
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 10,
                            padding: 5,
                            marginTop: 5
                        }}>
                            <Text>{`${eventData?.endTime ? format(eventData.endTime, 'HH : mm aa') : '-- : -- --'} `}</Text>
                            <MaterialIcons name='access-time' size={24} />
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text>Color</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Pressable
                        style={[styles.colorBox, { backgroundColor: 'blue' }, eventData.color === 'blue' && { opacity: 1 }]}
                        onPress={() => handleColorSelect('blue')}
                    />
                    <Pressable
                        style={[styles.colorBox, { backgroundColor: 'red' }, eventData.color === 'red' && { opacity: 1 }]}
                        onPress={() => handleColorSelect('red')}
                    />
                    <Pressable
                        style={[styles.colorBox, { backgroundColor: 'green' }, eventData.color === 'green' && { opacity: 1 }]}
                        onPress={() => handleColorSelect('green')}
                    />
                </View>
            </View>
            <Pressable
                onPress={addButtonHandler}
                style={({ pressed }) => pressed ? [styles.addBtn, { opacity: 0.5 }] : styles.addBtn}
            >
                <Text style={{ color: 'green', textAlign: 'center' }}>Add Event</Text>
            </Pressable>
            <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={showStartTimePicker}
                mode="time"
                onConfirm={handleStartTimePickerConfirm}
                onCancel={hideStartTimePicker}
            />
            <DateTimePickerModal
                isVisible={showEndTimePicker}
                mode="time"
                onConfirm={handleEndTimePickerConfirm}
                onCancel={hideEndTimePicker}
            />
        </ScrollView >
    );
};

export default AddEventScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    labelText: {
        fontSize: 16,
        marginBottom: 5
        // color: 'gray'
    },
    input: {
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    switchStyle: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 1,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorBox: {
        height: 50,
        width: 50,
        borderRadius: 10,
        marginRight: 10,
        opacity: 0.5
    },
    addBtn: {
        backgroundColor: 'lightgreen',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
        marginTop: 20,
        padding: 10
    }
});