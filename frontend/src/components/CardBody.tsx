interface CardBodyProps {
    link: string;
    tags: string [];
    type: string;
}


export const CardBody = ({link, type, tags}: CardBodyProps) => {
    
  return (
    <div className="text content">
      <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
        {link}
      </h1>
      <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
        {tags.map((tag, index) => {
          return (
            <span
              key={index}
              className="mr-2 border-2 border-gray-100 px-2 rounded-full"
            >
              #{tag.title}
            </span>
          );
        })}
      </p>
    </div>
  );
};
