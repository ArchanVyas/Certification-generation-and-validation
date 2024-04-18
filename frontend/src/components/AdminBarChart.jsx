import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const AdminBarChart = () => {
  const [chartData, setChartData] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:7000/course/getCourseDetails/number', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.data;
      console.log(res);
      if (res.status === 'Success') {
        const data = res.data;
        const labels = Object.keys(data);
        const values = Object.values(data);

        const chartData = {
          series: [{
            name: 'Count',
            data: values
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: labels,
              title: {
                text: 'Category'
              }
            },
            yaxis: {
              title: {
                text: 'Count'
              }
            },           
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val;
                }
              }
            }
          }
        };
        setChartData(chartData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();   
  }, []);

  return (
    <div className='w-[64] z-[-1000]'>
      {chartData && (
        <div>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
            width={500}
          />
        </div>
      )}
    </div>
  );
};

export default AdminBarChart;