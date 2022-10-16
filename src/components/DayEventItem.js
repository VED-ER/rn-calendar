import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { format } from 'date-fns';

const DayEventItem = ({ event, onEventPress }) => {

    const AllDayEvent = () => (
        <Pressable onPress={onEventPress}>
            <View style={[styles.allDayEventContainer, { backgroundColor: event.color }]}>
                <Text style={styles.dayItemText}>{event.name}</Text>
            </View>
        </Pressable>
    );

    const TimedDayEvent = () => (
        <Pressable onPress={onEventPress}>
            <View style={styles.timeDayEventContainer}>
                <View style={[styles.timedDayEventCircle, { backgroundColor: event.color }]} />
                <View style={styles.timedDayEventTextContainer}>
                    <Text
                        style={{ maxWidth: '80%' }}
                        ellipsizeMode='tail'
                        numberOfLines={1}
                    >
                        {event.name}
                    </Text>
                    <Text>{format(new Date(event.startTime), 'HH : mm aa')}</Text>
                </View>
            </View>
        </Pressable>
    );

    return event.allDay ? <AllDayEvent /> : <TimedDayEvent />;
};

export default DayEventItem;

const styles = StyleSheet.create({
    allDayEventContainer: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 5
    },
    dayItemText: {
        color: 'white',
        fontSize: 15
    },
    timeDayEventContainer: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    timedDayEventCircle: {
        height: 20,
        width: 20,
        borderRadius: 20,
        marginRight: 15
    },
    timedDayEventTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});