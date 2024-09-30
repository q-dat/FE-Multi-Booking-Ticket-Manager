import React from 'react';
import { Button } from 'react-daisyui';

const PaginationAdmin: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 40;
  const maxPageButtons = 3;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(
      1,
      Math.min(currentPage - 2, totalPages - maxPageButtons + 1)
    );
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          className={`btn btn-sm ${currentPage === i ? 'btn-primary text-white' : 'btn-ghost bg-[#EEEEEE]'}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    if (startPage > 1) {
      buttons.unshift(
        <div key="dots1" className="bg-none p-4">
          ...
        </div>
      );
      buttons.unshift(
        <Button
          key={1}
          className="btn btn-ghost btn-sm"
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>
      );
    }

    if (endPage < totalPages) {
      buttons.push(
        <div key="dots2" className="bg-none p-4">
          ...
        </div>
      );
      buttons.push(
        <Button
          key={totalPages}
          className="btn btn-ghost btn-sm"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex flex-col items-center justify-between px-3 py-4 xl:flex-row">
      <div className="text-sm text-primary">
        <p>
          Dữ liệu trang {currentPage} trong {totalPages} trang
        </p>
      </div>
      <div className="flex items-center space-x-2 text-primary">
        <Button
          className="btn btn-sm text-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
        {renderPageButtons()}
        <Button
          className="btn btn-sm text-primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default PaginationAdmin;
