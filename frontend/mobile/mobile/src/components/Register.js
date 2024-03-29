import React, {useState} from "react";
import {Button, StyleSheet, TextInput, SafeAreaView, View, Text} from "react-native"

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
        try{
           console.log(JSON.stringify(data));
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
            
            console.log(res.status);
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

    return (
        <SafeAreaView style={styles.container}>
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
                    placeholder = "email"
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