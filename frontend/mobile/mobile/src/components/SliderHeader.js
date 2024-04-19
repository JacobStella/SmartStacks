import React from "react";
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {itemData} from "./CardUI";




export default class SliderHeader extends React.Component{
    render(){
        const {setModalVisible, modalVisible} = this.props;
        return(
            <View style = {styles.header}>
                    <Text style={styles.headerText}>Header</Text>
                    <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons style = {styles.headerIcon} name = "close" size = {30} color = "black"/>
            </Pressable>
            </View>
        );
    }

}

const styles = StyleSheet.create({
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
        left: 80,
        bottom: 2,
        backgroundColor: "red",
       
    },
});