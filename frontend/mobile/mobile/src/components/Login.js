import React, {useState} from "react";
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {setUserData} from "./CardUI";


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
            //console.log(resData);
            throw new Error("Login failed");
        }
        else{
            console.log("Logged in successfully");
            const loginData = await res.json();
            //console.log(JSON.stringify(loginData));
            setUserData(JSON.stringify(loginData));
            const loginData = await res.json();
            //console.log(JSON.stringify(loginData));
            setUserData(JSON.stringify(loginData));
            library();
        }
       
    }catch(e){
        console.log(e);
    }
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
                    <Image source={require('../../../assets/Skunk.png')}
                    style = {{width: 150, height: 150}} />
                </View>
                <TextInput style = {styles.input}
                placeholder = "Username"
                onChangeText = { (input) => formInput("userName", input)}/>

                <TextInput style = {styles.input}
                placeholder = "Password"
                onChangeText = { (input) => formInput("password", input)}/>

                <TouchableOpacity style={styles.buttons} onPress={submit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={register}>
                    <Text style={styles.buttonText}>Register</Text>
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
        backgroundColor: '#D8DCFF',
    },
    input: {
        borderWidth: 2,
        borderColor: "black",
        padding: 5,
        marginBottom: 15,
        width: "50%",
        fontSize: 16,
    },
    imageContainer: {
        paddingBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spacing: {
        marginBottom: 10,
    },
    buttons: {
        width: '30%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: '3%',
        backgroundColor: '#09BC8A',
        flexDirection: 'row',
        alignContent: 'flex-start',
        color: '#fff',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});

export default Login;