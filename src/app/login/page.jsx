"use client";

import { login } from "@/utils/firebase_utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    const response = await login(token);
    if (response.status === 200) {
      sessionStorage.setItem("user", JSON.stringify(response.user));
      router.push("/home");
    } else {
      setError("Пользователь не найден");
    }
  };

  const handleLoginChange = (value) => {
    setToken(value);
    setError("");
  };

  return (
    <div className="from-gray-800 relative bg-gradient-to-b min-h-screen flex justify-center items-center to-gray-900">
      <div>
        <div>
          <h3 className="text-3xl text-center font-bold text-transparent bg-clip-text to-blue-500 from-teal-400 bg-gradient-to-r">
            Kredo
          </h3>
          <p className="text-gray-400 text-center text-sm mt-1">
            Payment Ecosystem
          </p>
        </div>
        <div className="border w-[280px] sm:w-[500px] rounded-2xl mt-8 p-8 shadow-2xl backdrop-blur-lg bg-gray-800\/90 bg-[rgb(31_41_55_0.9)] border-gray-700">
          <p className="text-center text-2xl from-teal-400 to-pink-400 font-bold bg-gradient-to-r text-transparent bg-clip-text">
            Вход в систему
          </p>

          <form>
            <div>
              <label
                className="text-gray-300 text-sm font-medium"
                htmlFor="token"
              >
                Токен
              </label>
              <input
                value={token}
                onChange={(e) => handleLoginChange(e.target.value)}
                className="block mt-2 text-white p-3 bg-gray-700 w-full rounded-lg"
                type="password"
                name=""
                id="token"
                placeholder="Введите токен"
              />
            </div>

            {error && <p className="text-red-400 pt-2">{error}</p>}

            <button
              onClick={handleLogin}
              type="button"
              className="text-white mt-6 cursor-pointer hover:opacity-90 to-blue-500 from-teal-400 bg-gradient-to-r rounded-lg py-3 w-full"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
      <div className="absolute top-0 right-0 z-10 opacity-5">
        <svg
          width="400"
          height="400"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-teal-400"
          ></circle>
          <path
            d="M20,50 Q50,20 80,50"
            stroke="currentColor"
            className="text-pink-400"
            fill="none"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Login;
