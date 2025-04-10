import { FaExchangeAlt, FaShieldAlt } from "react-icons/fa"
import { FaArrowDown, FaArrowUp, FaCamera, FaChartLine, FaEnvelope, FaPen, FaTelegram } from "react-icons/fa6"

const Profile = () => {
    return (
        <main class=" bg-gray-900 h-[calc(100vh-64px)] overflow-hidden">
                <div class="bg-gray-800/90 rounded-2xl shadow-2xl p-8 h-full flex flex-col relative backdrop-blur-lg border border-gray-700">
                    {/* <!-- Декоративный фон --> */}
                    <div class="absolute top-0 right-0 -z-10 opacity-5">
                        <svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="0.5" class="text-teal-400"></circle>
                            <path d="M20,50 Q50,20 80,50" stroke="currentColor" class="text-pink-400" fill="none"></path>
                        </svg>
                    </div>

                    {/* <!-- Заголовок (фиксированный) --> */}
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-2xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
                            Профиль
                        </h2>
                    </div>

                    {/* <!-- Прокручиваемый контент --> */}
                    <div class="overflow-y-auto flex-1 -mr-4 pr-4">
                        {/* <!-- Основной контент --> */}
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* <!-- Левая колонка --> */}
                            <div class="space-y-6">
                                {/* <!-- Основная информация --> */}
                                <div class="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                                    <div class="flex items-center gap-6 mb-8">
                                        <div class="relative group">
                                            <img src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" id="userAvatar" class="w-20 h-20 object-cover rounded-full bg-gray-800" alt="User Avatar" />
                                            <div class="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                                {/* <i class="fas fa-camera text-white"></i> */}
                                                <FaCamera className="text-white" />
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2">
                                                <h3 id="displayUsername" class="text-xl font-bold text-white mb-1">Username</h3>
                                                <button onclick="editField('username')" class="text-teal-400 hover:text-teal-300">
                                                    {/* <i class="fas fa-pen text-sm"></i> */}
                                                    <FaPen className="text-sm" />
                                                </button>
                                            </div>
                                            <p class="text-gray-400">Пользователь</p>
                                        </div>
                                    </div>
                                    <div class="grid gap-6">
                                        <div class="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                            {/* <i class="fas fa-envelope text-teal-400 text-lg w-6"></i> */}
                                            <FaEnvelope className="text-teal-400 text-lg w-6" />
                                            <div class="flex-1">
                                                <p class="text-sm text-gray-400">Email</p>
                                                <div class="flex items-center gap-2">
                                                    <p class="text-white" id="displayEmail">user@example.com</p>
                                                    <button onclick="editField('email')" class="ml-auto text-teal-400 hover:text-teal-300">
                                                        {/* <i class="fas fa-pen text-sm"></i> */}
                                                        <FaPen className="text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                            {/* <i class="fab fa-telegram text-teal-400 text-lg w-6"></i> */}
                                            <FaTelegram className="text-teal-400 text-lg w-6" />
                                            <div class="flex-1">
                                                <p class="text-sm text-gray-400">Telegram</p>
                                                <div class="flex items-center gap-2">
                                                    <p class="text-white" id="displayTelegram">@username</p>
                                                    <button onclick="editField('telegram')" class="ml-auto text-teal-400 hover:text-teal-300">
                                                        {/* <i class="fas fa-pen text-sm"></i> */}
                                                        <FaPen className="text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Безопасность --> */}
                                <div class="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                                    <h3 class="text-lg font-semibold text-teal-400 mb-6">Безопасность</h3>
                                    <div class="space-y-4">
                                        <div class="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                            <div class="flex items-center gap-4">
                                                {/* <i class="fas fa-shield-alt text-pink-400 text-lg w-6"></i> */}
                                                <FaShieldAlt className="text-pink-400 text-lg w-6" />
                                                <div>
                                                    <p class="text-white font-medium">Двухфакторная аутентификация</p>
                                                    <p class="text-sm text-red-400">Отключена</p>
                                                </div>
                                            </div>
                                            <button onclick="enable2FA()" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-teal-400 rounded-lg text-sm transition-colors">
                                                Включить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Правая колонка --> */}
                            <div class="space-y-6">
                                {/* <!-- Статистика --> */}
                                <div class="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                                    <h3 class="text-lg font-semibold text-pink-400 mb-6">Статистика</h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                            <div class="flex items-center gap-3 mb-2">
                                                {/* <i class="fas fa-exchange-alt text-teal-400"></i> */}
                                                <FaExchangeAlt className="text-teal-400" />
                                                <span class="text-gray-400">Всего транзакций</span>
                                            </div>
                                            <p class="text-2xl font-bold text-white">0</p>
                                        </div>
                                        <div class="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                            <div class="flex items-center gap-3 mb-2">
                                                {/* <i class="fas fa-chart-line text-pink-400"></i> */}
                                                <FaChartLine className="text-pink-400" />
                                                <span class="text-gray-400">Общий оборот</span>
                                            </div>
                                            <p class="text-2xl font-bold text-white">0.00 USDT</p>
                                        </div>
                                        <div class="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                            <div class="flex items-center gap-3 mb-2">
                                                {/* <i class="fas fa-arrow-down text-teal-400"></i> */}
                                                <FaArrowDown className="text-teal-400" />
                                                <span class="text-gray-400">Всего получено</span>
                                            </div>
                                            <p class="text-2xl font-bold text-white">0.00 USDT</p>
                                        </div>
                                        <div class="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                            <div class="flex items-center gap-3 mb-2">
                                                {/* <i class="fas fa-arrow-up text-pink-400"></i> */}
                                                <FaArrowUp className="text-pink-400" />
                                                <span class="text-gray-400">Всего выведено</span>
                                            </div>
                                            <p class="text-2xl font-bold text-white">0.00 USDT</p>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- График активности --> */}
                                <div class="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                                    <h3 class="text-lg font-semibold text-teal-400 mb-6">Активность</h3>
                                    <div class="h-48 flex items-center justify-center text-gray-400">
                                        <p>График активности будет доступен позже</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Добавляем отступ снизу для прокрутки --> */}
                        <div class="h-6"></div>
                    </div>
                </div>
            </main>
    )
}

export default Profile