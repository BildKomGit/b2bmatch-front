"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
const Sidebar = () => {
  const { data: session } = useSession();
  function home() {
    window.location.assign(`${process.env.NEXTAUTH_URL}`)
  }

  return (
    <>
      {/* {session.user.expires_in} */}
      {/* {session.access_token || "hi"} */}
      <div className="flex flex-col  gap-1  w-80  max-h-screen bg-background">
        <div className="flex items-center justify-center ">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl font-bold mt-3 bg-gradient-to-r from-green-600 via-violet-900-500 to-green-950 text-transparent bg-clip-text">
              B2bMatch.ch
            </h1>
            <h1 className="text-xl font-bold mt-3 bg-gradient-to-r from-green-600 via-violet-900-500 to-green-950 text-transparent bg-clip-text">
              Willkommen
              <span className="uppercase">{session?.user ? `, ${session.user.name}` : ""}</span>
            </h1>
            <h1 className="text-xl font-bold  bg-gradient-to-r from-green-600 via-violet-900-500 to-green-950 text-transparent bg-clip-text"></h1>
          </div>
        </div>
        <div className="flex-1 h-full">
          <ul className="text-xl ">
            <li className="rounded-xl flex flex-col items-center justify-center "></li>
          </ul>
          <ul className=" pb-2 text-xl pl-2 pr-5">
            <li className="rounded-sm border-b-2 transition-all duration-500 hover:bg-secondary p-1 text-lg m-3 ">
              <button onClick={home} className="flex items-center space-x-3 rounded-md w-full outline-none focus:outline-none">
                <span>Suchen</span>
              </button>
            </li>
            <li className="rounded-sm border-b-2 transition-all duration-500 hover:bg-secondary p-1 text-lg m-3">
              <Link
                href="price"
                className="flex items-center  space-x-3 rounded-md"
              >
                <span>Preise </span>
              </Link>
            </li>
            <li className="rounded-sm border-b-2 transition-all duration-500 hover:bg-secondary p-1 text-lg m-3">
              <Link
                href="/library"
                className="flex items-center  space-x-3 rounded-md"
              >
                <span>lhre Bibliothek</span>
              </Link>
            </li>
            {session?.user ? (
              <>

              </>
            ) : (
              <>

              </>
            )}

            <li className="rounded-sm border-b-2 transition-all duration-500 hover:bg-secondary p-1 text-lg m-3">
              <Link
                href="help"
                className="flex items-center  space-x-3 rounded-md"
              >
                <span>Hilfe </span>
              </Link>
            </li>

            {session?.user ? (
              <>
                <li className="rounded-sm border-b-2 transition-all duration-500 hover:bg-secondary p-1 text-lg m-3 ">
                  <button onClick={() => signOut()} className="flex items-center space-x-3 rounded-md w-full outline-none focus:outline-none">
                    <span>Ausloggen</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="rounded-sm border-b-2 transition-all duration-500 hover:bg-secondary p-1 text-lg m-3 ">
                  <button onClick={() => signIn()} className="flex items-center space-x-3 rounded-md w-full outline-none focus:outline-none">
                    <span>Registrieren / Anmelden</span>
                  </button>
                </li>
              </>
            )}

          </ul>
          <div className="flex flex-col text-center justify-center">
            <span className="text-xl font-bold pt-5">Was ist B2Bmatch.ch?</span>
            <p className="text-left p-5 pb-0">Adressen von Deutschschweizer Firmen. </p>
            <p className="text-left p-5 pb-3">Kostenlos selbst Marktanalysen durchführen. Konkrete Informationen über
              Marktteilnehmer sind kostenpflichtig. Kontaktieren Sie uns:{" "}
              <b>044 380 78 88</b>
            </p>{" "}
            <p className="text-left pl-5 pb-3">Um Suchabfragen zu speichern, müssen Sie sich einloggen. </p>
            <p className="text-left pl-5 pb-3">Unter "Hilfe" finden Sie Anleitungen und Tipps.</p>
            {/* <p>email:{session?.user.email_verified ?  false : true}</p>
            {session?.user.email_verified ? (
              <>
                <p className="text-base text-red-600 font-bold m-2 text-left pl-4 pt-1">Your Email varification is still in pending please varify your Email to continue.</p>
              </>
            ) : (
              <>
              </>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
