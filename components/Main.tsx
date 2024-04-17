import { cn } from "@/lib/utils";
import PromptText from "./promptText";
import TextCard from "@/components/promptCard";
import React, { useRef } from "react";
import PromptRes from "@/components/promptRes";
import PromptGraph from "@/components/promptGraph";
import Footer from "@/components/footer";
export default function Main() {

  return (
    <>
      <div
        className={cn(
          "flex font-sans antialiased bg-secondary text-foreground text-xl overflow-hidden border-bor border-2 rounded-lg"
        )}
      >
        <div className="overflow-scroll overflow-x-hidden relative max-h-lvh border-bor border-2 rounded-lg w-full">
          <div className="w-full  rounded-lg flex flex-col p-4">
            <PromptText />
            <TextCard
              title="Title"
              description=""
              buttonText="Learn More"
              buttonLink="#"
              customMessage="This is a  message for Title.This is a  message for Title"
            />
            <PromptRes />
            <PromptGraph />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
