async function getTreemap() {
  const res = await fetch('http://46.101.116.31:3000/get-treemap', {
    cache: 'no-store',
    headers: {
      'Authorization': `${process.env.JWT_TOKEN}`,
    },
  });
  const data = await res.text();
  return data;
}

const PromptGrph = async () => {
  const data = await getTreemap();
  return (
    <div className="w-full rounded-lg flex text-lg mt-2 h-[500px]">
      <div className="absolute w-11/12">
        <iframe
          className="w-full rounded-lg mr-3 h-[1020px] absolute z-10"
          srcDoc={data}
        />
        <img src="/intro.svg" className="h-[420px] absolute z-0 w-11/12" />
      </div>
    </div>
  );
};

export default PromptGrph;
