import React, {useState, useEffect, useRef, useNavigation} from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Keyboard, TouchableOpacity, TouchableWithoutFeedback, FlatList} from "react-native";
import OnBoardingItem from './OnboardingItem';
import {Cards} from './Library';


const cards = [
  { id: 0, name: "Card1"},
  { id: 1, name: "Card2"},
  { id: 2, name: "Card3"},
  { id: 3, name: "Card4"},
];

const StudyGame = ({navigation, route}) => {
  const scrollRef = useRef();

  const GameField = () => {
    return(
      <View style={styles.gameContainer}>
        <Text style={styles.textStyle}>This will be the Study Game page</Text>
      </View>
    );
  }
  const {cards} = route.params;
  const numCards = cards.length;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <GameField/>
        <GameField/>
        <GameField/>
        <GameField/>
        <GameField/>
        <GameField/>
        <GameField/>
        <GameField/>
        <GameField/>
        <GameField/>
        <GameField/>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8DCFF',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  gameContainer: {
    width: '40%',
    height: '15%',
    borderRadius: 5,
    borderWidth: 2,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: '5%',
    marginLeft: '4%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#508991',
  },
  textStyle: {
    fontSize: 20,
    color: '#fff',
  }
});

export default StudyGame;