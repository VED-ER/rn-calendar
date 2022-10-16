import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DayEventItem from './DayEventItem';
import { EDIT_EVENT } from '../navigations/routes';

const DayEvents = ({ events, navigation }) => {

    const onEventPress = (id) => {
        navigation.navigate(EDIT_EVENT, { eventId: id });
    };

    const renderItem = ({ item }) => <DayEventItem event={item} onEventPress={onEventPress.bind(this, item.id)} />;

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