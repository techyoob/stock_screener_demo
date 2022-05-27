













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
import './notificationModal.css';











const defaultRenderBackdrop = props => (
    <div {...props} className="modal-backdrop" />
  );



const withNotificationModal = (WrappedComponent) => {
    
    
    const HOC = (props) => {
        const { width, height} = props;

        const [showModal, setShowModal]= useState(false)
        const hideModal = () => setShowModal(false)

        return (
            <React.Fragment>
                <div className="notification-modal-button"
                    style={{height:height, width:width}}
                    onClick={()=>setShowModal(true)}>
                    <FaBell />
                </div>
            <Modal
                show={showModal}
                onHide={hideModal}
                renderBackdrop={defaultRenderBackdrop}
                aria-labelledby="modal-label">
                    <div className='notification-modal-container'>
                        <WrappedComponent {...props} onHideModal={hideModal}/>
                    </div>
                    
            </Modal>
            </React.Fragment>
        ); 
    }
    
    return HOC;
};

export default withNotificationModal;





{/* <div className="strips-toggler-button"
onClick={()=>setShowNotificationModal(true)}>
<FaBell />
</div>
<Modal
show={showNotificationModal}
onHide={hideNotificationModal}
renderBackdrop={defaultRenderBackdrop}
aria-labelledby="modal-label">
    <Notification onHideModal={hideNotificationModal}/>
</Modal> */}


