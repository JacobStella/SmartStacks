import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, useNavigation, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './mobile/src/components/Login';
import Register from './mobile/src/components/Register';
import Library from './mobile/src/components/Library';
import About from './mobile/src/components/About';
import Settings from './mobile/src/components/Settings';
import Browse from './mobile/src/components/Browse';
import StudyGame from './mobile/src/components/StudyGame';
import Study from './mobile/src/components/Study';
import Test from './mobile/src/components/Test';
import Search from './mobile/src/components/Search';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {Ionicons} from '@expo/vector-icons';
import { createBottomTabNavigator, BottomTabNavigationOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';



const Stack = createNativeStackNavigator();
const HamburgerMenu = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const libraryName = 'Library';
const searchName = 'Search';
const browseName = 'Browse';
const studyGameName = 'Study';





const NavBar = ({name}) => {
  
 
  return (
    
      <Tab.Navigator 
      screenOptions={({route}) => ({
        // making the bottom bar look pretty
        tabBarInactiveBackgroundColor: '#508991',
        tabBarActiveBackgroundColor: '#004346',
        tabBarActiveTintColor: '#09BC8A',
        tabBarInactiveTintColor: '#004346',
        
        
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;
          //console.log(rn);
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
      
  );
  
}


const customDrawerContent = ({navigation}) => {
  
  return (
    <View>
    <DrawerItem
      label={""}
      icon={({ focused, size }) => (
        <Ionicons
          name="arrow-back-outline"
          size={size}
          color={focused ? 'black' : 'black'} />
      )}
      onPress={() => navigation.toggleDrawer()} />
      <DrawerItem
        label={"Library"}
        icon={({ focused, size }) => (
          <Ionicons
            name="library-outline"
            size={size}
            color={focused ? 'black' : 'black'} />
        )}
        onPress={() => navigation.navigate("Library")} />
        <DrawerItem
        label={"About"}
        icon={({ focused, size }) => (
          <Ionicons
            name="information-outline"
            size={size}
            color={focused ? 'black' : 'black'} />
        )}
        onPress={() => navigation.navigate("About")} />
        <DrawerItem
        label={"Settings"}
        icon={({ focused, size }) => (
          <Ionicons
            name="cog-outline"
            size={size}
            color={focused ? 'black' : 'black'} />
        )}
        onPress={() => navigation.navigate("Settings")} />
        <DrawerItem
        label={"Sign out"}
        icon={({ focused, size }) => (
          <Ionicons
            name="log-out-outline"
            size={size}
            color={focused ? 'black' : 'black'} />
        )}
        onPress={() => navigation.navigate("Login")} />
        </View>
    
  )
}

const MainApp = () => {

return (
    
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      {/* <Stack.Screen
        name ="NavBar"
        component={NavBar} /> */}
      <Stack.Screen
        name="Library"
        component={NavBar} />  
      <Stack.Screen
        name="MainApp"
        component={MainApp} />
      <Stack.Screen
        name="Test"
        component={Test} />
      <Stack.Screen
        name="About"
        component={About} />
      <Stack.Screen
        name="Settings"
        component={Settings} />
      
    </Stack.Navigator>
  );
};

// Looked into nested navigators, and I made the hamburger menu the root instead. The rested of the navigators
// are wrapped in this main navigation container. I was also able to get rid of a lot of old code since the navigators
// alone could handle everything. 
const App = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
       <Stack.Screen name = "Login" component={Login}/>
       <Stack.Screen name = "Register" component={Register}/>
     </Stack.Navigator> */}
    <HamburgerMenu.Navigator drawerContent={customDrawerContent}>
        <HamburgerMenu.Screen name = "Login" component={Login} options = {{headerShown: false}}/>
        <HamburgerMenu.Screen name = "Register" component={Register} options = {{headerShown: false}}/>
        <HamburgerMenu.Screen name = "MainApp" component={MainApp}/>
    </HamburgerMenu.Navigator>
    </NavigationContainer>   
  );
};

export default App;