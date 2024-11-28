import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import { AgeContext } from '../../../../context/age/AgeContext';
import { IAge } from '../../../../types/type/age/age';
import LabelForm from '../../LabelForm';
import { isIErrorResponse } from '../../../../types/error/error';

interface ModalEditAgeProps {
  isOpen: boolean;
  onClose: () => void;
  ageId: string;
}

const ModalEditAgePageAdmin: React.FC<ModalEditAgeProps> = ({
  isOpen,
  onClose,
  ageId
}) => {
  const { getAllAges, updateAge, getAgeById, ages } =
    useContext(AgeContext);
  const { register, handleSubmit, reset, setValue } = useForm<IAge>();

  useEffect(() => {
    if (ageId) {
      getAgeById(ageId);
    }
  }, [ageId, getAgeById]);

  useEffect(() => {
    const ageData = ages.find(age => age._id === ageId);
    if (ageData) {
      setValue('name', ageData.name);
      setValue('price', ageData.price);
      setValue('des', ageData.des);
      setValue('createAt', ageData.createAt);
      setValue('updateAt', ageData.updateAt);
    }
  }, [ages, ageId, setValue]);

  const onSubmit: SubmitHandler<IAge> = async formData => {
    try {
      await updateAge(ageId, formData);
      Toastify('Chỉnh sửa Độ tuổi thành công!', 200);
      reset();
      getAllAges();
      onClose();
    } catch (error) {
      getAllAges();
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Độ tuổi đã tồn tại!';
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
        <div className="space-y-10 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800">
          <p className="text-xl font-bold text-black dark:text-white">
            Chỉnh sửa lứa tuổi
          </p>
          <div onClick={e => e.stopPropagation()}>
            <div className="mr-3">
              <LabelForm title={'Lứa Tuổi'} />
              <InputModal
                placeholder={'Lứa Tuổi'}
                type={'text'}
                {...register('name')}
              />
              <LabelForm title={'Giá'} />

              <InputModal
                placeholder={'vd: 1000'}
                type={'number'}
                {...register('price')}
              />
              <LabelForm title={'Mô Tả'} />

              <InputModal
                placeholder={'Mô Tả'}
                type={'text'}
                {...register('des')}
              />
            </div>
          </div>
          <div className="mt-4 space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Huỷ bỏ
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

export default ModalEditAgePageAdmin;
