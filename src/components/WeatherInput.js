import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Animated, Alert, KeyboardAvoidingView, Switch, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import WeatherCard from './WeatherCard';

const WeatherInput = ({ navigation }) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const apiKey = 'aad7df59a6e513b8ee44dc47a57c2e15';

    const fetchWeatherData = async () => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        setLoading(true);
        setError(null);
        setIsButtonPressed(true);
        setCity('');
        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
            fadeIn();
        } catch (err) {
            // הצגת התראה אמיתית במקרה של שגיאה
            Alert.alert("שגיאה", "העיר לא נמצאה או שיש בעיה בשרת", [
                { text: "אוקי", onPress: () => console.log("OK Pressed") }
            ]);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };
    

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const showAlert = () => {
        Alert.alert("Alert Title", "My Alert Msg", [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]);
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="הכנס שם עיר"
                    value={city}
                    onChangeText={setCity}
                />
                <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
                    <Icon name="cloud" size={20} color="white" />
                    <Text style={styles.buttonText}>קבל מזג אוויר</Text>
                </TouchableOpacity>

                <Switch
                    onValueChange={setIsEnabled}
                    value={isEnabled}
                />

                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {error && <Text style={styles.error}>{error}</Text>}
                {weatherData ? (
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <WeatherCard weather={weatherData} />
                    </Animated.View>
                ) : (
                    isButtonPressed && !loading && <Text>טוען...</Text>
                )}
                <TouchableOpacity onPress={showAlert}>
                    <Text>הצג התראה</Text>
                </TouchableOpacity>

                {/* Modal Example */}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text>פתח מודל</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <Text>זהו מודל לדוגמה!</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text>סגור</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        flexDirection: 'row-reverse',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    error: {
        color: 'red',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default WeatherInput;
