import React, { useContext, useEffect } from 'react';
import { Button, Select, Textarea } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { ISeat } from '../../../../types/type/seat/seat';
import { isIErrorResponse } from '../../../../types/error/error';
import { Toastify } from '../../../../helper/Toastify';
import { SeatContext } from '../../../../context/seat/SeatContext';
import { SeatCatalogContext } from '../../../../context/seatCatalog/SeatCatalogContext';

interface ModalCreateSeatProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateSeatPageAdmin: React.FC<ModalCreateSeatProps> = ({
  isOpen,
  onClose
}) => {
  const { seatCatalogs, getAllSeatCatalogs } = useContext(SeatCatalogContext);
  const { createSeat } = React.useContext(SeatContext);
  const { register, handleSubmit, reset } = useForm<ISeat>();

  useEffect(() => {
    getAllSeatCatalogs();
  }, []);
  const onSubmit: SubmitHandler<ISeat> = async formData => {
    try {
      await createSeat(formData);
      Toastify('Tạo ghế thành công!', 201);
      reset();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi tạo ghế!';
      Toastify(`Lỗi: ${errorMessage}`, 500);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex w-[400px] flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800"
        >
          <div>
            <p className="font-bold text-black dark:text-white">Tạo ghế mới</p>
            <InputModal
              type={'text'}
              {...register('name', { required: true })}
              placeholder="Tên ghế"
            />
            <InputModal
              type={'text'}
              {...register('price', { required: true })}
              placeholder="Giá"
            />
            <InputModal
              type={'text'}
              {...register('ordinal_numbers', { required: true })}
              placeholder="Số ghế"
            />
            <Textarea
              className="my-5 w-full pb-10 focus:outline-none"
              {...register('des')}
              placeholder="Mô tả (Không bắt buộc!)"
            />
            <Select
              defaultValue=""
              className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
              {...register('status')}
            >
              <option value="" disabled>
                Chọn Trạng Thái
              </option>
              <option value="Còn chỗ">Còn Chỗ</option>
              <option value="Hết chỗ">Hết Chỗ</option>
            </Select>
            <Select
              defaultValue=""
              className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
              {...register('seat_catalog_id')}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {seatCatalogs.map(seatCatalog => (
                <option key={seatCatalog._id} value={seatCatalog._id}>
                  {seatCatalog.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Hủy
            </Button>
            <Button color="primary" type="submit" className="text-white">
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalCreateSeatPageAdmin;
