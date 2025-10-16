import axios from "axios";
// import UnderDevelopment from "../../components/UnderDevelopment";
import { useEffect, useState } from "react";
import CardDemo from "../../components/Card";

const API = import.meta.env.VITE_API_URL;

interface userYoutubeData {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: string[];
}

export const YouTube = () => {
  const [userYoutueData, setUserYoutubeData] = useState<userYoutubeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserYouTubeData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<{ data: userYoutubeData[] }>(
        `${API}/content/content/video`,
        // {
        //   filter:"youtube",
        // },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUserYoutubeData(response.data.data || []);
      }
    } catch (err) {
      setUserYoutubeData([]);
      alert(err);
    }
  };

  useEffect(() => {
    getUserYouTubeData();
  }, []);
  // return (
  //   <div>
  //     <UnderDevelopment />
  //   </div>
  // );
  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full gap-2">
      {isLoading ? (
        <p className="text-gray-500 text-lg font-medium">Loading...</p>
      ) : (
        <div className="overflow-y-auto max-h-[80vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full">
          {userYoutueData.length > 0 ? (
            userYoutueData.map((item) => (
              <CardDemo
                key={item._id}
                _id={item._id}
                title={item.title}
                link={item.link}
                type={item.type}
                tags={item.tags}
                onDeleteSuccess={getUserYouTubeData}
              />
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
