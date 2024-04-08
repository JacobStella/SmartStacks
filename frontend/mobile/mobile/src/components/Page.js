import{View, Text, StyleSheet, ListRenderItem, FlatList} from 'react-native'
import React, {useState, useEffect} from 'react';
import SliderHeader from './SliderHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import { RotateInDownLeft } from 'react-native-reanimated';



const Page = ({navigation}) => {
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
    id: "3",
    Title: "Learn German",
    difficulty: "Easy",
    cardNumber: "21"
        
    },
    {
    id: "3",
    Title: "Learn German",
    difficulty: "Easy",
    cardNumber: "21"
    },
            {
            id: "3",
            Title: "Learn German",
            difficulty: "Easy",
            cardNumber: "21"
            },
            {
            id: "3",
            Title: "Learn German",
            difficulty: "Easy",
            cardNumber: "21"
            },
            {
                id: "3",
                Title: "Learn German",
                difficulty: "Easy",
                cardNumber: "21"
                },
                {
                    id: "3",
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
        //console.log(index);
        currentIndex = index;
        return(
            
                
                <View style={styles.stackContainer}>
                
                    
                
                <View style={styles.stackBox}>
                    
                <View style = {styles.stackBoxInner}>
                    <Text></Text>
                <Ionicons name = "ellipsis-vertical" size = {20} color = "black"/>
                </View>
                
                <Text style={styles.stackText}>
                    {item.Title}
                    {item.classId}
                    
                </Text>
                <Text style={styles.stackText}>
                    {item.cardNumber} Cards
                </Text>
                
                </View>
                
                
                </View>
                
                
                
                
                

                
              
                
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
});



export default Page;