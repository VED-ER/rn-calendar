import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import React, { useContext } from 'react';
import MonthDay from './MonthDay';
import MonthHeader from './MonthHeader';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { ADD_EVENT } from '../navigations/routes';
import AppContext from '../store/AppContext';
import { isSameMonth } from 'date-fns';

const numColumns = 7;

const Month = ({ days, height, width, events, currentDate }) => {
    const navigation = useNavigation();

    const renderItem = ({ item, index }) => {
        const dayEvents = events.filter(e => e.date === item.toDateString());

        const isCurrentMonthDay = isSameMonth(item, currentDate);
        return (
            <MonthDay date={item} height={height} index={index} dayEvents={dayEvents} isCurrentMonthDay={isCurrentMonthDay} />
        );
    };

    return (
        <View style={[styles.container, { width }]} >
            <MonthHeader />
            <FlatList
                data={days}
                renderItem={renderItem}
                keyExtractor={(_item, index) => index.toString()}
                numColumns={numColumns}
                bounces={false}
            />
            <View style={styles.addEventBtn}>
                <Pressable
                    style={({ pressed }) => pressed && { opacity: 0.5 }}
                    onPress={() => navigation.navigate(ADD_EVENT)}
                >
                    <MaterialIcons name="add" size={34} color="white" />
                </Pressable>
            </View>
        </View>
    );
};

export default Month;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addEventBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 60,
        height: 60,
        backgroundColor: 'lightblue',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});