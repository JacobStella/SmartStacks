import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './mobile/src/components/Login';
import Register from './mobile/src/components/Register';
import Library from './mobile/src/components/Library';
import Test from './mobile/src/components/Test';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MenuItems from './mobile/src/constants/MenuItems';


const Stack = createNativeStackNavigator();
const HamburgerMenu = createDrawerNavigator();

const MainApp = () => {
  // Trying to get the hamburger menu to work for specific screens dynamically
  // instead of copying the entire hamburger menu section multiple times to render
  // different "page components".
  const navigation = useNavigation();
  const name = navigation.getId;
  console.log(name);
 
  //Might implement a switch statement for this
  let screen = Library;
  if(name ==="Test"){
    screen = Test;
  }

  return (
    
    <HamburgerMenu.Navigator>
        
        <HamburgerMenu.Screen
        name = "Home"
        component={screen}
        options = {{
          title: "My Dashboard",
          drawerLabel: "Dash"
          
        }}
        />
        <HamburgerMenu.Screen
        name = "Home2"
        component={screen}
        options = {{
          title: "test",
          drawerLabel: "Dashu"
        }}
        />
    </HamburgerMenu.Navigator>
    
  );
};



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name = "Login"
          component = {Login}
        />
        <Stack.Screen
          name ="Register"
          component = {Register}
        />
        <Stack.Screen
          name ="Library"
          component = {MainApp}
         
        />
        <Stack.Screen
          name ="Test"
          component = {MainApp}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};






export default App;