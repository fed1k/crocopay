import { FaCheckCircle, FaSearch, FaTimesCircle } from "react-icons/fa"
import { FaInbox, FaPlus } from "react-icons/fa6"

const Requisite = () => {
    return (
        <div class="bg-gray-800/90 rounded-2xl shadow-2xl p-6 backdrop-blur-lg border border-gray-700">
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h2 class="text-2xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">Реквизиты Pay in</h2>
                            <p class="text-gray-400 mt-1">Управление Pay in реквизитами</p>
                        </div>
                        <button type="button" onclick="openModal()" class="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg flex items-center gap-2 cursor-pointer">
                            {/* <i class="fas fa-plus"></i> */}
                            <FaPlus />
                            <span>Добавить реквизит</span>
                        </button>
                    </div>

                    <div class="mb-6 flex flex-wrap gap-4">
                        <div class="relative">
                            <input type="text" class="w-64 px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 pl-10" placeholder="Поиск..." />
                            {/* <i class="fas fa-search text-gray-400 absolute left-3 top-3"></i> */}
                            <FaSearch className="text-gray-400 absolute left-3 top-3" />
                        </div>
                        <div>
                            <select class="px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50">
                                <option value="">Все типы</option>
                                <option value="card">Карта</option>
                                <option value="sbp">СБП</option>
                            </select>
                        </div>
                        <div>
                            <select class="px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50">
                                <option value="sber">Сбербанк</option>
                                <option value="tinkoff">Тинькофф Банк</option>
                                <option value="alpha">Альфа-Банк</option>
                                <option value="vtb">ВТБ</option>
                                <option value="gazprom">Газпромбанк</option>
                                <option value="raif">Райффайзен Банк</option>
                                <option value="rosbank">Росбанк</option>
                                <option value="otkritie">Банк Открытие</option>
                                <option value="mts">МТС Банк</option>
                                <option value="pochta">Почта Банк</option>
                                <option value="sovcom">Совкомбанк</option>
                                <option value="unicredit">ЮниКредит Банк</option>
                                <option value="psb">Промсвязьбанк</option>
                                <option value="roscap">Росгосстрах Банк</option>
                                <option value="genbank">Генбанк</option>
                                <option value="chelyab">Челябинвест</option>
                                <option value="solidarity">Банк Солидарность</option>
                                <option value="akbars">АБ Россия</option>
                                <option value="ozon">Озон банк</option>
                                <option value="yandex">Яндекс банк</option>
                                <option value="kaspi">Kaspi Bank (Казахстан)</option>
                                <option value="halyk">Halyk Bank (Казахстан)</option>
                                <option value="kapital">Kapital Bank (Азербайджан)</option>
                                <option value="pasha">PASHA Bank (Азербайджан)</option>
                                <option value="tbc">TBC Bank (Грузия)</option>
                                <option value="bog">Bank of Georgia (Грузия)</option>
                                <option value="optima">Optima Bank (Кыргызстан)</option>
                                <option value="kicb">KICB (Кыргызстан)</option>
                                <option value="agroinbank">Агроинвестбанк (Таджикистан)</option>
                                <option value="orienbank">ориент банк (Таджикистан)</option>
                                <option value="dushanbe">Душанбе (Таджикистан)</option>
                                <option value="alif">Алиф банк (Таджикистан)</option>
                                <option value="tafhid">Тавхидбанк (Таджикистан)</option>
                                <option value="eshat">Эсхата (Таджикистан)</option>
                                <option value="spitamen">Спитамен (Таджикистан)</option>
                                <option value="itb">ИТБ (Таджикистан)</option>
                                <option value="amonatb">Амонатбанк (Таджикистан)</option>
                            </select>
                        </div>
                        <div>
                            <select class="px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50">
                                <option value="">Все статусы</option>
                                <option value="active">Активные</option>
                                <option value="inactive">Неактивные</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex gap-4 mb-4">
                        <button onclick="toggleSelectedStatus('active')" class="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg flex items-center gap-2">
                            {/* <i class="fas fa-check-circle"></i> */}
                            <FaCheckCircle />
                            <span>Включить выбранные</span>
                        </button>
                        <button onclick="toggleSelectedStatus('inactive')" class="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg flex items-center gap-2">
                            {/* <i class="fas fa-times-circle"></i> */}
                            <FaTimesCircle />
                            <span>Отключить выбранные</span>
                        </button>
                    </div>

                    <div class="bg-gray-700 rounded-xl overflow-hidden">
                        <table class="w-full">
                            <thead class="bg-gray-800 text-gray-300">
                                <tr>
                                    <th class="px-3 py-3 text-left">
                                            <input type="checkbox" class="rounded border-gray-600 bg-gray-700"/>
                                        </th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Тип</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Банк</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Статус</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Реквизит</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Лимиты</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Действия</th>
                                    </tr>
                                </thead>
                            <tbody class="divide-y divide-gray-700 text-white" id="requisitesTableBody">
                                {/* <!-- Пустое состояние будет показано только если нет реквизитов --> */}
                                <tr id="emptyRequisitesMessage">
                                    <td colspan="8" class="px-6 py-8 text-center text-gray-400">
                                        <div class="flex flex-col items-center justify-center gap-4">
                                            <div class="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                                                {/* <i class="fas fa-inbox text-2xl text-gray-500"></i> */}
                                                <FaInbox className="text-2xl text-gray-500" />
                                                </div>
                                            <p>Нет добавленных реквизитов</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
    )
}

export default Requisite