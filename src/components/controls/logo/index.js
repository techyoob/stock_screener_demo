





// Core
import React from 'react';



// Third



// Application
import useResponsiveDesign from "../../../services/useResponsiveDevice";
import  GASSLogo from '../../../assets/png/gass-logo-0.png';
import  GASSLogo2 from '../../../assets/png/gass-logo-1.png';
import  GASSLogo3 from '../../../assets/png/gass-logo-3.png';
 





// TODO:
// Make Logo Component load different gass logo types, animate, recolor?, ...etc





const Logo = (props) => {
    const { height } = props;
    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign()




    return (
        <React.Fragment>
            {(isSmallScreen || isMidScreen) && <img src={GASSLogo3} 
                                                style={{marginLeft:'10px', height:height }} 
                                                alt="stock screener"/>}
            {isLargeScreen && <img src={GASSLogo2} 
                                                style={{marginLeft:'10px', height:height }} 
                                                alt="stock screener"/>}
        </React.Fragment>
    );
};

export default Logo;




{/* <img src={GASSLogo2} style={{width:'75%', height:'55%'}} alt="stock screener"/> */}


