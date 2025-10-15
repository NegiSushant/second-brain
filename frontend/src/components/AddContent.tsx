"use client";
import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

const API = import.meta.env.VITE_API_URL; // e.g., "http://localhost:5000/api"

export const AddContentModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const types = [
    "image",
    "document",
    "video",
    "notion",
    "application",
    "texts",
    "code",
    "tweets",
    "links",
  ];

  if (!open) return null;

  const submitContent = async () => {
    if (!selectedType || !title || !link) {
      alert("Please fill in title, type, and link!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API}/content/content`,
        {
          type: selectedType,
          link,
          title,
          tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        },
        { withCredentials: true }
      );

      if (response.status == 200) {
        alert("✅ " + response.data.message);
        // reset form
        setTitle("");
        setLink("");
        setTags("");
        setSelectedType(null);
        onClose();
      } else {
        alert("❌ " + (response.data.message || "Failed to save content"));
      }
    } catch (err) {
      alert("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-neutral-900 w-[400px] rounded-2xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Content</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-black dark:hover:text-white" />
          </button>
        </div>

        {/* Title input */}
        <div className="mb-3">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
          />
        </div>

        {/* Link input */}
        <div className="mb-3">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Link
          </label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter link"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
          />
        </div>

        {/* Tags input */}
        <div className="mb-3">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., javascript, react, backend"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
          />
        </div>

        {/* Type selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-full border ${
                selectedType === type
                  ? "bg-blue-600 text-white"
                  : "border-gray-400 text-gray-700 dark:text-gray-300"
              } text-sm hover:bg-blue-100 dark:hover:bg-neutral-700 transition`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={submitContent}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};
