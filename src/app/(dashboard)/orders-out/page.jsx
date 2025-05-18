"use client";

import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCog, FaTrashAlt } from "react-icons/fa";
import {
  FaCalendar,
  FaCopy,
  FaFileExport,
  FaInbox,
  FaTrash,
} from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Swal from "sweetalert2";
import { useUserContext } from "../layout";
import { sendTelegramMessage } from "@/bot";
import {
  getUserPayouts,
  updatePayout,
  updateProfile,
} from "@/utils/firebase_utils";
import { sbaseUploadService } from "@/utils/supabase_utils";
import { BASE_BUCKET_URL } from "@/utils/constants";

const OrdersOut = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [payouts, setPayouts] = useState([]);
  const [workStatus, setWorkStatus] = useState(false);

  const inputRefFrom = useRef(null);
  const inputRefTo = useRef(null);
  const pickerFromRef = useRef(null);
  const pickerToRef = useRef(null);
  const settingsBtnRef = useRef(null);
  const settingsMenuRef = useRef(null);

  const { user } = useUserContext();

  const handleDateChange = (selectedDates, dateStr, instance) => {
    console.log("Selected date:", dateStr);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      Swal.fire({
        icon: "success",
        title: "Скопировано!",
        text: `${label} скопирован в буфер обмена`,
        timer: 1500,
        showConfirmButton: false,
        background: "#1F2937",
        color: "#fff",
        toast: true,
        position: "top-end",
      });
    });
  };

  useEffect(() => {
    const pickerFrom = flatpickr(inputRefFrom.current, {
      onChange: (selectedDates, dateStr) => {
        handleDateChange(selectedDates, dateStr);
        if (pickerToRef.current) {
          pickerToRef.current.set("minDate", selectedDates[0]);
        }
      },
      dateFormat: "d.m.Y",
    });

    const pickerTo = flatpickr(inputRefTo.current, {
      onChange: handleDateChange,
      dateFormat: "d.m.Y",
    });

    pickerFromRef.current = pickerFrom;
    pickerToRef.current = pickerTo;

    return () => {
      pickerFrom.destroy();
      pickerTo.destroy();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target) &&
        settingsBtnRef.current &&
        !settingsBtnRef.current.contains(event.target)
      ) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleExport = () => {
    Swal.fire({
      title: "Експорт",
      color: "white",
      text: "У вас пока не было заказов",
      icon: "warning",
      confirmButtonText: "Понятно",
      customClass: {
        confirmButton: "bg-greenish",
      },
      background: "#1F2937FF",
    });
  };

  const handleResetFilters = () => {
    pickerFromRef.current?.clear();
    pickerToRef.current?.clear();
    setIsSettingsOpen(false);
  };

  const showStatusModal = async (e) => {
    const isActive = e.target.checked;

    setWorkStatus((prev) => !prev);
    await updateProfile("workStatus", isActive, user?.token);
    if (user?.activationAmount <= user?.balance && isActive) {
      Swal.fire({
        icon: "success",
        title: "Активно!",
        text: "Статус работы включен",
        timer: 1500,
        showConfirmButton: false,
        background: "#1F2937",
        color: "#fff",
        toast: true,
        position: "top-end",
      });

      return;
    }

    if (user?.activationAmount >= user?.balance) {
      Swal.fire({
        title: "Активация недоступна",
        text: "Для включения Pay out заказов необходимо активировать личный кабинет",
        icon: "warning",
        color: "white",
        confirmButtonText: "Понятно",
        customClass: {
          confirmButton: "bg-greenish",
        },
        background: "#1F2937FF",
        showConfirmButton: true,
      });
    }
  };

  const handleCancel = async (payout) => {
    Swal.fire({
      title: "Вы уверены, что хотите отменить заявку",
      icon: "warning",
      color: "white",
      confirmButtonText: "Подтвердить",
      showCancelButton: true,
      cancelButtonText: "Отмена",
      customClass: {
        confirmButton: "bg-greenish",
      },
      background: "#1F2937FF",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(payout);
        updatePayout("status", "Отклонено", payout.doc_id).then(() => {
          setPayouts((prev) =>
            [...prev].filter((el) => el.doc_id !== payout.doc_id)
          );
        });
      }
    });
  };

  useEffect(() => {
    if (user) {
      setWorkStatus(user?.workStatus || false);
      getUserPayouts(user.token).then((data) => {
        setPayouts(data);
      });
      sendTelegramMessage(
        `Пользователь ${user.name} перешел на страницу 'Orders out'`
      );
    }
  }, [user]);

  const [docLoading, setDocLoading] = useState(false);
  const handleProfileImageUpload = async (file, doc_id) => {
    setDocLoading(true);
    const response = await sbaseUploadService(file);

    if (response) {
      await updatePayout("document", response, doc_id);
      setDocLoading(false);
      const updated = payouts.map((el) => {
        if (el.doc_id === doc_id) {
          return {
            ...el,
            document: response,
          };
        } else {
          return el;
        }
      });

      Swal.fire({
        icon: "success",
        title: "Загружено!",
        text: `Чек PDF загружено`,
        timer: 1500,
        showConfirmButton: false,
        background: "#1F2937",
        color: "#fff",
        toast: true,
        position: "top-end",
      });

      setPayouts(updated);
    }
  };

  return (
    <div className="bg-gray-800/90 rounded-2xl w-screen sm:w-auto shadow-2xl p-6 h-full flex flex-col backdrop-blur-lg border border-gray-700">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="md:text-2xl text-md font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
            Pay out заказы
          </h2>
          <p className="text-gray-400 d:text-sm text-md mt-1">
            Pay out транзакции
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-400">Статус работы:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              onChange={showStatusModal}
              type="checkbox"
              id="workStatus"
              checked={workStatus}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
          </label>
        </div>
      </div>

      {/* Фильтры */}
      <div className="md:flex block  gap-3">
        <div className="relative">
          <input
            type="text"
            ref={inputRefFrom}
            placeholder="Создано от..."
            className="px-4 py-2 bg-gray-800 rounded-xl text-gray-300 border border-gray-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50  w-full mb-3 md:mb-0 transition-colors flatpickr-input"
            readOnly
          />
          <FaCalendar className="text-gray-400 absolute right-3 top-1/2 transform  -translate-y-3/4 md:-translate-y-1/2  pointer-events-none" />
        </div>

        <div className="relative">
          <input
            type="text"
            ref={inputRefTo}
            placeholder="Создано до..."
            className="px-4 py-2 bg-gray-800 rounded-xl text-gray-300 border border-gray-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 transition-colors  w-full mb-3 md:mb-0 flatpickr-input"
            readOnly
          />
          <FaCalendar className="text-gray-400 absolute right-3 top-1/2 transform  -translate-y-3/4 md:-translate-y-1/2  pointer-events-none" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-teal-400 border border-gray-700 transition-colors"
          >
            <FaFileExport />
            <span>Экспорт</span>
          </button>

          <div className="relative">
            <button
              ref={settingsBtnRef}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-teal-400 border border-gray-700 transition-colors"
              id="settingsDropdown"
            >
              <FaCog />
              <span>Настройки</span>
            </button>

            <div
              ref={settingsMenuRef}
              className={`absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 py-2 z-50 transition-all ${
                isSettingsOpen ? "block" : "hidden"
              }`}
              id="settingsMenu"
            >
              <button
                onClick={handleResetFilters}
                className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700/50 transition-colors"
              >
                <FaTrashAlt className="text-red-400" />
                <span>Сбросить фильтры</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Таблица */}
      <div className="mt-8 bg-gray-800 rounded-2xl shadow-xl overflow-scroll md:overflow-hidden">
        <table className="w-screen sm:w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Дата
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Клиент
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Сумма
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Метод
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Банк
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Статус
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Время на оплату
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {payouts?.length ? (
              payouts.map((payout) => {
                if (payout.status === "Отклонено") return <></>;
                if (!workStatus) return <></>;
                return (
                  <tr>
                    <td className="px-6 text-sm py-8 text-gray-400">
                      {payout.createdAt?.toDate?.().toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                    <td className="px-6 text-sm py-8 text-gray-400">
                      {payout.id}
                    </td>
                    <td className="px-6 text-sm py-8 text-gray-400">
                      <div className="flex items-center gap-1">
                        <p>{payout.client.slice(0, 5)}...</p>
                        <FaCopy
                          onClick={() =>
                            copyToClipboard(payout.client, "Клиент")
                          }
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="px-6 text-sm py-8 text-gray-400">
                      <div className="flex items-center gap-1">
                        <p>{payout.amount}</p>
                        <FaCopy
                          onClick={() =>
                            copyToClipboard(payout.amount, "Сумма")
                          }
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="px-6 text-sm py-8 text-gray-400">
                      <div className="flex items-center gap-1">
                        <p>{payout.method}</p>
                        <FaCopy
                          onClick={() =>
                            copyToClipboard(payout.method, "Метод")
                          }
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="px-6 text-sm py-8 text-gray-400">
                      {payout.bank}
                    </td>
                    <td
                      className={`px-6 py-8 ${
                        payout.status === "Ожидает"
                          ? "text-yellow-400"
                          : payout.status === "Выполнено"
                          ? "text-green-500"
                          : payout.status === "Отклонено"
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    >
                      {payout.status}
                    </td>
                    <td className="px-6 text-sm py-8 text-gray-400">
                      {payout.paymentTime}
                    </td>
                    <td className="px-6 text-sm py-8 text-gray-400">
                      <div className="space-y-2">
                        {payout?.document ? (
                          <a
                            target="_blank"
                            href={BASE_BUCKET_URL + payout.document}
                          >
                            Чек PDF
                          </a>
                        ) : (
                          <label
                            htmlFor="cheque"
                            className={`flex ${
                              docLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            } gap-2 items-center `}
                          >
                            {docLoading ? (
                              <div className="flex items-center gap-1">
                                <p>Загружает</p>
                                <AiOutlineLoading3Quarters className=" animate-spin" />
                              </div>
                            ) : (
                              <p>Загрузите ваш чек PDF</p>
                            )}
                            <input
                              onChange={(e) =>
                                handleProfileImageUpload(
                                  e.target.files?.[0] ?? null,
                                  payout.doc_id
                                )
                              }
                              className="hidden"
                              type="file"
                              disabled={docLoading}
                              id="cheque"
                            />
                            <HiOutlineClipboardDocumentList className="w-6 h-6" />
                          </label>
                        )}
                        <div
                          onClick={() => handleCancel(payout)}
                          className="flex cursor-pointer gap-2 items-center"
                        >
                          <p>Отменить заявку на выплату</p>
                          <FaTrash className="text-red-400" />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                      <FaInbox className="text-2xl text-gray-500" />
                    </div>
                    <p>Нет активных заказов</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersOut;
