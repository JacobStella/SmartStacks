import React from 'react';
import { Link } from 'react-router-dom';
import CreateImage from '../images/create';
import '../Web.css';

function CreateLink() {
    // Include state and functions specific to creating content

    return (
        <div className="create-section">
            <Link to="/create">
                <img src={CreateImage} alt="Create" className="image-button" />
            </Link>
        </div>
    );
}

export default CreateLink;
