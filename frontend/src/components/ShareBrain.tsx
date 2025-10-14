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
      const res = await axios.post(
        `${API}/brain/share`,
        { share: true },
        { withCredentials: true }
      );

      console.log(res);
      setShareLink(`${API}/brain/${res.data.hash}`);
    } catch (err) {
      console.error("Error enabling sharing:", err);
      alert("Failed to enable sharing. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableSharing = () => setShareLink(null);

  const handleCopy = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative border border-gray-200">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
          Share Your Brain
        </h2>

        {shareLink ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center border rounded-md w-full px-3 py-2 justify-between bg-gray-50">
              <p className="text-sm text-gray-700 truncate">{shareLink}</p>
              <button
                className="text-blue-500 font-semibold ml-2 hover:text-blue-600"
                onClick={handleCopy}
              >
                Copy
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center mb-4">
            Generate a shareable link to your brain.
          </p>
        )}

        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-70"
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
