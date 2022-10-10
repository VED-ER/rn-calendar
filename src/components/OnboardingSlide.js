import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';

export default function OnboardingSlide({ data }) {

    const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            <Image
                source={data.image}
                style={[styles.image, { width: 270, height: 270, resizeMode: 'contain' }]}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.description}>{data.description}</Text>
                {!!data.note && <Text style={styles.note}>{data.note}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    textContainer: {
        marginTop: 50,
        paddingHorizontal: 30,
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 35
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 5,
        lineHeight: 25
    },
    note: {
        fontSize: 12,
        textAlign: 'center'
    }
});