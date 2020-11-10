import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import Axios from 'axios';

const PieChartDepartmentSalaries = () => {

  const[chartData, setChartData] = useState();

  const chartRef = useRef();

  function formatNumber(num) {
    num = parseFloat(num);
    num = Math.floor(num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

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
            data: chartData.values.map(value => {return(formatNumber(value));}),
            backgroundColor: [
                '#ff6384',
                '#ff9f40',
                '#4bc0c0',
                '#ffcd56',
                '#9966ff',
                '#c9cbcf',
                '#535353',
                '#ff6384',
                '#ff9f40',
                '#4bc0c0',
                '#ffcd56',
                '#9966ff',
                '#c9cbcf',
                '#535353',
            ]
          }]
        }
      });}
  }, [chartData]);

  return (
    <canvas ref={chartRef} />
  );

};

export default PieChartDepartmentSalaries;
