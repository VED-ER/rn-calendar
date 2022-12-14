import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { DAY_VIEW } from '../navigations/routes';

const MonthDay = ({ date, height, index, dayEvents, isCurrentMonthDay }) => {
    const navigation = useNavigation();
    const today = isToday(date);

    const AllDayEvent = ({ data }) => (
        <View style={[styles.dayEventContainer, { backgroundColor: data.color }]}>
            <Text
                style={styles.monthDayText}
                ellipsizeMode={'tail'}
                numberOfLines={1}
            >
                {data.name}
            </Text>
        </View>
    );

    const TimedDayEvent = ({ data }) => (
        <View style={styles.timedDayEventContainer}>
            <View style={[styles.timedDayEventTextContainer, { backgroundColor: data.color }]} />
            <Text
                style={styles.timedDayEventText}
                ellipsizeMode={'tail'}
                numberOfLines={1}
            >
                {data.name}
            </Text>
        </View>
    );

    const MonthDayEvent = ({ data, idx }) => {
        if (idx > 2) return;

        if (data?.allDay)
            return <AllDayEvent data={data} />;

        return <TimedDayEvent data={data} />;
    };

    return (
        <Pressable style={({ pressed }) => ([styles.container, {
            height: height / 6,
            borderBottomWidth: index > 34 ? 0 : 1
        }, isCurrentMonthDay ? {} : { backgroundColor: '#f0f0f0' }, pressed && { opacity: 0.5 }])}
            android_ripple={{ color: 'lightgray' }}
            onPress={() => navigation.navigate(DAY_VIEW, { dayDate: date.toDateString() })}
        >
            <View>
                <View style={today ? styles.activeDay : {}}>
                    <Text style={today ? styles.dayNumberActive : styles.dayNumber}>{format(date, "d")}</Text>
                </View>
                <View style={styles.dayEventsContainer} >
                    {dayEvents.map((e, idx) => (<MonthDayEvent data={e} key={e.id} idx={idx} />))}
                    {dayEvents.length > 3 && <Text style={styles.viewMoreText}>{`+${dayEvents.length - 3} more`}</Text>}
                </View>
            </View>
        </Pressable>
    );
};

export default MonthDay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 4,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "lightgray"
    },
    dayNumber: {
        textAlign: 'center',
        fontSize: 13
    },
    dayNumberActive: {
        textAlign: 'center',
        color: 'white',
        fontSize: 13,
        marginTop: 2.5
    },
    activeDay: {
        backgroundColor: 'darkblue',
        borderRadius: 20,
        width: 22,
        height: 22,
        alignSelf: 'center',
        marginTop: -2.5
    },
    dayEventsContainer: {
        marginTop: 5
    },
    dayEventContainer: {
        paddingHorizontal: 2,
        borderRadius: 4,
        marginBottom: 3
    },
    monthDayText: {
        color: 'white',
        fontSize: 12
    },
    timedDayEventTextContainer: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 5
    },
    timedDayEventContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3
    },
    timedDayEventText: {
        fontSize: 12,
        color: 'black',
        maxWidth: '85%'
    },
    viewMoreText: {
        fontSize: 12,
        fontWeight: 'bold'
    }
});