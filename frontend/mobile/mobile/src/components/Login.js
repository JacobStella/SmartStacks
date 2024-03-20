import React, {useState} from "react";
import {Button, StyleSheet, TextInput, View} from "react-native";

const Login = () => {
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


const submit = () => {
    //transfer updated state data

};

    return (
        <View style = {styles.container}>
            <TextInput style = {styles.input}
                placeholder = "Username"
                onChangeText = { (input) => formInput(input, "password")}/>

            <TextInput style = {styles.input}
            placeholder = "Password"
            onChangeText = { (input) => formInput("userName", input)}/>

        <Button title = "Submit" />
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
});

export default Login;