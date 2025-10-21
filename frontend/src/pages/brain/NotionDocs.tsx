import axios from "axios";
import { useEffect, useState } from "react";
import TestCard from "../../components/TestCard";

const API = import.meta.env.VITE_API_URL;

interface userNotionDataProps {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: string[];
}

export const Notion = () => {
  const [userNotionData, setUserNotionData] = useState<userNotionDataProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const getUserNotion = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<{ data: userNotionDataProps[] }>(
        `${API}/content/content/notion`,
        { withCredentials: true }
      );
      console.log(response.data.data);
      if (response.status === 200) {
        setUserNotionData(response.data.data || []);
      }
    } catch (err) {
      setUserNotionData([]);
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserNotion();
  }, []);
  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      {isLoading ? (
        <p className="text-gray-500 text-lg font-medium">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 py-6 min-h-0 overflow-y-auto scroll-smooth md:h-[calc(100vh-120px)] h-auto">
          {userNotionData.length > 0 ? (
            userNotionData.map((item) => (
              <div key={item._id} className="flex justify-center">
                <TestCard
                  _id={item._id}
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  tags={item.tags}
                  onDeleteSuccess={getUserNotion}
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
