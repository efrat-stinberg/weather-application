import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherForecast = ({ route }) => {
  const { forecastData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>תחזית מזג האוויר</Text>
      {/* כאן תוכל להציג את הנתונים של התחזית */}
      {JSON.stringify(forecastData)} {/* דוגמה להצגת נתונים */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WeatherForecast;
