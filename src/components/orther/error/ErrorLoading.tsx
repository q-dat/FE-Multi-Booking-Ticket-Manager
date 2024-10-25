import { Button } from 'react-daisyui';
import { IMG404 } from '../../../assets/image-represent';
import { useNavigate } from 'react-router-dom';
import { IoMdRefreshCircle } from 'react-icons/io';

const ErrorLoading: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-2 object-cover py-36">
      <img
        src={IMG404}
        alt=""
        className="w-[500px] object-cover drop-shadow-lg filter"
      />
      <div className="text-md flex flex-row items-center justify-center gap-3 text-secondary dark:text-green-500 xl:text-3xl">
        <p>Lỗi 404:</p>
        <p>Không tìm thấy dữ liệu!!!</p>
      </div>
      <Button
        size="sm"
        className="text-md gap-1 rounded-md bg-primary font-light text-white shadow-headerMenu shadow-primary transition-colors duration-500 hover:border-primary hover:bg-white hover:text-primary dark:border-none dark:bg-black dark:text-white dark:shadow-headerMenu dark:shadow-green-500 dark:hover:text-green-500 dark:hover:shadow-white"
        onClick={() => {
          navigate('/');
        }}
      >
        <IoMdRefreshCircle className="text-xl" />
        Quay lại!
      </Button>
    </div>
  );
};
export default ErrorLoading;
