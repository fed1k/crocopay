import { FaCog, FaSearch } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"

const Devices = () => {
    return (
        <div class="bg-gray-800/90 rounded-2xl shadow-2xl p-8 relative overflow-hidden backdrop-blur-lg border border-gray-700">
                    <div class="flex justify-between items-center mb-8">
                        <div>
                            <h2 class="text-2xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                Устройства
                            </h2>
                            <p class="text-gray-400 text-sm">Управление подключенными устройствами</p>
                        </div>
                        <div class="flex gap-3">
                            <button id="tableSettingsBtn" class="flex items-center gap-2 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 rounded-xl text-gray-300 shadow-sm transition-colors">
                                {/* <i class="fas fa-cog text-teal-400"></i> */}
                                <FaCog className="text-teal-400" />
                                <span>Настройки таблицы</span>
                            </button>
                            <button id="addDeviceBtn" class="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl text-white shadow-sm hover:opacity-90 transition-opacity">
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
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300 first:rounded-tl-xl">ID устройства</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Название устройства</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Модель устройства</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">IMEI</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300 last:rounded-tr-xl">Статус</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-700/50">
                                {/* <!-- Строка поиска --> */}
                                <tr class="bg-gray-800/50">
                                    <td class="px-6 py-3">
                                        <div class="relative">
                                            <input type="text" placeholder="ID..." class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors" />
                                            {/* <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i> */}
                                            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </td>
                                    <td class="px-6 py-3">
                                        <div class="relative">
                                            <input type="text" placeholder="Текст..." class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors" />
                                            {/* <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i> */}
                                            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </td>
                                    <td class="px-6 py-3">
                                        <div class="relative">
                                            <input type="text" placeholder="Текст..." class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors" />
                                            {/* <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i> */}
                                            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </td>
                                    <td class="px-6 py-3">
                                        <div class="relative">
                                            <input type="text" placeholder="Текст..." class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors" />
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
    )
}

export default Devices