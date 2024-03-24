import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './mobile/src/components/Login';
import Register from './mobile/src/components/Register';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Login"
          component = {Login}
        />
        <Stack.Screen
          name ="Register"
          component = {Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;