import{View, Text, StyleSheet, ListRenderItem, FlatList} from 'react-native'
import React, {useState, useEffect} from 'react';
import SliderHeader from './SliderHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';



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
        difficulty: "Hard",
        cardNumber: "21"
    
        },

    ]);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const loadStack = async()=>{
        //const data = await getStacks();
        
        
        console.log("Loading");
       // setStacks(data);
        
    }
    const renderSetRow = ({item}) => {

        return(
            
                <TouchableOpacity style = {styles.stackRow}>
                <View style={{flexDirection: "row" , gap: 15}}>
                <View style={{flex: 1}}>
                <Text style={styles.stackText}>
                    {item.Title}
                </Text>
                <Text style={styles.stackText}>
                    {item.cardNumber} Cards
                </Text>
                </View>
                <Ionicons name = "arrow-forward" size = {20} color = "gray"/>
                </View>
                </TouchableOpacity>
        );
    };
    return(
        <View style ={styles.container}>
            <SliderHeader></SliderHeader>
            <FlatList data = {Stacks} renderItem={renderSetRow}/>
            <Text>User Sets</Text>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    stackRow:{
        padding: 15,
        backgroundColor: "#abb1cf",
        borderWidth: 1,
        borderColor: "black",
        borderBottomColor: "black",
    },
    stackText:{
        fontSize: 25,
        fontWeight: '900'
    }
});



export default Page;