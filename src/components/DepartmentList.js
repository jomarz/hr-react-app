import React, { useEffect } from 'react';
import {Button, Card} from 'react-bootstrap';
import { CardBody, Col, Row } from 'reactstrap';

const DepartmentList = ({departmentList}) => {

    useEffect(()=> console.log(departmentList),[])

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
                    <Col className='col-md-4'>Department</Col>
                    <Col className='col-md-2 pr-0 number-cell'>Highest salary</Col>
                    <Col className='col-md-3 number-cell'>Number of employees</Col>
                    <Col className='col-md-3 number-cell'>Total salaries</Col>
                </Row>
            </CardBody>
        </Card>
        {departmentList?
            departmentList.map(item => { return (
                <Card>
                    <CardBody>
                        <Row>
                            <Col className='col-md-4'>
                                <h6>{item.department_name}</h6>
                            </Col>
                            <Col className='col-md-2 pr-0 number-cell'>
                                {item.highest_paid_employee != false?
                                    <p>
                                        {/* <span className='info-icon'>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                        </svg>
                                        </span> */}
                                        &nbsp;{/* {parseFloat(item.highest_paid_employee.employee_salary).toLocaleString('es')} */}
                                        {formatNumber(item.highest_paid_employee.employee_salary)}
                                    </p>
                                :
                                    <p>0</p>
                                }                                
                            </Col>
                            <Col className='col-md-3 number-cell'>
                                <p>{item.num_employees}</p>
                            </Col>
                            <Col className='col-md-3 number-cell'>
                                {item.total_salary != false?
                                    <p>{formatNumber(item.total_salary)}</p>
                                    :
                                    <p>0</p>
                                }
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
