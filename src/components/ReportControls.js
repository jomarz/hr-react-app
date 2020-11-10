import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

const ReportControls = ({reportType, setReportType, departmentFilter, setDepartmentFilter, employeeFilter, setEmployeeFilter, setUpdateDepartmentList}) => {

    const handleReportTypeChange = (e) => {
      setReportType(e.target.value);
    };

    const handleDepartmentFilterChange = (e) => {
        setDepartmentFilter(e.target.value); console.log(e.target.value);
        setUpdateDepartmentList(true);
    };

    return (
        <div>
          <Row>
            <Col className='col-4 col-md-2'>
              <h5 className='reportTitle'>Report: </h5>
            </Col>
            <Col>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="reportType" id="departmentRadio" value="department" checked={reportType=='department'} onChange={handleReportTypeChange}/>
                <label class="form-check-label" for="departmentRadio">Departments</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="reportType" id="employeeRadio" value="employee" checked={reportType=='employee'} onChange={handleReportTypeChange}/>
                <label class="form-check-label" for="employeeRadio">Employees</label>
              </div>
            </Col>
          </Row>
          {reportType=='department'?
          <label>
            <select className='form-control' value={departmentFilter} onChange={handleDepartmentFilterChange}>
              <option value='all'>All departments</option>
              <option value='filter_2_above_50'>Only departments that have more than two employees that earn over 50K</option>
            </select>
          </label>
          :
          <></>
          }
        </div>
    );
}

export default ReportControls;