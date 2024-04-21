import React, { useState, useEffect, useRef } from 'react'; // Import useEffect here
import NavBar2 from '../components/NavBar2';
import BrowseHeader from '../components/BrowseHeader';
import PublicStackDisplay from '../components/PublicStackDisplay';
import { useNavigate, useLocation } from 'react-router-dom'; // Removed unused import 'Link'
import '../Library.css';


function buildPath(route)
{
    if (process.env.NODE_ENV === 'production')
    {
        return 'https://' + 'largeprojectgroup3-efcc1eed906f' + '.herokuapp.com/' + route;
    }
    else
    {
        return 'http://localhost:5000/' + route;
    }
}

const BrowsePage = () => {
    const [folders, setFolders] = useState([{ _id: 1, name: 'Folder 1' }]);
    const [message, setMessage] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [searchFolderInput, setSearchFolderInput] = useState('');
    const searchFolderInputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    var folderSearch;

    useEffect(() => {
    }, []);




    ///////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////FOLDER SEARCH////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
      

    ///////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////FOLDER SEARCH////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="page-container-library">
            <NavBar2 />
            <div className="content-container-library">
                <BrowseHeader />
                
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};
export default BrowsePage;




/*
<div className="folder-stacks-display-container">
                    <PublicStacksDisplay folders={folders} onEditFolder={editFolderName} onAddFolder={addFolder} />
                </div>
*/