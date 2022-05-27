



// Core
import React, {useState} from 'react';



// Third
import { 
    FaUserCircle,
    FaBell
  } from 'react-icons/fa';



// Application
import './menus.css'




const UserMenu = (props) => {
    // const { items } = ['notification', 'account'];
    const [menuItems, setMenuitems] = useState(['notification', 'account'])


    return (
        <React.Fragment>
            <div className='menu-options-container'>
                {menuItems.map((item, i)=>{

                    return  <UserMenuItem 
                                key={i}
                                item={item}
                                {...props}/>
                })}
            </div>
        </React.Fragment>
    );
};



UserMenu.defaultProps = {
    items: []
  }



export default UserMenu;



// <div className='screener-menu-container'>
// </div>






const UserMenuItem = (props) => {
    const { item } = props;
    const [hover, setHover]=useState(false);

    const onItemSelect = (item) => {
        
    }

    return (
        <div
            className={`user-menu-item-container`}
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
    "account":<FaUserCircle />,
    "notification":<FaBell />
  }

