






// export { default as SigninScreen } from './Signin';






//Core
import React from 'react';

// Third


// Application
import Signin from './Signin';
import Signup from './Signup'
import './auth.css'
import {ReactComponent as LogoGassH} from '../../assets/svg/logoHOne.svg';
import  GASSLogo from '../../assets/png/gass-logo-0.png';




const withAuthScreen = (WrappedComponent, componentName) => {

    function HOC(props){

        return (
            <div className='main-auth-screen'>
                <div className='auth-screen-logo-container'>
                    <img  src={GASSLogo} style={{width:'75%'}} alt="stock screener"/>
                </div>
                <div className='auth-component-container'>
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