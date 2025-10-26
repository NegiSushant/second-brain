import Card from "../../components/Card";
import { useFilterData } from "../../hooks/FilterDataHook";

export const YouTube = () => {
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useFilterData({ filter: "video" });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <p className="text-red-500 text-lg font-medium">Error: {error}</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading || userData === null) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <p className="text-gray-500 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 py-6 min-h-0 overflow-y-auto scroll-smooth md:h-[calc(100vh-120px)] h-auto">
        {userData.length > 0 ? (
          userData.map((item) => (
            <div key={item._id} className="flex justify-center">
              <Card
                _id={item._id}
                title={item.title}
                link={item.link}
                description={item.description}
                type={item.type}
                tags={item.tags}
                onSuccess={refetch}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center font-bold text-2xl col-span-full">
            No content found.
          </p>
        )}
      </div>
    </div>
  );
};
