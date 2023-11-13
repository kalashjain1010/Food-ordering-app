"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setError(false);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <div className="min-h-[65vh]">
      <div className="mt-20">
        <h1 className="text-3xl font-semibold text-center text-orange-500 ">
          Register
        </h1>
        {userCreated && (
          <>
            <div className="text-center mt-4">
              <div className="text-green-700">User created</div>
              <div>
                Now you can{" "}
                <Link className="italic underline" href={"./login"}>
                  Login &raquo;{" "}
                </Link>
              </div>
            </div>
          </>
        )}
        {error && (
          <>
            <div className="text-center text-red-500 text-2xl mt-4">
              Error <br />
              please try again
            </div>
          </>
        )}

        <form
          className="block mt-5 max-w-xs mx-auto"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={creatingUser}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={creatingUser}
          />
          <button disabled={creatingUser} type="submit">
            Register
          </button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button disabled={creatingUser} className="flex gap-4 justify-center">
            <Image src={"/google.png"} alt={""} width={24} height={24} />
            Login with google
          </button>
          <div className="text-center my-4 text-gray-500 border-t pt-4">
            Existing account?{" "}
            <Link className="underline" href={"/login"}>
              Login here &raquo;
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
