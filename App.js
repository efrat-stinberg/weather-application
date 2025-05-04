import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherInput from './src/components/WeatherInput';
import IntroScreen from './src/components/IntroScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="IntroScreen">
            <Stack.Screen 
              name="IntroScreen" 
              component={IntroScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="WeatherInput" 
              component={WeatherInput} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
