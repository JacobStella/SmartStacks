import React, { useState } from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity} from "react-native";

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');




  const handleSubmit = async (e) => {
    // Sending a POST request using the Fetch API
      try{
      const response = await fetch('https://largeprojectgroup3-efcc1eed906f.herokuapp.com/api/sendforgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    });
    if(!response.ok){
      const temp = await response.json();
      console.log(temp);

    }
    else{
      const temp = await response.json();
      setMessage(temp.message);
    }
    // const temp = response.message;
    // console.log(temp);
    }catch(e){
      console.log(e);
    };

  }

  const handleEmailChange = (e) => {
    setEmail(e);
    setError('');  // Clear error message when the user starts typing
    setMessage(''); // Clear success message when the user starts typing
  };


  const backLogin = () => {
    navigation.navigate("Login");
 };
  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style = {styles.container}>
            <Text style = {styles.Title}>Forgot Password?</Text>
            <Text style = {styles.InnerTitle}>Enter your email and we'll send you a link to reset your password.</Text>
            <TextInput style = {styles.input}
            placeholder = "Email"
            onChangeText = {handleEmailChange}/>

            <Text style = {styles.InnerTitle}>{message}</Text>


            <TouchableOpacity style={styles.buttons} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={backLogin}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        
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

  Title: {
    fontSize: 25,
    color: 'black',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '900',
    padding: 10,
},

InnerTitle: {
  fontSize: 15,
  color: 'black',
  marginTop: 15,
  marginBottom: 5,
  textAlign: 'center',
  fontWeight: '900',
  padding: 10,
},
});

export default ForgotPassword;




