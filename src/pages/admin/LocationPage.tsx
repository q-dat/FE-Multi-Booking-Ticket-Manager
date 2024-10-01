import React, { useState } from 'react';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import { Button, Table } from 'react-daisyui';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { RiAddBoxLine } from 'react-icons/ri';
import ModalCreateLocationAdmin from '../../components/admin/Modal/ModalLocation/ModalCreateLocationAdmin';

interface Product {
  id: number;
  name: string;
  img: string;
  id_catalog: number;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Sản phẩm A', img: 'productA.jpg', id_catalog: 1, price: 500 },
  {
    id: 2,
    name: 'Sản phẩm B',
    img: 'productB.jpg',
    id_catalog: 2,
    price: 1000
  },
  { id: 3, name: 'Sản phẩm C', img: 'productC.jpg', id_catalog: 1, price: 1500 }
];

const LocationPage: React.FC = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

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
  //
  const handleOpenForm = (action: string, product: any) => {
    console.log(`Open form to ${action} product`, product);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete product with id ${id}`);
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
              <span>Hình ảnh</span>
              <span>Tên sản phẩm</span>
              <span>Giá</span>
              <span>Trạng thái</span>
            </Table.Head>
          }
          table_body={
            <Table.Body className="text-center text-sm">
              {products.map((row, index) => (
                <Table.Row key={row.id}>
                  <span className="line-clamp-1">#{index + 1}</span>
                  <span className="line-clamp-1">
                    <img
                      width={80}
                      height={80}
                      src={`./products/${row.img}`}
                      alt={row.name}
                    />
                  </span>
                  <span className="line-clamp-1">{row.name}</span>
                  <span className="line-clamp-1">{row.price}.000đ</span>
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
                          onClick={() => handleOpenForm('edit', row)}
                        >
                          <FaPenToSquare />
                          Cập nhật
                        </Button>
                        <Button
                          color="secondary"
                          className="w-full max-w-[140px] text-sm font-light text-white"
                          onClick={() => handleDelete(row.id)}
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
      <ModalCreateLocationAdmin
        isOpen={isModalCreateOpen}
        onClose={() => closeModal(setIsModalCreateOpen)}
      />
    </div>
  );
};

export default LocationPage;

