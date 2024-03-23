import React from 'react';
import NavBar2 from '../components/NavBar2';
import CreateLink from '../components/CreateLink'; 
import LibraryLink from '../components/LibraryLink'; 
import BrowseLink from '../components/BrowseLink'; 
import PlayLink from '../components/PlayLink'; 
import GetStarted from '../components/GetStarted'; 
import '../Web.css';

const LandingPage = () => {
    
    return (
        <div className="page-container">
            <NavBar2 />
            <div className="container">
            <div className="row">
                <div className="col">
                    <CreateLink />
                </div>
                <div className="col">
                    <LibraryLink />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <BrowseLink />
                </div>
                <div className="col">
                    <PlayLink />
                </div>
            </div>
            </div>
        </div>

        
        
    );
}

export default LandingPage;

{/*
             code relating to the navbar clickable profile pic
            <NavBar isLoggedIn={isLoggedIn} userProfilePic={userProfilePic} />
            */}
{/*
    code relating to the navbar clickable profile pic
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to not logged in
    const [userProfilePic, setUserProfilePic] = useState('path_to_default_profile_pic.png');
    */}
{/*
            <div className="content-container"> 
                <div className="links-and-started">
                    <div className="link-grid">
                        <div className="link-row">
                            <div className="link-column">
                                <CreateLink />
                            </div>
                            <div className="link-column">
                                <LibraryLink />
                            </div>
                        </div>
                        <div className="link-row">
                            <div className="link-column">
                                <BrowseLink />
                            </div>
                            <div className="link-column">
                                <PlayLink />
                            </div>
                        </div>
                    </div>
                    <div className="vertical-line"></div>
                    <GetStarted />
                </div>
            </div>
            */}