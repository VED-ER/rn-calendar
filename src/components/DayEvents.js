import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DayEventItem from './DayEventItem';

const DayEvents = ({ events }) => {

    const renderItem = ({ item }) => <DayEventItem event={item} />;

    return (
        <View>
            <FlatList
                data={events}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default DayEvents;

const styles = StyleSheet.create({});