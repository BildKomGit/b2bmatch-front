"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import PromptText from "./promptText";
import TextCard from "@/components/promptCard";
import PromptRes from "@/components/promptRes";
import PromptGraph from "@/components/promptGraph";
import Footer from "@/components/footer";
import { RefreshProvider } from "./RefreshContext";

export default function Main() {
  const [userInput, setUserInput] = useState("");
  const [tips, setTips] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<string | null>("/Intro.svg");
  const [promptText, setPromptText] = useState("");
  const resetStates = () => {
    setUserInput("");
    setTips("");
    setResponseMessage("");
    setLoading(false);
    setError(false);
    setData("/Intro.svg");
    setPromptText("");
  };
  return (
    <>
      <RefreshProvider>
        <div
          className={cn(
            "flex font-sans antialiased bg-secondary text-foreground text-xl overflow-hidden border-bor border-2 rounded-lg"
          )}
        >
          <div className="overflow-scroll overflow-x-hidden relative max-h-lvh border-bor border-2 rounded-lg w-full">
            <div className="w-full rounded-lg flex flex-col p-4">
              <PromptText
                setUserInput={setUserInput}
                setTips={setTips}
                setResponseMessage={setResponseMessage}
                setLoading={setLoading} // Pass loading state setter
                setError={setError} // Pass error state setter
                setData={setData} // Pass data state setter
                resetStates={resetStates}
                initialPromptText={promptText}
              />
              <TextCard
                title={""}
                description=""
                buttonText="Learn More"
                buttonLink="#"
                customMessage={tips}
              />
              <PromptRes responseMessage={responseMessage} />
              <PromptGraph
                userInput={userInput}
                loading={loading}
                error={error}
                data={data}
              />
            </div>
            <Footer />
          </div>
        </div>
      </RefreshProvider>
    </>
  );
}
