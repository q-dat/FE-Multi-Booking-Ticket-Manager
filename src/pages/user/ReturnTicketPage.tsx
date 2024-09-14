import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { BiBowlingBall } from "react-icons/bi";
import InputForm from '../../components/UserPage/InputForm';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

const ReturnTicketPage: React.FC = () => {
    return (
        <div className='pt-[100px]'>
            {/* Mobile */}
            <div>
                <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
            </div>
            {/* cột dưới */}
            <div className=' w-[100%] h-[1000px] '>

                <div className=' h-auto'>
                    <h1 className='text-center font-bold text-4xl text-primary mb-2'>Trả vé</h1>

                </div>

                <div className='h-[50px]'>
                    <span className="flex items-center space-x-2">
                        <hr className="flex-grow border-gray-300 w-40" />
                        <BiBowlingBall />
                        <hr className="flex-grow border-gray-300 w-40" />
                        <BiBowlingBall />
                        <hr className="flex-grow border-gray-300 w-40" />
                        <BiBowlingBall />
                        <hr className="flex-grow border-gray-300 w-40" />
                        <BiBowlingBall />
                        <hr className="flex-grow border-gray-300 w-40" />
                    </span>
                    <div className='flex ml-60 space-x-64' >
                        <p>Chọn vé trả </p>
                        <p>Xác Nhận</p>
                        <p>Trả vé</p>
                        <p>Hoàn tất</p>
                    </div>
                </div>
                {/* khung */}
                <div className='bg-blue-200 h-auto border-2 border-blue-200  rounded-sm m-2'>
                    <p className='p-2 ml-8'>Trả vé chỉ áp dụng với trường hợp khách hàng đã thanh toán trực tuyến (qua cổng thanh toán, ví điện tử, app ngân hàng) và có điền mail khi mua vé.</p>
                    <p className='pt-0 p-2 ml-8'>  Nếu quý khách thanh toán bằng tiền mặt, trả sau qua ứng dụng ngân hàng và atm, chuyển khoản hoặc trả vé khi có sự cố bãi bỏ vé vui lòng thực hiện thủ tục tại các quầy bán vé</p>
                </div>
                {/* form */}
                <div className=' h-auto'>
                    <div className="w-[60%] mx-auto text-center border border-gray-300 p-4 rounded-lg">
                        <p className="mb-4">Để hiển thị vé cần trả, vui lòng điền 3 thông tin chính xác dưới đây:</p>
                        <InputForm
                            type="text"
                            placeholder="Mã Đặt Chỗ"
                            className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
                        />
                        <InputForm
                            type="text"
                            placeholder="Mã Đặt Chỗ"
                            className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
                        />
                        <InputForm
                            type="text"
                            placeholder="Mã Đặt Chỗ"
                            className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
                        />
                        <Button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Tra Cứu</Button></div>
                </div>
                {/* khung */}
                <div className='bg-blue-200 h-auto border-2 border-blue-200  rounded-sm m-2'>
                    <p>Chú Ý:</p>
                    <span>chính sách vé và quy định đổi trả của <p>Công Ty</p> vui lòng bấm <Link to={''}>Vào Đây</Link></span>
                    <span>chính sách vé và quy định đổi trả của <p>Công Ty</p> vui lòng bấm <Link to={''}>Vào Đây</Link></span>
                </div>
            </div>
        </div>
        

    )
}

export default ReturnTicketPage;