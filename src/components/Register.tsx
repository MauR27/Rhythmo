"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleSubmir = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      return toast({
        status: "error",
        description: "Password do not match",
        duration: 3000,
        isClosable: true,
      });
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await res.json();

      await signIn("credentials", {
        email: data.email,
        password: formData.get("password"),
        redirect: false,
      });
      if (res.ok) {
        return router.push("/");
      } else {
        return setError(res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmir}>
        {error && <div className="bg-red-500 text-white p-2"> {error}</div>}
        <h1>Register</h1>

        <input
          className="bg-zinc-800 px-4 py-2 black mb-2 text-white"
          type="text"
          placeholder="Rom Galler"
          name="name"
        />
        <input
          className="bg-zinc-800 px-4 py-2 black mb-2 text-white"
          type="email"
          placeholder="romgaller@gmail.com"
          name="email"
        />
        <input
          className="bg-zinc-800 px-4 py-2 black mb-2 text-white"
          type="password"
          placeholder="********"
          name="password"
        />
        <input
          className="bg-zinc-800 px-4 py-2 black mb-2 text-white"
          type="password"
          placeholder="********"
          name="confirmPassword"
        />
        <button className="bg-cyan-300 text-black py-2 px-4 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
