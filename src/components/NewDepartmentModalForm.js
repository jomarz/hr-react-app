import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Modal } from "reactstrap";

const NewDepartmentModalForm = ({formNewDeptIsOpen, setFormNewDepartment, setUpdateDepartmentList}) => {

    const [departmentName, setDepartmentName] = useState();
    const [sendingRequest, setSendingRequest] = useState(false);

    const handleDepartmentNameChange = (e) => {
        setDepartmentName(e.target.value);
    };
    
    const handleSubmitNewDepartment = (e, values) => {
        e.preventDefault();
        let params = {
            department_name: departmentName
        };
        setSendingRequest(true);
        Axios({
            url: 'https://hr.dotsforthings.com/api/create_department.php',
            method: 'POST',
            data: params
        }).then((response) => {
            if(response.data.code == 200) {
                setUpdateDepartmentList(true); //Update department list to refelect new addition
                console.log("Success creating new department.");
            } else {
                console.log("There was a problem with the request.");
            }
            setFormNewDepartment(false);
            setSendingRequest(false);
        });
    };

    useEffect(() => {
        }, [])

    return (
        <Modal isOpen={formNewDeptIsOpen} >
            <form onSubmit={(event, values) => {handleSubmitNewDepartment(event, values);}}>
                <ModalHeader>Add new department</ModalHeader>
                <ModalBody>
                    <input name='department_name' placeholder='Department name' onChange={handleDepartmentNameChange}></input>
                </ModalBody>
                <ModalFooter>
                    {sendingRequest?
                    <>
                    <Button type='submit' disabled><span className='spinner-border spinner-border-sm'></span>&nbsp;Create department</Button>
                    <Button type='button' disabled>Cancel</Button>
                    </>
                    :
                    <>
                    <Button type='submit' className='btn-primary'>Create department</Button>
                    <Button type='button' onClick={() => {setFormNewDepartment(false)}}>Cancel</Button>
                    </>
                    }
                </ModalFooter>
            </form>
        </Modal>
    );
}

export default NewDepartmentModalForm;