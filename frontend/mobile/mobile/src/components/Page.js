import{View, Text, StyleSheet, ListRenderItem, FlatList, Button, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useRef} from 'react';
import SliderHeader from './SliderHeader';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import { RotateInDownLeft } from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getUserData, getJSONfield, getUserClassesAndStacks, addClass, getClassAndSets } from './CardUI';




const Page = ({navigation}) => {

const [getVisisble, setVisible] = useState(false);
const [getData, setData] = useState([]);
const [classId, setClassId] = useState('');
const sheet = React.useRef();

const fetchUserId = async () => {
    const userId = await getJSONfield(getUserData, "id");
    //console.log(userId);
    //addClass(userId, "test");
    getClassAndSets(userId);
    getData2(userId);
    //console.log(userId);
};

React.useEffect(() => {
    fetchUserId();
}, []);


React.useEffect(()=> {
    sheet.current.open();
}, []);

const openSheet = () => {
    sheet.current.open();
};
const closeSheet = () => {
    sheet.current.close();
};

    const [Stacks, setStacks] = useState([{
        id: "1",
        Title: "Learn French",
        difficulty: "Easy",
        cardNumber: "10"
        
    },
    {
    id: "2",
    Title: "Learn Spanish",
    difficulty: "Easy",
    cardNumber: "33"

    },
    {
        id: "3",
        Title: "Learn German",
        difficulty: "Easy",
        cardNumber: "21"
    
        },

    {
    id: "4",
    Title: "Learn German",
    difficulty: "Easy",
    cardNumber: "21"
        
    },
    {
    id: "5",
    Title: "Learn German",
    difficulty: "Easy",
    cardNumber: "21"
    },
            {
            id: "6",
            Title: "Learn German",
            difficulty: "Easy",
            cardNumber: "21"
            },
            {
            id: "7",
            Title: "Learn German",
            difficulty: "Easy",
            cardNumber: "21"
            },
            {
                id: "8",
                Title: "Learn German",
                difficulty: "Easy",
                cardNumber: "21"
                },
                {
                    id: "9",
                    Title: "Learn German",
                    difficulty: "Easy",
                    cardNumber: "21"
                    },                    

    ]);
    const [Classes, setClasses] = useState([{

          
        public: "public",
        classId: "German",
    },
    {
        public: "public",
        classId: "Spanish",
    },

    ]);
    const data = [...Classes, ...Stacks];
    const [isRefreshing, setIsRefreshing] = useState(false);
    const loadStack = async()=>{
        //const data = await getStacks();
        
        
        console.log("Loading");
       // setStacks(data);
        
    }
    let currentIndex = 0;
    const renderSetRow = ({item, index}) => {
        
        currentIndex = index;
        return(
            
               // <RBSheet>
                <View style={styles.stackContainer}>
                
                    
                <TouchableOpacity>
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
                //</RBSheet>
                
                
                
                
                

                
              
                
        );
    };
    return(
        <View style ={styles.container}>
            <SliderHeader></SliderHeader>
            <Text style={styles.stackTitleText}>Classes</Text>
            <FlatList data = {data}
              renderItem={renderSetRow}
              keyExtractor={item => item.id} 
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
           //onClose={()=>setVisible(false)}
          // onOpen={()=>setVisible(true)}
           ref = {sheet}
           >
           <View>
           <View style = {styles.innerSheet}>
           <Ionicons style = {styles.icon} name = "warning" size = {50} color = "black"/>
           <Text style = {styles.sheetTitle}>
                Warning
            </Text>
            <TouchableOpacity style = {styles.sheetButton} title = "Edit" onPress = {closeSheet}></TouchableOpacity>
            <TouchableOpacity style = {styles.sheetButton} title = "Delete" onPress = {closeSheet}></TouchableOpacity>
            <TouchableOpacity style = {styles.sheetButton} title = "Close" onPress = {closeSheet}></TouchableOpacity>
            </View>
           </View>
           
           </RBSheet>
        </View>
        


    );
};

const getData2 = async (userId) => {
    // console.log("test");
    //console.log(classId);
    
    try {
       // const response = await fetch('https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/getClassAndSets/${classId}');
        //const res = await response.json();
        const temp = await getUserClassesAndStacks('userId','Classes');
        //console.log(userId);
        //console.log(temp.classes);
        
        
       
       
    }
    catch(e){
        console.log(e);
    }

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
       //justifyContent: 'center',
     //alignItems: 'center',
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
        
      
        
        // aspectRatio: 1,
         flex: 1,
         flexDirection: 'row',
         backgroundColor: "white",
         justifyContent: 'flex-end',
         borderColor: 'black',
         borderWidth: 2,
         borderRadius: 20,
  
        
         
     }, 


    stackBox: {
        
      
        
       // aspectRatio: 1,
        flex: 1,
        backgroundColor: "#abb1cf",
        //padding : 10,
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
        //flex: 1,
        fontSize: 25,
        fontWeight: '900',
        textAlign: 'center',
        
    },
    stackTitleText:{
        //flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-end',
        fontSize: 25,
        fontWeight: '900',
        //textAlign: 'center',  
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
        //fontWeight: '650',
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
    }
});



export default Page;