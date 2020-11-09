import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import Axios from 'axios';

const BarChart = () => {

  const[histogramData, setHistogramData] = useState();

  const chartRef = useRef();


  const getSalaryHistogram = () => {
    let params = {
      department_id: ''
    };
    Axios({
      url: 'https://hr.dotsforthings.com/api/get_salary_histogram.php',
      method: 'POST'
    }).then((response) => {
      console.log(response);
      setHistogramData(response.data.data);
    });
  };

  useEffect(() => {
    getSalaryHistogram();
  },[])

  useEffect(() => {
    if(histogramData) {
      let myChart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: histogramData.categories,
          datasets: [{
            //label: 'Number of employees by salary range',
            data: histogramData.values,
            backgroundColor: '#034FDF'
          }]
        },
        options: {
          legend: {
              display: false
          },
          tooltips: {
              callbacks: {
                 label: function(tooltipItem) {
                        return tooltipItem.yLabel;
                 }
              }
          }
        }
      });}
  }, [histogramData]);

  return (
    <canvas ref={chartRef} />
  );

};

export default BarChart;
