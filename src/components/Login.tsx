"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmir = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) return setError(res.error as string);

    if (res?.ok) return router.push("/");
    console.log(res);
  };

  return (
    <div>
      <form onSubmit={handleSubmir}>
        {error && <div className="bg-red-500 text-white p-2"> {error}</div>}
        <h1>Login</h1>

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
        <button className="bg-cyan-200 text-black py-2 px-4 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
