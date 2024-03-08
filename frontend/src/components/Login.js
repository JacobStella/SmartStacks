import React, { useState } from 'react';
//thi is a test
function toRegister(){
    window.location.href = '/register';
}

function Login() {
    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');
    const app_name = 'largeprojectgroup3-efcc1eed906f'
    function buildPath(route)
    {
    if (process.env.NODE_ENV === 'production')
    {   
    return 'https://' + app_name + '.herokuapp.com/' + route;
    }   
    else
    {
    return 'http://localhost:5000/' + route;
    }
}


const doLogin = async event => 
{
    event.preventDefault(); // Prevent the default form submit behavior

    var obj = {login:loginName.value,password:loginPassword.value};
    var js = JSON.stringify(obj);

    try
    {    
        const response = await fetch(buildPath('api/login'), {
            method:'POST',
            body:js,
            headers:{'Content-Type': 'application/json'}
        });

        // Check if the login was successful based on the response status
        if(response.status === 200) // Successful login
        {
            var res = await response.json(); // Parse JSON response
            var user = {firstName:res.firstName, lastName:res.lastName, id:res.id};
            localStorage.setItem('user_data', JSON.stringify(user));
            setMessage('');
            window.location.href = '/cards'; // Redirect to another route/page
        }
        else if(response.status === 400) // Incorrect credentials
        {
            setMessage('User/Password combination incorrect');
        }
        else // Other kinds of errors
        {
            setMessage('An error occurred. Please try again.');
        }
    }
    catch(e)
    {
        alert(e.toString());
        return;
    }    
};




    return (
        <div id="loginDiv">
            <form>
                <span id="inner-title">PLEASE LOG IN</span><br />
                <input type="text" id="loginName" placeholder="Username" 
  ref={(c) => loginName = c} /><br />
<input type="password" id="loginPassword" placeholder="Password" 
  ref={(c) => loginPassword = c} /><br />

                <input type="submit" id="loginButton" class="buttons" value="Do It"
                    onClick={doLogin} />
                <input type="submit" id="registerButton" class="buttons" value="Register"
                    onClick={toRegister} />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
}

export default Login;
