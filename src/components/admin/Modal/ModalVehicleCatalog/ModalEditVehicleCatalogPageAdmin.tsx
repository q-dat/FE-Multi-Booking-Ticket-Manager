import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import { VehicleCatalogContext } from '../../../../context/vehicleCatalog/VehicleCatalogContext';
import { IVehicleCatalog } from '../../../../types/type/vehicle-catalog/vehicle-catalog';

interface ModalEditVehicleCatalogProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleCatalogId: string;
}

const ModalEditVehicleCatalogPageAdmin: React.FC<
  ModalEditVehicleCatalogProps
> = ({ isOpen, onClose, vehicleCatalogId }) => {
  const {
    getAllVehicleCatalogs,
    updateVehicleCatalog,
    getVehicleCatalogById,
    vehicleCatalogs
  } = useContext(VehicleCatalogContext);
  const { register, handleSubmit, reset, setValue } =
    useForm<IVehicleCatalog>();

  useEffect(() => {
    if (vehicleCatalogId) {
      getVehicleCatalogById(vehicleCatalogId);
    }
  }, [vehicleCatalogId, getVehicleCatalogById]);

  useEffect(() => {
    const vehicleCatalogData = vehicleCatalogs.find(
      catalog => catalog._id === vehicleCatalogId
    );
    if (vehicleCatalogData) {
      setValue('name', vehicleCatalogData.name);
    }
  }, [vehicleCatalogs, vehicleCatalogId, setValue]);

  const onSubmit: SubmitHandler<IVehicleCatalog> = async formData => {
    try {
      await updateVehicleCatalog(vehicleCatalogId, formData);
      Toastify('Chỉnh sửa danh mục phương tiện  thành công!', 200);
      reset();
      getAllVehicleCatalogs();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi chỉnh sửa danh mục phương tiện !';
      Toastify(`Lỗi: ${errorMessage}`, 401);
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
          className="flex flex-col space-y-10 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800"
        >
          <p className="text-xl font-bold text-black dark:text-white">
            Chỉnh sửa danh mục phương tiện
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên danh mục phương tiện
            </label>
            <InputModal
              placeholder="ví dụ: Danh mục A"
              type="text"
              {...register('name')}
            />
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

export default ModalEditVehicleCatalogPageAdmin;
