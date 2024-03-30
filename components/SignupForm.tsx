"use client";
import { useState } from "react";
import axios from 'axios';
import CustomIcon from "./Icon";
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = ({ switchToLoginTab }: { switchToLoginTab: any }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const type = showPassword ? "text" : "password";
  const type1 = showCPassword ? "text" : "password";
  const icon = showPassword ? eye : eyeOff;
  const icon1 = showCPassword ? eye : eyeOff;
  const router = useRouter();

  const handleLoginClick = () => {
    switchToLoginTab();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const validateSignupDetails = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!validateSignupDetails()) {
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        name_txt: name,
        email_txt: email,
        password_1_txt: password,
        password_2_txt: confirmPassword,
        accept_terms: true,
      });

      console.log("Signup response:", response.status);

      if (response.status === 201) {
        toast.success("Bestätigen Sie Ihre E-Mail !!!");
        router.push('/');
      } else {
        toast.error("Etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal.");
      }
    } catch (error) {
      console.error("Signup failed:", error);

      if (error.response && error.response.status === 409) {
        toast.error("E-Mail existiert bereits");
      } else {
        toast.error("Anmeldung gescheitert. Bitte versuchen Sie es später noch einmal.");
      }
    }
  };





  return (
    <section className="shadow-none border-none outline-none">
      <div className="flex flex-col items-center justify-center h-full ">
        <div className="w-full bg-secondary rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ein Konto erstellen
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignup}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Deine E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@firma.ch"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete = "on"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nutzername
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nike"
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete = "on"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Passwort
                </label>
                <div className="flex bg-white rounded-lg border-2 border-gray-300">
                  <input
                    type={type}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 border-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    autoComplete = "on"
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="relative transform -translate-y-1/2 text-gray-400 focus:outline-none m-2 mr-3"
                  >
                    <CustomIcon icon={icon} size={20} />
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bestätige das Passwort
                </label>
                <div className="flex bg-white rounded-lg border-2 border-gray-300">
                  <input
                    type={type1}
                    name="Cpassword"
                    id="Cpassword"
                    placeholder="••••••••"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 border-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    autoComplete = "on"
                  />

                  <button
                    type="button"
                    onClick={toggleCPasswordVisibility}
                    className="relative transform -translate-y-1/2 text-gray-400 focus:outline-none m-2 mr-3"
                  >
                    <CustomIcon icon={icon1} size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Ich akzeptiere das{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="/tc"
                    >
                      Geschäftsbedingungen
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-secondary bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Ein Konto erstellen
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Sie haben bereits ein Konto?{" "}
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Hier anmelden
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;