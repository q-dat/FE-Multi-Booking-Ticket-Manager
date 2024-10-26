import React, { useEffect } from 'react';
import { Toastify } from '../../helper/Toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { isIErrorResponse } from '../../types/error/error';

const Verify: React.FC = () => {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
    try {

      const response = await axios.post('http://localhost:6001/api/order/verifyStripe', { success, orderId })

      if (response.data.success) {
        navigate('/')
      } else {
        navigate('/cart')
      }

    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Đặt hàng thất bại!';
      Toastify(`Lỗi: ${errorMessage}`, 500);
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      Thanh toán thành công!!!
    </div>
  )

};

export default Verify;
