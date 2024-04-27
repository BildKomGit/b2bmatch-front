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
        <div className="overflow-scroll overflow-x-hidden relative max-h-lvh border-bor border-2 rounded-lg">
          <div className="w-11/12  rounded-lg flex flex-col p-4">
            <PromptText />
            <TextCard
              title="Tipps"
              description=""
              buttonText="So gehts besser"
              buttonLink="#"
              customMessage="Hier erhalten Sie Infos, wie Sie Ihre Suchanfragen verbessern können."
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
