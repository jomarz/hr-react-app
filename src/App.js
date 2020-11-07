import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AvField } from 'availity-reactstrap-validation';
import './assets/css/app.css';

import DepartmentList from './components/DepartmentList'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import NewEmployeeModalForm from './components/NewEmployeeModalForm';

function App() {

  const [formNewDeptIsOpen, setFormNewDepartment] = useState(false);

  const getFileList = () => {
    let params = {
      filter_2_above_50: "TRUE"
    };
    axios({
        url: 'https://hr.dotsforthings.com/api/get_department_list.php',
        method: 'POST',
        data: params
      }).then((response) => {console.log(response.data);
      });

  };
  
  useEffect(() => {
    getFileList();console.log(formNewDeptIsOpen);
  }, );

  return (
    <div className="App">
      <div className="header"></div>
      <div className="application-main">
      <Button onClick={() => setFormNewDepartment(true)}>Add department</Button>
      <Button>Add employee</Button>
      <DepartmentList />
      <AvForm>
        <AvField name='test'>Test</AvField>
      </AvForm>
      </div>
      <div className="footer"></div>
      <NewEmployeeModalForm formNewDeptIsOpen={formNewDeptIsOpen} setFormNewDepartment={setFormNewDepartment} />
    </div>
  );
}

export default App;
