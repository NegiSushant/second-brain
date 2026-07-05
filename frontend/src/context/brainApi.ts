import axios from "axios";
import type { AskRequest, AskResponse } from "../types/chat";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default async function askBrain(
  payload: AskRequest,
): Promise<AskResponse> {
  const response = await axios.post(`${API_BASE_URL}/brain/ask`, payload, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}
