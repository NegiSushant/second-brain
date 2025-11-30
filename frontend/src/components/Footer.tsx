import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-6 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Left Section */}
        <div className="flex items-center gap-2 text-gray-500">
          <span>© {new Date().getFullYear()} MindVault</span>
          <span className="hidden md:inline">
            • Built with React + Tailwind
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5 text-xl">
          <a
            href="https://twitter.com/Negi25_"
            className="text-gray-600 hover:text-blue-500"
            target="_blank"
          >
            <FaTwitter />
          </a>

          <a
            href="https://linkedin.com/in/sushant-singh-negi-4382b4243"
            className="text-gray-600 hover:text-blue-600"
            target="_blank"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/NegiSushant"
            className="text-gray-600 hover:text-black"
            target="_blank"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
