import React from 'react';
import { Button } from 'react-daisyui';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage
}) => {
  return (
    <div className="mt-10 flex flex-row items-center justify-center gap-x-10 px-2 text-primary">
      <Button
        className="rounded-md shadow-headerMenu shadow-gray-50"
        color="primary"
        size="sm"
        disabled={currentPage === 1}
        onClick={onPrevPage}
      >
        <IoIosArrowDropleft className="text-xl text-white" />{' '}
        Trang Trước
      </Button>
      <div className="mx-2 flex flex-row items-center justify-center text-primary">
        <p> {currentPage}</p> / <p> {totalPages}</p>
      </div>
      <Button
        className="rounded-md shadow-headerMenu shadow-gray-50"
        color="primary"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={onNextPage}
      >
        Trang Tiếp{' '}
        <IoIosArrowDropright className="text-xl text-white" />
      </Button>
    </div>
  );
};

export default Pagination;