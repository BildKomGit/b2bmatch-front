import React from "react";
const PromptRes = () => {
  return (
    <>
      <div className="flex flex-col w-full rounded-lg pt-2 pb-2">
        <div className=" w-full bg-response border-bor border-2 rounded-lg p-3 text-lg max-h-34 overflow-auto ">
          <p className="  text-lg">
            Hier wird Ihr Suchergebnis verbal angezeigt. Die Graphik zeigt Ihnen das gleiche mit mehr Details.
          </p>
          <p className="  text-lg">
            {/* Text field left intentionally empty */}
          </p>
        </div>
      </div>
    </>
  );
};

export default PromptRes;
