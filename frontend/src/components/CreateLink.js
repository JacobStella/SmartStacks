import React from 'react';
import { Link } from 'react-router-dom';
import CreateImage from '../images/create.png';
import '../Web.css';

function CreateLink() {
    // Include state and functions specific to creating content

    return (
        <div className="create-section">
            <Link to="/create">
                <img src={CreateImage} alt="Create" className="image-button" />
            </Link>
            <p className="create-section-text">Create</p>
        </div>
    );
}

export default CreateLink;
