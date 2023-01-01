import { Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { v4 as uuidv4 } from 'uuid';
import AppContext from '../store/AppContext';

const EventForm = ({ navigation, edit, editId }) => {
    const [eventData, setEventData] = useState({ color: 'blue' });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const { currentDate, setCurrentDate, events, addEvent, deleteEvent, editEvent } = useContext(AppContext);

    const selectDatePressHandler = () => {
        setShowDatePicker(true);
    };

    const handleDateConfirm = (selectedDate) => {
        setShowDatePicker(false);
        setCurrentDate(selectedDate);
        setEventData(prevData => ({ ...prevData, date: selectedDate.toDateString() }))
    };

    const hideDatePicker = () => {
        setShowDatePicker(false);
    };

    const handleStartTimePickerConfirm = (selectedTime) => {
        setEventData(prevData => ({ ...prevData, startTime: selectedTime.toISOString() }));
        setShowStartTimePicker(false);
    };

    const hideStartTimePicker = () => {
        setShowStartTimePicker(false);
    };

    const handleEndTimePickerConfirm = (selectedTime) => {
        setEventData(prevData => ({ ...prevData, endTime: selectedTime.toISOString() }));
        setShowEndTimePicker(false);
    };

    const hideEndTimePicker = () => {
        setShowEndTimePicker(false);
    };

    const handleColorSelect = (color) => {
        setEventData(prevData => ({ ...prevData, color: color }));
    };

    useEffect(() => {
        if (editId) {
            const editEvent = events.find(e => e.id === editId);

            if (editEvent?.startTime) {
                editEvent.startTime = new Date(editEvent.startTime);
            }
            if (editEvent?.endTime) {
                editEvent.endTime = new Date(editEvent.endTime);
            }

            setEventData(editEvent);
            setCurrentDate(new Date(editEvent.date));
        }
    }, [editId]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <Pressable style={({ pressed }) => pressed && { opacity: 0.5 }} onPress={selectDatePressHandler}>
                        <Text style={{ fontSize: 16 }}>{format(currentDate, 'MM/dd/yy')}</Text>
                    </Pressable>
                </View>
            )
        });
    }, [navigation, currentDate]);

    const onSwitchValueChange = () => {
        setEventData(prevData => ({ ...prevData, allDay: !prevData.allDay }));
    };

    const deleteButtonHandler = async () => {
        deleteEvent(eventData.id);
        navigation.goBack();
    };

    const saveButtonHandler = () => {
        editEvent(eventData.id, eventData);
        navigation.goBack();
    };

    const addButtonHandler = () => {
        addEvent({ ...eventData, date: currentDate.toDateString(), id: uuidv4() });
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.labelText}>Name</Text>
                <TextInput
                    style={[styles.input, Platform.OS === 'ios' ? { paddingVertical: 10 } : {}]}
                    onChangeText={(text) => setEventData(prevData => ({ ...prevData, name: text }))}
                    value={eventData.name}
                    placeholder='Event name'
                />
            </View>
            <View style={styles.switchStyle}>
                <Switch
                    onValueChange={onSwitchValueChange}
                    value={eventData.allDay}
                />
                <Text style={Platform.OS === 'ios' ? { marginLeft: 10 } : {}}>All day?</Text>
            </View>
            <View style={styles.selectTimeContainer}>
                <View style={{ flex: 1 }}>
                    <Text>Start time</Text>
                    <Pressable
                        disabled={eventData.allDay ? true : false}
                        onPress={() => setShowStartTimePicker(true)}
                        style={({ pressed }) => pressed && { opacity: 0.5 }}
                    >
                        <View style={styles.selectTimeInput}>
                            <Text>{`${eventData?.startTime ? format(new Date(eventData.startTime), 'HH : mm aa') : '-- : -- --'} `}</Text>
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
                        <View style={styles.selectTimeInput}>
                            <Text>{`${eventData?.endTime ? format(new Date(eventData.endTime), 'HH : mm aa') : '-- : -- --'} `}</Text>
                            <MaterialIcons name='access-time' size={24} />
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={styles.colorSelectContainer}>
                <Text>Color</Text>
                <View style={styles.colorsContainer}>
                    <Pressable
                        style={[styles.colorBox, { backgroundColor: 'blue' }, eventData.color === 'blue' && styles.selectedColor]}
                        onPress={() => handleColorSelect('blue')}
                    />
                    <Pressable
                        style={[styles.colorBox, { backgroundColor: 'red' }, eventData.color === 'red' && styles.selectedColor]}
                        onPress={() => handleColorSelect('red')}
                    />
                    <Pressable
                        style={[styles.colorBox, { backgroundColor: 'green' }, eventData.color === 'green' && styles.selectedColor]}
                        onPress={() => handleColorSelect('green')}
                    />
                </View>
            </View>
            {edit ?
                <View style={styles.editButtonsContainer}>
                    <Pressable
                        onPress={saveButtonHandler}
                        style={({ pressed }) => pressed ? [styles.addBtn, { opacity: 0.5 }] : styles.addBtn}
                    >
                        <Text style={styles.addBtnText}>Save</Text>
                    </Pressable>
                    <View style={{ width: 10 }} />
                    <Pressable
                        onPress={deleteButtonHandler}
                        style={({ pressed }) => pressed ? [styles.deleteBtn, { opacity: 0.5 }] : styles.deleteBtn}
                    >
                        <Text style={styles.deleteBtnText}>Delete</Text>
                    </Pressable>
                </View>
                :

                <Pressable
                    onPress={addButtonHandler}
                    style={({ pressed }) => pressed ? [styles.addBtn, { opacity: 0.5 }] : styles.addBtn}
                >
                    <Text style={styles.addBtnText}>Add Event</Text>
                </Pressable>
            }
            <DateTimePickerModal
                date={currentDate}
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

export default EventForm;

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
    selectTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectTimeInput: {
        flexDirection: 'row',
        maxWidth: '80%',
        justifyContent: 'space-between',
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        padding: 5,
        marginTop: 5
    },
    colorSelectContainer: {
        marginTop: 20
    },
    colorsContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    colorBox: {
        height: 50,
        width: 50,
        borderRadius: 10,
        marginRight: 10,
        opacity: 0.5
    },
    editButtonsContainer: {
        flexDirection: 'row',

    },
    addBtn: {
        flex: 1,
        backgroundColor: 'lightgreen',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
        marginTop: 20,
        padding: 10
    },
    addBtnText: {
        color: 'green',
        textAlign: 'center'
    },
    deleteBtn: {
        flex: 1,
        backgroundColor: 'pink',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'red',
        marginTop: 20,
        padding: 10
    },
    deleteBtnText: {
        color: 'red',
        textAlign: 'center'
    },
    selectedColor: {
        opacity: 1,
        borderWidth: 2
    }
});