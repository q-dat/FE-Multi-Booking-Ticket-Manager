import { IMG404 } from "../../../assets/image-represent";

const ErrorLoading: React.FC<{}> = () => {
  return (
    <div className="flex justify-center object-cover py-36 ">
      <img src={IMG404} alt="" className="h-[300px] w-[400px]" />
    </div>
  );
};
export default ErrorLoading;
