import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import Axios from 'axios';

const PieChartDepartmentSalaries = () => {

  const[chartData, setChartData] = useState();

  const chartRef = useRef();

  const getChartData = () => {
    let params = {
      department_id: ''
    };
    Axios({
      url: 'https://hr.dotsforthings.com/api/get_total_salary_by_department.php',
      method: 'POST'
    }).then((response) => {
      console.log(response);
      setChartData(response.data.data);
    });
  };

  useEffect(() => {
    getChartData();
  },[])

  useEffect(() => {
    if(chartData) {
      let myChart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: chartData.categories,
          datasets: [{
            label: 'Number of employees within salary range',
            data: chartData.values,
            backgroundColor: '#112233'
          }]
        }
      });}
  }, [chartData]);

  return (
    <canvas ref={chartRef} />
  );

};

export default PieChartDepartmentSalaries;
