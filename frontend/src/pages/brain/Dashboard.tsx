import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { useBrainContext } from "../../context/BrainContext";

const API = import.meta.env.VITE_API_URL;

interface contentSchema {
  _id: string;
  title: string;
  link: string;
  description: string;
  type: string;
  tags: string[];
}

export const Dashboard = () => {
  const [userBrain, setUserBrain] = useState<contentSchema[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { refreshVersion } = useBrainContext();

  const getUserData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<{
        message: string;
        data: contentSchema[];
      }>(`${API}/content/content`, { withCredentials: true });
      setUserBrain(response.data.data || []);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("You are not authorized. Please log in again.");
        } else if (err.response) {
          setError(
            err.response.data?.message ||
              `Server error: ${err.response.status} ${err.response.statusText}`
          );
        } else if (err.request) {
          setError("No response from server. Check your connection.");
        } else {
          setError("Request error. Please try again later.");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, [refreshVersion]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <p className="text-red-500 text-lg font-medium">Error: {error}</p>
        <button
          onClick={getUserData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <p className="text-gray-500 text-lg font-medium">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 py-6 min-h-0 overflow-y-auto scroll-smooth md:h-[calc(100vh-120px)] h-auto">
          {userBrain.length > 0 ? (
            userBrain.map((item) => (
              <div key={item._id} className="flex justify-center">
                <Card
                  _id={item._id}
                  title={item.title}
                  link={item.link}
                  description={item.description}
                  type={item.type}
                  tags={item.tags}
                  onSuccess={getUserData}
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
