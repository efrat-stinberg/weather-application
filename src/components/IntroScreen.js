import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IntroScreen = ({ navigation }) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(100));

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('WeatherInput');
        }, 6000);

        return () => clearTimeout(timer);
    }, [fadeAnim, navigation, slideAnim]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <StatusBar barStyle="dark-content" />
            <Icon name="sun-o" size={50} color="#FFD700" /> 
            <Icon name="cloud" size={50} color="#B0C4DE" /> 
            <Text style={styles.title}>ברוכים הבאים לאפליקציית התחזית מזג האוויר!</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default IntroScreen;
