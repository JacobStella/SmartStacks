import { useIsFocused } from '@react-navigation/native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Button, LogBox, SafeAreaView, StyleSheet, Switch, Text, TextInput, View, Keyboard, TouchableOpacity, TouchableWithoutFeedback, ScrollView} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { getClassesAsync, getUserData, addStack, getJSONfield, addCard} from './CardUI';
import {fetchUserId} from './Library';
import {debounce} from 'lodash';

LogBox.ignoreAllLogs();

const handleCreate = async (cardPairs, title, isPublic, description, classData) => {
    const cards = cardPairs.map(field=> ({Term: field.Term, Definition: field.Definition}));
    const userId = await getJSONfield(getUserData, "id");
    let setResponse = await addStack(userId, title, isPublic, classData.Id, description);
    let setRes = await setResponse.json();
    for (let card of cards) {
        addCard(userId, card.Term, card.Definition, setRes.setId);
    }
}

const fetchClasses = async () => {
    const classes = await getClassesAsync();
};

const Create = ({navigation}) => {

    const [cardPairs, setCardPairs] = useState(Array.from({ length: 3 }, (_, index) => ({ id: index })));
    const [isPublic, setIsPublic] = useState(true);
    const toggleSwitch = () => setIsPublic(previousState => !previousState);

    const [value, setValue] = useState(null);
    const [getCurrentClass, setCurrentClass] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const [getClasses, setClasses] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchClasses = async () => {
            const classes = await getClassesAsync();
            setClasses(classes);
        };
        fetchClasses();
    }, []);

    const CardCreator = ({ index, card, updateCard }) => {
        const debounceOnTermChange = useRef(
            debounce((text) => {
                const newCardPairs = [...cardPairs];
                newCardPairs[index].Term = text;
                setCardPairs(newCardPairs);
            }, 9999)
        ).current;    
        const debounceOnDefChange = useRef(
            debounce((text) => {
                const newCardPairs = [...cardPairs];
                newCardPairs[index].Definition = text;
                setCardPairs(newCardPairs);
            }, 9999)
        ).current;    
        const TermOnChangeText = (text) => {
            setTerm(text);
            debounceOnTermChange(text);
        };
            
        const DefOnChangeText = (text) => {
            setDef(text);
            debounceOnDefChange(text);
        };

        const [getTerm, setTerm] = useState(card.Term);
        const [getDef, setDef] = useState(card.Definition);
        return (
            <View style={styles.cardContainer}>
                <TextInput
                    style={styles.cardTermInput}
                    placeholder="Term"
                    placeholderTextColor="#fff"
                    multiline={true}
                    value={getTerm}
                    onChangeText={TermOnChangeText}
                />
                <TextInput
                    style={styles.cardDefinitionInput}
                    placeholder="Definition"
                    placeholderTextColor="#fff"
                    multiline={true}
                    value={getDef}
                    onChangeText={DefOnChangeText}
                />
            </View>
        );
    };

    const addCardPair = () => {
        setCardPairs([...cardPairs, { id: cardPairs.length }]);
    };

    //Renders dropdown
    const renderLabel = () => {
        if (value || isFocus) {
          return (
            <Text style={[styles.label, isFocus && { color: 'blue' }]}>
              Select Class
            </Text>
          );
        }
        return null;
      };

    return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <Text style={{color: '#508991', fontSize: 24, fontWeight: '600'}}>Create a New Stack</Text>
            </View>
            <View style={styles.titleInputContainer}>
                <TextInput 
                    style={styles.titleInput}
                    placeholder = "Title" 
                    placeholderTextColor={'#fff'}
                    value = {title}
                    onChangeText={setTitle}
                />
            </View>

            <View style={styles.descriptionInputContainer}>
                <TextInput style={styles.descriptionInput}
                    placeholder = "Description"
                    placeholderTextColor={'#fff'}
                    multiline={true}
                    value = {description}
                    onChangeText={setDescription}
                />
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

            <View style={{padding: 16}}>
                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.icon}
                    iconColor= '#fff'
                    containerStyle={{backgroundColor: '#508991', borderWidth: 1, borderColor: '#172A3A', borderRadius: 10}}
                    itemTextStyle={{color: '#172A3A', fontSize: 18}}
                    data={getClasses}
                    maxHeight={300}
                    labelField="Title"
                    valueField="Title"
                    placeholder={!isFocus ? 'Select Item' : undefined}
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                        setValue(item.Title);
                        setCurrentClass(item);
                    }}/>
            </View>
            
            {cardPairs.map((card, index) =>(
                //Term def fields
                <CardCreator
                    key={index}
                    index={index}
                    card = {card}
                />
            ))}
            
            <TouchableOpacity style={styles.addButton} onPress={addCardPair}>
                <Text style={styles.buttonText}>+ Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={() => handleCreate(cardPairs, title, isPublic, description, getCurrentClass)}>
                <Text style={{fontSize: 30, color: '#fff', fontWeight: 'bold'}}>Create</Text>
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
    },
    titleInputContainer: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
    },
    titleInput: {
        height: 45,
        width: '90%',
        borderColor: '#09BC8A',
        borderWidth: 2,
        borderRadius: 10,
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
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        marginRight: '7%',
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#508991',
    },
    cardContainer: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 60,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: '2%',
        backgroundColor: '#508991',
        flexDirection: 'row',
        alignContent: 'flex-start',
        borderColor: '#09BC8A',
    },
    cardTermInput: {
        borderColor: '#09BC8A',
        borderWidth: 1,
        borderRadius: 5,
        width: '42%',
        marginTop: '1%',
        marginBottom: '1%',
        marginRight: '2%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#172A3A',
    },
    cardDefinitionInput: {
        borderColor: '#09BC8A',
        borderWidth: 1,
        borderRadius: 5,
        width: '53%',
        marginTop: '1%',
        marginBottom: '1%',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#172A3A',
    },
    addButton: {
        width: '75%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        marginTop: '3%',
        backgroundColor: '#508991',
        flexDirection: 'row',
        alignContent: 'flex-start',
        color: '#fff',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    submitButton: {
        width: '40%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        borderWidth: 2,
        borderRadius: 15,
        marginTop: '8%',
        marginBottom: '6%',
        backgroundColor: '#09BC8A',
        flexDirection: 'row',
        alignContent: 'flex-start',
        color: '#fff',
    },
    dropdown: {
        height: 60,
        backgroundColor: '#508991',
        borderColor: '#09BC8A',
        width: '97%',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 10,
      },
      label: {
        position: 'absolute',
        backgroundColor: '#D8DCFF',
        right: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        borderRadius: 75,
      },
      placeholderStyle: {
        fontSize: 18,
        color: '#fff',
      },
      selectedTextStyle: {
        color: '#fff',
        backgroundColor: '#508991',
        fontSize: 18,
      },
      iconStyle: {
        width: 20,
        height: 20,
        color: '#fff',
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
});

export default Create;