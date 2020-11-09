import React, { useEffect } from 'react';
import {Button, Card} from 'react-bootstrap';
import { CardBody, Col, Row } from 'reactstrap';

const DepartmentList = ({departmentList}) => {

    useEffect(()=> console.log(departmentList),[])

    return (
        <div className='report-list'>
        <Card className='report-header d-sm-none d-md-block'>
            <CardBody>
                <Row>
                    <Col className='md-4'>Department</Col>
                    <Col className='md-2 number-cell'>Highest salary</Col>
                    <Col className='md-2 number-cell'>Number of employees</Col>
                    <Col className='md-2 number-cell'>Total salaries</Col>
                </Row>
            </CardBody>
        </Card>
        {departmentList?
            departmentList.map(item => { return (
                <Card>
                    <CardBody>
                        <Row>
                            <Col className='md-4'>
                                <h6>{item.department_name}</h6>
                            </Col>
                            <Col className='md-2 number-cell'>
                                {item.highest_paid_employee != false?
                                    <p>{parseFloat(item.highest_paid_employee.employee_salary).toLocaleString('es')}</p>
                                :
                                    <p>0</p>
                                }                                
                            </Col>
                            <Col className='md-3 number-cell'>
                                <p>{item.num_employees}</p>
                            </Col>
                            <Col className='md-3 number-cell'>
                                <p>{item.num_employees}</p>
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

export default DepartmentList;
