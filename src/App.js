import logo from './logo.svg';
import './App.css';

import DepartmentList from './components/DepartmentList'

import axios from 'axios';
import { useEffect } from 'react';

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
      <header className="App-header">
        <DepartmentList />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          HR
        </a>
      </header>
    </div>
  );
}

export default App;
