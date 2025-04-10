import { FaFilter, FaInbox } from "react-icons/fa6"

const Withdraw = () => {
    return (
        <div class="bg-gray-800/90 rounded-2xl shadow-2xl p-8 relative overflow-hidden backdrop-blur-lg border border-gray-700">
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-2xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
                            История выводов
                        </h2>
                        <div class="flex gap-3">
                            {/* <!-- Фильтры --> */}
                            <div class="relative">
                                <button class="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-gray-300 shadow-sm transition-colors" id="filterDropdown">
                                    {/* <i class="fas fa-filter text-pink-400"></i> */}
                                    <FaFilter className="text-pink-400" />
                                    <span>Фильтры</span>
                                </button>
                                <div class="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-lg border border-gray-700 py-2 hidden z-50" id="filterMenu">
                                    <div class="px-4 py-2">
                                        <label class="block text-gray-300 text-sm mb-2">Статус</label>
                                        <select class="w-full bg-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm">
                                            <option value="">Все статусы</option>
                                            <option value="pending">В обработке</option>
                                            <option value="completed">Завершен</option>
                                            <option value="rejected">Отклонен</option>
                                        </select>
                                    </div>
                                    <div class="px-4 py-2">
                                        <label class="block text-gray-300 text-sm mb-2">Период</label>
                                        <select class="w-full bg-gray-700 rounded-lg px-3 py-2 text-gray-200 text-sm">
                                            <option value="today">Сегодня</option>
                                            <option value="week">Неделя</option>
                                            <option value="month">Месяц</option>
                                            <option value="custom">Другой период</option>
                                        </select>
                                    </div>
                                    <div class="border-t border-gray-700 mt-2 pt-2">
                                        <button class="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700/50">
                                            <i class="fas fa-trash-alt text-red-400"></i>
                                            <span>Сбросить фильтры</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Таблица --> */}
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-700/50">
                                <tr>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">ID</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Дата</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Сумма</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Комиссия</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Метод</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Реквизиты</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Статус</th>
                                    <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Действия</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-700">
                                {/* <!-- Пустое состояние --> */}
                                <tr>
                                    <td colspan="8" class="px-6 py-8 text-center text-gray-400">
                                        <div class="flex flex-col items-center justify-center gap-4">
                                            <div class="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                                                {/* <i class="fas fa-inbox text-2xl text-gray-500"></i> */}
                                                <FaInbox className="text-2xl text-gray-500" />
                                            </div>
                                            <p>Нет истории выводов</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    )
}

export default Withdraw