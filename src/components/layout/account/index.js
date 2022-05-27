


// Core
import React, { useEffect, useState } from 'react';

// Third Party
import { 
    IoMdClose, 
  } from 'react-icons/io';
import { 
    FaUserCircle
} from 'react-icons/fa';

// Apllication
import { getCurrentUser } from '../../../services/authService';
import './account.css'

const UserAccount = (props) => {
    const {onHideModal} = props

    useEffect(()=>{
        const { email } = getCurrentUser()
        // refreshData({email:email}, `view`)
    }, [])

    useEffect(()=>{

    }, [])
    
    return (
        <div className='user-account-modal'>
            <div className='user-account-modal-header'>
                <div className='user-account-modal-title'>
                </div>
                <div 
                    className='user-account-modal-close'
                    onClick={onHideModal}>
                    <IoMdClose />
                </div>
            </div>
            <div className='user-profile-picture' >
                <FaUserCircle />
            </div>
            <div className='user-name' >
                John Doe
            </div>
            <div className='user-email' >
                JohnDoe@gmail.com
            </div>
        </div>
    );
};

export default UserAccount;

