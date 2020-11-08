import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AvField } from 'availity-reactstrap-validation';
import './assets/css/app.css';

import DepartmentList from './components/DepartmentList'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import NewDepartmentModalForm from './components/NewDepartmentModalForm';
import NewEmployeeModalForm from './components/NewEmployeeModalForm';

function App() {

  const [departmentList, setDepartmentList] = useState();
  const [formNewDeptIsOpen, setFormNewDepartment] = useState(false);
  const [formNewEmployeeIsOpen, setFormNewEmployee] = useState(false);

  const getDepartmentList = () => {
    let params = {
      filter_2_above_50: "FALSE"
    };
    axios({
        url: 'https://hr.dotsforthings.com/api/get_department_list.php',
        method: 'POST',
        data: params
      }).then((response) => {console.log(response.data);
        setDepartmentList(response.data.data);
      });

  };
  
  useEffect(() => {
    getDepartmentList();
  }, []);

  return (
    <div className="App">
      <div className="header"></div>
      <div className="application-main">
      <Button onClick={() => setFormNewDepartment(true)}>Add department</Button>
      <Button onClick={() => setFormNewEmployee(true)}>Add employee</Button>
      <DepartmentList departmentList={departmentList} />
      <AvForm>
        <AvField name='test'>Test</AvField>
      </AvForm>
      </div>
      <div className="footer"></div>
      <NewDepartmentModalForm formNewDeptIsOpen={formNewDeptIsOpen} setFormNewDepartment={setFormNewDepartment} />
      <NewEmployeeModalForm formNewEmployeeIsOpen={formNewEmployeeIsOpen} setFormNewEmployee={setFormNewEmployee} />
    </div>
  );
}

export default App;
