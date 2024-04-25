import React, {useState, useRef, useEffect} from "react";
import {Button, StyleSheet, TextInput, SafeAreaView, View, Text, Image, Animated, Modal, Alert, Pressable, useWindowDimensions, ScrollView, ImageBackground, TouchableOpacity} from "react-native"
import {Ionicons} from '@expo/vector-icons';
import Header from "./SliderHeader";
import Boxes from "./SliderBox";
import Sample from "../../../assets/sample.png"


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

  const [message, setMessage] = useState('');
  const handleRegister = async () => {
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordRegex.test(registerPassword.value)) {
      setMessage('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
      return;
    }

    if (registerPassword.value !== confirmPassword.value) {
      setMessage('Passwords do not match!');
      return;
    }

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
          const res = await response.json();
          const userId = res.userid;
          console.log("User ID:", userId);
          //navigation.navigate("Login");
          const verificationResponse = await fetch('/api/send-verif', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
              email: email.value,
            }),
          });
          const verificationData = await verificationResponse.json();

          if (verificationResponse.ok) {
            setMessage('User registered successfully. Verification email sent.');
          }else{
            setMessage('User registered successfully, but failed to send verification email.');
          }
        }else{
          setMessage("Failed to register user.");
        }

        }catch(e){
          setMessage('Failed to register user due to an error.');
          console.log('Registration error',e);
        }
        //console.log('User Data: ', data); // shows the inputted user data on console screen
  };
  const backLogin = () => {
    navigation.navigate("Login");
  };
  
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/logo_SmartStacks.png')}
          style = {{width: 150, height: 150}} />
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
          value={data.lastName} />
        <TextInput style={styles.input}
          placeholder = "E-mail"
          onChangeText={text => formInput("email", text)}
          value={data.email} />
        <TextInput style={styles.input}
          placeholder = "Username"
          onChangeText={text => formInput("username", text)}
          value={data.username} />
        <TextInput style={styles.input}
          placeholder = "Password"
          onChangeText={text => formInput("password", text)}
          value={data.password} />
           <Text>{message}</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.spacing}>
        <Text style={{color: '#fff', fontSize: 16}}>New User?</Text>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={backLogin}>
        <Text style={{fontSize: 22, color: '#fff',}}>Back</Text>
      </TouchableOpacity>
            
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Header
                onPress={()=> setModalVisible(false)}
                setModalVisible = {setModalVisible}
                modalVisible = {modalVisible}
              />
              <Boxes>
              </Boxes>
            {/* <Slider></Slider> */}
            {/* View style={styles.buttonBox}> */}
            {/* <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name = "close" size = {30} color = "black"/>
            </Pressable> */}
            </View>
          </View>
        </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Introduction</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
}

const images = new Array(6).fill(
  // 'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
  <Image source = {Sample}/>
);
    
const Slider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width: windowWidth} = useWindowDimensions();
    
  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
        scrollEventThrottle={1}>
          {images.map((image, imageIndex) => {
            return (
              <View style={{width: 250, height: 250}} key={imageIndex}>
                <ImageBackground source={{uri: image}} style={styles.modalImages}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {'Image - ' + imageIndex}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};    
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#508991',
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
    width: '50%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8DCFF',
  },
  spacing: {
    marginTop: 18,
    marginBottom: 3,
},
  imageContainer: {
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',         
  },
  modalBox: {
    height: "80%",
    width: "90%",
    margin: 20,
    padding: 5,
    backgroundColor: '#D8DCFF', 
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
  },
  modalHeader:{
    flex: 1,
    width : '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8DCFF',
    borderRadius: 20,
  },
  modalBody:{
    flex: 1,
    width : '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D8DCFF',
    borderRadius: 20,
  },
  modalFooter:{
    flex: 1,
    width : '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderRadius: 20,
  },
  modalImages: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width : '100%',
    height: '100%',
    marginVertical: 4,
    overflow: 'hidden',
    borderRadius: 20,
  },
  closeButton: {
    backgroundColor: 'white',
    marginTop: "2%",
    left: "300%",
  },
});

export default Register;