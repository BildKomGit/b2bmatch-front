import React, { useState, useEffect } from 'react';

const PromptGrph = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function is called once, after the component is mounted
    fetch('http://46.101.116.31:3000/get-treemap')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((treemapData) => {
        setData(treemapData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);  // The empty dependency array tells React to run the effect once, after the initial render.

  if (loading) {
    return <img src="/Intro.svg" className="w-full rounded-lg flex text-lg mt-2 h-[500px]" />;
  }
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="w-full rounded-lg flex text-lg mt-2 h-[500px]">
      <div className="absolute w-11/12">
        <iframe
          className="w-full rounded-lg mr-3 h-[1020px] absolute z-10"
          srcDoc={data}
        />
      </div>
    </div>
  );
};

export default PromptGrph;