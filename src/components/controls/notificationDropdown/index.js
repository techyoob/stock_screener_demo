




import React from 'react';

const NotificationDropdown = (props) => {
    return (
        <React.Fragment>
            <div className="user-notifications-button"
              onClick={()=>setShowNotificationModal(true)}>
                <FaBell />
            </div>
            <Modal
            show={showNotificationModal}
            onHide={hideNotificationModal}
            renderBackdrop={defaultRenderBackdrop}
            aria-labelledby="modal-label">
                <NotificationList
                onHideModal={hideNotificationModal}/>
            </Modal>
        </React.Fragment>
    );
};

export default NotificationDropdown;