import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DayEventItem = ({ event }) => {
    return (
        <View style={[styles.container, { backgroundColor: event.color }]}>
            <Text style={styles.dayItemText}>{event.name}</Text>
        </View>
    );
};

export default DayEventItem;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 5
    },
    dayItemText: {
        color: 'white',
        fontSize: 15
    }
});