import React, { useState } from 'react';
//thi is a test
function toRegister(){
    window.location.href = '/register';
}

function Login() 
{
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
            const response = await fetch(buildPath('api/login'), 
            {
                method:'POST',
                body:js,
                headers:{'Content-Type': 'application/json'}
            });

            // Check if the login was successful based on the response status
            if(response.status === 200) // Successful login
            {
                var res = await response.json(); // Parse JSON response
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id};
                localStorage.setItem('user_data', JSON.stringify(user)); //stores users info for later use
                setMessage(''); //wtf is this for 
                window.location.href = '/cards'; // this will have to be changed is this is a popup, OR if this is a seperate page. We want to return to the page login called from
            }
            else if(response.status === 400) // Incorrect credentials
            {
                setMessage('Incorrect Login info');
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
            <form onSubmit={doLogin}> {/* Note the onSubmit handler here */}
                <span id="inner-title">PLEASE LOG IN</span><br />
                <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                <input type="submit" id="loginButton" className="buttons" value="Login" /><br />
                {/* Changed to type="button" and corrected class to className */}
                <span id="inner-title">Don't have an account?</span> <hyperlink href="https://largeprojectgroup3-efcc1eed906f.herokuapp.com/register">Register</hyperlink>
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
}
export default Login;
