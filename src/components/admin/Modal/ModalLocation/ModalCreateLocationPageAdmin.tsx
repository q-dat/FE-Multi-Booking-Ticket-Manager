import React from 'react';
import { Button } from 'react-daisyui';
import InputModal from '../../InputModal';
// import { useTranslation } from 'react-i18next';

interface ModalCreateAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateLocationPageAdmin: React.FC<ModalCreateAdminProps> = ({
  isOpen,
  onClose
}) => {
  //Translation
  // const { t } = useTranslation();

  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <form>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex flex-col space-y-10 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800"
        >
          <p className="text-xl font-bold text-black dark:text-white">
            Tạo địa chỉ mới
          </p>
          <div className="flex flex-col items-start justify-center space-x-10 md:flex-row">
            <InputModal placeholder={'Tên địa chỉ'} type={'text'} name={'location'}/>
          </div>
          {/* Modal Btn */}
          <div className="mt-4 space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Huỷ
            </Button>
            <Button color="primary" type="submit" className="text-white">
              Xác Nhận
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalCreateLocationPageAdmin;

