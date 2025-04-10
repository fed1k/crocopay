import { FaCog, FaTrashAlt } from "react-icons/fa"
import { FaFileExport, FaInbox } from "react-icons/fa6"

const OrdersIn = () => {
 return (
    <div class="bg-gray-800/90 rounded-2xl shadow-2xl p-6 h-full flex flex-col backdrop-blur-lg border border-gray-700">
                    {/* <!-- Заголовок --> */}
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h2 class="text-2xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
                                Pay in заказы
                            </h2>
                            <p class="text-gray-400 mt-1">Pay in транзакции</p>
                        </div>
                        
                        {/* <!-- Переключатель активности --> */}
                        <div class="flex items-center gap-4">
                            <span class="text-gray-400">Статус работы:</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="workStatus" class="sr-only peer" />
                                <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                            </label>
                        </div>
                    </div>

                    {/* <!-- Фильтры --> */}
                    <div class="flex gap-3">
                        <div class="relative">
                            <input type="text" id="dateFrom" placeholder="Создано от..." class="px-4 py-2 bg-gray-800 rounded-xl text-gray-300 border border-gray-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 transition-colors" readonly="" />
                        </div>

                        <div class="relative">
                            <input type="text" id="dateTo" placeholder="Создано до..." class="px-4 py-2 bg-gray-800 rounded-xl text-gray-300 border border-gray-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 transition-colors" readonly="" />
                        </div>

                        {/* <!-- Кнопки --> */}
                        <button class="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-teal-400 border border-gray-700 transition-colors">
                            {/* <i class="fas fa-file-export"></i> */}
                            <FaFileExport />
                            <span>Экспорт</span>
                        </button>

                        {/* <!-- Меню настроек --> */}
                        <div class="relative">
                            <button class="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-teal-400 border border-gray-700 transition-colors" id="settingsDropdown">
                                {/* <i class="fas fa-cog"></i> */}
                                <FaCog />
                                <span>Настройки</span>
                            </button>
                            
                            <div class="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 py-2 hidden z-50" id="settingsMenu">
                                <button class="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700/50 transition-colors">
                                    {/* <i class="fas fa-trash-alt text-red-400"></i> */}
                                    <FaTrashAlt className="text-red-400" />
                                    <span>Сбросить фильтры</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Таблица --> */}
                    <div class="mt-8 bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        <table class="w-full">
                            <thead class="bg-gray-700">
                                <tr>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">ID</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Клиент</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Сумма</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Метод</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Банк</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Статус</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Время на оплату</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Действия</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-700">
                                {/* <!-- Сообщение о том, что нет активных заказов --> */}
                                <tr>
                                    <td colspan="8" class="px-6 py-8 text-center text-gray-400">
                                        <div class="flex flex-col items-center justify-center gap-4">
                                            <div class="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                                                {/* <i class="fas fa-inbox text-2xl text-gray-500"></i> */}
                                                <FaInbox className="text-2xl text-gray-500" />
                                            </div>
                                            <p>Нет активных заказов</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
 )
}

export default OrdersIn