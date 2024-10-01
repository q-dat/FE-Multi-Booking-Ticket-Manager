import GridLoader from 'react-spinners/GridLoader';

const LoadingLocal: React.FC<{}> = () => {
  return (
    <div className="flex justify-center py-36">
      <GridLoader
        size={48}
        className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
        loading
        color="#5e90cc"
      />
    </div>
  );
};
export default LoadingLocal;
