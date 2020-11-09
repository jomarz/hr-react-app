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
          labels: histogramData.categories,//['A', 'B', 'C', 'D'],
          datasets: [{
            label: 'Number of employees within salary range',
            data: histogramData.values,//[10, 20, 30, 40],
            backgroundColor: '#112233'
          }]
        }
      });}
  }, [histogramData]);

  return (
    <canvas ref={chartRef} />
  );

};

export default BarChart;

/* class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
          type: 'bar',
          data: {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [{
              label: 'My data',
              data: [10, 20, 30, 40],
              backgroundColor: '#112233'
            }]
          }
        });
    }
    
    render() {
        return (
        <canvas ref={this.chartRef} />
        );
    }
} 

export default BarChart;*/
