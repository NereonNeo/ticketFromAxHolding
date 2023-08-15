import { useAppSelector } from '@/hooks/redux';

type layoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: layoutProps) => {
  const { loading } = useAppSelector((state) => state.contactReducer);

  return (
    <>
      {loading && (
        <div className="absolute w-full h-full bg-gray-200 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-400"></div>
        </div>
      )}
      <div className="p-1 sm:p-10">
        <div className="w-full h-full max-w-[1500px] mx-auto rounded border-2 ">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
