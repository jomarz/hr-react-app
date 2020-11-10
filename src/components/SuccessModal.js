import React, { useEffect, useState } from 'react';
import { Modal, ModalFooter, ModalHeader } from 'reactstrap';

const SuccessModal = ({show, setShow, message}) => {

    return (
      <Modal isOpen={show} className='modal-alert-success'>
        <ModalHeader>{message}</ModalHeader>
        <ModalFooter>
        <button type="button" class="btn btn-secondary" onClick={()=>{setShow(false)}}>Close</button>
        </ModalFooter>
      </Modal>
    );
}

export default SuccessModal;