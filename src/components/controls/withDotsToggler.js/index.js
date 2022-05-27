



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
  import { HiDotsVertical } from "react-icons/hi";
  import { 
    IoMdClose, 
  } from 'react-icons/io';

// Application

import './dotsToggler.css';











const defaultRenderBackdrop = props => (
    <div {...props} className="modal-backdrop" />
  );



const withDotsToggler = (WrappedComponent) => {
    
    
    const HOC = (props) => {
        const [showModal, setShowModal]= useState(false)
        const hideModal = () => setShowModal(false)
      
        return (
            <React.Fragment>
                <div className="dots-toggler-button"
                    onClick={()=>setShowModal(true)}>
                    <HiDotsVertical />
                </div>
            <Modal
                show={showModal}
                onHide={hideModal}
                renderBackdrop={defaultRenderBackdrop}
                aria-labelledby="modal-label">
                    <div className='dots-toggler-modal-container'>
                        <div className='dots-toggler-modal-header'>
                            <div className='dots-toggler-modal-title'>
                            </div>
                            <div 
                                className='dots-toggler-modal-close'
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

export default withDotsToggler;



