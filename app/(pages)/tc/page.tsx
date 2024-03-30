import * as React from "react";
import Footer from "@/components/footer";

async function fetchHtmlContent() {
  const token = process.env.GIT_ACCESS_TOKEN;
  const repoOwner = process.env.repoOwner;
  const repoName = process.env.repoName;  
  const filePath = "gtc.html"; // Update with the actual path

  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

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

export default async function GTC() {
  const html = await fetchHtmlContent();

  return (
    <>
      <div className="bg-secondary flex flex-col text-center justify-center">
        <div className={`w-full max-h-screen overflow-auto`}>

          <div dangerouslySetInnerHTML={{ __html: html || <h1>loading...</h1> }} />

          <Footer />
        </div>
      </div>
    </>
  );
}
