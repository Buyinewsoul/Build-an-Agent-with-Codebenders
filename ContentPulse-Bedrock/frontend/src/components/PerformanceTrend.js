import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/PerformanceTrend.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PerformanceTrend({ data }) {
  const chartData = {
    labels: data.dailyTrend.map((d) => d.date),
    datasets: [
      {
        label: 'Views',
        data: data.dailyTrend.map((d) => d.views),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Engagement (%)',
        data: data.dailyTrend.map((d) => d.engagement),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Conversions',
        data: data.dailyTrend.map((d) => d.conversions),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance Trend (Last 14 Days)',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="performance-trend">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default PerformanceTrend;
