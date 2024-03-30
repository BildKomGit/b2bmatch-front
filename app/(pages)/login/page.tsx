"use client";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/footer";

export default function Login() {
  const [activeTab, setActiveTab] = useState("account");

  const switchToSignupTab = () => {
    setActiveTab("password");
  };

  const switchToLoginTab = () => {
    setActiveTab("account");
  };

  return (
    <div className="flex  flex-col w-full  h-full">
      <div className="flex flex-col h-screen justify-center items-center self-center bg-[#e2e8db] w-full">
        <div className="flex flex-col mt-10 box-border shadow-primary shadow-xl border-2 w-fit p-10 rounded-xl bg-[#c1d0ac] ">
          <div className="grid w-[500px] grid-cols-2 bg-secondary  rounded-md p-2 outline-none mb-5">
            <button
              className={`p-3 font-bold rounded-lg focus:outline-none ${activeTab === "account" ? "bg-primary text-secondary" : ""
                }`}
              onClick={() => setActiveTab("account")}
            >
              Anmelden
            </button>
            <button
              className={`p-3 font-bold rounded-lg focus:outline-none ${activeTab === "password" ? "bg-primary text-secondary" : ""
                }`}
              onClick={() => setActiveTab("password")}
            >
              Registrieren
            </button>
          </div>
          {activeTab === "account" ? (
            <LoginForm switchToSignupTab={switchToSignupTab} />
          ) : (
            <SignupForm switchToLoginTab={switchToLoginTab} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
