import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import MonthDay from './MonthDay';
import { FlatGrid } from 'react-native-super-grid';
import MonthHeader from './MonthHeader';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { ADD_EVENT } from '../navigations/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const numColumns = 7;
const KEY = 'EVENTS_DATA';

const Month = ({ days, height, width }) => {
    const [events, setEvents] = useState([]);
    const navigation = useNavigation();

    const renderItem = ({ item, index }) => <MonthDay date={item} height={height} index={index} events={events} />;

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await AsyncStorage.getItem(KEY);
                if (data !== null) {
                    setEvents(JSON.parse(data));
                }
            } catch (e) {
                Alert.alert('error', 'an error occured');
            }
        };

        getEvents();

    }, []);

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
                    onPress={() => navigation.navigate(ADD_EVENT, { days: JSON.stringify(days) })}
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
        // marginHorizontal: "auto",
        // width: 400,
        // flexDirection: "row",
        // flexWrap: "wrap",
        // justifyContent: 'center',
        // alignItems: 'center'
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