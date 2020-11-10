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
import ReportControls from './components/ReportControls';
import { Alert, Card, CardBody, CardHeader, Col, Modal, ModalFooter, ModalHeader, Row } from 'reactstrap';
import BarChart from './components/BarChart';
import Axios from 'axios';
import PieChartDepartmentSalaries from './components/PieChartDepartmentSalaries';
import EmployeeList from './components/EmployeeList';
import SuccessModal from './components/SuccessModal';

function App() {

  const [departmentList, setDepartmentList] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [formNewDeptIsOpen, setFormNewDepartment] = useState(false);
  const [formNewEmployeeIsOpen, setFormNewEmployee] = useState(false);
  const [updateDepartmentList, setUpdateDepartmentList] = useState(false);
  const [updateEmployeeList, setUpdateEmployeeList] = useState(false);
  const [reportType, setReportType] = useState('department');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState();

  const getDepartmentList = () => {
    let params = {
      filter: departmentFilter,
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
  
  const getEmployeeList = () => {
    let params = {
      filter: employeeFilter,
    };
    axios({
        url: 'https://hr.dotsforthings.com/api/get_employee_list.php',
        method: 'POST',
        data: params
      }).then((response) => {console.log(response.data);
        setEmployeeList(response.data.data);
      });
  };

  useEffect(() => {
    getDepartmentList();
    getEmployeeList();
  }, []);

  useEffect(() => {
    if(updateDepartmentList) {
      getDepartmentList();
      setUpdateDepartmentList(false);
    }
  }, [updateDepartmentList]);
  
  useEffect(() => {
    if(updateEmployeeList) {
      getEmployeeList();
      setUpdateEmployeeList(false);
    }
  }, [updateEmployeeList]);

  return (
    <div className="App">
      <div className="header">
        <div className='logo-col'>
          <a className='header-logo'><img src={process.env.PUBLIC_URL + '/assets/img/logo_chessable.svg'}></img></a>
          {/* <div className='divider small'></div>
          <div className='title-sm'><h1 className='title-text'>HR app</h1></div> */}
        </div>
        <div className='header-title'>
          <a className='header-logo-small'><img src={process.env.PUBLIC_URL + '/assets/img/logo_chessable.svg'}></img></a>
          <div className='divider small'></div>
          <h1 className='title-text'>HR app</h1>
        </div>
      </div>
      <div className="application-main">
        
        <div className='d-md-none d-block'>
        <Button className='add-new' onClick={() => setFormNewDepartment(true)}>Add department</Button>
        <Button className='add-new' onClick={() => setFormNewEmployee(true)}>Add employee</Button>
        </div>
        <Row>
          <Col className='col-md-7'>
            <ReportControls reportType={reportType} setReportType={setReportType} departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter} employeeFilter={employeeFilter} setEmployeeFilter={setEmployeeFilter} setUpdateDepartmentList={setUpdateDepartmentList} />            
            {reportType=='department'?
                <DepartmentList departmentList={departmentList} />
              :
                reportType=='employee'?
                  <EmployeeList employeeList={employeeList} />
                :
                  <></>
            }
          </Col>
          <Col className='col-md-5 side-content'>
            <div className='d-md-block d-none'>
            <Button className='add-new' onClick={() => setFormNewDepartment(true)}>Add department</Button>
            <Button className='add-new' onClick={() => setFormNewEmployee(true)}>Add employee</Button>
            </div>
            <Card className='chart-card'>
              <CardHeader><h6><b>Number of employees by salary range (entire company)</b></h6></CardHeader>
              <CardBody><BarChart /></CardBody>
            </Card>
            <Card className='chart-card'>
              <CardHeader><h6><b>Total salaries by department (entire company)</b></h6></CardHeader>
              <CardBody><PieChartDepartmentSalaries /></CardBody>              
            </Card>
            </Col>
        </Row>
      </div>
      <div className="footer"></div>
      <NewDepartmentModalForm formNewDeptIsOpen={formNewDeptIsOpen} setFormNewDepartment={setFormNewDepartment} setUpdateDepartmentList={setUpdateDepartmentList} setShowSuccessModal={setShowSuccessModal} setSuccessMessage={setSuccessMessage}/>
      <NewEmployeeModalForm departmentList={departmentList} formNewEmployeeIsOpen={formNewEmployeeIsOpen} setFormNewEmployee={setFormNewEmployee} setUpdateEmployeeList={setUpdateEmployeeList} setUpdateDepartmentList={setUpdateDepartmentList} setShowSuccessModal={setShowSuccessModal} setSuccessMessage={setSuccessMessage}/>
      <SuccessModal show={showSuccessModal} setShow={setShowSuccessModal} message={successMessage}/>
      {/* <Modal isOpen={showAlertNewEmployee} className='modal-alert-success'>
        <ModalHeader>Success creating new employee!</ModalHeader>
        <ModalFooter>
        <button type="button" class="btn btn-secondary" onClick={()=>{setShowAlertNewEmployee(false)}}>Close</button>
        </ModalFooter>
      </Modal> */}
    </div>
  );
}

export default App;
