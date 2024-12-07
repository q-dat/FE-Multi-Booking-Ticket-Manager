// LineChartComponent.tsx
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
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartComponentProps {
  orderData: number[];
  revenueData: number[];
  vehicleData: number[];
  tripData: number[];
  ticketData: number[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  orderData,
  revenueData,
  vehicleData,
  tripData,
  ticketData
}) => {
  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'Đơn hàng',
        data: orderData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)'
      },
      {
        label: 'Doanh thu (VNĐ)',
        data: revenueData,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)'
      },
      {
        label: 'Phương tiện',
        data: vehicleData,
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)'
      },
      {
        label: 'Chuyến di',
        data: tripData,
        borderColor: 'rgba(255,206,86,1)',
        backgroundColor: 'rgba(255,206,86,0.2)'
      },
      {
        label: 'Vé',
        data: ticketData,
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Thống kê trong năm'
      }
    }
  };

  return (
    <div className="mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%]">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
