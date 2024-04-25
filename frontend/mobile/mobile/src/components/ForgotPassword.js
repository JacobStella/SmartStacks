import React, { useState } from 'react';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Sending a POST request using the Fetch API
    fetch('/api/sendforgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
    .then(response => {
      if (!response.ok) {
        // If the server response was not OK, we get the error message from the response and throw it
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Network response was not OK');
        });
      }
      return response.json();
    })
    .then(data => {
      setMessage(data.message);  // Display success message from server
      setError('');  // Clear any previous errors if email is sent successfully
    })
    .catch(error => {
      setError(error.message || 'Failed to send reset email. Please try again later.');  // Set generic error message for other failures
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');  // Clear error message when the user starts typing
    setMessage(''); // Clear success message when the user starts typing
  };
  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style = {styles.container}>
            
            <TextInput style = {styles.input}
            placeholder = "Email"
            onChangeText = { (input) => formInput("Email", input)}/>

            <TouchableOpacity style={styles.buttons} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        
        </View>
    </TouchableWithoutFeedback>
);
};




