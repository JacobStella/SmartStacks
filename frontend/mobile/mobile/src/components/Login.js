import React, {useState} from "react";
import {Button, SafeAreaView, LogBox, StyleSheet, Text, TextInput, View, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {setUserData} from "./CardUI";

LogBox.ignoreAllLogs();

const Login = ({navigation}) => {
    const [data, newData] = useState({
        userName: "",
        password: ""
    });

const formInput = (userName, pass) =>{
    newData((prevData) =>  ({
        ...prevData,
        [userName]: pass
    }));
};


const submit = async () => {
    console.log("Call to API -> Login")
    //transfer updated state data
    try{
        const res = await fetch ("https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login:data.userName,
                password: data.password,
            }),
        });

        if(!res.ok){
            const resData = await res.json();
            //console.log(resData);
            throw new Error("Login failed");
        }
        else{
            console.log("Logged in successfully");
            const loginData = await res.json();
            //console.log(JSON.stringify(loginData));
            setUserData(JSON.stringify(loginData));
            library();
        }
       
    }catch(e){
        console.log(e);
    }
};

const forgotPassword = () => {
    navigation.navigate("ForgotPassword");
 };

const register = () => {
   navigation.navigate("Register");
};

const library = () => {
    navigation.navigate("SmartStacks");
 };

 const test = () => {
    navigation.navigate("SmartStacks");
 };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style = {styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../../assets/logo_SmartStacks.png')}
                    style = {{width: 150, height: 150}} />
                </View>
                <TextInput style = {styles.input}
                placeholder = "Username"
                onChangeText = { (input) => formInput("userName", input)}/>

                <TextInput style = {styles.input}
                placeholder = "Password"
                onChangeText = { (input) => formInput("password", input)}/>
                <View style={styles.spacing} />
                <TouchableOpacity style={styles.loginButton} onPress={submit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.spacing}>
                    <Text style={{color: '#fff', fontSize: 16}}>New User?</Text>
                </View>
                <TouchableOpacity style={styles.registerButton} onPress={register}>
                    <Text style={{fontSize: 22, color: '#fff',}}>Register</Text>
                </TouchableOpacity>
                <View style={styles.spacing}/>
                <Button title ="Testing" onPress = {test} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#508991',
    },
    input: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: '#D8DCFF',
        padding: 10,
        paddingLeft: 10,
        marginBottom: 15,
        borderRadius: 2,
        width: "50%",
        fontSize: 18,
    },
    imageContainer: {
        paddingBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spacing: {
        marginTop: 18,
        marginBottom: 3,
    },
    loginButton: {
        width: '30%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#09BC8A',
        flexDirection: 'row',
        alignContent: 'flex-start',
        color: '#fff',
    },
    registerButton: {
        width: '30%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderWidth: 1,
        borderColor: '#172A3A',
        borderRadius: 5,
        backgroundColor: '#004346',
        flexDirection: 'row',
        alignContent: 'flex-start',
        color: '#fff',
    },
    buttonText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Login;