import React from 'react';
import './Modal.css';
import {Button} from "react-bootstrap";

const Modal = ({isOpen, onClose, children}) => {
    return (isOpen &&
        <div className="modal open">
            <div className="modal-content">
                <Button className="animatedButton closeModalButton" onClick={onClose}>&times;</Button>
                {children}
            </div>
        </div>
    );
};

export default Modal