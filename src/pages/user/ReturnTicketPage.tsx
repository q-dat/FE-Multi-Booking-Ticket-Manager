import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { BiBowlingBall } from "react-icons/bi";
import InputForm from '../../components/UserPage/InputForm';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

const ReturnTicketPage: React.FC = () => {
    return (
        <div className='pt-[100px] xl:pt-[90px]'>
            {/* Mobile */}
            <div>
                <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
            </div>
            {/* cột dưới */}
            <div className=' w-[100%]  '>

                <div className=' h-auto'>
                    <h1 className='text-center font-bold text-4xl text-primary mb-2'>Trả vé</h1>

                </div>
                {/* khung */}
                <div className='bg-blue-200 h-auto border-2 border-blue-200  rounded-sm m-2  text-blue-700 dark:bg-gray-700 dark:text-primary xl:px-10'>
                    <p className='p-2 ml-8 text-lg'>Trả vé chỉ áp dụng với trường hợp khách hàng đã thanh toán trực tuyến (qua cổng thanh toán, ví điện tử, app ngân hàng) và có điền mail khi mua vé.</p>
                    <p className='pt-0 p-2 ml-8 text-lg'>  Nếu quý khách thanh toán bằng tiền mặt, trả sau qua ứng dụng ngân hàng và atm, chuyển khoản hoặc trả vé khi có sự cố bãi bỏ vé vui lòng thực hiện thủ tục tại các quầy bán vé.</p>
                </div>
                {/* form */}
                <div className=' h-auto'>
                    <div className="w-[60%] mx-auto text-center border border-blue-200  p-4 rounded-lg">
                        <p className="mb-4 text-xl font-bold m-2">Để hiển thị vé cần trả, vui lòng điền 3 thông tin chính xác dưới đây:</p>
                        <InputForm
                            type="text"
                            placeholder="Mã Đặt Chỗ"
                            className="border border-gray-300 p-2 mb-4 rounded-lg w-full "
                        />
                        <InputForm
                            type="text"
                            placeholder="Email"
                            className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
                        />
                        <InputForm
                            type="text"
                            placeholder="Điện Thoại"
                            className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
                        />
                        <Button className="w-32 bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700" size="md">Tra Cứu</Button>
                        <Link to={''} className=' ml-4  text-blue-700 font-bold'>Quên mã đặt chỗ?</Link>
                    </div>
                </div>
                {/* khung */}
                <div className='p-2 bg-blue-200 h-auto border-2 border-blue-200  rounded-sm m-2 text-start text-blue-700 dark:bg-gray-700 dark:text-primary xl:px-10'>
                    <p className='p-2 ml-8 text-lg'>Chú Ý:</p>
                    <p className='p-2 ml-8 text-lg'>Chính sách vé và quy định đổi trả của
                        <span className="mx-1 font-bold dark:text-gray-100">
                            Công Ty
                        </span>
                        <span className="mx-1">
                            <Link to={''}>Vào Đây</Link>
                        </span>

                    </p>
                    <p className='p-2 ml-8 text-lg'>Chính sách vé và quy định đổi trả của
                        <span className="mx-1 font-bold dark:text-gray-100">
                            Công Ty
                        </span>
                        <span className="mx-1">
                            <Link to={''}>Vào Đây</Link>
                        </span>

                    </p>
                </div>
            </div>
        </div>


    )
}

export default ReturnTicketPage;