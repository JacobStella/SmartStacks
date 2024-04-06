import * as React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback} from "react-native";

const cardCreator = (
        <View>
            <Text>balls</Text>
        </View>
);

const Create = ({navigation}) => {
    return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
            <View style={styles.titleInputContainer}>
                <TextInput style={styles.titleInput} placeholder = "Title" placeholderTextColor={'#fff'}/>
            </View>

            // I'd like to fix how Description starts in the middle of the container

            <View style={styles.descriptionInputContainer}>
                <TextInput style={styles.descriptionInput}
                placeholder = "Description" 
                placeholderTextColor={'#fff'}
                multiline={true}/>
            </View>

        </SafeAreaView>
    </TouchableWithoutFeedback>
    );
}

const DismissKeyboard = (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
    </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#004346',
       // width: '40%',
       // marginTop: "50%",
       // paddingHorizontal: 20,
    },
    titleInputContainer: {
        width: '100%',
        marginTop: 90,
        alignItems: 'center',
    },
    titleInput: {
        height: 45,
        width: '90%',
        borderColor: '#09BC8A',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#508991',
    },
    descriptionInputContainer: {
        width: '75%',
        paddingLeft: 20,
        alignContent: 'flex-start',
    },
    descriptionInput: {
        height: 100,
        borderColor: '#09BC8A',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#508991',
    },
    cardContainer: {
        width: '90%',
        alignContent: 'center',
        backgroundColor: '#508991'
    },
    cardTermInput: {
        
    }
});

export default Create;