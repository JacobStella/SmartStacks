import React from 'react';
import NavBar2 from '../components/NavBar2';
import CreateLink from '../components/CreateLink'; 
import LibraryLink from '../components/LibraryLink'; 
import BrowseLink from '../components/BrowseLink'; 
import PlayLink from '../components/PlayLink'; 
import GetStarted from '../components/GetStarted'; 
import '../Web.css';

const LandingPage = () => {

    {/*
    code relating to the navbar clickable profile pic
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to not logged in
    const [userProfilePic, setUserProfilePic] = useState('path_to_default_profile_pic.png');
    */}
    
    return (
        <div className="page-container">
            {/*
             code relating to the navbar clickable profile pic
            <NavBar isLoggedIn={isLoggedIn} userProfilePic={userProfilePic} />
            <NavBar2 />
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

            <div class="container">
            <div class="row">
                <div class="col">
                    <CreateLink />
                </div>
                <div class="col">
                    <LibraryLink />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <BrowseLink />
                </div>
                <div class="col">
                    <PlayLink />
                </div>
            </div>
            </div>
        </div>

        
        
    );
}

export default LandingPage;
