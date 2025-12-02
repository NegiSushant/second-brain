import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL;

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { refreshUser } = useAuth();

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = e.currentTarget;
    const email = formdata.email.value;
    const password = formdata.password.value;

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API}/user/signIn`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        await refreshUser();
        navigate("/brain");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err as string,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Second Brain
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Your digital second brain for capturing, organizing, and connecting your
        ideas.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
          type="submit"
        >
          {isLoading ? "Sign In..." : `Sign In →`}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <div className="flex flex-col space-y-2 text-center text-xs text-gray-500">
          <p>
            By signing up, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-indigo-500"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-indigo-500"
            >
              Privacy Policy
            </a>
            .
          </p>

          <p>
            Don't have an account?
            <button
              className="font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
