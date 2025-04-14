"use client"

import { useState } from "react";
import { FaCog, FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const Devices = () => {

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div class="bg-gray-800/90 rounded-2xl shadow-2xl p-8 relative overflow-hidden backdrop-blur-lg border border-gray-700">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-2xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Устройства
            </h2>
            <p class="text-gray-400 text-sm">
              Управление подключенными устройствами
            </p>
          </div>
          <div class="flex gap-3">
            <button
              id="tableSettingsBtn"
              class="flex items-center gap-2 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 rounded-xl text-gray-300 shadow-sm transition-colors"
            >
              {/* <i class="fas fa-cog text-teal-400"></i> */}
              <FaCog className="text-teal-400" />
              <span>Настройки таблицы</span>
            </button>
            <button
              id="addDeviceBtn"
              onClick={() => setModalOpen(true)}
              class="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl text-white shadow-sm hover:opacity-90 transition-opacity"
            >
              {/* <i class="fas fa-plus"></i> */}
              <FaPlus />
              <span>Добавить устройство</span>
            </button>
          </div>
        </div>

        {/* <!-- Таблица --> */}
        <div class="overflow-x-auto rounded-xl border border-gray-700">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-700/50">
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300 first:rounded-tl-xl">
                  ID устройства
                </th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Название устройства
                </th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Модель устройства
                </th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  IMEI
                </th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300 last:rounded-tr-xl">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700/50">
              {/* <!-- Строка поиска --> */}
              <tr class="bg-gray-800/50">
                <td class="px-6 py-3">
                  <div class="relative">
                    <input
                      type="text"
                      placeholder="ID..."
                      class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    />
                    {/* <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i> */}
                    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </td>
                <td class="px-6 py-3">
                  <div class="relative">
                    <input
                      type="text"
                      placeholder="Текст..."
                      class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    />
                    {/* <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i> */}
                    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </td>
                <td class="px-6 py-3">
                  <div class="relative">
                    <input
                      type="text"
                      placeholder="Текст..."
                      class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    />
                    {/* <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i> */}
                    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </td>
                <td class="px-6 py-3">
                  <div class="relative">
                    <input
                      type="text"
                      placeholder="Текст..."
                      class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    />
                    {/* <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i> */}
                    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </td>
                <td class="px-6 py-3">
                  <select class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors">
                    <option value="">Все статусы</option>
                    <option value="active">Активно</option>
                    <option value="inactive">Неактивно</option>
                    <option value="pending">В обработке</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="addDeviceModal"
        onClick={() => setModalOpen(false)}
        className={`fixed inset-0 bg-black/50 items-center justify-center z-50 backdrop-blur-sm ${modalOpen ? "flex" : "hidden"} `}
      >
        <div onClick={(e) => e.stopPropagation()} className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg mx-4 border border-gray-700 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Добавление устройства
              </h3>
              <p className="text-gray-400 text-sm">
                Заполните информацию о новом устройстве
              </p>
            </div>
            <button
              className="text-gray-400 hover:text-gray-200 transition-colors"
              onclick="closeAddDeviceModal()"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form id="addDeviceForm" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Название устройства
                </label>
                <input
                  type="text"
                  name="deviceName"
                  required=""
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="Например: iPhone 13 Pro"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Модель устройства
                </label>
                <input
                  type="text"
                  name="deviceModel"
                  required=""
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="Например: A2638"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                IMEI устройства
              </label>
              <input
                type="text"
                name="deviceImei"
                required=""
                pattern="\d{15}"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="15 цифр"
              />
              <p className="text-xs text-gray-400 mt-1">
                IMEI можно найти в настройках устройства или на коробке
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
              >
                Отмена
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                Добавить устройство
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Devices;
