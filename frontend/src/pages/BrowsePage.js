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
    const [publicStacks, setPublicStacks] = useState([]);
    const [folders, setFolders] = useState([{ _id: 1, name: 'Folder 1' }]);
    const [message, setMessage] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [searchFolderInput, setSearchFolderInput] = useState('');
    const searchFolderInputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    var folderSearch;

    useEffect(() => {
        handleSearch(" ");
    }, []);

    const updatePublicStacks = (newStacks) => {
        setPublicStacks(newStacks);
    };

    const fetchPublicSearch = async (searchTerm) => {
        console.log("searchTerm:", searchTerm);
        let obj = { searchTerm: searchTerm };
        let js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/public-search'), {
                method: 'POST',
                body: js,
                headers: {'Content-Type': 'application/json'}
            });

            let res = await response.json();

            if (res.error) {
                alert(res.error);
            } else {
                console.log("Search results", res);
                // Filter sets with public status true and update state
                const publicSets = res.sets.filter(set => set.public === true);
                updatePublicStacks(publicSets);
                console.log("publicSets", publicSets);
                setSearchResults(res); // Assuming you still want to keep the original search results
            }
        } catch (e) {
            alert(e.toString());
        }
    };

    const handleSearch = async (event) => {
        console.log("searchInput", searchInput);
        await fetchPublicSearch(searchInput);
    };



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
                <div className="folder-stacks-display-container">
                    <PublicStackDisplay publicStacks={publicStacks}  />
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};
export default BrowsePage;




/*
updatePublicStacks={updatePublicStacks}
*/