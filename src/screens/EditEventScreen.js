import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import EventForm from '../components/EventForm';

const EditEventScreen = ({ navigation, route }) => {
    const [id, setId] = useState(null);

    useEffect(() => {
        if (route.params.eventId) {
            setId(route.params.eventId);
        }
    }, [route?.params?.eventId]);

    return <EventForm navigation={navigation} edit={true} editId={id} />;
};

export default EditEventScreen;

const styles = StyleSheet.create({});