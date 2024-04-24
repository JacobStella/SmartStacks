import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Touchable } from 'react-native';
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
import Page from './mobile/src/components/Library';
import Create from './mobile/src/components/Create';
import ViewCard from './mobile/src/components/ViewCard';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {Ionicons} from '@expo/vector-icons';
import { createBottomTabNavigator, BottomTabNavigationOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
/*import { TouchableOpacity } from 'react-native-gesture-handler';*/



const Stack = createNativeStackNavigator();
const HamburgerMenu = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const libraryName = 'Library';
const searchName = 'Search';
const browseName = 'Browse';
const studyName = 'Study';
const viewCardName = 'ViewCard'


const customTabBarButton = ({children,  onPress}) => {
  <TouchableOpacity
    style = {{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }} 
    onPress={onPress}
  > 
    <View style={{
      width: 70,
      height: 70,
      borderRadius: 35,
    }}>
      {children}
    </View>
  </TouchableOpacity>
};


const NavBar = ({name, navigation}) => {
  
 
  return (

    // some garbage I tried doing to make the navBar look good, probably gonna come back 
    // and test this out a bit more

    /*<Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        display: "flex",
        position: 'absolute',
        bottom: 40,
        marginHorizontal: 20,
  
        height: 60,
        borderRadius: 10,
  
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: {
          width: 10,
          height: 10
      },
      style: {
        }
      }
    }}>
      {

      }
      <Tab.Screen name={libraryName} component={Library} options={{
        tabBarIcon: ({focused}) => (
          <View style={{
            position: 'absolute',
            top: '50%'
          }}>
            <Image
              source={require('./assets/icon.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
            }}/>
          </View>
        )
      }}/>
      <Tab.Screen name={searchName} component={Search} options={{
        tabBarIcon: ({focused}) => (
          <View style={{
            position: 'absolute',
            top: '50%'
          }}>
            <Image
              source={require('./assets/icon.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
            }}/>
          </View>
        )
      }}/>
      <Tab.Screen name="Create" component={Create} options={{
        tabBarIcon: ({focused}) => (
          <TouchableOpacity>
            <View style={{
              width: 50,
              height: 50,
              backgroundColor: 'red',
              borderRadius: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30
            }}>
            <Image
              source={require('./assets/Skunk.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
            }}/>
            </View>
          </TouchableOpacity>
      
      }}/>
      <Tab.Screen name={browseName} component={Browse} options={{
        tabBarIcon: ({focused}) => (
          <View style={{
            position: 'absolute',
            top: '50%'
          }}>
            <Image
              source={require('./assets/icon.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
            }}/>
          </View>
        )
      }}/>
      <Tab.Screen name={studyGameName} component={StudyGame} options={{
        tabBarIcon: ({focused}) => (
          <View style={{
            position: 'absolute',
            top: '50%'
          }}>
            <Image
              source={require('./assets/icon.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
            }}/>
          </View>
        )
      }}/>

    </Tab.Navigator>*/
    
      <Tab.Navigator 
      screenOptions={({route}) => ({
        // making the bottom bar look pretty
        tabBarHideOnKeyboard: true,
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
          } else if (rn == studyName){
            iconName = focused ? 'list' : 'list-outline'
          } 
           else if (rn == viewCardName){
          iconName = focused ? 'list' : 'list-outline'
          } 

          return <Ionicons name={iconName} size={size} color={color}/>
        },
      })}>
        
        <Tab.Screen name={libraryName} component={Library} options = {{
          headerShown:false,
        }}/>
        <Tab.Screen name={searchName} component={Search}options = {{
          headerShown:false,
        }}/>
        <Tab.Screen name={"Create"} component={Create} options={{
          title: 'Create a New Stack',
          headerTransparent: true,
          headerStyle:{
            backgroundColor: '#004346'
          },
          headerTintColor: '#508991',
          headerBackTitle: 'Back',
          headerBackVisible: true,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <TouchableOpacity onPress = {() => navigation.navigate(Create)}>
              <View style={{
                width: 50,
                height: 50,
                backgroundColor: 'red',
                shape: 'circle',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20
              }}>
                <Image
                  source={require('./assets/Skunk.png')}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
        />
        <Tab.Screen name={browseName} component={Browse}options = {{
          headerShown:false,
        }}/>
        <Tab.Screen name={studyName} component={Study}options = {{
          headerShown:false,
        }}/>

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
        label={"SmartStacks"}
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

const SmartStacks = () => {

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
        name="SmartStacks"
        component={SmartStacks} />
      <Stack.Screen
        name="Test"
        component={Test} />
        <Stack.Screen
        name="ViewCard"
        component={ViewCard} />
      <Stack.Screen
        name="About"
        component={About} />
      <Stack.Screen
        name="Settings"
        component={Settings} />
      <Stack.Screen
      name="StudyGame"
      component={StudyGame} />

      
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
        <HamburgerMenu.Screen name = "Layout" component={Page} options = {{headerShown: false}}/>
        <HamburgerMenu.Screen name = "SmartStacks" component={SmartStacks}/>
    </HamburgerMenu.Navigator>
    </NavigationContainer>   
  );
};

export default App;