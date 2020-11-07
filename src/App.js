import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

import DepartmentList from './components/DepartmentList'

import axios from 'axios';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

function App() {
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
    getFileList();
  }, );

  return (
    <div className="App">
      <Button>Add department</Button>
      <Button>Add employee</Button>
      <DepartmentList />
    </div>
  );
}

export default App;
