



// Core
import React, {useState} from 'react';



// Third
import { 
    FaSearch, 
    FaSignOutAlt,
    FaHome,
    FaFireAlt,
    FaChartArea,
    FaBriefcase,
    FaSortAlphaDown
  } from 'react-icons/fa';



// Application
import './menus.css'




const ScreenerMenu = (props) => {
    const { items, onLogout } = props;
    const [menuItems, setMenuitems] = useState(items)


    return (
        <React.Fragment>
            <div className='menu-options-container'>
                {menuItems.map((item, i)=>{

                    return  <MenuItem 
                                key={i}
                                item={item}
                                {...props}/>
                })}
            </div>
            <div className='menu-foot-container'>
                <div 
                    className='logout-button'
                    onClick={props.onLogout}>
                        <span>{menuIcons['logout']}</span>
                        Logout
                </div>
            </div>
        </React.Fragment>
    );
};



ScreenerMenu.defaultProps = {
    items: []
  }



export default ScreenerMenu;



// <div className='screener-menu-container'>
// </div>






const MenuItem = (props) => {
    const { item, selectedPage, onSelectPage, onSearchStockSymbol } = props;
    const [hover, setHover]=useState(false);

    const onItemSelect = (page) => {
        onSelectPage(page)
    }

    return (
        <div
            className={`menu-option-container${selectedPage === item ? '-selected' : ''}`}
            onClick={()=>onItemSelect(item)}
            onMouseEnter={()=>setHover(true)} 
            onMouseLeave={()=>setHover(false)}>
                <span>{menuIcons[item]}</span>
                {item}
      </div>
    );
};


// Object literals for icons 
const menuIcons={
    "fundamentals":<FaSortAlphaDown />,
    "alerts":<FaFireAlt/>,
    "stock watch":<FaChartArea/>,
    "portfolio":<FaBriefcase/>,
    "logout":<FaSignOutAlt/>
  }

