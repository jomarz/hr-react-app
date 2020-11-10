import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Modal } from "reactstrap";

const NewEmployeeModalForm = ({departmentList, formNewEmployeeIsOpen, setFormNewEmployee, setUpdateEmployeeList, setShowSuccessModal, setSuccessMessage}) => {

    const [employeeName, setEmployeeName] = useState();
    const [salary, setSalary] = useState();
    const [department, setDepartment] = useState();
    const [sendingRequest, setSendingRequest] = useState(false);

    useEffect(() => {
        if(departmentList){setDepartment(departmentList[0].department_id);} 
    }, [departmentList])

    const handleEmployeeNameChange = (e) => {
        setEmployeeName(e.target.value);
    };
    
    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

    const handleSubmitNewEmployee = (e) => {
        e.preventDefault();
        let params = {
            employee_name: employeeName,
            salary: salary,
            department_id: department
        };
        setSendingRequest(true);
        Axios({
            url: 'https://hr.dotsforthings.com/api/create_employee.php',
            method: 'POST',
            data: params
        }).then((response) => {console.log(response);
            if(response.data.code == 200) {
                setUpdateEmployeeList(true); //Update department list to refelect new addition
                setSuccessMessage('Success creating new employee!');
                setShowSuccessModal(true);
                console.log("Success creating new employee.");
                setFormNewEmployee(false);
            } else {
                console.log("There was a problem with the request.");
            }
            setSendingRequest(false);
        });
    };

    /* useEffect(() => {
        getDepartmentList();
        }, []) */

    return (
        <Modal isOpen={formNewEmployeeIsOpen} >
            <form onSubmit={(event, values) => {handleSubmitNewEmployee(event, values);}}>
                <ModalHeader>Add new employee</ModalHeader>
                <ModalBody>
                    <input name='employee_name' required placeholder='Employee name' onChange={handleEmployeeNameChange}></input> <br/>
                    <input name='salary' required type='number' min='1' placeholder='Salary' onChange={handleSalaryChange}></input> <br />
                    <select value={department} required onChange={handleDepartmentChange}>
                        { departmentList?
                            departmentList.map(item => {
                            return (<option value={item.department_id}>{item.department_name}</option>);
                            setDepartment();
                        })
                    :
                    <></>}
                    </select>
                </ModalBody>
                <ModalFooter>
                    {sendingRequest?
                    <>
                    <Button type='submit' disabled className='btn-primary'><span className='spinner-border spinner-border-sm'></span>&nbsp;Create employee</Button>
                    <Button type='button' disabled>Cancel</Button>
                    </>
                    :
                    <>
                    <Button type='submit' className='btn-primary'>Create employee</Button>
                    <Button type='button' onClick={() => {setFormNewEmployee(false)}}>Cancel</Button>
                    </>
                    }
                </ModalFooter>
            </form>
        </Modal>
    );
}

export default NewEmployeeModalForm;