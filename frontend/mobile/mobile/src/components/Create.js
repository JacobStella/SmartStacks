import * as React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback} from "react-native";

const CardCreator = () => {
    return(
    <View style={styles.cardContainer}>
        <TextInput style={styles.cardTermInput}
        placeholder = "Term" 
        placeholderTextColor={'#fff'}/>
        <TextInput style={styles.cardDefinitionInput}
        placeholder = "Definition" 
        placeholderTextColor={'#fff'}/>
    </View>);
};


// I'd like to fix how Description starts in the middle of the container

const Create = ({navigation}) => {
    return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
            <View style={styles.titleInputContainer}>
                <TextInput style={styles.titleInput} placeholder = "Title" placeholderTextColor={'#fff'}/>
            </View>

            <View style={styles.descriptionInputContainer}>
                <TextInput style={styles.descriptionInput}
                placeholder = "Description" 
                placeholderTextColor={'#fff'}
                multiline={true}/>
            </View>
            
            <CardCreator/>
            
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
       // backgroundColor: '#fff'
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
        alignSelf: 'center',
        justifyContent: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: '2%',
        backgroundColor: '#508991',
        flexDirection: 'row',
        alignContent: 'flex-start',
    },
    cardTermInput: {
        borderColor: '#09BC8A',
        borderWidth: 1,
        borderRadius: 5,
        width: '40%',
        marginTop: '1%',
        marginBottom: '1%',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#172A3A',
    },
    cardDefinitionInput: {
        borderColor: '#09BC8A',
        borderWidth: 1,
        borderRadius: 5,
        width: '40%',
        marginLeft: '1%',
        marginRight: '15%',
        marginTop: '1%',
        marginBottom: '1%',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#172A3A',
    }
});

export default Create;