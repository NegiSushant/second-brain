import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";
import { ImageCard } from "./ImageCard";
import { Delete } from "../icons/deleteIcon";
import Swal from "sweetalert2";
import axios from "axios";
import { EditIcon } from "../icons/EditIcon";
import { useState } from "react";
import { EditContentModal } from "./EditContent";

const API = import.meta.env.VITE_API_URL;

interface CardProps {
  _id: string;
  title: string;
  link: string;
  description?: string;
  type: string;
  tags: string[];
  onSuccess: () => void;
}

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton:
      "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2",
    cancelButton:
      "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mr-2",
  },
  buttonsStyling: false,
});

export default function Card({
  _id,
  title,
  link,
  description,
  type,
  tags,
  onSuccess: onSuccess,
}: CardProps) {
  const [data, setData] = useState({
    title,
    description: description || "",
    link,
    type,
    // tags: tags.map((t) => (typeof t === "string" ? t : t.title || "")),
    tags: tags.map((t: string | { title?: string }) =>
      typeof t === "string" ? t : t.title || ""
    ),
  });
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDeleteCard = async () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(
              `${API}/content/content/${_id}`,
              { withCredentials: true }
            );
            if (response.status === 200) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your card has been deleted successfully.",
                icon: "success",
              });
              onSuccess();
            }
          } catch (err) {
            const errorMsg = err || "Something went wrong!";
            swalWithBootstrapButtons.fire({
              title: "Error!",
              text: errorMsg.toString(),
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your card is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleExternalLink = () => {
    if (link) {
      const validUrl = link.startsWith("http") ? link : `https://${link}`;
      window.open(validUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("No link available for this card.");
    }
  };

  const handleUpdate = (updatedData: typeof data) => {
    setData({
      ...updatedData,
      tags: updatedData.tags.map((t: string | { title?: string }) =>
        typeof t === "string" ? t : t.title || ""
      ),
    });
    setIsEditOpen(false);
    onSuccess();
  };

  return (
    <>
      <div className="border border-gray-800 rounded-2xl bg-black text-white shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden justify-between w-[90%] sm:w-[320px] md:w-[280px] h-auto md:h-[420px] mx-auto p-4">
        {/* Top icons */}
        <div className="flex justify-end gap-4 mb-1">
          <button
            onClick={handleExternalLink}
            className="rounded-2xl hover:bg-gray-800 cursor-pointer transition-colors duration-200"
          >
            <ExternalLinkIcon />
          </button>

          <button
            onClick={() => setIsEditOpen(true)}
            className="rounded-2xl hover:bg-gray-800 cursor-pointer transition-colors duration-200"
          >
            <EditIcon />
          </button>
          <button
            onClick={handleDeleteCard}
            className="rounded-2xl hover:bg-gray-800 cursor-pointer transition-colors duration-200"
          >
            <Delete />
          </button>
        </div>

        {/* Content section */}
        <div className="w-full h-[220px] sm:h-[240px] md:h-[250px] border border-gray-800 rounded-xl overflow-hidden">
          <ImageCard link={data.link} />
        </div>

        {/* Text content */}
        <div className="mt-3 space-y-1">
          <h2 className="font-bold text-lg sm:text-xl truncate">
            {data.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-snug h-[70px] overflow-y-auto scrollbar-hide">
            {data.description}
          </p>
        </div>

        {/* Tags section */}
        <div className="flex flex-wrap gap-2 mt-3">
          {data.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs sm:text-sm text-gray-300 bg-gray-800 border border-gray-700 px-2 py-1 rounded-full hover:bg-gray-700 transition"
            >
              {/* #{tag.title} */}#{tag}
            </span>
          ))}
        </div>
      </div>
      {/* Edit Modal */}
      {isEditOpen && (
        <EditContentModal
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          content={{ _id, ...data }}
          // onSuccess={handleUpdate}
          onSuccess={() => handleUpdate(data)}
        />
      )}
    </>
  );
}
