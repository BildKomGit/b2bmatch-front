"use client";
import { cn } from "@/lib/utils";
import PromptText from "./promptText";
import TextCard from "@/components/promptCard";
import React, { useRef,useState } from "react";
import PromptRes from "@/components/promptRes";
import PromptGraph from "@/components/promptGraph";
import Footer from "@/components/footer";
export default function Main() {
  const [userInput, setUserInput] = useState("")
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
            <PromptText setUserInput={setUserInput} setTips={setTips} setResponseMessage={setResponseMessage}/>
            <TextCard
              title=""
              description=""
              buttonText="Learn More"
              buttonLink="#"
              customMessage={tips}
            />
            <PromptRes responseMessage={responseMessage}  />
            <PromptGraph userInput={userInput}/>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
