





//Core
import React from 'react';

// Third
import { makeStyles } from '@mui/styles';

// Application
import Signin from './Signin';
import Signup from './Signup'
import useResponsiveDesign from '../../services/useResponsiveDevice'

import './auth.css'
// import {ReactComponent as StockScreenerLogo} from '../../assets/svg/stock-screener.svg';
import StockScreenerLogo from '../../assets/png/logo4v113.png'





const useStyles = ({isXSScreen, isLargeScreen, isMidScreen, isSmallScreen}) => makeStyles((theme) => ({
    mainAuthScreen: {
        display:'flex',
        flexDirection: (isSmallScreen || isXSScreen) ? 'column' : 'row',
        width:'100%',
        height:'100%',
        color:'rgb(68,79,82)'
    },
    logoSection:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: (isSmallScreen || isXSScreen) ? '100%' : '40%',
        height: (isSmallScreen || isXSScreen) ? '20%' : '100%',
        background: 'rgb(68,79,82)',
        background: 'linear-gradient(151deg, rgba(68,79,82,1) 0%, rgba(77,93,96,1) 100%)',
    },
    authFormSection:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: (isSmallScreen || isXSScreen) ? '100%' : '60%',
        height: (isSmallScreen || isXSScreen) ? '80%' : '100%',
        backgroundColor: '#DAE0E2'
    }
}));


const withAuthScreen = (WrappedComponent, componentName) => {

    function HOC(props){

        const { isXSScreen, isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign()
        const classes = useStyles({isXSScreen, isLargeScreen, isMidScreen, isSmallScreen})();

        return (
            <div className={classes.mainAuthScreen}>
                <div className={classes.logoSection}>
                    <img  src={StockScreenerLogo} style={{width:'75%'}} alt="stock screener"/>
                </div>
                <div className={classes.authFormSection}>
                    <WrappedComponent {...props} />
                </div>
            </div>
        );
    }

    return HOC;
};




const SigninScreen = withAuthScreen(Signin, 'signin')
const SignupScreen = withAuthScreen(Signup, 'signup')

export {
    SigninScreen,
    SignupScreen
};