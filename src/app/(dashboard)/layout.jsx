"use client";

import {
  FaChevronDown,
  FaCog,
  FaInfoCircle,
  FaMobileAlt,
  FaUserCircle,
} from "react-icons/fa";
import { MdHome } from "react-icons/md";
import {
  FaArrowDown,
  FaArrowUp,
  FaBars,
  FaBitcoinSign,
  FaMicrochip,
  FaMoneyBillWave,
  FaUser,
  FaWallet,
} from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/utils/firebase_utils";
import Swal from "sweetalert2";
import Image from "next/image";
import { BASE_BUCKET_URL } from "@/utils/constants";

const userContext = createContext();
export const useUserContext = () => useContext(userContext);

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const [orderHover, setOrderHover] = useState(false);
  const [reqHover, setReqHover] = useState(false);
  const [user, setUser] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInfoIcon = () => {
    Swal.fire({
      title: "Баланс инфо",
      color: "white",
      text: "Ваш страховой и рабочий баланс",
      icon: "warning",
      confirmButtonText: "Понятно",
      customClass: {
        confirmButton: "bg-greenish",
      },
      background: "#1F2937FF",
    });
  };

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      router.push("/login");
    } else {
      const usr = JSON.parse(sessionStorage.getItem("user"));
      getMe(usr.token).then((data) => {
        setUser(data);
      });
    }
  }, []);

  const [rate, setRate] = useState(0);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("/api/price");
        const data = await res.json();
        if (data.price) {
          const numeric = parseFloat(data.price.replace(",", "."));
          setRate(numeric);
          // console.log(numeric)
        }
      } catch {
        setRate("Error");
      }
    };

    fetchPrice(); // Initial load
    const interval = setInterval(fetchPrice, 3000); // Every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // console.log(rate)

  return (
    <div className="flex">
      <aside
        id="sidebar"
        className={`min-w-64 bg-gray-900 text-white shadow-2xl fixed md:sticky top-0 h-screen z-50 sidebar-transition ${
          isSidebarOpen ? "flex" : "hidden"
        } md:flex flex-col`}
      >
        <div className="h-24 flex justify-between p-5 border-b border-gray-800 items-center gap-3">
          <div>
            <h3 className="text-4xl arista-font text-center font-bold text-white">
              Kredo
            </h3>
            <p className="text-xs text-gray-400">Payment Ecosystem</p>
          </div>
          <div className="md:hidden" onClick={toggleSidebar}>
            <IoMdClose />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-5 border-b border-gray-800 bg-gray-800/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-300">
                  Общий баланс
                </h2>

                <FaInfoCircle
                  onClick={handleInfoIcon}
                  className="text-teal-400 hover:text-teal-300 cursor-pointer"
                />
              </div>
              <div className="flex mb-2 items-center justify-between">
                <p
                  id="sidebarBalance"
                  className="text-2xl font-bold text-white"
                >
                  {user?.balance + ".00" || 0.0}
                </p>
                <span className="text-sm font-mono text-teal-400">USDT</span>
              </div>
              <p className="text-sm">
                ≈ {(rate * +user?.balance).toFixed(2)} RUB
              </p>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {user?.admin ? (
              <Link
                href="/admin"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors"
              >
                <FaCog className="w-5 h-5 text-center" />
                <span>Управления</span>
              </Link>
            ) : (
              <></>
            )}
            <Link
              href="/home"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors"
            >
              <MdHome className="w-5 h-5 text-center" />
              <span>Главная</span>
            </Link>

            <div
              onMouseEnter={() => setOrderHover(true)}
              onMouseLeave={() => setOrderHover(false)}
              className="relative group"
            >
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors">
                <FaBitcoinSign className="w-5 text-center" />
                <span>Заказы</span>

                <FaChevronDown className="text-xs ml-auto" />
              </div>
              <div
                className={`submenu ml-8 mt-1 space-y-1 ${
                  orderHover ? "" : "hidden"
                } `}
              >
                <Link
                  href="/orders-in"
                  onClick={() => setIsSidebarOpen(false)}
                  className="px-3 py-2 flex items-center text-sm text-gray-400 hover:bg-gray-800/30 rounded-lg"
                >
                  <FaArrowDown className="mr-2 text-teal-400" />{" "}
                  <span>Pay in</span>
                </Link>
                <Link
                  href="/orders-out"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center px-3 py-2 text-sm text-gray-400 hover:bg-gray-800/30 rounded-lg"
                >
                  <FaArrowUp className="text-red-400 mr-2" />{" "}
                  <span>Pay out</span>
                </Link>
              </div>
            </div>

            <div
              onMouseEnter={() => setReqHover(true)}
              onMouseLeave={() => setReqHover(false)}
              className="relative group"
            >
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors">
                <FaMicrochip className="w-5 text-center" />
                <span>Реквизиты</span>
                <FaChevronDown className="text-xs ml-auto" />
              </div>
              <div
                className={`submenu ml-8 mt-1 space-y-1 ${
                  reqHover ? "" : "hidden"
                } `}
              >
                <Link
                  href="/requisite"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center px-3 py-2 text-sm text-gray-400 hover:bg-gray-800/30 rounded-lg"
                >
                  <FaArrowDown className="mr-2 text-teal-400" />
                  <span>Pay in</span>
                </Link>
                <Link
                  onClick={() => setIsSidebarOpen(false)}
                  href="/requisite-out"
                  className="flex items-center px-3 py-2 text-sm text-gray-400 hover:bg-gray-800/30 rounded-lg"
                >
                  <FaArrowUp className="text-red-400 mr-2" />
                  <span>Pay out</span>
                </Link>
              </div>
            </div>
            <Link
              href="/devices"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors"
            >
              <FaMobileAlt className="w-5 text-center" />
              <span>Устройства</span>
            </Link>

            <Link
              onClick={() => setIsSidebarOpen(false)}
              href="/withdraw"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors"
            >
              <FaWallet className="w-5 text-center" />
              <span>Вывод средств</span>
            </Link>
            <Link
              href="/wallet"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors"
            >
              <FaMoneyBillWave className="w-5 text-center" />
              <span>Кошелек</span>
            </Link>
            <Link
              href="profile"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors"
            >
              <FaUser className="w-5 text-center" />
              <span>Профиль</span>
            </Link>
          </nav>
        </div>
        <div
          id="userMenu"
          className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-xl rounded-lg py-2 border border-gray-700 opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible"
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700/50"
          >
            Профиль
          </Link>
          <Link
            href="/login"
            onClick={() => sessionStorage.removeItem("user")}
            className="block px-4 py-2 text-red-400 hover:bg-gray-700/50"
          >
            Выйти
          </Link>
        </div>

        <div className="mt-auto border-t border-gray-800 bg-gray-800/50">
          <div className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Статус:</span>
              <div
                className={`flex items-center gap-1 ${
                  user?.activationAmount <= user?.balance
                    ? "text-green-400"
                    : "text-red-400"
                } `}
              >
                <div
                  className={`w-3 h-3 ${
                    user?.activationAmount <= user?.balance
                      ? "bg-green-400"
                      : "bg-red-400"
                  }  rounded-full`}
                ></div>
                <span>
                  {user?.activationAmount <= user?.balance
                    ? "Активен"
                    : "Неактивен"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="bg-gray-900 flex-1">
        <header className="bg-gray-900 shadow-lg sticky top-0 z-40 border-b border-gray-800">
          <div className="flex items-center justify-between p-4">
            {/* <!-- Кнопка гамбургера --> */}
            <button
              id="sidebarToggle"
              onClick={toggleSidebar}
              className="md:hidden p-2 text-gray-400 hover:text-teal-400"
            >
              {/* <i className="fas fa-bars hamburger-icon"></i> */}
              {/* <RxHamburgerMenu /> */}
              <FaBars />
            </button>

            <div className="hidden sm:flex items-center gap-6 ml-auto">
              {/* <!-- Курсы валют --> */}
              <div className="flex gap-3 pr-6 border-r border-gray-800">
                <div className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <p className="text-xs text-teal-400 mb-1 font-mono">
                    Курс покупки
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span
                      id="buyRate"
                      className="font-semibold text-lg bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"
                    >
                      {rate != null ? rate + 2 : "Loading..."}
                    </span>
                    <span className="text-sm bg-gradient-to-r from-teal-400/80 to-blue-400/80 bg-clip-text text-transparent">
                      RUB
                    </span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <p className="text-xs text-pink-400 mb-1 font-mono">
                    Курс продажи
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span
                      id="sellRate"
                      className="font-semibold text-lg bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      {rate != null ? (rate + 3.15).toFixed(2) : "Loading..."}
                    </span>
                    <span className="text-sm bg-gradient-to-r from-pink-400/80 to-purple-400/80 bg-clip-text text-transparent">
                      RUB
                    </span>
                  </div>
                </div>
              </div>

              {/* <!-- Добавляем блоки для процентов --> */}
              <div className="flex gap-3 pr-6 border-r border-gray-800">
                <div className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <p className="text-xs text-teal-400 mb-1 font-mono">Pay In</p>
                  <div className="flex items-center gap-1.5">
                    <span
                      id="payInRate"
                      className="font-semibold text-lg bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"
                    >
                      8.5
                    </span>
                    <span className="text-sm bg-gradient-to-r from-teal-400/80 to-blue-400/80 bg-clip-text text-transparent">
                      %
                    </span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <p className="text-xs text-pink-400 mb-1 font-mono">
                    Pay Out
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span
                      id="payOutRate"
                      className="font-semibold text-lg bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      3.5
                    </span>
                    <span className="text-sm bg-gradient-to-r from-pink-400/80 to-purple-400/80 bg-clip-text text-transparent">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Меню пользователя --> */}
            <div className="relative">
              <div className="group relative inline-block">
                <button
                  id="userMenuButton"
                  className="flex cursor-pointer items-center gap-2 bg-gray-800/50 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {user?.image ? (
                    <img
                      src={
                        user?.image
                          ? BASE_BUCKET_URL + user?.image
                          : "profile.png"
                      }
                      id="userAvatar"
                      className="w-6 h-6 object-cover rounded-full bg-gray-800"
                      alt="User Avatar"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl text-teal-400" />
                  )}
                  <span className="text-gray-300">{user?.name}</span>
                </button>

                <div
                  id="userMenu"
                  className="absolute z-20 right-0 mt-2 w-48 bg-gray-800 shadow-xl rounded-lg py-2 border border-gray-700 opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700/50"
                  >
                    Профиль
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => sessionStorage.removeItem("user")}
                    className="block px-4 py-2 text-red-400 hover:bg-gray-700/50"
                  >
                    Выйти
                  </Link>
                </div>
              </div>

              <a
                target="_blank"
                href="https://temporal-scribe-d5e.notion.site/Kredo-1e10b19b1ea480c1adcaebefe4431766"
                className="flex items-center mt-2 -translate-x-2"
              >
                <Image
                  src="/guidance.png"
                  width={40}
                  height={40}
                  alt="Инструкция"
                />
                <p className="-translate-x-1 text-sm text-white">Инструкция</p>
              </a>
            </div>
          </div>
        </header>
        <userContext.Provider value={{ user, setUser, rate }}>
          <main className="p-6">{children}</main>
        </userContext.Provider>
      </div>
    </div>
  );
};

export default DashboardLayout;
