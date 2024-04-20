import React, {useState, useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, Keyboard, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from "react-native";


const handleCreate = async () => {
    
}

// I'd like to fix how Description starts in the middle of the container

const Create = ({navigation}) => {
    const [cardPairs, setCardPairs] = useState(Array.from({ length: 3 }, (_, index) => ({ id: index })));
    const [isPublic, setIsPublic] = useState(false);
    const toggleSwitch = () => setIsPublic(previousState => !previousState);

    const CardCreator = ({ index }) => {
        return(
            <View style={styles.cardContainer}>
                <TextInput style={styles.cardTermInput}
                placeholder = "Term" 
                placeholderTextColor={'#fff'}
                />
                <TextInput style={styles.cardDefinitionInput}
                placeholder = "Definition"
                placeholderTextColor={'#fff'}
                multiline={true}/>
            </View>
        );
    };

    const addCardPair = () => {
        setCardPairs([...cardPairs, { id: cardPairs.length }]);
    };

    return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.titleInputContainer}>
                <TextInput style={styles.titleInput} placeholder = "Title" placeholderTextColor={'#fff'}/>
            </View>

            <View style={styles.descriptionInputContainer}>
                <TextInput style={styles.descriptionInput}
                placeholder = "Description"
                placeholderTextColor={'#fff'}
                multiline={true}/>
                <View style={{marginTop: '3%', alignItems: 'center'}}>
                <Switch trackColor={{false: '#767577', true: '#09BC8A'}}
                thumbColor={isPublic ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isPublic}
                style={{transform:[{scaleX: 1.5}, {scaleY: 1.5}], marginBottom: '15%' }}/>
                    {isPublic ? <Text style={{color: '#D8DCFF'}}>Public</Text> : <Text style={{color: '#D8DCFF'}}>Private</Text>}
                </View>
            </View>
            
            {cardPairs.map((cardPair, index) =>(
                <CardCreator
                    key={cardPairs.id}
                    index={index}
                />
            ))}

            <TouchableOpacity style={styles.addButton} onPress={addCardPair}>
                <Text style={styles.buttonText}>+ Add Card</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.submitButton} onPress={submit}>
                <Text style={{fontSize: 28, color: '#fff'}}>Create</Text>
            </TouchableOpacity>
            
        </ScrollView>
        </SafeAreaView>
    </TouchableWithoutFeedback>
    );
}

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
        width: '100%',
        paddingLeft: 20,
        alignContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    descriptionInput: {
        width: '75%',
        height: 100,
        borderColor: '#09BC8A',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        marginRight: '7%',
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#508991',
    },
    cardContainer: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 55,
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
    },
    addButton: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: '2%',
        backgroundColor: '#508991',
        flexDirection: 'row',
        alignContent: 'flex-start',
        color: '#fff',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    submitButton: {
        width: '40%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        borderWidth: 2,
        borderRadius: 5,
        marginTop: '10%',
        backgroundColor: '#09BC8A',
        flexDirection: 'row',
        alignContent: 'flex-start',
        color: '#fff',
    },
});

export default Create;