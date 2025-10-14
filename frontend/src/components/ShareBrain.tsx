"use client";
import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

interface ShareBrainProps {
  open: boolean;
  onClose: () => void;
}

export const ShareBrain = ({ open, onClose }: ShareBrainProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  if (!open) return null;

  const handleEnableSharing = async () => {
    setIsLoading(true);
    try {
      // ✅ Replace this URL with your actual backend endpoint
      const res = await axios.post(
        `${API}/brain/share`,
        { share: true },
        {
          withCredentials: true,
        }
      );
      console.log(res);

      setShareLink(`http://localhost:5173/brain/share/${res.data.hash}`); // backend returns { shareLink: "https://..." }
    } catch (err) {
      console.error("Error enabling sharing:", err);
      alert("Failed to enable sharing. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableSharing = () => {
    setShareLink(null);
  };

  const handleCopy = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">
          Share Your Brain
        </h2>

        {shareLink ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center border rounded-md w-full px-3 py-2 justify-between">
              <p className="text-sm text-gray-700 truncate">{shareLink}</p>
              <button
                className="text-blue-500 font-semibold ml-2"
                onClick={handleCopy}
              >
                Copy
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={handleEnableSharing}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Enable Sharing"}
          </button>

          <button
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
            onClick={handleDisableSharing}
          >
            Disable Sharing
          </button>
        </div>
      </div>
    </div>
  );
};
