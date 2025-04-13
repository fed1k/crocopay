"use client";

import { useRef, useState } from "react";
import {
  FaInfoCircle,
  FaPlusCircle,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";
import { FaArrowRight, FaBolt, FaCopy, FaWallet } from "react-icons/fa6";
import Swal from "sweetalert2";
const Wallet = () => {
  const [openModal, setOpenModal] = useState(false);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false)
  const openDepositModal = () => {
    setOpenModal(true);
  };

  const closeDepositModal = () => {
    setOpenModal(false);
  };

  const copyAddress = () => {
    navigator.clipboard
      .writeText("TMdbidrUiMvV3TcFffSAjfTgai7boMVT4T")
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Скопировано!",
          text: "Адрес скопирован в буфер обмена",
          timer: 1500,
          showConfirmButton: false,
          background: "#1F2937",
          color: "#fff",
          toast: true,
          position: "top-end",
        });
      });
  };

  return (
    <>
      <div className="mb-8">
        {/* <!-- Объединенная карточка депозитов --> */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
          {/* <!-- Декоративный фоновый элемент --> */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-blue-500/10 blur-3xl rounded-full"></div>

          {/* <!-- Страховой депозит --> */}
          <div className="mb-8 pb-8 border-b border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                  Страховой депозит
                </h2>
                <p className="text-sm text-gray-400">
                  Ваша надежная финансовая защита
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-30"></div>
                {/* <i className="fas fa-shield-alt text-3xl text-teal-400 relative"></i> */}
                <FaShieldAlt className="text-3xl text-teal-400 relative" />
              </div>
            </div>

            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <span id="userBalance" className="text-5xl font-bold text-white">
                    0.00
                  </span>
                  <span className="text-xl font-medium text-teal-400">USDT</span>
                </div>
                <p id="mainBalanceRub" className="text-sm text-gray-400 mt-2">
                  ≈ 0.00 RUB
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={openDepositModal}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white rounded-xl flex items-center justify-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
              >
                {/* <i className="fas fa-plus-circle text-xl"></i> */}
                <FaPlusCircle className="text-xl" />
                <span className="font-medium">Пополнить депозит</span>
              </button>
              <button
                onClick={() => setWithdrawalModalOpen(true)}
                className="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-xl flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
              >
                {/* <i className="fas fa-arrow-right"></i> */}
                <FaArrowRight />
                <span>Вывести</span>
              </button>
            </div>
          </div>

          {/* <!-- Рабочий депозит --> */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Рабочий депозит
                </h2>
                <p className="text-sm text-gray-400">
                  Активы для торговых операций
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-30"></div>
                {/* <i className="fas fa-wallet text-3xl text-pink-400 relative"></i> */}
                <FaWallet className="text-3xl text-pink-400 relative" />
              </div>
            </div>

            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <p id="workingBalance" className="text-5xl font-bold text-white">
                    0.00
                  </p>
                  <span className="text-xl font-medium text-pink-400">USDT</span>
                </div>
                <p id="workingBalanceRub" className="text-sm text-gray-400 mt-2">
                  ≈ 0.00 RUB
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Информационный блок --> */}
          <div className="mt-6 bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-start gap-3">
              {/* <i className="fas fa-info-circle text-teal-400 mt-1"></i> */}
              <FaInfoCircle className="mt-1 text-teal-400" />
              <p className="text-sm text-gray-400">
                Страховой депозит обеспечивает безопасность ваших операций и
                позволяет работать с большими объемами
              </p>
            </div>
          </div>
        </div>

        <div
          id="depositModal"
          className={`fixed overflow-y-scroll pt-46 inset-0 bg-black/80 ${
            openModal ? "flex" : "hidden"
          } items-center justify-center z-50`}
        >
          <div className="bg-gray-900 rounded-2xl w-full max-w-lg p-6 border border-gray-700 shadow-2xl relative">
            {/* <!-- Декоративный фоновый элемент --> */}
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br from-teal-500/20 to-blue-500/20 blur-3xl rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-3xl rounded-full"></div>

            {/* <!-- Заголовок --> */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Пополнение депозита
              </h2>
              <p className="text-gray-400 mt-2">
                Отправьте USDT (TRC20) на указанный адрес
              </p>
            </div>

            {/* <!-- QR код и адрес --> */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
              <div className="flex flex-col items-center gap-6">
                {/* <!-- QR код с новым дизайном --> */}
                <div className="relative group">
                  {/* <!-- Градиентная рамка --> */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-teal-500/50 to-blue-500/50 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>

                  {/* <!-- Контейнер QR кода --> */}
                  <div className="relative bg-white p-4 rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                    {/* <!-- Сам QR код --> */}
                    <div id="qrCode" className="qr-wrapper">
                      <img
                        src="qr.jpg"
                        width="222"
                        height="222"
                        className="qr-image bg-white"
                      />
                    </div>

                    {/* <!-- Логотип поверх QR кода --> */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white rounded-lg p-1 shadow-lg">
                        {/* <i className="fas fa-wallet text-2xl bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"></i> */}
                        {/* <FaWallet className="text-2xl bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent" /> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Адрес кошелька --> */}
                <div className="w-full space-y-2">
                  <p className="text-sm text-gray-400">
                    Адрес для пополнения USDT (TRC20):
                  </p>
                  <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg group hover:bg-gray-700/50 transition-all duration-300">
                    <span
                      id="walletAddress"
                      className="text-white font-mono text-sm flex-1 break-all"
                    >
                      TMdbidrUiMvV3TcFffSAjfTgai7boMVT4T
                    </span>
                    <button
                      onClick={copyAddress}
                      className="text-teal-400 cursor-pointer hover:text-teal-300 transition-colors p-2 hover:bg-gray-800 rounded-lg"
                    >
                      {/* <i className="fas fa-copy"></i> */}
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Информация --> */}
            <div className="space-y-4">
              {/* <!-- Преимущества --> */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-400/10 rounded-lg flex items-center justify-center">
                      {/* <i className="fas fa-bolt text-teal-400"></i> */}
                      <FaBolt className="text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Мгновенно</h3>
                      <p className="text-sm text-gray-400">Быстрое зачисление</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-400/10 rounded-lg flex items-center justify-center">
                      {/* <i className="fas fa-shield-alt text-blue-400"></i> */}
                      <FaShieldAlt className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Безопасно</h3>
                      <p className="text-sm text-gray-400">Защита средств</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Важная информация --> */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start gap-3">
                  {/* <i className="fas fa-info-circle text-teal-400 mt-1"></i> */}
                  <FaInfoCircle className="text-teal-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">
                      Отправляйте только USDT по сети TRC20. Отправка других
                      токенов или использование другой сети может привести к
                      потере средств.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Кнопка закрытия --> */}
            <button
              onClick={closeDepositModal}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-white"
            >
              {/* <i className="fas fa-times"></i> */}
              <FaTimes />
            </button>
          </div>
        </div>
      </div>

      <div
        id="withdrawModal"
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm ${withdrawalModalOpen ? "flex" : "hidden"} items-center justify-center z-50`}
        // style="display: flex;"
      >
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 w-full max-w-md mx-4 border border-gray-700 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Новый вывод</h3>
            <button
              className="text-gray-400 hover:text-gray-200"
              // onclick="closeWithdrawModal()"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">
                Сумма вывода (USDT)
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full bg-gray-700 rounded-lg px-3 py-2 text-gray-200 outline-none border border-gray-600"
                  placeholder="0.00"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  USDT
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Минимальная сумма: 10 USDT
              </p>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Сеть</label>
              <select className="w-full bg-gray-700 rounded-lg px-3 py-2 text-gray-200 outline-none border border-gray-600">
                <option value="">Выберите сеть</option>
                <option value="trc20">TRC20</option>
                <option value="erc20">ERC20</option>
                <option value="bep20">BEP20 (BSC)</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Комиссия сети может варьироваться
              </p>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">
                Адрес кошелька USDT
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-gray-700 rounded-lg px-3 py-2 text-gray-200 outline-none border border-gray-600"
                  placeholder="Введите адрес кошелька"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  <i className="fas fa-paste"></i>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Убедитесь в правильности адреса
              </p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Комиссия сети</span>
                <span className="text-gray-300">~1.00 USDT</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-400">Итого к получению</span>
                <span className="text-white">0.00 USDT</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setWithdrawalModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-400 to-pink-400 text-white rounded-lg hover:opacity-90"
              >
                Подтвердить
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Wallet;
