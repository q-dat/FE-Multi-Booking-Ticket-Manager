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
  vehicleOrders: Record<string, number[]>;
  vehicleRevenue: Record<string, number[]>;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  orderData,
  revenueData,
  vehicleOrders,
  vehicleRevenue,
}) => {
  const data = {
    labels: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    datasets: [
      {
        label: 'Tổng doanh thu (VNĐ)',
        data: revenueData,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
      },
      {
        label: 'Tổng đơn hàng',
        data: orderData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
      ...Object.keys(vehicleOrders).map((vehicleCatalog) => ({
        label: `Đơn hàng - ${vehicleCatalog}`,
        data: vehicleOrders[vehicleCatalog],
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
      })),
      ...Object.keys(vehicleRevenue).map((vehicleCatalog) => ({
        label: `Doanh thu - ${vehicleCatalog} (VNĐ)`,
        data: vehicleRevenue[vehicleCatalog],
        borderColor: 'rgba(255,159,64,1)',
        backgroundColor: 'rgba(255,159,64,0.2)',
      })),
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
        text: 'Thống kê doanh thu và đơn hàng theo tháng',
      },
    },
  };

  return (
    <div className="mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%]">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
