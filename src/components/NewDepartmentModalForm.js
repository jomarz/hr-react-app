import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Modal } from "reactstrap";

const NewDepartmentModalForm = ({formNewDeptIsOpen, setFormNewDepartment, setUpdateDepartmentList}) => {

    const [departmentName, setDepartmentName] = useState();
    const [sendingRequest, setSendingRequest] = useState(false);
    const [duplicateNameError, setDuplicateNameError] = useState(false);

    const handleDepartmentNameChange = (e) => {
        setDepartmentName(e.target.value);
        setDuplicateNameError(false);
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
                setFormNewDepartment(false);
            } else if(response.data.code == 411) {
                setDuplicateNameError(true);
            } else {
                console.log("There was a problem with the request.");
            }
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
                    <div class="form-group">
                        <label for="department_name_input">Department name</label>
                        <input name='department_name' class="form-control" id='department_name_input' placeholder='Enter department name' required onChange={handleDepartmentNameChange}></input>
                        {duplicateNameError?
                        <small id="name_help" class="form-text text-danger" color='red'>A department with this name already exists</small>
                        :
                        <></>
                        }
                    </div>
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
                    <Button type='button' onClick={() => {setFormNewDepartment(false); setDuplicateNameError(false);}}>Cancel</Button>
                    </>
                    }
                </ModalFooter>
            </form>
        </Modal>
    );
}

export default NewDepartmentModalForm;