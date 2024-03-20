import React, {useState} from "react";
import {Button, StyleSheet, TextInput, View} from "react-native";

const form = () => {
    const [data, newData] = useState({
        userName: "",
        password: ""
    });

const formInput = (userName, pass) =>{
    newData((prevData) =>  ({
        ...prevData,
        [userName]: pass
    }));
    }
};

const submit = () => {
    //transfer updated state data

};

    return (
        <View style = {styles.container}>
            <TextInput style = {styles.input}
                placeholder = "Username";
                onChangeText = { (input) => formInput(input, "password")}/>

        <View style = {styles.container}>
            <TextInput style = {styles.input}
            placeholder = "Password";
            onChangeText = { (input) => formInput("userName", input)}/>

        <Button title = "Submit" />
        </View>
    );
};

export default Form;