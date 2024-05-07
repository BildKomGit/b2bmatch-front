"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "./ui/textarea";
import "../app/globals.css";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { collectGenerateParams } from "next/dist/build/utils";
interface Props {
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setTips: React.Dispatch<React.SetStateAction<string>>;
  setResponseMessage: React.Dispatch<React.SetStateAction<string>>;
}
const PromptText = ({ setUserInput, setTips, setResponseMessage }: Props) => {
  const { data: session } = useSession();
  const submitButtonRef = useRef(null);
  const [promptText, setPromptText] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


  const [promptString, setPromptString] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const queryPromptString = params.get('prompt_string');
    const queryTitle = params.get('title');
    console.log(queryPromptString)
    if (queryPromptString) {
      setPromptString(queryPromptString);
    }
    if (queryTitle) {
      setTitle(queryTitle);
    }
  }, []);


  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      submitButtonRef.current.click();
    }
  };

  const handleNew = () => {
    window.location.reload();
  };

  const handleSave = async () => {
    if (promptText.trim().length === 0) {
      toast.error("Geben Sie zuerst Ihre Suchanfrage ein");
      return;
    }
    setUserInput(promptText);
    //if (session) {
    const headersList = {
      //"Authorization": `Bearer ${session.access_token}`,
      "Content-Type": "application/json"
    };
    try {
      const apiUrl = `${API_BASE_URL}/library/store_prompt`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headersList,
        body: JSON.stringify({
          user_id: "1",
          prompt_string: promptText,
        }),
      });

      if (!response.ok) {
        console.log(response);
        toast.error("Melden Sie sich zuerst an, um Ihre Eingabeaufforderungen zu speichern");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setTips(responseData.tips);
      setResponseMessage(responseData.response);
      toast.success(`${responseData.message} `, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("API Response:", responseData);
    } catch (error) {
      console.error("API Error:", error);
    }
    // } else {
    //   console.log("here is nothing");
    //   toast.error("Melden Sie sich zuerst an, um Ihre Eingabeaufforderungen zu speichern");
    // }
  };

  return (
    <>
      <div className="flex w-full items-center mb-2">
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
            className={`bg-primary text-secondary text-sm h-7 border-white border"
              }`}
            ref={submitButtonRef}
          >
            Speichern
          </Button>
          <Button
            variant={"outline"}
            className={`bg-primary text-secondary h-7 border-white border"
              }`}
            onClick={handleNew}
          >
            Neu
          </Button>
          <Button
            variant={"outline"}
            className={`bg-primary text-secondary h-7 border-white border"
              }`}
            onClick={handleSave}
          >
            Senden
          </Button>
        </div>
      </div>
    </>
  );
};

export default PromptText;