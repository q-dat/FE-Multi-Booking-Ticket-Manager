import BarLoader from 'react-spinners/BarLoader';

function LoadingPage({ loading }: { loading: boolean }) {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-white py-16">
      <div className="mt-8 flex flex-col items-center">
        <BarLoader width={200} loading={loading} color="#122969" />
      </div>
    </div>
  );
}

export default LoadingPage;
