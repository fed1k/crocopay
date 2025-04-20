"use client";

import { addDevice, getAllDevices } from "@/utils/firebase_utils";
import { useEffect, useState } from "react";
import { FaCog, FaEdit, FaSearch } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useUserContext } from "../layout";
import { docIdToReadableNumber } from "@/utils/helpers";

const Devices = () => {
  const {user} = useUserContext()

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [newDev, setNewDev] = useState({name: "", model: "", imei: "", status: "active", user_id: user?.token})
  const [devs, setDevs] = useState([]);

  const handleChange = (label, value) => {
    setNewDev((prev) => ({...prev, [label]: value}))
  }

  console.log(newDev)

  const saveDev = async(e) => {
    e.preventDefault()
    
    
    setLoading(true)
    const response = await addDevice(newDev);
    setLoading(false)

    if(response) {
      setDevs((prev) => ([...prev, {...newDev, id: response}]))
      setNewDev({model: "", imei: "", name: "", status: "active", user_id: user.token})
      setModalOpen(false)
    }
  }

  useEffect(() => {
    if (user) {
      setNewDev((prev) => ({...prev, user_id: user.token}))
      getAllDevices(user?.token).then((res) => {
        setDevs(res)
      })
    }
    // console.log(user)
  }, [user])

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
              <FaCog className="text-teal-400" />
              <span>Настройки таблицы</span>
            </button>
            <button
              id="addDeviceBtn"
              onClick={() => setModalOpen(true)}
              class="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl text-white shadow-sm hover:opacity-90 transition-opacity"
            >
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

              {devs?.length ? (
                devs.map((req) => (
                  <tr>
                    <td className="px-6 py-3 text-sm text-gray-400">
                      #{docIdToReadableNumber(req.id)}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-400">
                      {req.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-400">
                      {req.model}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-400">
                      {req.imei}
                    </td>
                    <td className="px-6 py-3 ">
                      <span
                        class={`px-2 py-1 text-xs rounded-full ${
                          req.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        } `}
                      >
                        {req.status === "active" ? "Активен" : "Неактивен"}
                      </span>
                    </td>
                    {/* <td className="px-3 py-3 ">
                      <div className="flex gap-2">
                        <button
                          // onClick={() => handleEdit(req)}
                          className="p-1 cursor-pointer text-teal-400 hover:text-teal-300"
                        >
                          <FaEdit />
                        </button>
                        <button
                          // onClick={() => deleteModalOpen(req.id)}
                          className="p-1 text-red-400 cursor-pointer hover:text-red-300"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div
        id="addDeviceModal"
        onClick={() => setModalOpen(false)}
        className={`fixed inset-0 bg-black/50 items-center justify-center z-50 backdrop-blur-sm ${
          modalOpen ? "flex" : "hidden"
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg mx-4 border border-gray-700 shadow-2xl"
        >
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

          <form onSubmit={saveDev} id="addDeviceForm" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Название устройства
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChange("name", e.target.value)}
                  name="deviceName"
                  required
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
                  onChange={(e) => handleChange("model", e.target.value)}
                  name="deviceModel"
                  required
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
                onChange={(e) => handleChange("imei", e.target.value)}
                required
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
                disabled={loading}
                onClick={() => setModalOpen(false)}
                className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
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
