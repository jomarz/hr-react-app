import React, { useEffect, useState } from 'react';

const ReportControls = ({reportType, setReportType, departmentFilter, setDepartmentFilter, employeeFilter, setEmployeeFilter, setUpdateDepartmentList}) => {

    const handleDepartmentFilterChange = (e) => {
        setDepartmentFilter(e.target.value); console.log(e.target.value);
        setUpdateDepartmentList(true);
    };

    return (
        <div>
          <label>
            <span>Display </span>
            <select value={departmentFilter} onChange={handleDepartmentFilterChange}>
              <option value='all'>All departments</option>
              <option value='filter_2_above_50'>Only departments that have more than two employees that earn over 50k</option>
            </select>
          </label>
        </div>
    );
}

export default ReportControls;