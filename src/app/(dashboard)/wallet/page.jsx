"use client";

import { useRef, useState } from "react";
import { FaInfoCircle, FaPlusCircle, FaShieldAlt, FaTimes } from "react-icons/fa"
import { FaArrowRight, FaBolt, FaCopy, FaWallet } from "react-icons/fa6"
import Swal from "sweetalert2"
const Wallet = () => {
    const [openModal, setOpenModal] = useState(false)
    const openDepositModal = () => {
        setOpenModal(true)
    }

    const closeDepositModal = () => {
        setOpenModal(false)
    }

    const copyAddress = () => {
        navigator.clipboard.writeText("TMdbidrUiMvV3TcFffSAjfTgai7boMVT4T").then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Скопировано!',
                text: 'Адрес скопирован в буфер обмена',
                timer: 1500,
                showConfirmButton: false,
                background: '#1F2937',
                color: '#fff',
                toast: true,
                position: 'top-end'
            });
        })
    }

    return (
        <div class="mb-8">
            {/* <!-- Объединенная карточка депозитов --> */}
            <div class="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                {/* <!-- Декоративный фоновый элемент --> */}
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-blue-500/10 blur-3xl rounded-full"></div>

                {/* <!-- Страховой депозит --> */}
                <div class="mb-8 pb-8 border-b border-gray-700">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h2 class="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Страховой депозит</h2>
                            <p class="text-sm text-gray-400">Ваша надежная финансовая защита</p>
                        </div>
                        <div class="relative">
                            <div class="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-30"></div>
                            {/* <i class="fas fa-shield-alt text-3xl text-teal-400 relative"></i> */}
                            <FaShieldAlt className="text-3xl text-teal-400 relative" />
                        </div>
                    </div>

                    <div class="flex items-end justify-between mb-6">
                        <div>
                            <div class="flex items-baseline gap-2">
                                <span id="userBalance" class="text-5xl font-bold text-white">0.00</span>
                                <span class="text-xl font-medium text-teal-400">USDT</span>
                            </div>
                            <p id="mainBalanceRub" class="text-sm text-gray-400 mt-2">≈ 0.00 RUB</p>
                        </div>
                    </div>

                    <div class="flex justify-center gap-4">
                        <button onClick={openDepositModal} class="flex-1 px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white rounded-xl flex items-center justify-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-teal-500/25">
                            {/* <i class="fas fa-plus-circle text-xl"></i> */}
                            <FaPlusCircle className="text-xl" />
                            <span class="font-medium">Пополнить депозит</span>
                        </button>
                        <button onClick="openWithdrawModal()" class="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl flex items-center gap-2 transition-all duration-300 hover:shadow-lg">
                            {/* <i class="fas fa-arrow-right"></i> */}
                            <FaArrowRight />
                            <span>Вывести</span>
                        </button>
                    </div>
                </div>

                {/* <!-- Рабочий депозит --> */}
                <div>
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h2 class="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Рабочий депозит</h2>
                            <p class="text-sm text-gray-400">Активы для торговых операций</p>
                        </div>
                        <div class="relative">
                            <div class="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-30"></div>
                            {/* <i class="fas fa-wallet text-3xl text-pink-400 relative"></i> */}
                            <FaWallet className="text-3xl text-pink-400 relative" />
                        </div>
                    </div>

                    <div class="flex items-end justify-between mb-6">
                        <div>
                            <div class="flex items-baseline gap-2">
                                <p id="workingBalance" class="text-5xl font-bold text-white">0.00</p>
                                <span class="text-xl font-medium text-pink-400">USDT</span>
                            </div>
                            <p id="workingBalanceRub" class="text-sm text-gray-400 mt-2">≈ 0.00 RUB</p>
                        </div>
                    </div>
                </div>

                {/* <!-- Информационный блок --> */}
                <div class="mt-6 bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                    <div class="flex items-start gap-3">
                        {/* <i class="fas fa-info-circle text-teal-400 mt-1"></i> */}
                        <FaInfoCircle className="mt-1 text-teal-400" />
                        <p class="text-sm text-gray-400">Страховой депозит обеспечивает безопасность ваших операций и позволяет работать с большими объемами</p>
                    </div>
                </div>
            </div>

            <div id="depositModal" class={`fixed overflow-y-scroll pt-46 inset-0 bg-black/80 ${openModal ? "flex" : "hidden"} items-center justify-center z-50`}>
                <div class="bg-gray-900 rounded-2xl w-full max-w-lg p-6 border border-gray-700 shadow-2xl relative">
                    {/* <!-- Декоративный фоновый элемент --> */}
                    <div class="absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br from-teal-500/20 to-blue-500/20 blur-3xl rounded-full"></div>
                    <div class="absolute -left-20 -bottom-20 w-60 h-60 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl rounded-full"></div>

                    {/* <!-- Заголовок --> */}
                    <div class="text-center mb-6">
                        <h2 class="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Пополнение депозита</h2>
                        <p class="text-gray-400 mt-2">Отправьте USDT (TRC20) на указанный адрес</p>
                    </div>

                    {/* <!-- QR код и адрес --> */}
                    <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
                        <div class="flex flex-col items-center gap-6">
                            {/* <!-- QR код с новым дизайном --> */}
                            <div class="relative group">
                                {/* <!-- Градиентная рамка --> */}
                                <div class="absolute -inset-3 bg-gradient-to-r from-teal-500/50 to-blue-500/50 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

                                {/* <!-- Контейнер QR кода --> */}
                                <div class="relative bg-white p-4 rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                                    {/* <!-- Сам QR код --> */}
                                    <div id="qrCode" class="qr-wrapper"><img src="qr.jpg" width="222" height="222" class="qr-image bg-white" /></div>

                                    {/* <!-- Логотип поверх QR кода --> */}
                                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div class="bg-white rounded-lg p-1 shadow-lg">
                                            {/* <i class="fas fa-wallet text-2xl bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"></i> */}
                                            {/* <FaWallet className="text-2xl bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Адрес кошелька --> */}
                            <div class="w-full space-y-2">
                                <p class="text-sm text-gray-400">Адрес для пополнения USDT (TRC20):</p>
                                <div class="flex items-center gap-2 bg-gray-800 p-3 rounded-lg group hover:bg-gray-700/50 transition-all duration-300">
                                    <span id="walletAddress" class="text-white font-mono text-sm flex-1 break-all">TMdbidrUiMvV3TcFffSAjfTgai7boMVT4T</span>
                                    <button onClick={copyAddress} class="text-teal-400 cursor-pointer hover:text-teal-300 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                                        {/* <i class="fas fa-copy"></i> */}
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Информация --> */}
                    <div class="space-y-4">
                        {/* <!-- Преимущества --> */}
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-teal-400/10 rounded-lg flex items-center justify-center">
                                        {/* <i class="fas fa-bolt text-teal-400"></i> */}
                                        <FaBolt className="text-teal-400" />
                                    </div>
                                    <div>
                                        <h3 class="text-white font-semibold">Мгновенно</h3>
                                        <p class="text-sm text-gray-400">Быстрое зачисление</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-blue-400/10 rounded-lg flex items-center justify-center">
                                        {/* <i class="fas fa-shield-alt text-blue-400"></i> */}
                                        <FaShieldAlt className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 class="text-white font-semibold">Безопасно</h3>
                                        <p class="text-sm text-gray-400">Защита средств</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Важная информация --> */}
                        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <div class="flex items-start gap-3">
                                {/* <i class="fas fa-info-circle text-teal-400 mt-1"></i> */}
                                <FaInfoCircle className="text-teal-400 mt-1" />
                                <div class="flex-1">
                                    <p class="text-sm text-gray-400">
                                        Отправляйте только USDT по сети TRC20. Отправка других токенов или использование другой сети может привести к потере средств.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Кнопка закрытия --> */}
                    <button onClick={closeDepositModal} class="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-white">
                        {/* <i class="fas fa-times"></i> */}
                        <FaTimes />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Wallet