import GridLoader from 'react-spinners/GridLoader';
const Loading: React.FC<{}> = () => {
  return (
      <GridLoader
        size={48}
        className="absolute left-1/2 top-1/2 z-[9999] translate-x-[-50%] translate-y-[-50%]"
        loading
        color="#FFF"
      />
  );
};
export default Loading;
