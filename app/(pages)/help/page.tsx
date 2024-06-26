import Footer from "@/components/footer";
async function fetchHtmlContent() {
  const token = process.env.GIT_ACCESS_TOKEN;
  const repoOwner = process.env.repoOwner;
  const repoName = process.env.repoName;
  const filePath = "help.html";
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=main`;
  try {
    console.log("curl -H Authorization: token "token+" "+apiUrl);
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}`, } });
    const data = await response.json();
    console.log(data)
    const base64Content = data.content;
    const htmlContent = new TextDecoder('utf-8').decode(Buffer.from(data.content, 'base64'));
    return htmlContent;
  } catch (error) {
    console.error("Error fetching HTML content:", error);
    return null;
  }
}
export default async function HelpPage() {
  const html = await fetchHtmlContent();
  return (
    <>
      <div className="bg-secondary flex flex-col text-center justify-center h-screen overflow-hidden">
        <div className="w-full  h-screen overflow-auto ">
          <div dangerouslySetInnerHTML={{ __html: html || <h1>Loading...</h1> }} />
        </div>
        <Footer />
      </div>
    </>
  );
}
