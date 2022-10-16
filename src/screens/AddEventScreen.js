import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { v4 as uuidv4 } from 'uuid';
import AppContext from '../store/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventForm from '../components/EventForm';

const KEY = 'EVENTS_DATA';

const AddEventScreen = ({ navigation }) => {
    const { setCurrentDate } = useContext(AppContext);

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    return <EventForm navigation={navigation} />;
};

export default AddEventScreen;
