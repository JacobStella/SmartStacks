import * as React from 'react'
import { StatusBar } from 'expo-status-bar';  
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

// screens
import Register from './components/Register.js'
import Library from './components/Library.js'
import StudyGame from './components/StudyGame.js'
import Browse from './components/Browse.js'
import Search from './components/Search.js'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';

// screen names
const homeName = 'Home'
const libraryName = 'Library';
const searchName = 'Search';
const browseName = 'Browse';
const studyGameName = 'Study';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DetailsScreen() {
  return(
    <View style={styles.container}>
      <Text>Details Screen</Text>
    </View>
  );
}

const NavBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;
          if(rn == libraryName){
            iconName = focused ? 'library' : 'library-outline'
          } else if (rn == searchName){
            iconName = focused ? 'search' : 'search-outline'
          } else if (rn == browseName){
            iconName = focused ? 'search' : 'search-outline'
          } else if (rn == studyGameName){
            iconName = focused ? 'list' : 'list-outline'
          } 

          return <Ionicons name={iconName} size={size} color={color}/>
        },
      })}>

        <Tab.Screen name={libraryName} component={Library}/>
        <Tab.Screen name={searchName} component={Search}/>
        <Tab.Screen name={browseName} component={Browse}/>
        <Tab.Screen name={studyGameName} component={StudyGame}/>
        

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavBar;