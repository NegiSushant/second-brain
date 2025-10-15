interface CardHeaderSchema {
  title: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const CardHeader = ({ title, onClick }: CardHeaderSchema) => {
  return (
    <div className="w-full flex justify-between mt-0 p-0.5">
      <h3 className="font-medium text-base text-gray-50 z-10">{title}</h3>
      <button
        className="font-medium text-gray-50 border-2 rounded px-1"
        onClick={onClick}
      >
        Delete Brain
      </button>
    </div>
  );
};
