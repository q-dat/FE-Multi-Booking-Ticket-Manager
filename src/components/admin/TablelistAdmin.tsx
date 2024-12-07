import React from 'react';
import { Table } from 'react-daisyui';
import NavtableAdmin from './NavtableAdmin';
import PaginationAdmin from './PaginationAdmin';

interface TableListAdminProps {
  table_head: React.ReactNode;
  table_body: React.ReactNode;
  Title_TableListAdmin: string;
}
const TableListAdmin: React.FC<TableListAdminProps> = ({
  table_head,
  table_body,
  Title_TableListAdmin
}) => {
  return (
    <div>
      <div className="w-full bg-white dark:bg-gray-800 md:rounded-md">
        {/* Navbar Admin */}
        <NavtableAdmin Title_NavtableAdmin={Title_TableListAdmin} />
        <div className="w-screen overflow-x-auto border-8 border-transparent scrollbar-hide lg:w-full xl:px-4">
          {/* Phần Bảng */}
          <Table
            className="table-sm w-full text-black dark:text-green-500"
            zebra
          >
            {table_head}
            {table_body}
          </Table>
        </div>
        <PaginationAdmin />
      </div>
    </div>
  );
};

export default TableListAdmin;
