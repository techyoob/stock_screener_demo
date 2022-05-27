



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
  import { 
    IoMdClose, 
  } from 'react-icons/io';


// Application
import Notification from '../../layout/notification';
import './stripsToggler.css';











const defaultRenderBackdrop = props => (
    <div {...props} className="modal-backdrop" />
  );



const withStripsToggler = (WrappedComponent) => {
    
    
    const HOC = (props) => {
        const { width, height} = props;

        const [showModal, setShowModal]= useState(false)
        const hideModal = () => setShowModal(false)
      
        return (
            <React.Fragment>
                <div className="strips-toggler-button"
                    style={{width:width, height:height}}
                    onClick={()=>setShowModal(true)}>
                    <FaBars />
                </div>
            <Modal
                show={showModal}
                onHide={hideModal}
                renderBackdrop={defaultRenderBackdrop}
                aria-labelledby="modal-label">
                    <div className='strips-toggler-modal-container'>
                        <div className='strips-toggler-modal-header'>
                            <div className='strips-toggler-modal-title'>
                            </div>
                            <div 
                                className='strips-toggler-modal-close'
                                onClick={hideModal}>
                                <IoMdClose />
                            </div>
                        </div>
                        <WrappedComponent {...props} onHideModal={hideModal}/>
                    </div>
                    
            </Modal>
            </React.Fragment>
        ); 
    }
    
    return HOC;
};

export default withStripsToggler;





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


