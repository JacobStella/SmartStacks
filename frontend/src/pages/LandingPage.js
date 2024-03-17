import React from 'react';
import NavBar from '../components/NavBar';
import CreateLink from '../components/CreateLink'; 
import LibraryLink from '../components/LibraryLink'; 
import BrowseLink from '../components/BrowseLink'; 
import PlayLink from '../components/PlayLink'; 
import GetStarted from '../components/GetStarted'; 
import '../Web.css';

const LandingPage = () => {
    return (
        <div className="page-container">
            <NavBar />
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
        </div>
    );
}

export default LandingPage;
