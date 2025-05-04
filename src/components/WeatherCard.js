import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WeatherCard = ({ weather }) => {
    const getWeatherIcon = (description) => {
        if (description.includes('clear')) {
            return { name: 'sun-o', color: '#FFD700' };
        } else if (description.includes('cloud')) {
            return { name: 'cloud', color: '#A9A9A9' };
        } else if (description.includes('rain')) {
            return { name: 'cloud-rain', color: '#1E90FF' };
        } else if (description.includes('partly cloudy')) {
            return { name: 'cloud-sun', color: '#FFA500' };
        }
        return { name: 'question-circle', color: '#000000' };
    };

    const icon = getWeatherIcon(weather.weather[0].description);
    const temperature = Math.round(weather.main.temp - 273.15);
    const cityName = weather.name;

    return (
        <View style={styles.card}>
            <Icon name={icon.name} size={40} color={icon.color} />
            <Text style={styles.city}>{cityName}</Text>
            <Text style={styles.description}>{weather.weather[0].description}</Text>
            <Text style={styles.temp}>{temperature}°C</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        padding: 30,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        width: '90%',
        height: 250,
    },
    city: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 28,
        marginVertical: 20,
    },
});

export default WeatherCard;
