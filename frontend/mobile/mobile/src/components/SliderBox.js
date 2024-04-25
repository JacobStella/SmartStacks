import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import Slider from "./Slider";

export default class SliderBox extends React.Component{

    render(){
        return(
            <View style = {styles.box}>
                <View style ={styles.inner}>
                    <Slider></Slider>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '85%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    box: {
        width: '100%',
        height: '80%',
        padding: 5,
    },
    inner: {
        flex: 1,
        backgroundColor: '#D8DCFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});