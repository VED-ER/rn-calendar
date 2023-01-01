import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function OnboardingPaginator({ data, currentIndex, onPress, onGotItButtonPress }) {

    const GotItButton = () => (
        <Pressable onPress={onGotItButtonPress} style={({ pressed }) => ([styles.gotItBtnStyle, pressed && { opacity: 0.5 }])}>
            <Text style={styles.gotItBtnText}>Got it</Text>
        </Pressable>
    );

    if (currentIndex === 2) return <GotItButton />;

    return (
        <View style={styles.container}>
            <View style={{ width: 30 }}></View>
            <View style={styles.dotsContainer}>
                {data.map((_, idx) => <View
                    style={[styles.paginationDot, currentIndex === idx && { backgroundColor: '#000' }]}
                    key={idx.toString()}
                />)}
            </View>
            <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.5 }}>
                <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingHorizontal: 20,
        paddingVertical:10
    },
    dotsContainer: {
        flexDirection: 'row',
        width: 40,
        justifyContent: 'space-between',
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1
    },
    gotItBtnStyle: {
        backgroundColor: 'blue',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 25,
        marginBottom: 40
    },
    gotItBtnText: {
        color: 'white'
    }
});