import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

interface EditContentModalProps {
  open: boolean;
  onClose: () => void;
  content: {
    _id: string;
    title: string;
    description?: string;
    link?: string;
    type: string;
    tags: string[];
  };
  onSuccess: () => void;
}

export const EditContentModal = ({
  open,
  onClose,
  content,
  onSuccess: onSuccess,
}: EditContentModalProps) => {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description || "");
  const [link, setLink] = useState(content.link || "");
  const [tags, setTags] = useState(content.tags.join(", "));
  const [selectedType, setSelectedType] = useState(content.type);
  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const types = ["video", "notion", "tweets", "links", "document", "code"];

  useEffect(() => {
    if (open) {
      const fetchTags = async () => {
        try {
          const result = await axios.get(`${API}/content/tags`, {
            withCredentials: true,
          });
          setExistingTags(result.data.data || []);
        } catch (err) {
          console.error("Failed to fetch tags: ", err);
        }
      };
      fetchTags();
    }
  }, [open]);

  if (!open) return null;

  const validateFile = (file: File, type: string): string | null => {
    const fileSizeInMB = 5;
    const allowedDocs = {
      exts: [".pdf", ".doc", ".docx", ".txt", ".md"],
      mimes: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    };
    const allowedCode = {
      exts: [".js", ".ts", ".py", ".java", ".cpp", ".c", ".cs", ".go", ".json"],
      mimes: [
        "text/javascript",
        "application/javascript",
        "text/x-python",
        "text/plain",
      ],
    };

    const fileExt = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    const mime = file.type;

    const blockedExts = [
      ".exe",
      ".bat",
      ".cmd",
      ".sh",
      ".scr",
      ".zip",
      ".rar",
      ".dll",
      ".msi",
    ];
    if (blockedExts.includes(fileExt)) {
      return `File type not allowed: ${fileExt}`;
    }

    const allowed =
      type === "document"
        ? allowedDocs.exts.includes(fileExt) && allowedDocs.mimes.includes(mime)
        : allowedCode.exts.includes(fileExt);

    if (!allowed) {
      return "Invalid file type or MIME detected.";
    }

    if (file.size > fileSizeInMB * 1024 * 1024) {
      return `File too large. Max ${fileSizeInMB}MB allowed.`;
    }

    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const error = validateFile(selectedFile, selectedType!);
    if (error) {
      alert(error);
      if (fileRef.current) fileRef.current.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const submitEdit = async () => {
    if (!selectedType || !title.trim()) {
      alert("Please fill in title and select a type!");
      return;
    }

    const isFileType = selectedType === "document" || selectedType === "code";
    if (isFileType) {
      if (!file && !content.link) {
        alert("Please select a file for document or code!");
        return;
      }

      if (file) {
        const validationError = validateFile(file, selectedType);
        if (validationError) {
          alert(validationError);
          return;
        }
      }
    } else {
      if (!link.trim()) {
        alert("Please provide a link!");
        return;
      }
      try {
        const url = new URL(link.trim());
        if (!/^https?:$/.test(url.protocol)) {
          alert("Invalid link format — must start with http/https!");
          return;
        }
      } catch {
        alert("Invalid link format!");
        return;
      }
    }

    const cleanTags = tags
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t)
      : [];

    try {
      setLoading(true);
      let response;

      if (isFileType && file) {
        const formData = new FormData();
        formData.append("type", selectedType);
        formData.append("title", title.trim());
        formData.append("description", description.trim());
        formData.append("tags", JSON.stringify(cleanTags));
        formData.append("file", file);

        response = await axios.put(
          `${API}/content/content/${content._id}`,
          formData,
          {
            withCredentials: true,
          }
        );
      } else {
        response = await axios.put(
          `${API}/content/content/${content._id}`,
          {
            type: selectedType,
            link: link.trim(),
            title: title.trim(),
            description: description.trim(),
            tags: cleanTags,
          },
          { withCredentials: true }
        );
      }

      if (response.status === 200) {
        alert("Content updated successfully");
        onSuccess();
        onClose();
      } else {
        alert("Failed to update content");
      }
    } catch (err) {
      alert("Error: " + err);
    } finally {
      setLoading(false);
    }
  };

  const showTypeSelector = title.trim().length > 0;
  const isFileType = selectedType === "document" || selectedType === "code";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-neutral-900 w-[400px] rounded-2xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Content</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-black dark:hover:text-white" />
          </button>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Description
            </label>
            <span
              className={`text-sm ${
                description.length > 200 ? "text-red-400" : "text-gray-400"
              }`}
            >
              {description.length}/250
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => {
              const input = e.target.value;
              if (input.length <= 250) setDescription(input);
            }}
            placeholder="Enter description (optional, max 250 characters)"
            rows={3}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 resize-none"
          />
        </div>

        {/* Type selector */}
        {showTypeSelector && (
          <div className="mb-3">
            <label className="text-sm text-gray-600 dark:text-gray-300 block mb-2">
              Type *
            </label>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => {
                const isDisabled = type !== content.type;
                return (
                  <button
                    key={type}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      if (!isDisabled) setSelectedType(type);
                    }}
                    className={`px-3 py-1 rounded-full border ${
                      selectedType === type
                        ? "bg-blue-600 text-white"
                        : "border-gray-400 text-gray-700 dark:text-gray-300"
                    } text-sm transition ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-100 dark:hover:bg-neutral-700"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Type cannot be changed after creation.
            </p>
          </div>
        )}

        {/* Tags */}
        {selectedType && (
          <div className="mb-3">
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., javascript, react, backend"
              list="tagSuggestions"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
            />
            <datalist id="tagSuggestions">
              {existingTags.map((tag) => (
                <option key={tag} value={tag} />
              ))}
            </datalist>
          </div>
        )}

        {/* File or Link */}
        {selectedType && (
          <>
            {isFileType ? (
              <div className="mb-3">
                <label className="text-sm text-gray-600 dark:text-gray-300">
                  Upload Document/Code *
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-neutral-700 dark:file:text-neutral-300"
                  accept={
                    selectedType === "code"
                      ? ".js,.ts,.py,.java,.cpp,.c,.cs,.go,.json"
                      : ".pdf,.docx,.doc,.txt,.md"
                  }
                />
              </div>
            ) : (
              <div className="mb-3">
                <label className="text-sm text-gray-600 dark:text-gray-300">
                  Link *
                </label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Enter link (e.g., https://example.com)"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
                />
              </div>
            )}
          </>
        )}

        <button
          onClick={submitEdit}
          disabled={loading || !selectedType}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};
