// LineChartComponent.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartComponentProps {
  orderData: number[];
  revenueData: number[];
  vehicleData: number[]; // Thêm thuộc tính này
  tripData: number[]; // Thêm thuộc tính này
  ticketData: number[]; // Thêm thuộc tính này
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ orderData, revenueData, vehicleData, tripData, ticketData }) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Total Orders',
        data: orderData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
      {
        label: 'Revenue (VNĐ)',
        data: revenueData,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
      },
      {
        label: 'Total Vehicles',
        data: vehicleData,
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
      },
      {
        label: 'Total Trips',
        data: tripData,
        borderColor: 'rgba(255,206,86,1)',
        backgroundColor: 'rgba(255,206,86,0.2)',
      },
      {
        label: 'Total Tickets', // Dataset cho vé
        data: ticketData,
        borderColor: 'rgba(153,102,255,1)', // Màu sắc cho dataset vé
        backgroundColor: 'rgba(153,102,255,0.2)', // Màu nền cho dataset vé
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Order, Revenue, and Vehicle Statistics',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartComponent;
