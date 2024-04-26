import React from "react";
type PromptResProps = {
  responseMessage: string;
};
const PromptRes: React.FC<PromptResProps> = ({ responseMessage }) => {
  return (
    <>
      <div className="flex flex-col w-full rounded-lg pt-2 pb-2">
        <div className=" w-full bg-response border-bor border-2 rounded-lg p-3 text-lg max-h-34 overflow-auto ">
          <p className="  text-lg">
            Hier wird Ihr Suchergebnis verbal dargestellt. Die Grafik zeigt Ihnen dasselbe mit mehr Details.
          </p>
          <p className="  text-lg">
            {responseMessage}
          </p>
        </div>
      </div>
    </>
  );
};

export default PromptRes;
