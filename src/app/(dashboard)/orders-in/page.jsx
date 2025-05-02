"use client";

import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import { useEffect, useRef, useState } from "react";
import { FaCog, FaTrashAlt } from "react-icons/fa";
import { FaCalendar, FaFileExport, FaInbox } from "react-icons/fa6";
import Swal from "sweetalert2";
import { sendTelegramMessage } from "@/bot";
import { useUserContext } from "../layout";

const OrdersIn = () => {
  const inputRefFrom = useRef(null);
  const inputRefTo = useRef(null);
  const pickerFromRef = useRef(null);
  const pickerToRef = useRef(null);

  const { user } = useUserContext();

  const handleDateChange = (selectedDates, dateStr, instance) => {
    console.log("Selected date:", dateStr);
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsBtnRef = useRef(null);
  const settingsMenuRef = useRef(null);

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

  const showStatusModal = () => {
    Swal.fire({
      title: "Вам пока не доступны Pay in заказы, активируйте личный кабинет",
      icon: "warning",
      color: "white",
      confirmButtonText: "Понятно",
      customClass: {
        confirmButton: "bg-greenish",
      },
      background: "#1F2937FF",
      showConfirmButton: true,
    });
  };

  useEffect(() => {
    if (user) {
      sendTelegramMessage(
        `Пользователь ${user.name} перешел на страницу 'Orders in'`
      );
    }
  }, [user]);

  return (
    <div className="bg-gray-800/90 w-screen sm:w-auto rounded-2xl shadow-2xl md:p-6 p-3 h-full flex flex-col backdrop-blur-lg border border-gray-700">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="md:text-2xl text-md font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
            Pay in заказы
          </h2>
          <p className="text-gray-400 md:text-sm text-md mt-1">
            Pay in транзакции
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-gray-400 md:text-lg text-sm">
            Статус работы:
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              onChange={showStatusModal}
              type="checkbox"
              id="workStatus"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all "></div>
          </label>
        </div>
      </div>

      {/* Фильтры */}
      <div className="md:flex block gap-3">
        <div className="relative">
          <input
            type="text"
            ref={inputRefFrom}
            placeholder="Создано от..."
            className="px-4 py-2 bg-gray-800 rounded-xl text-gray-300 border border-gray-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 w-full mb-3 md:mb-0 transition-colors flatpickr-input"
            readOnly
          />
          <FaCalendar className="text-gray-400 absolute right-3 top-1/2 transform -translate-y-3/4 md:-translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <input
            type="text"
            ref={inputRefTo}
            placeholder="Создано до..."
            className="px-4 py-2 w-full bg-gray-800 rounded-xl text-gray-300 border border-gray-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 mb-3 md:mb-0 transition-colors flatpickr-input"
            readOnly
          />
          <FaCalendar className="text-gray-400 absolute right-3 top-1/2 transform -translate-y-3/4 md:-translate-y-1/2 pointer-events-none" />
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
      <div className="mt-8 bg-gray-800 rounded-2xl overflow-scroll shadow-xl md:overflow-hidden">
        <table className="w-screen sm:w-full">
          <thead className="bg-gray-700">
            <tr>
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
            <tr>
              <td colSpan="8" className="px-6 py-8 text-center text-gray-400">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                    <FaInbox className="md:text-2xl text-md text-gray-500" />
                  </div>
                  <p>Нет активных заказов</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersIn;
