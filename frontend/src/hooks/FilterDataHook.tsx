import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

interface userDataProps {
  _id: string;
  title: string;
  link: string;
  description: string;
  type: string;
  tags: string[];
}

interface filterProps {
  filter: string;
}

interface HookReturn {
  data: userDataProps[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFilterData = ({ filter }: filterProps): HookReturn => {
  const [data, setData] = useState<userDataProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (signal?: AbortSignal) => {
    if (!filter) {
      setData(null);
      setError("No filter provided!");
      setIsLoading(false);
      return;
    }
    try {
      setError(null);
      const response = await axios.get<{ data: userDataProps[] }>(
        `${API}/content/content/${filter}`,
        { withCredentials: true, signal }
      );
      if (response.status === 200) {
        setData(response.data.data || []);
      } else {
        setData([]);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.code === "ERR_CANCELED") return;
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred!";
      setError(errorMsg);
      setData(null);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController.signal);
    return () => abortController.abort();
  }, [filter]);

  const refetch = () => {
    setIsLoading(true);
    setData(null);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};