import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Modal } from "reactstrap";

const NewEmployeeModalForm = ({formNewEmployeeIsOpen, setFormNewEmployee}) => {

    const [employeeName, setEmployeeName] = useState();
    const [salary, setSalary] = useState();
    const [department, setDepartment] = useState();
    const [departmentList, setDepartmentList] = useState([])

    const getDepartmentList = () => {
        Axios({
            url: 'https://hr.dotsforthings.com/api/get_department_list.php',
            method: 'POST'
        }).then((response) => {
            setDepartmentList(response.data.data);
        });
    };

    useEffect(() => {console.log(departmentList);}, [departmentList])

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
        Axios({
            url: 'https://hr.dotsforthings.com/api/create_employee.php',
            method: 'POST',
            data: params
        }).then((response) => {console.log(response);
            if(response.data.code == 200) {
                console.log("Success creating new employee.");
            } else {
                console.log("There was a problem with the request.");
            }
            setFormNewEmployee(false);
        });
    };

    useEffect(() => {
        getDepartmentList();
        }, [])

    return (
        <Modal isOpen={formNewEmployeeIsOpen} >
            <form onSubmit={(event, values) => {handleSubmitNewEmployee(event, values);}}>
                <ModalHeader>Add new employee</ModalHeader>
                <ModalBody>
                    <input name='employee_name' placeholder='Employee name' onChange={handleEmployeeNameChange}></input> <br/>
                    <input name='salary' placeholder='Salary' onChange={handleSalaryChange}></input> <br />
                    <select value={department} onChange={handleDepartmentChange}>
                        { departmentList?
                            departmentList.map(item => {
                            return (<option value={item.department_id}>{item.department_name}</option>);
                        })
                    :
                    <></>}
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit'>Create employee</Button>
                    <Button type='button' onClick={() => {setFormNewEmployee(false)}}>Cancel</Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}

export default NewEmployeeModalForm;