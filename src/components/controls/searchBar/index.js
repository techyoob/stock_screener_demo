


// Core imports
import React, { useState, useEffect } from 'react';



// Third
import { 
    FaSearch,
    FaBell,
    FaRegUser,
    FaUserCircle
  } from 'react-icons/fa';




// Application
import './searchBar.css'




const SearchBar = (props) => {
    const { onSearchCallback, width, height } = props
    const [searchKeywork, setSearchKeyword] = useState("");
    const updateSearchKeyWord = (e) => {
        setSearchKeyword(e.target.value)
      }

     const onSearch = () => {      
        onSearchCallback(searchKeywork)
        setSearchKeyword("")
    }

    return (
        <div className="search-bar-container"
                style={{height:height, width:width}}>
            <input
                className="search-bar-input"
                type = "text"
                placeholder="Enter Share Symbol"
                maxLength="5"
                onChange = {updateSearchKeyWord}
                onKeyPress={(e) => e.key === 'Enter' && searchKeywork.length > 0? onSearch() : null}
                value={searchKeywork}/>
                <FaSearch
                    className="search-bar-button"
                    onClick={()=> searchKeywork.length > 0 ? onSearch() : null}/>
      </div>
    );
};

export default SearchBar;