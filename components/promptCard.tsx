import React, { useEffect, useState } from "react";
interface TextCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  customMessage: string;
}

const TextCard: React.FC<TextCardProps> = ({
  description,
  customMessage,
}) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const queryTitle = params.get('title');
    if (queryTitle) {
      setTitle(queryTitle);
    }
  }, []);
  
  return (
    <div className="pt-1 pb-1 drop-shadow-lg  w-full ">
      <div className=" flex rounded-lg h-fit bg-response p-3 flex-col border-bor border-2 text-foreground ">
        <h2 className="text-foreground  text-lg font-medium">Tipps</h2>
        <div className="flex flex-col justify-between flex-grow">
          <p className="leading-relaxed text-base text-foreground ">
            {customMessage} {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextCard;