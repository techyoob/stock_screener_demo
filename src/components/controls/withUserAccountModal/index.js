













// Core
import React, {useState} from 'react';

// Third
import Modal from "react-overlays/Modal";
import { 
    FaBars,
    FaBell,
    FaRegUser,
    FaUserCircle
  } from 'react-icons/fa';


// Application
import Notification from '../../layout/notification';
import { getCurrentUser } from '../../../services/authService';
import useResponsiveDesign from '../../../services/useResponsiveDevice';
import './userAccountModal.css';











const defaultRenderBackdrop = props => (
    <div {...props} className="modal-backdrop" />
  );



const withUserAccountModal = (WrappedComponent) => {
    
    
    const HOC = (props) => {
        const { width, height} = props;
        
        const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign()
        const { full_name } = getCurrentUser()
        const [showModal, setShowModal]= useState(false)
        const hideModal = () => setShowModal(false)

        return (
            <React.Fragment>
                {isLargeScreen && <span className='user-account-name'>{full_name}</span> }
                <div className="user-account-modal-button"
                    style={{height:height, width:width}}
                    onClick={()=>setShowModal(true)}>
                    <FaUserCircle />
                </div>
            <Modal
                show={showModal}
                onHide={hideModal}
                renderBackdrop={defaultRenderBackdrop}
                aria-labelledby="modal-label">
                    <div className='user-account-modal-container'>
                        <WrappedComponent {...props} onHideModal={hideModal}/>
                    </div>
                    
            </Modal>
            </React.Fragment>
        ); 
    }
    
    return HOC;
};

export default withUserAccountModal;


