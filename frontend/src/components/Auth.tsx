import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@govind2220000/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,

        postInputs
      );
      const jwt = res.data;
      localStorage.setItem("token", jwt.jwt);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
      alert("Error while signing up");
    }
  }
  return (
    <>
      <div className="bg-white h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Create an account</div>
              <div className="pl-3 text-slate-400">
                {type === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Link
                  to={type === "signin" ? "/signup" : "/signin"}
                  className="underline"
                >
                  {type === "signin" ? " Sign up" : " Sign in"}
                </Link>
              </div>
            </div>
            <div className="pt-4">
              {type === "signup" ? (
                <LabelledInput
                  label="Name"
                  placeholder="John Doe"
                  onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      name: e.target.value,
                    });
                  }}
                ></LabelledInput>
              ) : null}

              <LabelledInput
                label="Email"
                placeholder="JohnDoe@gmail.com"
                type="email"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    email: e.target.value,
                  });
                }}
              ></LabelledInput>

              <LabelledInput
                label="password"
                placeholder="123456"
                type="password"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  });
                }}
              ></LabelledInput>
            </div>
            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signin" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <>
      <div>
        <label className="block mb-2 text-sm font-bold text-black pt-4">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={placeholder}
          required
        />
      </div>
    </>
  );
}
