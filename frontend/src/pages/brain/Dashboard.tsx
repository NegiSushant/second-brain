import { useEffect, useState } from "react";
import CardDemo from "../../components/cards-demo-2";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async () => {
    try {
      const response = await axios.get<{
        message: string;
        data: contentSchema[];
      }>(`${API}/content/content`, {
        withCredentials: true,
      });
      setUserBrain(response.data.data || []);
      console.log(response);

      console.log(userBrain);
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
    <div className="flex flex-1 gap-2">
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="flex flex-1 gap-2">
          {userBrain.length > 0 ? (
            userBrain.map((item) => (
              <CardDemo
                key={item._id}
                title={item.title}
                link={item.link}
                type={item.type}
                tags={item.tags}
              />
            ))
          ) : (
            <p>No content found.</p>
          )}
        </div>
      )}
    </div>
  );
};
