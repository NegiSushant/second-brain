"use client";
import { useState } from "react";
import { Button } from "./button";
import { AddContentModal } from "./AddContent";

interface title {
  title: string;
}

export const BrainNav = ({ title }: title) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="font-medium">{title ? title : "All Component"}</div>
        <div className="flex flex-row justify-items-end p-0 m-0">
          <Button
            btype="share"
            content="Share Brain"
            onClick={() => alert("hello")}
          />
          <Button
            btype="Add"
            content="Add Content"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      <AddContentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
