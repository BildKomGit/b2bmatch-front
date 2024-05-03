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
import React, { useState, useEffect } from 'react';
interface PromptGrphProps {
  userInput: string; // Define the type for userInput explicitly
}
const PromptGrph : React.FC<PromptGrphProps> = ({ userInput }) => {
  const [data, setData] = useState(null); // For fetched data or local file path
  const [loading, setLoading] = useState(true);
  const [contentType, setContentType] = useState<string | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    function fetchData(url: string) {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const contentType = response.headers.get('Content-Type');
          console.log('Content-Type:', contentType);
          setContentType(response.headers.get('Content-Type'));
          return response.text();
        })
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
          setContentType('image/svg+xml');
        });
    }

    if (userInput === "Case1") {
      // Use local SVG for Case2
      setData('/LongRendering.svg');
      setContentType('image/svg+xml'); // Directly set local file path
      setLoading(false); // No fetching, so not loading
    } else if (userInput === "Case2") {
      // Fetch the graph from a URL
      fetchData('http://46.101.116.31:3000/get-treemap');
    }
  }, [userInput]); // React only to changes in userInput

  if (loading) {
    return <img src="/Intro.svg" alt="Loading..." className="w-full h-[500px]" />;
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-center">
      {contentType?.includes('text/html')? (
        // Render HTML content in an iframe
        <iframe srcDoc={data || ""} title="Dynamic Content" className="w-full h-full" frameBorder="0" />
      ) : (
        // Render SVG or other content types using img tag
        data && <img src={data} alt="Dynamic Graph" className="w-full h-full" />
      )}
    </div>
  );
};

export default PromptGrph;
