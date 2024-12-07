import React, { useEffect } from 'react';
import { Toastify } from '../../helper/Toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isIErrorResponse } from '../../types/error/error';
import axios from '../../config/axiosConfig';
import { Success } from '../../assets/image-represent';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';

const Verify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      const response = await axios.post('/api/order/verifyStripe', {
        success,
        orderId
      });

      if (response.data.success) {
        const userPath = localStorage.getItem('userPath') || '/';
        navigate(userPath);
      } else {
        navigate('/checkout');
      }
    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Đặt hàng thất bại!';
      Toastify(`Lỗi: ${errorMessage}`, 500);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile="Thành công" />
      <div className="flex flex-col items-center justify-center py-10">
        <div className="flex flex-col items-center justify-center rounded-md px-[200px] py-20 shadow-mainMenu shadow-gray-50">
          <img className="mb-5" src={Success} alt="" />
          <p className="font-bold">Cảm ơn bạn đã đặt vé tại LacLacTrip</p>
          <p className="">Vui lòng kiểm tra mail để xem thông tin đặt vé</p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
