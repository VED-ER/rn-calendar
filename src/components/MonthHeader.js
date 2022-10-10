import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const data = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const numColumns = 7;

const MonthHeader = () => {

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(_item, index) => index.toString()}
                numColumns={numColumns}
                bounces={false}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => <View style={styles.emptyItemContainer} />}
                keyExtractor={(_item, index) => index.toString()}
                bounces={false}
                numColumns={numColumns}
            />
        </View>
    );
};

export default MonthHeader;

const styles = StyleSheet.create({
    container: {
        // height: 100
    },
    itemContainer: {
        flex: 1,
        height: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyItemContainer: {
        flex: 1,
        height: 10,
        borderColor: 'lightgray',
        borderRightWidth: 1,
        borderBottomWidth:1,
        backgroundColor: 'white'
    }
});