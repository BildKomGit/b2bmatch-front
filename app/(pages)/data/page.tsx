import * as React from "react";
import Footer from "@/components/footer";

async function fetchHtmlContent() {
  const repoOwner = process.env.repoOwner;
  const repoName = process.env.repoName;
  const filePath = "data.html"; // Update with the actual path
  const token = process.env.GIT_ACCESS_TOKEN;
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=main`;

  try {
    const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}`, } });
    const data = await response.json();

    // Use the 'content' property directly for HTML content
    const base64Content = data.content;

    // Decode base64 content
    const htmlContent = new TextDecoder('utf-8').decode(Buffer.from(data.content, 'base64'));

    return htmlContent;
  } catch (error) {
    console.error("Error fetching HTML content:", error);
    return null;
  }
}

export default async function data() {
  const html = await fetchHtmlContent();

  return (
    <>
      <div className="bg-secondary flex flex-col text-center justify-center">
        <div className={`w-full max-h-screen overflow-auto bg-secondary `}>

          
            <div dangerouslySetInnerHTML={{ __html: html || <h1>Loading...</h1> }} className="bg-secondary" />
          

          <Footer />
        </div>
      </div>
    </>
  );
}
