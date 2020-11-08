import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Modal } from "reactstrap";

const ReportControls = ({reportType, setReportType, departmentFilter, setDepartmentFilter, employeeFilter, setEmployeeFilter, setUpdateDepartmentList}) => {

    const handleDepartmentFilterChange = (e) => {
        setDepartmentFilter(e.target.value);
    };

    return (
        <div>
          <label>
            <span>Display </span>
            <select value={departmentFilter} onChange={handleDepartmentFilterChange}>
              <option vale='all'>All departments</option>
              <option value='filter_2_above_50'>Only departments that have more than two employees that earn over 50k</option>
            </select>
          </label>
        </div>
    );
}

export default ReportControls;