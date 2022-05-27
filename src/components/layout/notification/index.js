

// Core
import React, { useState } from 'react';

// Third Party
import { 
    IoMdClose, 
  } from 'react-icons/io';

// Apllication
import './notification.css'

const UserNotification = (props) => {
    
    const {onHideModal} = props
    const [notifications, setNotifications]=useState([])

    return (
        <div className='notification-modal'>
            <div className='notification-modal-header'>
                <div className='notification-modal-title'>
                    Notifications
                </div>
                <div 
                    className='notification-modal-close'
                    onClick={onHideModal}>
                    <IoMdClose />
                </div>
            </div>
            {notifications.map((item, i)=>{
                return (
                    <div className='notification-item' key={(i)}>
                        This is Notification message 
                    </div>)
            })}
        </div>
    );
};

export default UserNotification;