import Link from "next/link"
import { FaArrowDown, FaArrowUp, FaChartLine, FaChartPie, FaCheckCircle, FaClock, FaHistory, FaLock, FaMoneyBillWave, FaShieldAlt, FaUsers, FaWallet } from "react-icons/fa"

const Profile = () => {
    return (
        <div>
            <div className="bg-gray-800/90 rounded-2xl shadow-2xl p-8 relative overflow-hidden backdrop-blur-lg border border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div id="accountStatusBlock">
                        <div className="bg-gray-900/50 rounded-xl p-6 border border-red-500/30">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-red-500/10 rounded-full">
                                    {/* <i className="fas fa-lock text-2xl text-red-400"></i> */}
                                    <FaLock className="text-2xl text-red-400" />

                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-red-400">Функции ограничены</h3>
                                    <p className="text-gray-400">Пополните страховой депозит для активации личного кабинета и доступа ко всем функциям</p>
                                </div>
                            </div>
                            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-400">Необходимо для активации</p>
                                        <p className="text-2xl font-bold text-white"><span id="requiredAmount">1500.00</span> USDT</p>
                                    </div>
                                    <Link href="/wallet" className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105">
                                        Активировать
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Правая колонка - Текущая статистика --> */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-teal-500/30 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                {/* <i className="fas fa-chart-line text-teal-400"></i> */}
                                <FaChartLine className="text-teal-400" />
                                Текущая активность
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                                <span className="text-xs text-teal-400">live</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300 group">
                                <div className="flex items-center gap-2 mb-2">
                                    {/* <i className="fas fa-users text-teal-400 group-hover:scale-110 transition-transform"></i> */}
                                    <FaUsers className="text-teal-400 group-hover:scale-110 transition-transform" />
                                    <p className="text-sm text-gray-400">Активные мерчанты</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-bold text-white" id="merchantCount">9</p>
                                    <p className="text-xs text-teal-400">из 12</p>
                                </div>
                                <div className="mt-1 text-xs text-gray-400">Онлайн сейчас</div>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300 group">
                                <div className="flex items-center gap-2 mb-2">
                                    {/* <i className="fas fa-wallet text-pink-400 group-hover:scale-110 transition-transform"></i> */}
                                    <FaWallet className="text-pink-400 group-hover:scale-110 transition-transform" />

                                    <p className="text-sm text-gray-400">Баланс системы</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-bold text-white" id="systemBalance">0</p>
                                    <p className="text-xs text-pink-400">RUB</p>
                                </div>
                                <div className="mt-1 text-xs text-gray-400">В обработке</div>
                            </div>
                        </div>
                        {/* <!-- Мини-график последних транзакций --> */}
                        <div className="mt-4 p-4 bg-gray-800/30 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-xs text-gray-400">Последние транзакции (24ч)</p>
                                <div className="flex items-center gap-2">
                                    <span id="transactionCount" className="text-xs text-teal-400">0 операций</span>
                                </div>
                            </div>
                            <div className="h-16 flex items-end gap-1" id="activityGraph">
                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "89.47368421052632%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        17 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/40 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "26.31578947368421%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        5 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "100%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        19 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/70 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "52.63157894736842%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        10 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "73.68421052631578%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        14 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/70 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "68.42105263157895%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        13 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/70 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "57.89473684210527%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        11 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/70 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "47.368421052631575%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        9 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "94.73684210526315%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        18 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "94.73684210526315%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        18 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "94.73684210526315%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        18 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/70 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "57.89473684210527%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        11 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/70 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "47.368421052631575%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        9 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "89.47368421052632%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        17 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/40 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "26.31578947368421%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        5 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/70 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "47.368421052631575%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        9 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/40 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "31.57894736842105%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        6 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "78.94736842105263%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        15 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "94.73684210526315%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        18 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400/40 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "26.31578947368421%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        5 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "89.47368421052632%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        17 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "73.68421052631578%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        14 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "94.73684210526315%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        18 tx
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="w-2 bg-teal-400 rounded-full transition-all duration-300 hover:bg-teal-300" style={{ height: "78.94736842105263%" }}>
                                    </div>
                                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-xs text-teal-400 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        15 tx
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Средний ряд: Статистика и Показатели --> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* <!-- Левая колонка - Статистика системы --> */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-teal-500/30 transition-colors duration-300">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            {/* <i className="fas fa-chart-pie text-teal-400"></i> */}
                            <FaChartPie className="text-teal-400" />

                            Показатели системы
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    {/* <i className="fas fa-money-bill-wave text-green-400"></i> */}
                                    <FaMoneyBillWave className="text-green-400" />

                                    <p className="text-sm text-gray-400">Оборот за 24ч</p>
                                </div>
                                <p className="text-2xl font-bold text-white" id="dailyVolume">0</p>
                                <p className="text-xs text-green-400" id="volumeGrowth">+0% к вчера</p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    {/* <i className="fas fa-clock text-blue-400"></i> */}
                                    <FaClock className="text-blue-400" />

                                    <p className="text-sm text-gray-400">Ср. время</p>
                                </div>
                                <p className="text-2xl font-bold text-white" id="avgTime">0</p>
                                <p className="text-xs text-blue-400">минут</p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    {/* <i className="fas fa-check-circle text-teal-400"></i> */}
                                    <FaCheckCircle className="text-teal-400" />

                                    <p className="text-sm text-gray-400">Успешность</p>
                                </div>
                                <p className="text-2xl font-bold text-white" id="successRate">0</p>
                                <p className="text-xs text-teal-400">% выплат</p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    {/* <i className="fas fa-shield-alt text-purple-400"></i> */}
                                    <FaShieldAlt className="text-purple-400" />

                                    <p className="text-sm text-gray-400">Безопасность</p>
                                </div>
                                <p className="text-2xl font-bold text-white">100</p>
                                <p className="text-xs text-purple-400">% защита</p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Правая колонка - Последние операции --> */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-teal-500/30 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <FaHistory className="text-teal-400" />

                                Последние операции
                            </h3>
                            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
                                <span id="lastUpdateTime" className="text-xs text-gray-400">Обновлено сейчас</span>
                                <i className="fas fa-sync-alt text-teal-400 animate-spin text-sm"></i>
                            </div>
                        </div>
                        <div id="transactionsList" className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    {/* <i className="fas fa-arrow-down text-green-400"></i> */}
                                    <FaArrowDown className="text-green-400" />
                                    <div>
                                        <p className="text-sm text-white">8&nbsp;460 RUB</p>
                                        <p className="text-xs text-gray-400">44 сек. назад</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded-full bg-red-400/10 text-red-400">
                                        Отменен
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    {/* <i className="fas fa-arrow-up text-red-400"></i> */}
                                    <FaArrowUp className="text-red-400" />
                                    <div>
                                        <p className="text-sm text-white">48&nbsp;010 RUB</p>
                                        <p className="text-xs text-gray-400">59 сек. назад</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-400/10 text-yellow-400">
                                        В процессе
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    {/* <i className="fas fa-arrow-down text-green-400"></i> */}
                                    <FaArrowDown className="text-green-400" />
                                    <div>
                                        <p className="text-sm text-white">12&nbsp;370 RUB</p>
                                        <p className="text-xs text-gray-400">1 мин. 21 сек. назад</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-400/10 text-yellow-400">
                                        В процессе
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    {/* <i className="fas fa-arrow-up text-red-400"></i> */}
                                    <FaArrowUp className="text-red-400" />
                                    <div>
                                        <p className="text-sm text-white">125&nbsp;380 RUB</p>
                                        <p className="text-xs text-gray-400">2 мин. 3 сек. назад</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-400/10 text-green-400">
                                        Выполнен
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    {/* <i className="fas fa-arrow-up text-red-400"></i> */}
                                    <FaArrowUp className="text-red-400" />
                                    <div>
                                        <p className="text-sm text-white">6&nbsp;040 RUB</p>
                                        <p className="text-xs text-gray-400">3 мин. 0 сек. назад</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-400/10 text-green-400">
                                        Выполнен
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile