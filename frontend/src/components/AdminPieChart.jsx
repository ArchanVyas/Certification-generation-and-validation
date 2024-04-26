import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const AdminPieChart = () => {
    const [chartData, setChartData] = useState(null);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/course/getCourseDetails/percentage`, {
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
                    series: values,
                    options: {
                        labels: labels,
                        chart: {
                            width: 380,
                            type: 'pie',
                        },
                        responsive: [{
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        }],
                    },
                };
                setChartData(chartData);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='z-[-1000] w-[200px]'>
            {chartData && (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="pie"
                    width={500}
                />
            )}
        </div>
    );
}

export default AdminPieChart;
