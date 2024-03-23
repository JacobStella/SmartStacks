import React, {useState} from "react";
import { SliderBox } from "react-native-image-slider-box";
import {Button, StyleSheet, TextInput, SafeAreaView, View, Text} from "react-native"

const Register = () => {
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
        try{
            const res = await fetch("https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/register",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName:newData.firstName,
                    lastName:newData.lastName,
                    login:newData.username,
                    password:newData.password,
                    email:newData.email,
                }),
            });

            if(!res.ok){
                const resData = await res.json();
                console.log(resData);
                throw new Error("Register failed");
            }else{
                console.log("Success");
            }

        }catch(e){
            console.log(e);
        }

        console.log('User Data: ', newData); // shows the inputted user data on console screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    placeholder = "First Name"
                    onChangeText={text => formInput("firstName", text)}
                    value={newData.firstName}
                />
                <TextInput style={styles.input}
                    placeholder = "Last Name"
                    onChangeText={text => formInput("lastName", text)}
                    value={newData.lastName}
                />
                <TextInput style={styles.input}
                    placeholder = "email"
                    onChangeText={text => formInput("email", text)}
                    value={newData.email}
                />
                <TextInput style={styles.input}
                    placeholder = "Username"
                    onChangeText={text => formInput("username", text)}
                    value={newData.username}
                />
                <TextInput style={styles.input}
                    placeholder = "Password"
                    onChangeText={text => formInput("password", text)}
                    value={newData.password}
                />
            </View>
            <Button title="Submit" onPress={handleRegister} />
        </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            marginTop: "50%"
        },
        inputContainer: {
            width: '100%',
            marginBottom: 20,
            padding: 10,
            justifyContent: 'center',
        },
        input: {
            width: '100%',
            height: 40,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
            marginBottom: 20,
        },
        space: {
            marginBottom: 20,
        },
    });

export default Register;