import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/cart/CartContext';
import { Button } from 'react-daisyui';
import axios from 'axios';
import stripeLogo from '../../assets/image-represent/payment/stripe_logo.png';
import { Toastify } from '../../helper/Toastify';
import { isIErrorResponse } from '../../types/error/error';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string | number;
}

const CheckoutPage: React.FC = () => {
  const { selectedSeats, removeSeat, clearSeats } = useCart();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });
  const [method, setMethod] = useState<'stripe' | 'cod'>('cod');

  const [selectedDiscounts, setSelectedDiscounts] = useState<{ [key: string]: string }>({});

  const handleDiscountChange = (ticketId: string, value: string) => {
    setSelectedDiscounts((prev) => ({
      ...prev,
      [ticketId]: value,
    }));
  };

  const calculateDiscountedPrice = (price: number, discountType: string): number => {
    if (discountType === 'Trẻ em') {
      return price * 0.8;
    }
    return price;
  };

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((total, ticket) => {
      const selectedDiscount = selectedDiscounts[ticket._id] || 'Người lớn';
      const discountedPrice = calculateDiscountedPrice(ticket.price, selectedDiscount);
      return total + discountedPrice;
    }, 0);
  }, [selectedSeats, selectedDiscounts]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderItems = selectedSeats.map((seat) => {
        const selectedDiscount = selectedDiscounts[seat._id] || 'Người lớn';
        const discountedPrice = calculateDiscountedPrice(seat.price, selectedDiscount);
        return {
          departureDate: seat.trip_id.departure_date,
          time: seat.trip_id.departure_time,
          departurePoint: seat.trip_id.departure_point.name,
          destinationPoint: seat.trip_id.destination_point.name,
          seat: seat.seat_id.name,
          vehicle: seat.seat_id.seat_catalog_id.vehicle_id.name,
          seatCatalog: seat.seat_id.seat_catalog_id.name,
          price: discountedPrice,
          quantity: 1,
        };
      });

      const orderData = {
        items: orderItems,
        amount: totalPrice,
        address: formData,
        paymentMethod: method === 'cod' ? 'COD' : 'Stripe',
      };

      if (method === 'cod') {
        const response = await axios.post('http://localhost:6001/api/order/place', orderData);
        if (response.data) {
          Toastify('Bạn đã đặt vé thành công', 201);
          // clearSeats();
        } else {
          console.error(response.data.message);
        }
      } else if (method === 'stripe') {
        const response = await axios.post('http://localhost:6001/api/order/stripe', orderData);
        if (response.data) {
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          console.error(response.data.message);
        }
      } else {
        Toastify('Vui lòng chọn phương thức thanh toán hợp lệ', 500);
      }
    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Đặt hàng thất bại!';
      Toastify(`Lỗi: ${errorMessage}`, 500);
    }
  };

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="grid grid-cols-6 bg-red-200 p-4">
          <p className="col-span-1">Đối tượng</p>
          <p className="col-span-1">Thông tin chỗ</p>
          <p className="col-span-1">Giá vé</p>
          <p className="col-span-1">Giảm đối tượng</p>
          <p className="col-span-1">Thành tiền (VND)</p>
          <p className="col-span-1">Thao tác</p>
        </div>

        {/* Ticket Rows */}
        {selectedSeats.map((ticket, index) => {
          const selectedDiscount = selectedDiscounts[ticket._id] || 'Người lớn';
          const discountedPrice = calculateDiscountedPrice(ticket.price, selectedDiscount);

          return (
            <div key={index} className="grid grid-cols-6 border-b p-4 items-center">
              <div className="col-span-1">
                <select
                  value={selectedDiscount}
                  onChange={(e) => handleDiscountChange(ticket._id, e.target.value)}
                >
                  <option value="Trẻ em">Trẻ em</option>
                  <option value="Người lớn">Người lớn</option>
                </select>
              </div>
              <p className="col-span-1">
                {ticket.trip_id.departure_point.name}
                <span>-</span>
                {ticket.trip_id.destination_point.name}
              </p>
              <p className="col-span-1">{(ticket.price * 1000).toLocaleString('vi-VN')} &nbsp;VND</p>
              <p className="col-span-1">
                {selectedDiscount === 'Trẻ em' ? 'Giảm 20%' : '0'}
              </p>
              <p className="col-span-1">{(discountedPrice * 1000).toLocaleString('vi-VN')} &nbsp;VND</p>
              <div className="flex flex-row items-center">
                <p
                  onClick={() => {
                    const seatId = ticket.seat_id._id;
                    if (seatId) {
                      removeSeat(ticket._id, seatId);
                    }
                  }}
                  className="cursor-pointer text-2xl text-red-500"
                >
                  <IoIosCloseCircleOutline />
                </p>
              </div>
            </div>
          );
        })}

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-4">
          <Button size="sm" onClick={clearSeats} className="bg-red-500 text-xs text-white">
            Xóa tất cả
          </Button>
          <div className="font-bold">
            Tổng tiền: {(totalPrice * 1000).toLocaleString('vi-VN')} &nbsp;VND
          </div>
        </div>

        {/* Form thanh toán */}
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
          {/* Left Side */}
          <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
            <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
              <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
            </div>
            <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email' />
            <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
            <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
              <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
            </div>
            <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Zipcode' />
              <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
            </div>
            <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='tel' placeholder='Phone number' />
          </div>

          {/* Right Side */}
          <div className='mt-12'>
            {/* Payment Method Selection */}
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                <img className='h-5 mx-4' src={stripeLogo} alt='' />
              </div>
              <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>

            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>

          </div>
        </form>
        <div className='flex justify-center mt-6'>
          <Button type='submit' form='checkout-form' className='bg-red-500 text-white'>
            Đặt vé
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
