import * as React from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Keyboard, TouchableOpacity, TouchableWithoutFeedback, useState} from "react-native";

const ViewCard = ({navigation}) => {

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>This the page where we will view the stack</Text>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#508991',
        alignItems: 'center',
       // width: '40%',
       // marginTop: "50%",
       // paddingHorizontal: 20,
    },
    cardContainer: {
        width: '100%',
        height: '65%',
        // marginTop: 90,
        alignItems: 'center',
       // backgroundColor: '#fff'
    },
});

export default ViewCard;