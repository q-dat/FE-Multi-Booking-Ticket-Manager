import React, { useContext, useEffect, useState } from 'react';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import axios from '../../config/axiosConfig';
import { VehicleContext } from '../../context/vehicle/VehicleContext';
import { TripContext } from '../../context/trip/TripContext';
import { TicketContext } from '../../context/ticket/TicketContext';
import { Toastify } from '../../helper/Toastify';
import LineChartComponent from '../../components/admin/Chart/LineChartComponent';

interface Order {
  _id: string;
  amount: number;
  date: number;
}

interface DashboardCardProps {
  Icons: React.ReactNode;
  Value: string;
  Label: string;
  Percentage: string;
  isLoading: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  Icons,
  Value,
  Label,
  Percentage,
  isLoading
}) => {
  return (
    <div className="flex w-full flex-row items-center justify-center rounded-lg bg-white to-primary to-90% p-7 shadow-md md:space-x-4">
      <img width={`50px`} height={`auto`} src={`${Icons}`} alt="" />
      <div className="text-start">
        {isLoading ? (
          <div className="text-md font-semibold text-black">Đang tải...</div>
        ) : (
          <>
            <div className="text-xl font-semibold text-black">{Value}</div>
            <div className="text-xs text-gray-800">{Label}</div>
            <div className="text-[10px] text-gray-800">{Percentage}</div>
          </>
        )}
      </div>
    </div>
  );
};

const DashboardPage: React.FC<{}> = () => {

  const { vehicles } = useContext(VehicleContext);
  const { trips, getAllTrips } = useContext(TripContext);
  const { tickets, getAllTickets } = useContext(TicketContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderData, setOrderData] = useState<number[]>([]);
  const [revenueData, setRevenueData] = useState<number[]>([]);
  const [vehicleData, setVehicleData] = useState<number[]>([]);
  const [tripData, setTripData] = useState<number[]>([]);
  const [ticketData, setTicketData] = useState<number[]>([]);

  // Hàm lấy dữ liệu từ API
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
    const monthlyVehicles = new Array(12).fill(0);
    const monthlyTrips = new Array(12).fill(0);
    const monthlyTickets = new Array(12).fill(0);

    orders.forEach((order) => {
      const month = new Date(order.date).getMonth();
      monthlyOrders[month] += 1;
      monthlyRevenue[month] += order.amount * 1000;
    });

    vehicles.forEach((vehicle) => {
      const month = new Date(vehicle.createAt).getMonth();
      monthlyVehicles[month] += 1;
    });

    trips.forEach((trip) => {
      const month = new Date(trip.departure_date).getMonth();
      monthlyTrips[month] += 1;
    });

    tickets.forEach((ticket) => {
      const month = new Date(ticket.createAt!).getMonth();
      monthlyTickets[month] += 1;
    });

    setOrderData(monthlyOrders);
    setRevenueData(monthlyRevenue);
    setVehicleData(monthlyVehicles);
    setTripData(monthlyTrips);
    setTicketData(monthlyTickets);
  };

  useEffect(() => {
    fetchAllOrders();
    getAllTrips();
    getAllTickets();
  }, [getAllTrips, getAllTickets]);

  useEffect(() => {
    if (orders.length > 0 || vehicles.length > 0 || trips.length > 0 || tickets.length > 0) {
      calculateStatistics();
    }
  }, [orders, vehicles, trips, tickets]);

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Dashboard" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin Title_NavtitleAdmin={'Dashboard'} Btn_Create={``} />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/3762/3762066.png"
            Percentage="25% (30 days)"
            Value={tripData.reduce((a, b) => a + b, 0).toString()}
            Label={'Số lượng chuyến đi'}
            isLoading={false}
          />
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/2942/2942934.png"
            Percentage="25% (30 days)"
            Value={ticketData.reduce((a, b) => a + b, 0).toString()}
            Label={'Số lượng vé'}
            isLoading={false}
          />
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/3753/3753033.png"
            Percentage="25% (30 days)"
            Value={orderData.reduce((a, b) => a + b, 0).toString()}
            Label={'Số lượng đơn hàng'}
            isLoading={false}
          />
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/713/713309.png"
            Percentage="25% (30 days)"
            Value={vehicleData.reduce((a, b) => a + b, 0).toString()}
            Label={'Số lượng phương tiện'}
            isLoading={false}
          />
          <DashboardCard
            Icons="https://cdn-icons-png.flaticon.com/128/4256/4256900.png"
            Percentage="25% (30 days)"
            Value={revenueData.reduce((a, b) => a + b, 0).toString()}
            Label={'Số lượng doanh thu'}
            isLoading={false}
          />
        </div>

        <div className="flex flex-col py-6">
          <LineChartComponent orderData={orderData} revenueData={revenueData} vehicleData={vehicleData} tripData={tripData} ticketData={ticketData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
