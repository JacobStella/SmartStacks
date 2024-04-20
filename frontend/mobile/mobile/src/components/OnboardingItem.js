import React, {useState} from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Keyboard, TouchableOpacity, TouchableWithoutFeedback, FlatList, useWindowDimensions, Pressable} from "react-native";
import Animated, {Easing, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming, runOnJS, useDerivedValue,} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

const products = [
    { id: 0, name: "Card1"},
    { id: 1, name: "Card2"},
    { id: 2, name: "Card3"},
    { id: 3, name: "Card4"},
  ];

export default OnboardingItem = ({item}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const rotation = useSharedValue(0);

    const toggleFlip = () => {
        rotation.value = withTiming(
            isFlipped ? 0 : 180,
            {
                duration: 500,
                easing: Easing.ease,
            },
            () => {
                runOnJS(setIsFlipped)(!isFlipped);
            },
        );
    };

    const frontCardStyle = useAnimatedStyle(() => {
        return {
            transform: [{perspective: 1000}, {rotateY: `${rotation.value}deg`}],
        };
    });

    const backCardStyle = useAnimatedStyle(() => {
        return {
            transform: [{perspective: 1000}, {rotateY: `${rotation.value + 180}deg`},],
        };
    });

    const { width } = useWindowDimensions();

    const spin = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  return (
    <SafeAreaView style={[styles.container, {width}]}>
        <View>
            <Pressable onPress={() => (spin.value = spin.value ? 0 : 1)}>
                <Animated.View style={[styles.front, rStyle]}>
                    <Text>{item.id}</Text>
                </Animated.View>
                <Animated.View style={[styles.back, bStyle]}>
                    <Text>{item.name}</Text>
                </Animated.View>
            </Pressable>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8DCFF',
        alignItems: 'center',
        justifyContent: 'center',
       // width: '40%',
       // marginTop: "50%",
       // paddingHorizontal: 20,
    },
    cardContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        alignItems: 'center',
        width: '95%',
        height: '40%',
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor: '#508991',
    },
    front: {
        height: 450,
        width: 350,
        backgroundColor: "#508991",
        borderRadius: 16,
        borderWidth: 5,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      },
      back: {
        height: 450,
        width: 350,
        backgroundColor: "#508991",
        borderRadius: 16,
        borderWidth: 5,
        backfaceVisibility: "hidden",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      },
});