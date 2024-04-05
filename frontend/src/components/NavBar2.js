import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Ensure Link is imported
import '../NavBar.css';
import logo from '../images/browse.png'; // Make sure the path is correct

const NavBar2 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userDataString = localStorage.getItem('user_data');
        if (!userDataString) {
            //if user in NOT logged in
        } else {
            const userData = JSON.parse(userDataString);
            if (userData && userData.id) {
                //is user is logged in and we can access their date
            } else {
                //if user is logged in but we cant access their date (we should throw a console.log error)
            }
        }
    }, []);

    const handleLoginClick = () => {
        // Store the current location before redirecting to login
        localStorage.setItem('preLoginPath', location.pathname);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="Company Logo" className="navbar-logo" />
            
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/library" className="nav-button">Library</Link>
            <Link to="/create" className="nav-button">Create</Link>

            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button type="submit">Search</button>
            </div>

            {/* Replaced Link with button and added navigation logic */}
            <button onClick={handleLoginClick} className="nav-button">Login</button>
        </nav>
    );
};

export default NavBar2;




/*Step 1: Determine Authentication Status
First, you need a mechanism to check if the user is logged in. Typically, this involves checking for the presence of a
 token (like JWT) stored in local storage, a cookie, or querying your backend to confirm the session. */

const isLoggedIn = () => {
    const token = localStorage.getItem('token'); // Replace 'token' with your actual token key
    return token != null; // If there's a token, assume the user is logged in
  };
  
/*Step 2: Conditionally Render Components
Use the authentication status to conditionally render different components or layouts. */
  const App = () => {
    const userLoggedIn = isLoggedIn();
  
    return (
      <div>
        {userLoggedIn ? (
          <LoggedInView />
        ) : (
          <LoggedOutView />
        )}
      </div>
    );
  };

  
/*Step 3: Create Different Views
Create separate components for what you want to show when the user is logged in versus when they are not. */
  const LoggedInView = () => {
    return (
      <div>
        {/* content only for logged-in users */}
      </div>
    );
  };
  
  const LoggedOutView = () => {
    return (
      <div>
        {/* content for non-authenticated users */}
      </div>
    );
  };
  


  /*Step 4: Protect Routes (Optional)
If you're using React Router or a similar library, you might want to protect certain routes that should only be 
accessible when the user is logged in. */
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userLoggedIn = isLoggedIn();

  return (
    <Route
      {...rest}
      render={props =>
        userLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};




/*Example using Context for Global State
You can use React's Context API to make the user's logged-in status and the login and logout functions available
throughout your component tree. */
export const AuthContext = React.createContext();

// In your top-level component:
export const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn());

  const login = (token) => {
    localStorage.setItem('token', token);
    setUserLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUserLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userLoggedIn, login, logout }}>
      {/* Rest of your app */}
    </AuthContext.Provider>
  );
};

/*Then, any component can access the userLoggedIn state and the login/logout functions via the useContext hook. */
const SomeComponent = () => {
    const { userLoggedIn, logout } = useContext(AuthContext);
  
    // Use `userLoggedIn` to conditionally render content and `logout` to sign out the user
  };

  /* This approach helps manage authentication state and ensures that your UI components have access to the current 
  authentication status and can react accordingly.*/