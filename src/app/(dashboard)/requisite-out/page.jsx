"use client"

import { useState } from "react";
import { FaCheckCircle, FaSearch, FaTimesCircle } from "react-icons/fa";
import { FaInbox, FaPlus } from "react-icons/fa6";

const RequisiteOut = () => {

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="bg-gray-800/90 rounded-2xl shadow-2xl p-6 backdrop-blur-lg border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
              Реквизиты Pay out
            </h2>
            <p className="text-gray-400 mt-1">Управление Pay out реквизитами</p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg flex items-center gap-2 cursor-pointer"
          >
            <FaPlus />
            <span>Добавить реквизит</span>
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          <div className="relative">
            <input
              type="text"
              className="w-64 px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 pl-10"
              placeholder="Поиск..."
            />
            <FaSearch className="text-gray-400 absolute left-3 top-3" />
          </div>
          <div>
            <select className="px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50">
              <option value="">Все типы</option>
              <option value="card">Карта</option>
              <option value="sbp">СБП</option>
            </select>
          </div>
          <div>
            <select className="px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50">
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
            <select className="px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50">
              <option value="">Все статусы</option>
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onclick="toggleSelectedStatus('active')"
            className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg flex items-center gap-2"
          >
            <FaCheckCircle />
            <span>Включить выбранные</span>
          </button>
          <button
            onclick="toggleSelectedStatus('inactive')"
            className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg flex items-center gap-2"
          >
            <FaTimesCircle />
            <span>Отключить выбранные</span>
          </button>
        </div>

        <div className="bg-gray-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-3 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 bg-gray-700"
                  />
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Тип
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Банк
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Реквизит
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Лимиты
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody
              className="divide-y divide-gray-700 text-white"
              id="requisitesTableBody"
            >
              {/* <!-- Пустое состояние будет показано только если нет реквизитов --> */}
              <tr id="emptyRequisitesMessage">
                <td colspan="8" className="px-6 py-8 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
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

      <div
        id="addRequisiteModal"
        onClick={() => setModalOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm items-center justify-center z-50 ${
          modalOpen ? "flex" : "hidden"
        } `}
      >
        <div onClick={(e) => e.stopPropagation()} className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl shadow-xl border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">
              Добавление реквизита
            </h3>
            <button
              onclick="closeModal()"
              className="text-gray-400 hover:text-gray-300"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <form id="requisiteForm" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Тип платежа
                </label>
                <select
                  id="paymentType"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
                >
                  <option value="card">Банковская карта</option>
                  <option value="sbp">СБП</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Банк
                </label>
                <select
                  id="bank"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
                >
                  <optgroup label="Банки РФ">
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
                  </optgroup>
                  <optgroup label="Банки СНГ">
                    <option value="kaspi">Kaspi Bank (Казахстан)</option>
                    <option value="halyk">Halyk Bank (Казахстан)</option>
                    <option value="kapital">Kapital Bank (Азербайджан)</option>
                    <option value="pasha">PASHA Bank (Азербайджан)</option>
                    <option value="tbc">TBC Bank (Грузия)</option>
                    <option value="bog">Bank of Georgia (Грузия)</option>
                    <option value="optima">Optima Bank (Кыргызстан)</option>
                    <option value="kicb">KICB (Кыргызстан)</option>
                    <option value="itb">ИТБ (Таджикистан)</option>
                    <option value="amonatb">Амонатбанк (Таджикистан)</option>
                    <option value="agroinbank">
                      Агроинвестбанк (Таджикистан)
                    </option>
                    <option value="orienbank">ориент банк (Таджикистан)</option>
                    <option value="dushanbe">Душанбе (Таджикистан)</option>
                    <option value="alif">Алиф банк (Таджикистан)</option>
                    <option value="tafhid">Тавхидбанк (Таджикистан)</option>
                    <option value="eshat">Эсхата (Таджикистан)</option>
                    <option value="spitamen">Спитамен (Таджикистан)</option>
                  </optgroup>
                </select>
              </div>

              <div className="payment-card">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Номер карты
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
                  placeholder="0000 0000 0000 0000"
                />
              </div>

              <div className="payment-sbp hidden">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
                  placeholder="+7 (999) 999-99-99"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Минимальная сумма
                </label>
                <input
                  type="number"
                  id="minAmount"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
                  required=""
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Максимальная сумма
                </label>
                <input
                  type="number"
                  id="maxAmount"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
                  required=""
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
              >
                Отмена
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-gradient-to-r from-teal-400 to-pink-400 text-white rounded-lg hover:opacity-90"
              >
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequisiteOut;
