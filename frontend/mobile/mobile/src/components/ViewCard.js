import * as React from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Keyboard, TouchableOpacity, TouchableWithoutFeedback, useState, FlatList} from "react-native";
import OnBoardingItem from './OnboardingItem';

const cards = [
    { id: 0, name: "Card1"},
    { id: 1, name: "Card2"},
    { id: 2, name: "Card3"},
    { id: 3, name: "Card4"},
  ];

const ViewCard = ({navigation}) => {

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList 
                    data={cards} 
                    renderItem={({ item }) => <OnboardingItem item={item } />} 
                    horizontal
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    bounces={false}
                />
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