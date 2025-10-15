import { useState } from "react";
import { Button } from "./button";
import { AddContentModal } from "./AddContent";
import { ShareBrain } from "./ShareBrain";

interface TitleProps {
  title: string;
}

export const BrainNav = ({ title }: TitleProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between items-center border border-neutral-800 rounded-full px-4 py-2 bg-black/80 shadow-sm backdrop-blur-sm">
        <div className="font-bold text-2xl font-custom text-white ml-2 h-10 overflow-hidden">
          {title || "All Notes"}
        </div>

        <div className="flex gap-2">
          <Button
            btype="share"
            content="Share Brain"
            onClick={() => setIsShareModalOpen(true)}
            className="rounded-full bg-white text-black hover:bg-gray-200 transition-all flex items-center gap-2 px-4 py-1.5 text-sm font-medium"
          />
          <Button
            btype="add"
            content="Add Content"
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-white text-black hover:bg-gray-200 transition-all flex items-center gap-2 px-4 py-1.5 text-sm font-medium"
          />
        </div>
      </div>

      <AddContentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ShareBrain
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
};
