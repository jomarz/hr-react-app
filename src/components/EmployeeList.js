import React, { useEffect } from 'react';
import { Card} from 'react-bootstrap';
import { CardBody, Col, Row } from 'reactstrap';

const EmployeeList = ({employeeList}) => {

    useEffect(()=> console.log(employeeList),[])

    function formatNumber(num) {
        num = parseFloat(num);
        num = Math.floor(num);
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      }

    return (
        <div className='report-list'>
        <Card className='report-header'>
            <CardBody>
                <Row>
                    <Col className='col-md-5'>Name</Col>
                    <Col className='col-md-4'>Department</Col>
                    <Col className='col-md-3 number-cell'>Salary</Col>
                </Row>
            </CardBody>
        </Card>
        {employeeList?
            employeeList.map(item => { return (
                <Card>
                    <CardBody>
                        <Row>
                            <Col className='col-md-5'>
                                <h6>{item.employee_name}</h6>
                            </Col>
                            <Col className='col-md-4'>
                                <p>{item.department_name}</p>
                            </Col>
                            <Col className='col-md-3 number-cell'>
                                {/* <p>{parseFloat(item.employee_salary).toLocaleString('es')}</p> */}
                                <p>{formatNumber(item.employee_salary)}</p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            ); })
        :
            <></>
        }
        </div>
    );
};

export default EmployeeList;
