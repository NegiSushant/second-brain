import { Button } from "./button";

export const BrainNav = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <div>All Component</div>
      <div className="flex flex-row justify-items-end p-0 m-0">
        <Button btype="share" content="Share Brain" />
        <Button btype="Add" content="Add Content" />
      </div>
    </div>
  );
};
