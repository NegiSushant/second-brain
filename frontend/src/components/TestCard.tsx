import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";
import { ImageCard } from "../components/ImageCard";
import { Delete } from "../icons/deleteIcon";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

interface TestCardProps {
  _id: string;
  title: string;
  link: string;
  type?: string;
  tags: string[];
  onDeleteSuccess: () => void;
}

export default function TestCard({
  _id,
  title,
  link,
  tags,
  onDeleteSuccess,
}: TestCardProps) {
  const handleDeleteCard = async () => {
    try {
      const response = await axios.delete(`${API}/content/content/${_id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("Card deleted Successfully!");
        onDeleteSuccess();
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleExternalLink = () => {
    if (link) {
      const validUrl = link.startsWith("http") ? link : `https://${link}`;
      window.open(validUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("No link available for this card.");
    }
  };
  return (
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
          onClick={handleDeleteCard}
          className="rounded-2xl hover:bg-gray-800 cursor-pointer transition-colors duration-200"
        >
          <Delete />
        </button>
      </div>

      {/* Content section */}
      <div className="w-full h-[220px] sm:h-[240px] md:h-[250px] border border-gray-800 rounded-xl overflow-hidden">
        <ImageCard link={link} />
      </div>

      {/* Text content */}
      <div className="mt-3 space-y-1">
        <h2 className="font-bold text-lg sm:text-xl truncate">{title}</h2>
        <p className="text-sm sm:text-base text-gray-300 leading-snug h-[70px] overflow-y-auto scrollbar-hide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
          cupiditate optio quod similique dolore recusandae necessitatibus nihil
          iure eum delectus ad totam deserunt culpa exercitationem labore dolor
          officia, quis dicta.
        </p>
      </div>

      {/* Tags section */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs sm:text-sm text-gray-300 bg-gray-800 border border-gray-700 px-2 py-1 rounded-full hover:bg-gray-700 transition"
          >
            #{tag.title}
          </span>
        ))}
      </div>
    </div>
  );
}
