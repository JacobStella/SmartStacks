import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CreateLink from '../components/CreateLink'; 
import LibraryLink from '../components/LibraryLink'; 
import BrowseLink from '../components/BrowseLink'; 
import PlayLink from '../components/PlayLink'; 
import GetStarted from '../components/GetStarted'; 
import '../Web.css';

const LandingPage = () => {
    return (
        <div className="page-container">
            <PageTitle />
            <LoggedInName />
            <div className="main-content">
                <CreateLink />
                <LibraryLink />
                <BrowseLink />
                <PlayLink />
            </div>
    <GetStarted />
        </div>
    );
}

export default LandingPage;