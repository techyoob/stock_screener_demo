




// Core
import React from 'react';

// Third party
import Spinner from "react-svg-spinner";

// Application 
import './throbber.css'




const Throbber = () => {
    return (
        <div className='throbber-container'>
            <Spinner size="20px" color="white" /> 
        </div>
    );
};

export default Throbber;