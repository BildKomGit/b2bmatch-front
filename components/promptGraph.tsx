// import React, { useState, useEffect } from 'react';

// const PromptGrph = () => {
//   const [data, setData] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // This function is called once, after the component is mounted
//     fetch('http://46.101.116.31:3000/get-treemap')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.text();
//       })
//       .then((treemapData) => {
//         setData(treemapData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);  // The empty dependency array tells React to run the effect once, after the initial render.

//   if (loading) {
//     return <img src="/Intro.svg" className="w-full rounded-lg flex text-lg mt-2 h-[500px]" />;
//   }
//   if (error) return <p>Error: {error}</p>;
//   return (
//     <div className="w-full rounded-lg flex text-lg mt-2 h-[500px]">
//       <div className="absolute w-11/12">
//         <iframe
//           className="w-full rounded-lg mr-3 h-[1020px] absolute z-10"
//           srcDoc={data}
//         />
//       </div>
//     </div>
//   );
// };

// export default PromptGrph;
import React, { useEffect, useState } from "react";
import { useRefresh } from "./RefreshContext";

interface PromptGraphProps {
  userInput: string; // Define the type for userInput explicitly
  loading: boolean; // Add loading state
  error: boolean; // Add error state
  data: string | null; // Add data state
}

const PromptGraph: React.FC<PromptGraphProps> = ({
  userInput,
  loading,
  error,
  data,
}) => {
  const { refreshKey } = useRefresh();
  const [contentType, setContentType] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      if (data === "/LongRendering.svg" || data === "/OutOfScope.svg" || data === "/Intro.svg") {
        setContentType("image/svg+xml");
      } else {
        setContentType("text/html");
      }
    }
  }, [data]);

  return (
    <div key={refreshKey}>
      <div className="w-full h-[500px] flex flex-col items-center justify-center">
        {loading ? (
          <img
            src="/LongRendering.svg"
            alt="Loading..."
            className="w-full h-[500px]"
          />
        ) : error ? (
          <img src="/OutOfScope.svg" alt="Error" className="w-full h-[500px]" />
        ) : (
          data &&
          (contentType === "text/html" ? (
            <iframe
              srcDoc={data}
              title="Dynamic Content"
              className="w-full h-full"
              frameBorder="0"
            />
          ) : (
            <img src={data} alt="Dynamic Graph" className="w-full h-full" />
          ))
        )}
      </div>
    </div>
  );
};

export default PromptGraph;
