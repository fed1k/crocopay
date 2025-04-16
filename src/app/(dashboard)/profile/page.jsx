"use client";

import { FaExchangeAlt, FaShieldAlt } from "react-icons/fa";
import {
  FaArrowDown,
  FaArrowUp,
  FaCamera,
  FaChartLine,
  FaEnvelope,
  FaPen,
  FaTelegram,
} from "react-icons/fa6";
import Swal from "sweetalert2";
import { useUserContext } from "../layout";

const Profile = () => {

  const { user } = useUserContext()

  const openAuthModal = () => {
    Swal.fire({
      title: "Активация недоступна",
      color: "white",
      text: "Для включения двухфакторной аутентификации необходимо активировать личный кабинет",
      icon: "warning",
      confirmButtonText: "Понятно",
      customClass: {
        confirmButton: "bg-greenish",
      },
      background: "#1F2937FF",
      // iconColor: "#F8BB86FF"
    });
  };

  const handleEdit = (title) => {
    Swal.fire({
      title: `Изменить ${title}`,
      background: "#1F2937FF",
      color: "white",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Сохранить",
      cancelButtonText: "Отмена",
      customClass: {
        confirmButton: "bg-greenish",
        cancelButton: "bg-grayish"
      },
      showLoaderOnConfirm: true,
      // preConfirm: async (login) => {
      //   try {
      //     const githubUrl = `
      //       https://api.github.com/users/${login}
      //     `;
      //     const response = await fetch(githubUrl);
      //     if (!response.ok) {
      //       return Swal.showValidationMessage(`
      //         ${JSON.stringify(await response.json())}
      //       `);
      //     }
      //     return response.json();
      //   } catch (error) {
      //     Swal.showValidationMessage(`
      //       Request failed: ${error}
      //     `);
      //   }
      // },
    //   allowOutsideClick: () => !Swal.isLoading(),
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: `${result.value.login}'s avatar`,
    //       imageUrl: result.value.avatar_url,
    //     });
    //   }
    });
  };

  return (
    <main className=" bg-gray-900 h-[calc(100vh-64px)] overflow-hidden">
      <div className="bg-gray-800/90 rounded-2xl shadow-2xl p-8 h-full flex flex-col relative backdrop-blur-lg border border-gray-700">
        {/* <!-- Декоративный фон --> */}
        <div className="absolute top-0 right-0 -z-10 opacity-5">
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

        {/* <!-- Заголовок (фиксированный) --> */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
            Профиль
          </h2>
        </div>

        {/* <!-- Прокручиваемый контент --> */}
        <div className="overflow-y-auto flex-1 -mr-4 pr-4">
          {/* <!-- Основной контент --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <!-- Левая колонка --> */}
            <div className="space-y-6">
              {/* <!-- Основная информация --> */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <img
                      src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      id="userAvatar"
                      className="w-20 h-20 object-cover rounded-full bg-gray-800"
                      alt="User Avatar"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      {/* <i className="fas fa-camera text-white"></i> */}
                      <FaCamera className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        id="displayUsername"
                        className="text-xl font-bold text-white mb-1"
                      >
                        {user?.name}
                      </h3>
                      <button onClick={() => handleEdit("Имя пользователя")} className="text-teal-400 cursor-pointer hover:text-teal-300">
                        {/* <i className="fas fa-pen text-sm"></i> */}
                        <FaPen className="text-sm" />
                      </button>
                    </div>
                    <p className="text-gray-400">Пользователь</p>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    {/* <i className="fas fa-envelope text-teal-400 text-lg w-6"></i> */}
                    <FaEnvelope className="text-teal-400 text-lg w-6" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Email</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white" id="displayEmail">
                          {user?.email || "example@gmail.com"}
                        </p>
                        <button onClick={() => handleEdit("Email")} className="ml-auto cursor-pointer text-teal-400 hover:text-teal-300">
                          {/* <i className="fas fa-pen text-sm"></i> */}
                          <FaPen className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    {/* <i className="fab fa-telegram text-teal-400 text-lg w-6"></i> */}
                    <FaTelegram className="text-teal-400 text-lg w-6" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Telegram</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white" id="displayTelegram">
                          {user?.telegram || "@example"}
                        </p>
                        <button onClick={() => handleEdit("Telegram")} className="ml-auto cursor-pointer text-teal-400 hover:text-teal-300">
                          
                          <FaPen className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Безопасность --> */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-teal-400 mb-6">
                  Безопасность
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-4">
                      {/* <i className="fas fa-shield-alt text-pink-400 text-lg w-6"></i> */}
                      <FaShieldAlt className="text-pink-400 text-lg w-6" />
                      <div>
                        <p className="text-white font-medium">
                          Двухфакторная аутентификация
                        </p>
                        <p className="text-sm text-red-400">Отключена</p>
                      </div>
                    </div>
                    <button
                      onClick={openAuthModal}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-teal-400 rounded-lg text-sm transition-colors"
                    >
                      Включить
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Правая колонка --> */}
            <div className="space-y-6">
              {/* <!-- Статистика --> */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-pink-400 mb-6">
                  Статистика
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      {/* <i className="fas fa-exchange-alt text-teal-400"></i> */}
                      <FaExchangeAlt className="text-teal-400" />
                      <span className="text-gray-400">Всего транзакций</span>
                    </div>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      {/* <i className="fas fa-chart-line text-pink-400"></i> */}
                      <FaChartLine className="text-pink-400" />
                      <span className="text-gray-400">Общий оборот</span>
                    </div>
                    <p className="text-2xl font-bold text-white">0.00 USDT</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      {/* <i className="fas fa-arrow-down text-teal-400"></i> */}
                      <FaArrowDown className="text-teal-400" />
                      <span className="text-gray-400">Всего получено</span>
                    </div>
                    <p className="text-2xl font-bold text-white">0.00 USDT</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      {/* <i className="fas fa-arrow-up text-pink-400"></i> */}
                      <FaArrowUp className="text-pink-400" />
                      <span className="text-gray-400">Всего выведено</span>
                    </div>
                    <p className="text-2xl font-bold text-white">0.00 USDT</p>
                  </div>
                </div>
              </div>

              {/* <!-- График активности --> */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-teal-400 mb-6">
                  Активность
                </h3>
                <div className="h-48 flex items-center justify-center text-gray-400">
                  <p>График активности будет доступен позже</p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Добавляем отступ снизу для прокрутки --> */}
          <div className="h-6"></div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
