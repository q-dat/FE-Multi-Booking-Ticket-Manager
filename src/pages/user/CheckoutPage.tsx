import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../../context/cart/CartContext';
import { Button } from 'react-daisyui';
import { Toastify } from '../../helper/Toastify';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import axios from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { ITicket } from '../../types/type/ticket/ticket';
import { updateSeatApi } from '../../axios/api/seatApi';
import { isIErrorResponse } from '../../types/error/error';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { LogoStripe } from '../../assets/image-represent';
import { useTranslation } from 'react-i18next';

interface FormData {
  fullName: string;
  email: string;
  street: string;
  city: string;
  cccd: string;
  country: string;
  phone: string;
}

const CheckoutPage: React.FC = () => {

  const { t } = useTranslation();

  const { selectedSeats, removeSeat, clearSeats } = useCart();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    street: '',
    city: '',
    cccd: '',
    country: '',
    phone: '',
  });
  const [method, setMethod] = useState<'stripe' | 'cod'>('cod');
  const navigate = useNavigate();
  const [selectedDiscounts, setSelectedDiscounts] = useState<{ [key: string]: string }>({});
  const [userDetails, setUserDetails] = useState<{ [key: string]: { name: string; cccd: string, phone: string } }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInput = (name: string, value: string) => {
    let error = '';
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Email không hợp lệ';
      }
    } else if (name === 'phone') {
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(value)) {
        error = 'Số điện thoại phải có 10-11 chữ số';
      }
    } else if (name === 'cccd') {
      const cccdRegex = /^[0-9]{12}$/;
      if (!cccdRegex.test(value)) {
        error = 'CCCD phải có 12 chữ số';
      }
    }
    return error;
  };

  useEffect(() => {
    if (selectedSeats.length === 0) {
      const userPath = localStorage.getItem('userPath') || '/';
      navigate(userPath);
    }
  }, [selectedSeats, navigate]);

  const handleDiscountChange = (ticketId: string, value: string) => {
    setSelectedDiscounts((prev) => ({
      ...prev,
      [ticketId]: value,
    }));
  };

  const handleInputChange = (ticketId: string, field: string, value: string) => {
    setUserDetails((prev) => ({
      ...prev,
      [ticketId]: {
        ...prev[ticketId],
        [field]: value,
      },
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const updateSeatStatusApi = async (seats: ITicket[]) => {
    const promises = seats.map(async (seat) => {
      const updatedSeat = { ...seat.seat_id[0], status: 'Hết chỗ' };
      await updateSeatApi(seat.seat_id[0]?._id, updatedSeat);

      const storedTickets = sessionStorage.getItem('searchResults');
      if (storedTickets) {
        const parsedTickets = JSON.parse(storedTickets) as ITicket[];
        const updatedTickets = parsedTickets.map(t =>
          t._id === seat._id
            ? { ...t, seat_id: [{ ...t.seat_id[0], status: 'Hết chỗ' }] }
            : t
        );
        sessionStorage.setItem('searchResults', JSON.stringify(updatedTickets));
      }

      Toastify(`Ghế ${seat.seat_id[0]?.name} đã được cập nhật trạng thái!`, 200);
    });

    await Promise.all(promises);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      const error = validateInput(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Toastify('Vui lòng sửa lỗi trước khi gửi.', 500);
      return;
    }

    try {
      const orderItems = selectedSeats.map((seat) => {
        const ticketDetails = userDetails[seat._id] || { name: '', cccd: '', phone: '' };
        const selectedDiscount = selectedDiscounts[seat._id] || 'Người lớn';
        const discountedPrice = calculateDiscountedPrice(seat.price, selectedDiscount);
        return {
          name: ticketDetails.name,
          cccd: ticketDetails.cccd,
          phone: ticketDetails.phone,
          departureDate: seat.trip_id.departure_date,
          destinationDate: seat.trip_id.return_date,
          ticketCatalog: seat.ticket_catalog_id.name,
          departureTime: seat.trip_id.departure_time,
          returnTime: seat.trip_id.return_time,
          departurePoint: seat.trip_id.departure_point.name,
          destinationPoint: seat.trip_id.destination_point.name,
          seat: seat.seat_id[0]?.name,
          vehicle: seat.seat_id[0]?.seat_catalog_id.vehicle_id.name,
          seatCatalog: seat.seat_id[0]?.seat_catalog_id.name,
          price: discountedPrice,
          quantity: 1,
          discount: selectedDiscount,
        };
      });

      const orderData = {
        items: orderItems,
        amount: totalPrice,
        address: formData,
        paymentMethod: method === 'cod' ? 'COD' : 'Stripe',
      };

      if (method === 'cod') {
        const response = await axios.post('/api/order/place', orderData);
        if (response.data.success) {
          await updateSeatStatusApi(selectedSeats);
          Toastify('Bạn đã đặt vé thành công', 201);
          clearSeats();
        }
      } else if (method === 'stripe') {
        const responseStripe = await axios.post('/api/order/stripe', orderData);
        if (responseStripe.data.success) {
          const { session_url } = responseStripe.data;
          await updateSeatStatusApi(selectedSeats);
          clearSeats();
          window.location.replace(session_url);
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
      <HeaderResponsive Title_NavbarMobile="Thanh Toán" />
      <div className="w-full mx-auto px-4 sm:px-8 md:px-24 py-2">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-6 bg-red-200 p-4">
          <p className="col-span-1 font-semibold text-center">{t('UserPage.CheckoutPage.ip1')}</p>
          <p className="col-span-1 font-semibold text-center">{t('UserPage.CheckoutPage.ip2')}</p>
          <p className="col-span-1 font-semibold text-center">{t('UserPage.CheckoutPage.ip3')}</p>
          <p className="col-span-1 font-semibold text-center">{t('UserPage.CheckoutPage.ip4')}</p>
          <p className="col-span-1 font-semibold text-center">{t('UserPage.CheckoutPage.ip5')}</p>
          <p className="col-span-1 font-semibold text-center">{t('UserPage.CheckoutPage.ip6')}</p>
        </div>

        {/* Ticket Rows */}
        {selectedSeats.map((ticket, index) => {
          const ticketDetails = userDetails[ticket._id] || { name: '', cccd: '', phone: '' };
          const selectedDiscount = selectedDiscounts[ticket._id] || 'Người lớn';
          const discountedPrice = calculateDiscountedPrice(ticket.price, selectedDiscount);

          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-6 border-b p-4 items-center gap-y-2 sm:gap-y-0"
            >
              {/* Đối tượng */}
              <div className="col-span-1 flex flex-col gap-2 sm:gap-4 justify-center items-center">
                <input
                  type="text"
                  name="name"
                  value={ticketDetails.name}
                  placeholder={t('UserPage.CheckoutPage.ip7')}
                  onChange={(e) => handleInputChange(ticket._id, 'name', e.target.value)}
                  className="border rounded px-3 py-2 w-full sm:w-2/3"
                />
                <input
                  type="text"
                  name="phone"
                  value={ticketDetails.phone}
                  placeholder={t('UserPage.CheckoutPage.ip8')}
                  onChange={(e) => handleInputChange(ticket._id, 'phone', e.target.value)}
                  className="border rounded px-3 py-2 w-full sm:w-2/3"
                />
                <input
                  type="text"
                  name="cccd"
                  value={ticketDetails.cccd}
                  placeholder={t('UserPage.CheckoutPage.ip9')}
                  onChange={(e) => handleInputChange(ticket._id, 'cccd', e.target.value)}
                  className="border rounded px-3 py-2 w-full sm:w-2/3"
                />
                <div className="flex items-center gap-2 sm:gap-0">
                  <select
                    value={selectedDiscount}
                    onChange={(e) => handleDiscountChange(ticket._id, e.target.value)}
                    className="border rounded px-2 py-1 w-full sm:w-full"
                  >
                    <option value="Người lớn">{t('UserPage.CheckoutPage.ip10')}</option>
                    <option value="Trẻ em">{t('UserPage.CheckoutPage.ip11')}</option>
                  </select>
                </div>
              </div>

              {/* Chuyến đi */}
              <div className="col-span-1 text-center">
                <p className="sm:hidden font-semibold">{t('UserPage.CheckoutPage.ip2')}: </p>
                <p>
                  {ticket.trip_id.departure_point.name} - {ticket.trip_id.destination_point.name}
                </p>
                <p className="text-gray-500">{ticket.seat_id[0]?.seat_catalog_id.vehicle_id.name}</p>
              </div>

              {/* Giá vé */}
              <p className="col-span-1 text-center">
                <span className="sm:hidden font-semibold">{t('UserPage.CheckoutPage.ip3')}: </span>
                {(ticket.price * 1000).toLocaleString('vi-VN')} VND
              </p>

              {/* Giảm đối tượng */}
              <p className="col-span-1 text-center">
                <span className="sm:hidden font-semibold">{t('UserPage.CheckoutPage.ip4')}: </span>
                {selectedDiscount === 'Trẻ em' ? 'Giảm 20%' : '0'}
              </p>

              {/* Thành tiền */}
              <p className="col-span-1 text-center">
                <span className="sm:hidden font-semibold">{t('UserPage.CheckoutPage.ip5')}: </span>
                {(discountedPrice * 1000).toLocaleString('vi-VN')} VND
              </p>

              {/* Thao tác */}
              <div className="col-span-1 flex justify-center items-center">
                <p
                  onClick={() => {
                    const seatId = ticket.seat_id[0]?._id;
                    if (seatId) {
                      removeSeat(ticket._id, seatId);
                    }
                  }}
                  className="cursor-pointer text-2xl text-red-500 hover:text-red-700 transition"
                >
                  <IoIosCloseCircleOutline />
                </p>
              </div>
            </div>

          );
        })}

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-4">
          <Button size="sm" onClick={clearSeats} className="bg-red-500 text-xs text-white hover:bg-red-600 transition">
            {t('UserPage.CheckoutPage.ip12')}
          </Button>
          <div className="font-bold text-lg">
            {t('UserPage.CheckoutPage.ip13')}: {(totalPrice * 1000).toLocaleString('vi-VN')} VND
          </div>
        </div>

        {/* Form thanh toán */}
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 border-t mt-8">
          {/* Left Side */}
          <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <h2 className="text-lg font-semibold">{t('UserPage.CheckoutPage.ip18')}</h2>
            <div>
              <input required onChange={onChangeHandler} name="fullName" value={formData.fullName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder={t('UserPage.CheckoutPage.ip7')} />
            </div>
            <div>
              <input required onChange={onChangeHandler} name="email" value={formData.email} className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.email ? 'border-red-500' : ''}`} type="email" placeholder={t('UserPage.CheckoutPage.ip14')} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <input required onChange={onChangeHandler} name="phone" value={formData.phone} className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.phone ? 'border-red-500' : ''}`} type="tel" placeholder={t('UserPage.CheckoutPage.ip8')} />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div className="flex gap-3">
              <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder={t('UserPage.CheckoutPage.ip15')} />
              <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder={t('UserPage.CheckoutPage.ip16')} />
              <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder={t('UserPage.CheckoutPage.ip17')} />
            </div>
            <div>
              <input required onChange={onChangeHandler} name="cccd" value={formData.cccd} className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${errors.cccd ? 'border-red-500' : ''}`} type="number" placeholder={t('UserPage.CheckoutPage.ip9')} />
              {errors.cccd && <p className="text-red-500 text-sm mt-1">{errors.cccd}</p>}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold">{t('UserPage.CheckoutPage.ip19')}</h2>
            {/* Payment Method Selection */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:bg-gray-100 transition">
                <span className={`min-w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></span>
                <img className="h-5 mx-4" src={LogoStripe} alt="Stripe logo" />
              </div>
              <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer hover:bg-gray-100 transition">
                <span className={`min-w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></span>
                <p className="text-gray-500 text-sm font-medium mx-4">{t('UserPage.CheckoutPage.ip20')}</p>
              </div>
            </div>

            <div className="w-full text-right mt-8">
              <button type="submit" className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition">{t('UserPage.CheckoutPage.ip21')}</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default CheckoutPage;
