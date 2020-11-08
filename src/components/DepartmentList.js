import React, { useEffect } from 'react';
import {Button, Card} from 'react-bootstrap';
import { CardBody, Col, Row } from 'reactstrap';

const DepartmentList = ({departmentList}) => {

    useEffect(()=> console.log(departmentList),[])

    return (
        <>
        <Card className='report-header d-sm-none d-md-block'>
            <CardBody>
                <Row>
                    <Col className='md-3'>Department</Col>
                    <Col className='md-3'>Highest salary</Col>
                    <Col className='md-3'>Number of employees</Col>
                </Row>
            </CardBody>
        </Card>
        {departmentList?
            departmentList.map(item => { return (
                <Card>
                    <CardBody>
                        <Row>
                            <Col className='md-3'>
                                <h6>{item.department_name}</h6>
                            </Col>
                            <Col className='md-3'>
                                {item.highest_paid_employee != false?
                                    <text>{item.highest_paid_employee.employee_salary}</text>
                                :
                                    <text>0.00</text>
                                }                                
                            </Col>
                            <Col className='md-3'>
                                <p>{item.num_employees}</p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            ); })
        :
            <></>
        }
        </>
        /* departmentList?
        departmentList.map(item => {
            return (
                <>
                    <Card>
                        <Card.Body><h2>List from component</h2></Card.Body>
                    </Card>
                    <Button>Hola</Button>
                </>
            );
        });
        :
        <></> */
    );
};

export default DepartmentList;
