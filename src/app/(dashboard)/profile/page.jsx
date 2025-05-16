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
import { updateProfile } from "@/utils/firebase_utils";
import { useEffect, useState } from "react";
import { sendTelegramMessage } from "@/bot";
import { sbaseUploadService } from "@/utils/supabase_utils";
import { BASE_BUCKET_URL } from "@/utils/constants";

const Profile = () => {
  const { user, setUser } = useUserContext();

  const [file, setFile] = useState(null)

  const handleProfileImageUpload = async() => {
    const response = await sbaseUploadService(file);

    if (response) {
      setUser((prev) => ({...prev, image: response}))
      updateProfile("image", response, user.token)
    }
  }



  const openAuthModal = () => {
    if (user?.activationAmount <= user?.balance) return
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
    });
  };

  const handleEdit = async (title, value) => {
    const { isConfirmed, value: newValue } = await Swal.fire({
      title: `Изменить ${title}`,
      background: "#1F2937FF",
      color: "white",
      input: "text",
      inputValue: value,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Сохранить",
      cancelButtonText: "Отмена",
      customClass: {
        confirmButton: "bg-greenish",
        cancelButton: "bg-grayish",
      },
      showLoaderOnConfirm: true,
      preConfirm: async (inputVal) => {
        if (inputVal === value) {
          return; // no API call needed
        }

        try {
          updateProfile(
            title === "Имя пользователя" ? "name" : title.toLowerCase(),
            inputVal,
            user.token
          ).then((res) => {
            if (res.success) {
              setUser((prev) => ({
                ...prev,
                [title === "Имя пользователя" ? "name" : title.toLowerCase()]:
                  inputVal,
              }));
            }
          });
        } catch (error) {
          Swal.showValidationMessage(`Ошибка: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (isConfirmed && newValue !== value) {
      Swal.fire({
        icon: "success",
        title: "Успешно обновлено",
        background: "#1F2937FF",
        color: "white",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    if (user) {
      sendTelegramMessage(
        `Пользователь ${user.name} перешел на страницу 'Профил'`
      );
    }
  }, [user]);

  useEffect(() => {
    handleProfileImageUpload()
  }, [file])

  return (
    <main className=" bg-gray-900 h-auto lg:h-[calc(100vh-64px)]  overflow-hidden">
      <div className="bg-gray-800/90 rounded-2xl shadow-2xl lg:p-8 mx-auto p-5 max-w-[94%]  xl:max-w-[1240px] h-full flex flex-col relative backdrop-blur-lg border border-gray-700">
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
        <div className="flex justify-between items-center mb-4 lg:mb-8">
          <h2 className="lg:text-2xl text-xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
            Профиль
          </h2>
        </div>

        {/* <!-- Прокручиваемый контент --> */}
        <div className="overflow-y-auto flex-1 -mr-4 pr-4">
          {/* <!-- Основной контент --> */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* <!-- Левая колонка --> */}
            <div className="space-y-6">
              {/* <!-- Основная информация --> */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <img
                      src={user?.image ? BASE_BUCKET_URL + user?.image : "profile.png"}
                      id="userAvatar"
                      className="w-20 h-20 object-cover rounded-full bg-gray-800"
                      alt="User Avatar"
                    />
                    <label htmlFor="profile-pic" className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <FaCamera className="text-white" />
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      id="profile-pic"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        id="displayUsername"
                        className="md:text-xl text-md font-bold text-white mb-1"
                      >
                        {user?.name}
                      </h3>
                      <button
                        onClick={() =>
                          handleEdit("Имя пользователя", user.name)
                        }
                        className="text-teal-400 cursor-pointer hover:text-teal-300"
                      >
                        {/* <i className="fas fa-pen text-sm"></i> */}
                        <FaPen className="text-sm" />
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm md:text-lg">
                      Пользователь
                    </p>
                  </div>
                </div>
                <div className="grid gap-6 ">
                  <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    {/* <i className="fas fa-envelope text-teal-400 text-lg w-6"></i> */}
                    <FaEnvelope className="text-teal-400 text-lg w-6" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Email</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white" id="displayEmail">
                          {user?.email || "example@gmail.com"}
                        </p>
                        <button
                          onClick={() =>
                            handleEdit(
                              "Email",
                              user?.email || "example@gmail.com"
                            )
                          }
                          className="ml-auto cursor-pointer text-teal-400 hover:text-teal-300"
                        >
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
                        <button
                          onClick={() =>
                            handleEdit("Telegram", user?.telegram || "@example")
                          }
                          className="ml-auto cursor-pointer text-teal-400 hover:text-teal-300"
                        >
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
                  <div className="flex items-center justify-between md:p-4 p-2 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-4">
                      {/* <i className="fas fa-shield-alt text-pink-400 text-lg w-6"></i> */}
                      <FaShieldAlt className="text-pink-400 md:text-lg text-sm  w-6" />
                      <div>
                        <p className="text-white text-[12px] md:text-lg font-medium">
                          Двухфакторная аутентификация
                        </p>
                        <p className="text-[12px] md:text-md text-red-400">
                          Отключена
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={openAuthModal}
                      className="md:px-4 px-2.5 py-2 cursor-pointer bg-gray-800 hover:bg-gray-700 text-teal-400 rounded-lg text-sm transition-colors"
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
                    <p className="md:text-2xl text-xl font-bold text-white">
                      0
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      {/* <i className="fas fa-chart-line text-pink-400"></i> */}
                      <FaChartLine className="text-pink-400" />
                      <span className="text-gray-400">Общий оборот</span>
                    </div>
                    <p className="md:text-2xl text-xl font-bold text-white">
                      0.00 USDT
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      {/* <i className="fas fa-arrow-down text-teal-400"></i> */}
                      <FaArrowDown className="text-teal-400" />
                      <span className="text-gray-400">Всего получено</span>
                    </div>
                    <p className="md:text-2xl text-xl font-bold text-white">
                      0.00 USDT
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      {/* <i className="fas fa-arrow-up text-pink-400"></i> */}
                      <FaArrowUp className="text-pink-400" />
                      <span className="text-gray-400">Всего выведено</span>
                    </div>
                    <p className="md:text-2xl text-xl font-bold text-white">
                      0.00 USDT
                    </p>
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
