import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';
const PromptText = dynamic(() => import('./promptText'), {
  ssr: false  // This will ensure that the component is only rendered on the client-side
});
import TextCard from "@/components/promptCard";
import React, { useRef,useState } from "react";
import PromptRes from "@/components/promptRes";
import PromptGraph from "@/components/promptGraph";
import Footer from "@/components/footer";
export default function Main() {
  const [tips, setTips] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  return (
    <>
      <div
        className={cn(
          "flex font-sans antialiased bg-secondary text-foreground text-xl overflow-hidden border-bor border-2 rounded-lg"
        )}
      >
        <div className="overflow-scroll overflow-x-hidden relative max-h-lvh border-bor border-2 rounded-lg w-full">
          <div className="w-full  rounded-lg flex flex-col p-4">
            <PromptText setTips={setTips} setResponseMessage={setResponseMessage}/>
            <TextCard
              title=""
              description=""
              buttonText="Learn More"
              buttonLink="#"
              customMessage={tips}
            />
            <PromptRes responseMessage={responseMessage}  />
            <PromptGraph />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
