import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import OnboardingSlide from '../components/OnboardingSlide';
import OnboardingPaginator from '../components/OnboardingPaginator';
import { MAIN } from '../navigations/routes';

export default function OnboardingWizardScreen({ navigation }) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const sliderRef = useRef();
    const renderSlide = ({ item }) => (
        <OnboardingSlide data={item} />
    );

    const nextSlideButtonHandler = () => {
        sliderRef.current.scrollToIndex({ index: currentSlideIndex + 1 });
        setCurrentSlideIndex(prevIdx => prevIdx + 1);
        if (currentSlideIndex === 1) setScrollEnabled(false);
    };

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        const currIdx = viewableItems[0]?.index;
        if (currIdx === 2) setScrollEnabled(false);
        setCurrentSlideIndex(currIdx);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const gotItButtonHandler = () => navigation.reset({ index: 0, routes: [{ name: MAIN }] });

    return (
        <View style={styles.container}>
            <FlatList
                data={onboardingImages}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id}
                horizontal={true}
                pagingEnabled={true}
                bounces={false}
                ref={sliderRef}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={scrollEnabled}
            />
            <OnboardingPaginator
                data={onboardingImages}
                currentIndex={currentSlideIndex}
                onPress={nextSlideButtonHandler}
                onGotItButtonPress={gotItButtonHandler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const onboardingImages = [
    {
        id: 1,
        title: 'RN Calendar',
        description: 'Make the most of every day.',
        image: require('../assets/notification.png')
    },
    {
        id: 2,
        title: 'Easy to scan and lovely to look at',
        description: 'Schedule View puts images and maps on your calendar',
        note: 'Uses device location.',
        image: require('../assets/google-maps.png')
    },
    {
        id: 3,
        title: 'Don\'t miss a thing',
        description: 'Calendar may need additional permissions to notify you of upcoming events',
        note: 'You can change these in Settings',
        image: require('../assets/google-calendar.png')
    },
];