import React from 'react';
import NavBar2 from '../components/NavBar2';
import LibraryHeader from '../components/LibraryHeader';
import FolderStacksDisplay from '../components/FolderStacksDisplay';
import '../Library.css';


const LandingPage = () => {
    return (
        <div className="page-container-library">
            <NavBar2 />
            <div className="content-container-library">
                <div className="library-header-container">
                    <LibraryHeader />
                </div>
                <div className="folder-stacks-display-container">
                    <FolderStacksDisplay />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
