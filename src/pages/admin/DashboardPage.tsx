import React, { useEffect, useState } from 'react';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import axios from '../../config/axiosConfig';
import { Toastify } from '../../helper/Toastify';
import CountUp from 'react-countup';
import LineChartComponent from '../../components/admin/Chart/LineChartComponent';

interface Order {
  _id: string;
  amount: number;
  date: number; 
  items: {
    name: string;
    vehicleCatalog: string;
    price: number;
    seat: string;
    departureDate: string;
    destinationDate: string;
  }[];
}

interface DashboardCardProps {
  Icons: React.ReactNode;
  Value: number;
  Label: string;
  Percentage: string;
  isLoading: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  Icons,
  Value,
  Label,
  Percentage,
  isLoading,
}) => {
  return (
    <div className="flex w-full flex-row items-center justify-center rounded-lg bg-white p-7 shadow-md">
      <img width="50px" height="auto" src={`${Icons}`} alt="" />
      <div className="text-start ml-4">
        {isLoading ? (
          <div className="text-md font-semibold text-black">Đang tải...</div>
        ) : (
          <>
            <div className="text-xl font-semibold text-black">
              <CountUp end={Value} duration={2} />
            </div>
            <div className="text-xs text-gray-800">{Label}</div>
            <div className="text-[10px] text-gray-800">{Percentage}</div>
          </>
        )}
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderData, setOrderData] = useState<number[]>(new Array(12).fill(0));
  const [revenueData, setRevenueData] = useState<number[]>(new Array(12).fill(0));
  const [vehicleOrders, setVehicleOrders] = useState<Record<string, number[]>>({});
  const [vehicleRevenue, setVehicleRevenue] = useState<Record<string, number[]>>({});

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post('/api/order/list', {});
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        Toastify(response.data.message, 500);
      }
    } catch (error) {
      console.error(error);
      Toastify('Failed to fetch orders', 500);
    }
  };

  const calculateStatistics = () => {
    const monthlyOrders = new Array(12).fill(0);
    const monthlyRevenue = new Array(12).fill(0);
    const tempVehicleOrders: Record<string, number[]> = {};
    const tempVehicleRevenue: Record<string, number[]> = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.date);
      const month = orderDate.getMonth();

      monthlyOrders[month] += 1;
      monthlyRevenue[month] += order.amount * 1000;

      order.items.forEach((item) => {
        const vehicleType = item.vehicleCatalog;

        if (!tempVehicleOrders[vehicleType]) {
          tempVehicleOrders[vehicleType] = new Array(12).fill(0);
        }
        if (!tempVehicleRevenue[vehicleType]) {
          tempVehicleRevenue[vehicleType] = new Array(12).fill(0);
        }

        tempVehicleOrders[vehicleType][month] += 1;
        tempVehicleRevenue[vehicleType][month] += item.price * 1000;
      });
    });

    setOrderData(monthlyOrders);
    setRevenueData(monthlyRevenue);
    setVehicleOrders(tempVehicleOrders);
    setVehicleRevenue(tempVehicleRevenue);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      calculateStatistics();
    }
  }, [orders]);

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Dashboard" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin Title_NavtitleAdmin={'Dashboard'} Btn_Create={``} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/3753/3753033.png"
            Percentage=""
            Value={orderData.reduce((a, b) => a + b, 0)}
            Label={'Tổng đơn hàng'}
            isLoading={false}
          />
          {Object.keys(vehicleOrders).map((vehicleCatalog) => (
            <DashboardCard
              key={vehicleCatalog}
              Icons="https://cdn-icons-png.flaticon.com/128/3753/3753033.png"
              Percentage=""
              Value={vehicleOrders[vehicleCatalog].reduce((a, b) => a + b, 0)}
              Label={`Đơn hàng - ${vehicleCatalog}`}
              isLoading={false}
            />
          ))}
          {Object.keys(vehicleRevenue).map((vehicleCatalog) => (
            <DashboardCard
              key={vehicleCatalog}
              Icons="https://cdn-icons-png.flaticon.com/128/4256/4256900.png"
              Percentage=""
              Value={vehicleRevenue[vehicleCatalog].reduce((a, b) => a + b, 0)}
              Label={`Doanh thu - ${vehicleCatalog} (VNĐ)`}
              isLoading={false}
            />
          ))}
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/4256/4256900.png"
            Percentage=""
            Value={revenueData.reduce((a, b) => a + b, 0)}
            Label={'Tổng doanh thu (VNĐ)'}
            isLoading={false}
          />
        </div>

        <div className="flex flex-col py-6">
          <LineChartComponent
            orderData={orderData}
            revenueData={revenueData}
            vehicleOrders={vehicleOrders}
            vehicleRevenue={vehicleRevenue}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
