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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Stack = createNativeStackNavigator();
const HamburgerMenu = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const libraryName = 'Library';
const searchName = 'Search';
const browseName = 'Browse';
const studyGameName = 'Study';



const NavBar = () => {
  const name = useRoute();
  console.log(name);
  return (
    
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

        <Tab.Screen name={libraryName} component={MainApp}/>
        <Tab.Screen name={searchName} component={MainApp}/>
        <Tab.Screen name={browseName} component={MainApp}/>
        <Tab.Screen name={studyGameName} component={MainApp}/>
        

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
  // Trying to get the hamburger menu to work for specific screens dynamically
  // instead of copying the entire hamburger menu section multiple times to render
  // different "page components".
 const navigation = useNavigation();
  
 
  //Might implement a switch statement for this
 let screenName = useRoute().name;
 console.log(screenName);
 console.log("hi");
 let flag = 0;
  if(screenName == "Library"){
    screen = Library;
    
  }
  else if(screenName == "Test"){
    screen = Test;
    
  }
  else if(screenName == "About"){
    screen = About;
  }
  else if(screenName == "Settings"){
    screen = Settings;
  }
  else if(screenName == "Browse"){
    screen = Browse;
  }
  else if(screenName == "Search"){
    screen = Search;
  }
  else if(screenName == "Study"){
    screen = Study;
  }
 //console.log(screen);

  return (
    
    <HamburgerMenu.Navigator drawerContent={customDrawerContent}>
        <HamburgerMenu.Screen
        name = "ToggleHamburger"
        component={screen}
        options = {{
          title: "",
          drawerActiveBackgroundColor : "transparent",
          
          
          drawerIcon: ({focused, size}) => (
            

            <Ionicons
            name = "arrow-back-outline"
            size = {size}
            color = {focused ? 'black' : 'black'}
            />
          ),
          
        }}
        />
        <HamburgerMenu.Screen
        name = "Home"
        component={screen}
        options = {{
          title: "Library",
          drawerLabel: "Library",
          drawerActiveBackgroundColor: "gray",
          drawerIcon: ({focused, size}) => (
            <Ionicons
            name = "library-outline"
            size = {size}
            color = {focused ? 'black' : 'black'}
            />

          ),
          drawerContentStyle:{
            backgroundColor: "#c6cbef",
          }
          
        }}
        />
        <HamburgerMenu.Screen
        name = "Home2"
        component={screen}
        options = {{
          title: "test",
          drawerLabel: "About",
          drawerActiveBackgroundColor: "gray",
          drawerIcon: ({focused, size}) => (
            <Ionicons
            name = "information-outline"
            size = {size}
            color = {focused ? 'black' : 'black'}
            />

          ),
          drawerContentStyle:{
            backgroundColor: "#c6cbef",
          }
          
          
        }}
        />
        <HamburgerMenu.Screen 
        name = "Home3"
        component={screen}
        options = {{
          title: "Settings",
          drawerLabel: "Settings",
          drawerActiveBackgroundColor: "gray",
          drawerIcon: ({focused, size}) => (
            <Ionicons
            name = "cog-outline"
            size = {size}
            color = {focused ? 'black' : 'black'}
            />

          ),
          drawerContentStyle:{
            backgroundColor: "#c6cbef",
          }
        }}
        />
        <HamburgerMenu.Screen
        name = "Home4"
        component={screen}
        
        options = {{
          title: "Sign out",
          drawerLabel : "Sign out",
          drawerActiveBackgroundColor: "gray",
          drawerIcon: ({focused, size}) => (
            <Ionicons
            name = "log-out-outline"
            size = {size}
            color = {focused ? 'black' : 'black'}
            />

          ),
          drawerContentStyle:{
            backgroundColor: "#c6cbef",
          }
        }}
        />
    </HamburgerMenu.Navigator>
    
  );
};



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Login"
          component={Login} />
        <Stack.Screen
          name="Register"
          component={Register} />
        <Stack.Screen
          name="Library"
          component={NavBar} />
        <Stack.Screen
          name="Test"
          component={NavBar} />
        <Stack.Screen
          name="About"
          component={NavBar} />
        <Stack.Screen
          name="Settings"
          component={NavBar} />
      </Stack.Navigator>
    </NavigationContainer>
    );
};






export default App;