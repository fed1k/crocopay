"use client";

import {
  FaChevronDown,
  FaInfoCircle,
  FaMobileAlt,
  FaUserCircle,
} from "react-icons/fa";
import { MdHome } from "react-icons/md";
import {
  FaArrowDown,
  FaArrowUp,
  FaBitcoinSign,
  FaMicrochip,
  FaMoneyBillWave,
  FaUser,
  FaWallet,
} from "react-icons/fa6";
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const userContext = createContext();
export const useUserContext = () => useContext(userContext);

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const [orderHover, setOrderHover] = useState(false);
  const [reqHover, setReqHover] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      router.push("/login");
    } else {
      setUser(JSON.parse(sessionStorage.getItem("user")));
    }
  }, []);

  return (
    <div className="flex">
      <aside
        id="sidebar"
        className=" min-w-64 bg-gray-900 text-white shadow-2xl sticky top-0 h-screen z-50 sidebar-transition hidden md:flex flex-col"
      >
        <div className="p-5 border-b border-gray-800 flex items-center gap-3">
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Kredo
            </h1>
            <p className="text-xs text-gray-400">Payment Ecosystem</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-5 border-b border-gray-800 bg-gray-800/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-300">
                  Общий баланс
                </h2>

                <FaInfoCircle className="text-teal-400 hover:text-teal-300 cursor-pointer" />
              </div>
              <div className="flex items-end justify-between">
                <p
                  id="sidebarBalance"
                  className="text-2xl font-bold text-white"
                >
                  {user?.balance || 0.0}
                </p>
                <span className="text-sm font-mono text-teal-400">USDT</span>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            <Link
              href="/home"
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
                  className="px-3 py-2 flex items-center text-sm text-gray-400 hover:bg-gray-800/30 rounded-lg"
                >
                  <FaArrowDown className="mr-2 text-teal-400" />{" "}
                  <span>Pay in</span>
                </Link>
                <Link
                  href="/orders-out"
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
                  className="flex items-center px-3 py-2 text-sm text-gray-400 hover:bg-gray-800/30 rounded-lg"
                >
                  <FaArrowDown className="mr-2 text-teal-400" />
                  <span>Pay in</span>
                </Link>
                <Link
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
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors"
            >
              <FaMobileAlt className="w-5 text-center" />
              <span>Устройства</span>
            </Link>

            <Link
              href="/withdraw"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors"
            >
              <FaWallet className="w-5 text-center" />
              <span>Вывод средств</span>
            </Link>
            <Link
              href="/wallet"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/30 text-gray-300 hover:text-teal-400 cursor-pointer transition-colors"
            >
              <FaMoneyBillWave className="w-5 text-center" />
              <span>Кошелек</span>
            </Link>
            <Link
              href="profile"
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
              <div className="flex items-center gap-1 text-red-400">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span>Неактивен</span>
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
              className="md:hidden p-2 text-gray-400 hover:text-teal-400"
            >
              <i className="fas fa-bars hamburger-icon"></i>
            </button>

            <div className="flex items-center gap-6 ml-auto">
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
                      85.67
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
                      85.75
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
            <div className="relative group">
              <button
                id="userMenuButton"
                className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {/* <i className="fa-solid fa-circle-user text-2xl text-teal-400"></i> */}
                <FaUserCircle className="text-2xl text-teal-400" />
                <span className="text-gray-300">{user?.name}</span>
              </button>
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
            </div>
          </div>
        </header>
        <userContext.Provider value={{user}}>
          <main className="p-6">{children}</main>
        </userContext.Provider>
      </div>
    </div>
  );
};

export default DashboardLayout;
