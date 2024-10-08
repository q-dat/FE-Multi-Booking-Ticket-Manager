import React, { useContext, useEffect, useState } from 'react';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import { Button, Table } from 'react-daisyui';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { RiAddBoxLine } from 'react-icons/ri';
import ModalCreateLocationPageAdmin from '../../components/admin/Modal/ModalLocation/ModalCreateLocationPageAdmin';
import ModalDeleteLocationPageAdmin from '../../components/admin/Modal/ModalLocation/ModalDeleteLocationPageAdmin';
import ModalEditLocationPageAdmin from '../../components/admin/Modal/ModalLocation/ModalEditLocationPageAdmin';
import { LocationContext } from '../../context/location/LocationContext';
import { ILocation } from '../../types/type/location/location';

const LocationPage: React.FC = () => {
  // Get Location
  const getLocations = useContext(LocationContext);
  const [locations, setLocations] = useState<ILocation[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (getLocations && locations.length === 0) {
        await getLocations.getAllLocations();
        setLocations(getLocations.locations);
      }
    };
    fetchData();
  }, [getLocations, locations]);
  //Delete
  const [locationToDelete, setLocationToDelete] = useState<ILocation | null>(
    null
  );
  const handleDelete = async () => {
    if (locationToDelete) {
      await getLocations.deleteLocation(locationToDelete._id);
      setLocations(locations.filter(loc => loc._id !== locationToDelete._id));
      setLocationToDelete(null);
      closeModal(setIsModalDeleteOpen);
    }
  };
  //
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const openModal = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    modalSetter(true);
  };

  const closeModal = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    modalSetter(false);
  };
  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Location" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin={'Location'}
          Btn_Create={
            <Button
              color="primary"
              onClick={() => openModal(setIsModalCreateOpen)}
              className="text-sm font-light text-white"
            >
              <div className="flex items-center space-x-1">
                <RiAddBoxLine className="text-xl" />
                <p> Thêm</p>
              </div>
            </Button>
          }
        />
      </div>
      <div>
        <TableListAdmin
          Title_TableListAdmin={'Danh sách địa chỉ'}
          table_head={
            <Table.Head className="bg-primary text-center text-white">
              <span>Số thứ tự</span>
              <span>Tên Địa Điểm</span>
              <span>Trạng Thái</span>
            </Table.Head>
          }
          table_body={
            <Table.Body className="text-center text-sm">
              {locations.map((location: ILocation, index: number) => (
                <Table.Row key={location._id}>
                  <span className="line-clamp-1">#{index + 1}</span>
                  <span className="line-clamp-1">{location.name}</span>
                  <span>
                    <details>
                      <summary className="inline cursor-pointer text-base text-warning">
                        <div className="flex items-center justify-center px-[55px] py-2">
                          <FaCircleInfo />
                        </div>
                      </summary>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Button
                          color="primary"
                          className="w-full max-w-[140px] text-sm font-light text-white"
                          onClick={() => openModal(setIsModalEditOpen)}
                        >
                          <FaPenToSquare />
                          Cập nhật
                        </Button>
                        <Button
                          color="secondary"
                          className="w-full max-w-[140px] text-sm font-light text-white"
                          onClick={() => {
                            setLocationToDelete(location);
                            openModal(setIsModalDeleteOpen);
                          }}
                        >
                          <MdDelete />
                          Xoá
                        </Button>
                      </div>
                    </details>
                  </span>
                </Table.Row>
              ))}
            </Table.Body>
          }
        />
      </div>
      <ModalCreateLocationPageAdmin
        isOpen={isModalCreateOpen}
        onClose={() => closeModal(setIsModalCreateOpen)}
      />
      <ModalDeleteLocationPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={() => closeModal(setIsModalDeleteOpen)}
        onConfirm={handleDelete}
      />
      <ModalEditLocationPageAdmin
        isOpen={isModalEditOpen}
        onClose={() => closeModal(setIsModalEditOpen)}
      />
    </div>
  );
};

export default LocationPage;
