// LibraryText.tsx
import React from "react";
import { Button } from "./ui/button";

interface Prompt {
  pro_hist_id: number;
  prompt_string: string;
}

interface LibraryTextProps {
  prompt: Prompt;
  onReactivateClick: (pro_hist_id: number) => void;
  onDeleteClick: (pro_hist_id: number) => void;
}

const LibraryText: React.FC<LibraryTextProps> = ({ prompt, onReactivateClick, onDeleteClick }) => {
  return (
    <div className="w-11/12">
      <div className="flex flex-row m-2 w-11//12 hover:bg-bor rounded-3xl">
        <p className="p-3 border-primary text-secondary-foreground bg-response rounded-xl text-lg w-11/12 border-[1px] outline-none transition-all duration-500">
          {prompt.prompt_string}
        </p>
        <div className="m-2 text-center w-[150px]">
          <Button
            variant={"outline"}
            className="bg-primary text-secondary h-7 border-white border w-40px m-1 w-24"
            onClick={() => onReactivateClick(prompt.pro_hist_id)}
          >
            Aktivieren
          </Button>
          <Button
            variant={"outline"}
            className="bg-primary text-secondary h-7 border-white border w-40px m-1 w-24"
            onClick={() => onDeleteClick(prompt.pro_hist_id)}
          >
            Löschen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LibraryText;
