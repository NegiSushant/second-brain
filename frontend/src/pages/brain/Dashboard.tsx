import { useEffect, useState } from "react";
import CardDemo from "../../components/cards-demo-2";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const Dashboard = () => {
  const [userBrain, setUserBrain] = useState([]);
  useEffect(() => {
    const userData = async () => {
      const result = await axios.get(`${API}/content/content`, {
        withCredentials: true,
      });
      console.log("userbrain "+userBrain);
      console.log("result "+result.data);

      setUserBrain(result.data.content);
      console.log("userbrain: "+userBrain);
    };
    userData();
  }, [userBrain]);
  return (
    <div className="flex flex-1 gap-2">
      <CardDemo />
      <CardDemo />
      <CardDemo />
    </div>
  );
};
