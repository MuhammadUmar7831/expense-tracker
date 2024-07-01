import React, { useState } from "react";
import "../styles/SignIn.css";
import { Link } from "react-router-dom";
import GoogleIcon from "../interface/Svgs/GoogleIcon";
import LogoIcon from "../interface/Svgs/LogoIcon";

export default function SignIn() {
  const [pass, setPass] = useState(false);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center App">
      <div className="container max-w-md">
        <LogoIcon />
        <h1 className="text-center text-3xl">Sign in</h1>
        <div className="w-full mt-5 text-md text-center">
          <button className="flex justify-center items-center gap-2 w-full bg-gray-100 border rounded-md py-2 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none">
            <GoogleIcon /> Continue with Google
          </button>
        </div>
        <p className="text-center my-2 text-md">or</p>
        <form action="" className="flex flex-col gap-2">
          <input
            className="w-full focus:outline-none border py-2 px-4 rounded-md"
            type="email"
            required
            placeholder="Email address"
          />
          <input
            className="w-full focus:outline-none border py-2 px-4 rounded-md"
            type={pass ? "text" : "password"}
            required
            placeholder="Password"
          />
          <button type="button" onClick={()=>setPass(!pass)}>Icon</button>
          <button
            className="bg-gray-900 hover:bg-gray-800 rounded-md text-white py-2 px-4 mt-2 w-full text-sm"
            type="submit"
          >
            CONTINUE
          </button>
        </form>
        <div className="bottom-text">
          No account? <Link to="sign-up">Sign up</Link>
        </div>
      </div>
    </div>
  );
}