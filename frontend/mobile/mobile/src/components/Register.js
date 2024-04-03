import React, {useState, useRef, useEffect} from "react";
import {Button, StyleSheet, TextInput, SafeAreaView, View, Text, Image, Animated, Modal, Alert, Pressable} from "react-native"
import {Ionicons} from '@expo/vector-icons';

const Register = ({navigation}) => {
    const [data, newData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
    });

    const formInput = (propName, value) =>{
        newData((prevData) => ({
            ...prevData,
            [propName]: value
        }));
    };

    
    const handleRegister = async () => {
        console.log("Call to API -> Register")
        try{
          // console.log(JSON.stringify(data));
            const res = await fetch("https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/register",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                    password: data.password,
                    
                }),
            });
            
           // console.log(res.status);
            if(res.status === 201){
                console.log("Registered Successfully");
                navigation.navigate("Login");
            }else{
                const resData = await res.json();
                console.log(resData);
                throw new Error("Register failed");
            }

        }catch(e){
            console.log(e);
        }

        //console.log('User Data: ', data); // shows the inputted user data on console screen
    };
    const [modalVisible, setModalVisible] = useState(true);
    return (
            
                
           
        
        <SafeAreaView style={styles.container}>
            <FadeInView>
            <View style={styles.imageContainer}>
            <Image source={require('../../../assets/Skunk.png')}
                   style = {{width: 100, height: 100}} />
            </View>
            
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    placeholder = "First Name"
                    onChangeText={text => formInput("firstName", text)}
                    value={data.firstName}
                />
                <TextInput style={styles.input}
                    placeholder = "Last Name"
                    onChangeText={text => formInput("lastName", text)}
                    value={data.lastName}
                />
                <TextInput style={styles.input}
                    placeholder = "E-mail"
                    onChangeText={text => formInput("email", text)}
                    value={data.email}
                />
                <TextInput style={styles.input}
                    placeholder = "Username"
                    onChangeText={text => formInput("username", text)}
                    value={data.username}
                />
                <TextInput style={styles.input}
                    placeholder = "Password"
                    onChangeText={text => formInput("password", text)}
                    value={data.password}
                />
            </View>
           
            
            <Button title="Submit" onPress={handleRegister} />
    <View style={styles.centeredView}>
        <SlideDown>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Modal View!</Text>
            <View style={styles.buttonBox}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name = "close" size = {30} color = "black"/>
            </Pressable>
          </View>
        </View>
        </View>
      </Modal>
      </SlideDown>
    </View>
            
            </FadeInView>
        </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
           
           // width: '40%',
           // marginTop: "50%",
           // paddingHorizontal: 20,
        },
        inputContainer: {
            
            width: '80%',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            
            
        },
        input: {
            
            width: 100,
            height: 40,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            
        },
        space: {
            marginBottom: 20,
        },
        imageContainer: {
          
            alignItems: 'center',
            justifyContent: 'center',
            
        },
        modalContainer: {
            
            justifyContent: 'center',
            alignItems: 'center',
            
          },
          modalBox: {
            height: "80%",
            width: "80%",
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            borderColor: 'black',
            borderWidth: 2,
            flexDirection: "row",
          },
          closeButton: {
            backgroundColor: 'white',
            marginTop: "2%",
            left: "300%",
          },
   
    });

  

export default Register;