import React, {useState} from "react";
import {Button, SafeAreaView, StyleSheet, TextInput, View, Image} from "react-native";
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

const register = () => {
   navigation.navigate("Register");
};

const library = () => {
    navigation.navigate("MainApp");
 };

 const test = () => {
    navigation.navigate("Layout");
 };

    return (
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

        <Button title = "Submit" onPress = {submit} />
        <Button title = "Register" onPress = {register} />
        <Button title = "test" onPress = {test} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        borderWidth: 2,
        borderColor: "black",
        padding: 5,
        marginBottom: 5,
        width: "50%",
        
    },
    imageContainer: {
        paddingBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
});

export default Login;