"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "./ui/textarea";
import "../app/globals.css";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRefresh } from "./RefreshContext";

interface Props {
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setTips: React.Dispatch<React.SetStateAction<string>>;
  setResponseMessage: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<string | null>>;
  resetStates: () => void;
  initialPromptText: string;
}

const PromptText = ({
  setUserInput,
  setTips,
  setResponseMessage,
  setLoading,
  setError,
  setData,
  resetStates,
  initialPromptText
}: Props) => {
  const { data: session } = useSession();
  const submitButtonRef = useRef(null);
  const [promptText, setPromptText] = useState(initialPromptText);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [promptString, setPromptString] = useState("");
  const [title, setTitle] = useState("");
  const { triggerRefresh } = useRefresh();

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const queryPromptString = params.get("prompt_string");
    const queryTitle = params.get("title");
    console.log(queryPromptString);
    if (queryPromptString) {
      setPromptString(queryPromptString);
    }
    if (queryTitle) {
      setTitle(queryTitle);
    }
  }, []);
  useEffect(() => {
    setPromptText(initialPromptText);
  }, [initialPromptText]);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleNew = () => {
    resetStates();
  };

  const handleSave = () => {
    if (!session) {
      toast.error(
        "Bitte registrieren Sie sich, damit Sie alle Funktionen benutzen können"
      );
      return;
    }
  };

  const handleSend = async () => {
    if (promptText.trim().length === 0) {
      toast.error("Geben Sie zuerst Ihre Suchanfrage ein");
      return;
    }
    setUserInput(promptText);
    setLoading(true); // Set loading to true when the API call starts
    setError(false); // Reset error state
    setData("/LongRendering.svg"); // Set loading SVG

    const headersList = {
      "Content-Type": "application/json",
    };

    try {
      const apiUrl = `${API_BASE_URL}/library/store_prompt`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headersList,
        body: JSON.stringify({
          user_id: session?.user.sub,
          prompt_string: promptText,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setTips(responseData.tips);
      setResponseMessage(responseData.response);

      // Fetch treemap data
      const treemapResponse = await fetch("http://46.101.116.31:3000/get-treemap", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!treemapResponse.ok) {
        throw new Error(`HTTP error! Status: ${treemapResponse.status}`);
      }

      const treemapData = await treemapResponse.text();
      setData(treemapData);

      toast.success(`${responseData.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      setError(true); // Set error state if the API call fails
      console.error("API Error:", error);
      setData("/OutOfScope.svg"); // Set error SVG
    } finally {
      setLoading(false); // Set loading to false when the API call finishes
    }
  };

  return (
    <>
      <div className="flex w-full mb-2">
        <Textarea
          placeholder="Geben Sie hier Ihre Suchanfrage ein..."
          rows={3}
          className="pl-4 text-secondary-foreground bg-white border-2 rounded-xl text-lg w-full mt-2 border-bor focus:outline-none"
          onKeyDown={handleKeyDown}
          value={promptString || promptText}
          onChange={(e) => setPromptText(e.target.value)}
        />
        <div className="flex flex-col m-2 w-24">
          <Button
            variant={"outline"}
            className="bg-primary text-secondary h-7 border-white border"
            onClick={handleNew}
          >
            Neu
          </Button>
          <Button
            variant={"outline"}
            className="bg-primary text-secondary h-7 border-white border"
            onClick={handleSend}
          >
            Senden
          </Button>
        </div>
      </div>
    </>
  );
};

export default PromptText;
