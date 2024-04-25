import React from "react";
import {StyleSheet, Text, View, Pressable, LogBox} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {itemData} from "./CardUI";

LogBox.ignoreAllLogs();

export default class SliderHeader extends React.Component{
    render(){
        const {setModalVisible, modalVisible} = this.props;
        return(
            <View style = {styles.header}>
                    <Text style={styles.headerText}></Text>
                    <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons style = {styles.headerIcon} name = "close" size = {40} color = "#004346"/>
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
        backgroundColor: '#D8DCFF',
        borderRadius: 20,
        flexDirection: "row",
        
    },
    
    headerIcon: {
        position: 'absolute',
        left: 130,
        bottom: 2,
    },
});