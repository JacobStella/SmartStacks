import{View, Text, StyleSheet, ListRenderItem, FlatList, Button, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useRef, useNavigation} from 'react';
import SliderHeader from './SliderHeader';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import { RotateInDownLeft } from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getUserData, getJSONfield, getUserClassesAndStacks, addClass, getClassAndSets, getClass, getClassFromData, setClass, addStack, addCard, fetchSetWithCards} from './CardUI';
import Login from './Login';
import ViewCard from './ViewCard';
import {onLibrary} from '../../.././App';


const Study = ({navigation}) => {
//let stateName = onLibrary;
//console.log(stateName);
const [allClassesAndStacks, setAllClassesAndStacks] = useState([]);
const [allClasses, setAllClasses] = useState([]);
const [allStacks, setAllStacks] = useState([]);

const [Classes, setClasses] = useState([]);
const [Stacks, setStacks] = useState([]);
const [Cards, setCards] = useState([]);

const [classId, setClassId] = useState('');
const sheet = React.useRef();
const scrollRef = useRef();


const fetchUserId = async () => {
    const userId = await getJSONfield(getUserData, "id");

  
    const classAndSets = await getClassAndSets(userId);
    setAllClassesAndStacks(classAndSets);
    let totalClasses = classAndSets.map(field => ({Title: field.className, IsClass: true, Cards: field.Card, Id: field._id}));
    setClasses(totalClasses);
    setAllClasses(totalClasses);
    let outerSets = classAndSets.map(field => (field.sets));
    let nestedSets = outerSets.flat();
    let finalSets = nestedSets.map(field => ({Title: field.SetName, IsPublic: field.public, Cards: field.Card, Id: field._id}));
    setAllStacks(finalSets);
    setStacks(finalSets);
    

};

React.useEffect(() => {
    fetchUserId();
}, []);

const openSheet = () => {
    sheet.current.open();
};

const closeSheet = () => {
    sheet.current.close();
};


const ScrollToTop = () => {
    scrollRef.current?.scrollToOffset({
        y:0, animated: true
    });
};

const LoggedInNav = async (item) => {
  //Item contains the set data. Use it to display cards in ViewCard.
    //console.log(item);
    let filteredCards = await CardFilter(item.Id);
          setCards(filteredCards);
          //console.log(Cards);
          navigation.navigate('StudyGame', {cards: filteredCards});
    ScrollToTop();
   };

 const PlayGame = async (item) => {
  //Item contains the set data. Use it to display cards in ViewCard.
    //console.log(item);
    //navigation.navigate('ViewCard');
    console.log("Time to Play!")
    ScrollToTop();
   };


const CardFilter = async (setId) => {
    
    try{
    let temp = await fetchSetWithCards(setId);
    
    const filteredCards = temp.cards.map((field,index) => ({Title: field.Term, Definition: field.Definition, Index: index}));
    return filteredCards;
    }catch(error){
        console.log(error);
    }

};

const StackFilter = (className) => {
    
    const classCur = getClassFromData(allClassesAndStacks,className);
    const filteredSets = classCur.sets;
    console.log(filteredSets);
    const filteredSets2 = filteredSets.map(field => ({Title:field.SetName, IsClass: false, Cards: field.Card, Id: field._id}));
    setStacks(filteredSets2);

};

const StackHeader = () => {
   
        return(
            <View style = {styles.header}>
                <Text style={styles.headerText}>Test your knowledge, pick a stack!</Text>
            </View>
        );
};
    
    const data = [...Stacks];
    const [isRefreshing, setIsRefreshing] = useState(false);
    const loadStack = async()=>{
        //const data = await getStacks();
        
        
        console.log("Loading");
       // setStacks(data);
        
    }
    let currentIndex = 0;
   
    const renderSetRow = ({item, index, navigation}) => {
        
        currentIndex = index;
        return(
            
                <View style={styles.stackContainer}>
                
                <TouchableOpacity onPress = {() => LoggedInNav(item)}>
                <View style={styles.stackBox}>
                    
                <View style = {styles.stackBoxInner}>
                    <Text></Text>
                    <TouchableOpacity onPress={()=>PlayGame(item)}><Text style = {styles.stackBoxButton}>"Play Game"</Text></TouchableOpacity>
                <Ionicons name = "ellipsis-vertical" size = {20} color = "black" onPress = {openSheet} style = {styles.stackBoxInnerLeft}/>
                
                </View>
                
                
                <Text style={styles.stackText}>
                    {item.Title}
                    {item.classId}
                    
                </Text>
                <Text style={styles.stackText}>
                    {item.cardNumber} Cards
                </Text>

                </View>
                </TouchableOpacity>
                

                </View>
                
        );
    };
    return(
        <View style ={styles.container}>
            <StackHeader></StackHeader>

            <FlatList
              ref={scrollRef} 
              data = {data}
              renderItem={renderSetRow}
              keyExtractor={(item, index) => {
                return index;
              }} 
              numColumns={2}
              
              showsVerticalScrollIndicator = {false}
           /> 
           <RBSheet
           customStyles={{container: styles.sheet}}
           height ={380}
           openDuration={250}
           closeDuration={150}
           ref = {sheet}
           >
           <View>
           <View style = {styles.innerSheet}>
           <Ionicons style = {styles.icon} name = "warning" size = {50} color = "black"/>
           <Text style = {styles.sheetTitle}>
                Warning
            </Text>
            <TouchableOpacity style = {styles.sheetButton} title = "Close" onPress = {closeSheet}><Text>Close</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.sheetButton} title = "Edit" onPress = {closeSheet}><Text>Edit</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.sheetButton} title = "Delete" onPress = {closeSheet}><Text>Delete</Text></TouchableOpacity>
            </View>
           </View>
           
           </RBSheet>
        </View>
        


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8DCFF',
    },
    stackContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
        backgroundColor: '#D8DCFF',
    },
    stackBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',     
    },
    stackBoxHeader: {
         flex: 1,
         flexDirection: 'row',
         backgroundColor: "white",
         justifyContent: 'flex-end',
         borderColor: 'black',
         borderWidth: 2,
         borderRadius: 20,  
     },
    stackBox: {
        flex: 1,
        backgroundColor: "#508991",
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 3,
    },
    stackBoxInner: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: "#004346",
        padding : 1,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'flex-end',
    },
    stackText:{
        fontSize: 25,
        fontWeight: '900',
        textAlign: 'center',
    },
    stackTitleText:{
        fontSize: 25,
        fontWeight: '900',
    },
    stackTitleTextFiller:{
        color: 'transparent',
        fontSize: 25,
        fontWeight: '900',
    },
    stackTitleTextReset:{
        justifyContent: 'flex-end',
        fontSize: 25,
        fontWeight: '900',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
        marginBottom: 20,
        marginTop: 20,
    },
    sheet:{
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    innerSheet:{
        padding: 24,
        alignItems: 'stretch',
    },
    sheetTitle: {
        fontSize: 16,
        color: 'black',
        marginTop: 15,
        textAlign: 'center'
    },
    innerSheetText: {
        fontSize: 12,
        color: 'black',
        marginTop: 16,
        marginBottom: 32,
        textAlign: 'center',
    },
    sheetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: 'fff',
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    icon: {
        textAlign: 'center',
    },
    header: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D8DCFF',
        flexDirection: "row",
    },
    headerIcon: {
        position: 'absolute',
        right: '90%',
        backgroundColor: "#172A3A",
        borderRadius: 20,
    },
    headerText: {
        fontSize: 28,
        color: '#172A3A',
        fontWeight: 'bold',
    }
});

export default Study;