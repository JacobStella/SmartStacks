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
import { setClassesAsync } from './CardUI';


const Library = ({navigation}) => {
//let stateName = onLibrary;
//console.log(stateName);
const [allClassesAndStacks, setAllClassesAndStacks] = useState([]);
const [allClasses, setAllClasses] = useState([]);
const [allStacks, setAllStacks] = useState([]);

const [Classes, setClasses] = useState([]);
const [Stacks, setStacks] = useState([]);
const [Cards, setCards] = useState([]);


const [ClassOnly, setClassOnly] = useState(true);
const [CardOnly, setCardOnly] = useState(false);
 
const [itemData, setItemData] = useState();

const [getVisisble, setVisible] = useState(false);
const [BackArrowVisible, BackArrowSetVisible] = useState(false);
const [EmptyHeader, setEmptyHeader] = useState(true);
const [classId, setClassId] = useState('');
const sheet = React.useRef();
const scrollRef = useRef();


const fetchUserId = async () => {
    const userId = await getJSONfield(getUserData, "id");

    
    const classAndSets = await getClassAndSets(userId);
    setAllClassesAndStacks(classAndSets);
    let totalClasses = classAndSets.map(field => ({Title: field.className, IsClass: true, Cards: field.Card, Id: field._id}));
    setClasses(totalClasses);
    setClassesAsync(totalClasses);
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

const LoginNav = async (item) => {


    if(item.IsClass){
        setClassOnly(true);
        setClasses([]);
        setStacks([]);
        StackFilter(item.Title);
        setItemData(item);
    }
    else{
        let filteredCards = await CardFilter(item.Id);
        setCards(filteredCards);
        //console.log(Cards);
        navigation.navigate('ViewCard', {cards: filteredCards});
        // return <ViewCard></ViewCard>;
        // setClassOnly(false);
        // setCardOnly(true);
        // setClasses([]);
        // setStacks([]);
        
        // //console.log(filteredCards);
        // setItemData(item);
    }
    BackArrowSetVisible(true);
    setEmptyHeader(false);
    ScrollToTop();
 };

 const ViewAll = () => {
    setEmptyHeader(true);
    BackArrowSetVisible(false);
    setClassOnly(true);
    setClasses(allClasses);
    setStacks(allStacks);
    setCards([]);
 };

const CardFilter = async (setId) => {
    
    try{
    let temp = await fetchSetWithCards(setId);
    
    const filteredCards = temp.cards.map((field, index) => ({Title: field.Term, Definition: field.Definition, Index: index}));
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
    item = itemData;
   
    if(item == undefined || EmptyHeader){
        return(
           
           
            <View style = {styles.header}>
                <Text style={styles.headerText}></Text>
            </View>
        );
    }
    else{
        if(item.IsClass){
        return(
           
           
                <View style = {styles.header}>
                    <Text style={styles.headerText}>Class: {item.Title}</Text> 
                    {BackArrowVisible && 
                    <TouchableOpacity style = {styles.headerIcon} onPress={ViewAll}><Ionicons name = "arrow-back" size = {30} color = "black"/></TouchableOpacity>}
                    </View>
            );
        }
        else{
            return(
           
            
                <View style = {styles.header}>
                    <Text style={styles.headerText}>Stack: {item.Title}</Text>
                    {BackArrowVisible && 
                    <TouchableOpacity style = {styles.headerIcon} onPress={ViewAll}><Ionicons name = "arrow-back" size = {30} color = "black"/></TouchableOpacity>}
                </View>
            );
        }
    }
};

    const data = [...Classes, ...Stacks, ...Cards];
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
                
                {currentIndex == 0 && ClassOnly == true && EmptyHeader == true && <Text style = {styles.stackTitleText}>Classes</Text>}
                {currentIndex == 0 && ClassOnly == true && EmptyHeader == false && <Text style = {styles.stackTitleTextFiller}>Filler</Text>}
                {currentIndex == 0 && ClassOnly == false && EmptyHeader == false && <Text style = {styles.stackTitleTextFiller}>Filler</Text>}
                {currentIndex == 1 && ClassOnly == false && EmptyHeader == false && <Text style = {styles.stackTitleTextFiller}>Filler</Text>}
                {currentIndex == 1 && ClassOnly == true && <Text style = {styles.stackTitleTextFiller}>Filler</Text>}
                
                    
                <TouchableOpacity onPress = {() => LoginNav(item)}>
                <View style={styles.stackBox}>
                    
                <View style = {styles.stackBoxInner}>
                    <Text></Text>
                <Ionicons name = "ellipsis-vertical" size = {20} color = "black" onPress = {openSheet}/>
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
            <StackHeader data = {itemData}></StackHeader>

            <FlatList
              ref={scrollRef} 
              data = {data}
              renderItem={renderSetRow}
              keyExtractor={(item, index) => {
                return index;
              }} 
              numColumns={2}
              
              showsVerticalScrollIndicator = {false}
              
              ItemSeparatorComponent={() => {
                    if(currentIndex == Classes.length-1){
                            return line();
                    }
                 
             }}
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


const line = () => {
    return(
    <>
    <View style={styles.line}></View>
    <Text style={styles.stackTitleText}>Stacks</Text>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    stackContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
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
        backgroundColor: "#abb1cf",
        borderColor: 'black',
        borderWidth: 2,
    },

    stackBoxInner: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: "#abb1cf",
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
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        borderRadius: 20,
        flexDirection: "row",
        
    },
    
    headerIcon: {
        position: 'absolute',
        right: '85%',
        backgroundColor: "red",
    },

});



export default Library;