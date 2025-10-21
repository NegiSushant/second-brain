import { useEffect, useState } from "react";
import axios from "axios";
import TestCard from "../../components/TestCard";

const API = import.meta.env.VITE_API_URL;

interface contentSchema {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: string[];
}

export const Dashboard = () => {
  const [userBrain, setUserBrain] = useState<contentSchema[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    try {
      const response = await axios.get<{
        message: string;
        data: contentSchema[];
      }>(`${API}/content/content`, { withCredentials: true });
      setUserBrain(response.data.data || []);
    } catch (err) {
      console.log(`Error while fetching data from server: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
    const interval = setInterval(() => {
      getUserData();
    }, 10 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      {isLoading ? (
        // <p className="text-gray-500 text-lg font-medium">Loading...</p>
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <p className="text-gray-500 text-lg font-medium">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 py-6 min-h-0 overflow-y-auto scroll-smooth md:h-[calc(100vh-120px)] h-auto">
          {userBrain.length > 0 ? (
            userBrain.map((item) => (
              <div key={item._id} className="flex justify-center">
                <TestCard
                  _id={item._id}
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  tags={item.tags}
                  onDeleteSuccess={getUserData}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center font-bold text-2xl col-span-full">
              No content found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
