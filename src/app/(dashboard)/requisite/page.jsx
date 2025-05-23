"use client";

import {
  createReq,
  deleteReq,
  editReq,
  getUserReqs,
} from "@/utils/firebase_utils";
import {
  docIdToReadableNumber,
  maskCardNumber,
  maskPhoneNumber,
  requisitePercentageCalculator,
} from "@/utils/helpers";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaEdit, FaSearch, FaTimesCircle } from "react-icons/fa";
import { FaInbox, FaPlus, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useUserContext } from "../layout";
import { bankCountryCodeMap } from "@/utils/constants";
import { sendTelegramMessage } from "@/bot";

const Requisite = () => {
  const { user } = useUserContext();

  const [copyOfReqs, setCopyOfReqs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editReqId, setEditReqId] = useState();
  const [paymentType, setPaymentType] = useState("card");
  const [paymentValue, setPaymentValue] = useState("");
  const [selectedBank, setSelectedBank] = useState("Сбербанк");
  const [userReqs, setUserReqs] = useState([]);
  const [minMaxm, setMinMax] = useState({ min: null, max: null });
  const [bid, setBid] = useState({ payIn: "8.5%", payOut: "3.5%" });

  const [filterStatus, setFilterStatus] = useState("all");

  const handlePaymentTypeChange = (value) => {
    setPaymentValue("");
    setPaymentType(value);
  };

  const closeModal = () => {
    setIsEdit(false);
    setPaymentType("card");
    setPaymentValue("");
    setSelectedBank("Сбербанк");
    setMinMax({ max: null, min: null });
    setModalOpen(false);
  };

  const handleMinMax = (label, value) => {
    setMinMax((prev) => ({ ...prev, [label]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentValue(
      paymentType === "card"
        ? maskCardNumber(e.target.value)
        : maskPhoneNumber(e.target.value, bankCountryCodeMap[selectedBank])
    );
  };

  const saveReq = async () => {
    if (!paymentValue || !minMaxm.max || !minMaxm.min) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: "Заполните все поля!",
        timer: 2000,
        showConfirmButton: false,
        background: "#1F2937",
        color: "#fff",
        toast: true,
        position: "top-end",
      });
      return;
    }

    setLoading(true);
    const response = await createReq({
      paymentType,
      req: paymentValue,
      status: "active",
      bank: selectedBank,
      min: minMaxm.min,
      max: minMaxm.max,
      user_id: user?.token,
    });
    setLoading(false);
    if (response) {
      setUserReqs((prev) => [
        ...prev,
        {
          paymentType,
          req: paymentValue,
          id: response,
          status: "active",
          bank: selectedBank,
          min: minMaxm.min,
          max: minMaxm.max,
          user_id: user?.token,
        },
      ]);
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Добавлено!",
        text: "Добавлено устройства!",
        timer: 2000,
        showConfirmButton: false,
        background: "#1F2937",
        color: "#fff",
        toast: true,
        position: "top-end",
      });
    }
  };

  const saveEdit = async () => {
    const updatedData = {
      paymentType,
      req: paymentValue,
      status: "active",
      bank: selectedBank,
      min: minMaxm.min,
      max: minMaxm.max,
      user_id: user?.token,
    };
    setLoading(true);
    const response = await editReq(editReqId, updatedData);
    setLoading(false);
    if (response) {
      setUserReqs((prev) =>
        prev.map((req) =>
          req.id === editReqId ? { ...req, ...updatedData } : req
        )
      );
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Изменил!",
        text: "Изменил реквизит!",
        timer: 2000,
        showConfirmButton: false,
        background: "#1F2937",
        color: "#fff",
        toast: true,
        position: "top-end",
      });
    }
  };

  const deleteModalOpen = (doc_id) => {
    Swal.fire({
      title: "Подтверждение",
      color: "white",
      text: "Вы действительно хотите удалить этот реквизит?",
      showDenyButton: true,
      denyButtonText: "Отмена",
      icon: "warning",
      confirmButtonText: "Да, удалить",
      customClass: {
        confirmButton: "bg-greenish",
      },
      background: "#1F2937FF",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteReq(doc_id);
        setUserReqs((prev) => [...prev].filter((el) => el.id !== doc_id));
        Swal.fire({
          title: "Удалено!",
          text: "Реквизит был успешно удален.",
          icon: "success",
          background: "#1F2937FF",
          color: "white",
        });
      }
    });
  };

  const handleEdit = (data) => {
    setEditReqId(data.id);
    setMinMax({ min: data.min, max: data.max });
    setPaymentValue(data.req);
    setPaymentType(data.paymentType);
    setSelectedBank(data.bank);
    setModalOpen(true);
    setIsEdit(true);
  };
  const [placeholder, setPlaceholder] = useState("+7 (999) 999-99-99");
  const handleSelectChange = (e) => {
    const bank = e.target.value;
    setSelectedBank(bank);
    setBid(requisitePercentageCalculator(bank));
    const code = bankCountryCodeMap[bank] || "+7";
    setPlaceholder(
      code +
        (bankCountryCodeMap[bank].length == 2
          ? " (999) 999-99-99"
          : " (99) 999-99-99")
    );
    setPaymentValue("");
  };

  const turnOnSelected = () => {
    Swal.fire({
      title: "Активация недоступна",
      color: "white",
      text:
        user?.activationAmount <= user?.balance
          ? "Для включения реквизитов необходимо выполнить минимум 5 Pay out заказов"
          : "Для включения Pay in реквизитов необходимо активировать личный кабинет",
      icon: "warning",
      confirmButtonText: "Понятно",
      customClass: {
        confirmButton: "bg-greenish",
      },
      background: "#1F2937FF",
    });
  };

  const turnOffSelected = () => {
    Swal.fire({
      title: "Реквизиты отключены",
      color: "white",
      icon: "warning",
      confirmButtonText: "Понятно",
      customClass: {
        confirmButton: "bg-greenish",
      },
      background: "#1F2937FF",
    });
  };

  const filterByType = (e) => {
    if (e.target.value === "card") {
      const newData = copyOfReqs.filter((el) => el.paymentType === "card");
      setUserReqs(newData);
      return;
    }

    if (e.target.value === "sbp") {
      const newData = copyOfReqs.filter((el) => el.paymentType === "sbp");
      setUserReqs(newData);
      return;
    }
    setUserReqs(copyOfReqs);
  };

  const filterByBank = (e) => {
    const selectedText = e.currentTarget.selectedOptions[0].text;
    const newReqs = copyOfReqs.filter((el) => el.bank === selectedText);
    // console.log(selectedText);
    setUserReqs(newReqs);
  };

  const [selected, setSelected] = useState([]);

  const toggleAll = (checked) => {
    if (checked) {
      setSelected(userReqs.map((row) => row.id)); // Select all
    } else {
      setSelected([]); // Deselect all
    }
  };

  const toggleOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (user) {
      sendTelegramMessage(
        `Пользователь ${user.name} перешел на страницу 'Реквизити'`
      );
      getUserReqs(user?.token).then((data) => {
        setUserReqs(data);
        setCopyOfReqs(data);
      });
    }
  }, [user]);

  return (
    <>
      <div className="bg-gray-800/90 rounded-2xl w-screen sm:w-auto mx-auto shadow-2xl md:p-6 p-4 backdrop-blur-lg border border-gray-700">
        <div className="md:flex block justify-between items-center mb-6">
          <div>
            <h2 className="md:text-2xl sm:text-md text-lg font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
              Реквизиты Pay in
            </h2>
            <p className="text-gray-400 md:text-lg text-sm md:mb-0 mb-3 mt-1">
              Управление Pay in реквизитами
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="md:px-4 px-2.5 md:py-2 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg flex items-center gap-2 cursor-pointer"
          >
            <FaPlus className="text-sm md:text-lg" />
            <span className="text-sm md:text-lg">Добавить реквизит</span>
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          <div className="relative ">
            <input
              type="text"
              className="w-64 px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 pl-10"
              placeholder="Поиск..."
            />
            {/* <i className="fas fa-search text-gray-400 absolute left-3 top-3"></i> */}
            <FaSearch className="text-gray-400 absolute left-3 top-3" />
          </div>
          <div>
            <select
              onChange={filterByType}
              className="px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50"
            >
              <option value="all">Все типы</option>
              <option value="card">Карта</option>
              <option value="sbp">СБП</option>
            </select>
          </div>
          <div>
            <select
              onChange={filterByBank}
              className="px-4 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50"
            >
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
              <option value="AMERIA Bank (Армения)">
                AMERIA Bank (Армения)
              </option>
              <option value="Ararat Bank (Армения)">
                Ararat Bank (Армения)
              </option>
              <option value="Узнацбанк (Узбекистан)">
                Узнацбанк (Узбекистан)
              </option>
              <option value="Узпромстройбанк (Узбекистан)">
                Узпромстройбанк (Узбекистан)
              </option>
              <option value="Народный банк (Узбекистан)">
                Народный банк (Узбекистан)
              </option>
              <option value="Капиталбанк (Узбекистан)">
                Капиталбанк (Узбекистан)
              </option>
              <option value="Асакабанк (Узбекистан)">
                Асакабанк (Узбекистан)
              </option>
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
            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2  bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50"
            >
              <option value="all">Все статусы</option>
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
            </select>
          </div>
        </div>

        <div className="md:flex block gap-4 mb-4">
          <button
            onClick={turnOnSelected}
            className="md:px-4 px-2.5 cursor-pointer py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 mb-4 md:mb-0 rounded-lg flex items-center gap-2"
          >
            <FaCheckCircle />
            <span>Включить выбранные</span>
          </button>
          <button
            onClick={turnOffSelected}
            className="md:px-4 px-2.5 cursor-pointer py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg flex items-center gap-2"
          >
            <FaTimesCircle />
            <span>Отключить выбранные</span>
          </button>
        </div>

        <div className="bg-gray-700 rounded-xl overflow-scroll sm:overflow-hidden">
          <table className="w-screen sm:w-full">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-3 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selected.length === userReqs.length}
                    onChange={(e) => toggleAll(e.target.checked)}
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
              {userReqs?.length && (filterStatus === "all" || filterStatus === "inactive") ? (
                userReqs.map((req) => (
                  <tr>
                    <td className="px-3 py-3 ">
                      <input checked={selected.includes(req.id)} onChange={() => toggleOne(req.id)} type="checkbox" name="" id="" />
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-400">
                      #{docIdToReadableNumber(req.id)}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-400">
                      {req.paymentType === "card" ? "Карта" : "СБП"}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-400">
                      {req.bank}
                    </td>
                    <td className="px-3 py-3 ">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          req.status !== "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        } `}
                      >
                        {req.status !== "active" ? "Активен" : "Неактивен"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-400">
                      {req.paymentType === "card"
                        ? "**** " + req.req.slice(-4)
                        : req.req}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-400">
                      {req.min} ₽ - {req.max} ₽
                    </td>
                    <td className="px-3 py-3 ">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(req)}
                          className="p-1 cursor-pointer text-teal-400 hover:text-teal-300"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteModalOpen(req.id)}
                          className="p-1 text-red-400 cursor-pointer hover:text-red-300"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr id="emptyRequisitesMessage">
                  <td
                    colSpan="8"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                        {/* <i className="fas fa-inbox text-2xl text-gray-500"></i> */}
                        <FaInbox className="text-2xl text-gray-500" />
                      </div>
                      <p>Нет добавленных реквизитов</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div
        onClick={closeModal}
        id="addRequisiteModal"
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm items-center justify-center z-50 ${
          modalOpen ? "flex" : "hidden"
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl shadow-xl border border-gray-700"
        >
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
                  value={paymentType}
                  id="paymentType"
                  onChange={(e) => handlePaymentTypeChange(e.target.value)}
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
                  value={selectedBank}
                  onChange={handleSelectChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
                >
                  <optgroup label="Банки РФ">
                    <option value="Сбербанк">Сбербанк</option>
                    <option value="Тинькофф Банк">Тинькофф Банк</option>
                    <option value="Альфа-Банк">Альфа-Банк</option>
                    <option value="ВТБ">ВТБ</option>
                    <option value="Газпромбанк">Газпромбанк</option>
                    <option value="Райффайзен Банк">Райффайзен Банк</option>
                    <option value="Росбанк">Росбанк</option>
                    <option value="Банк Открытие">Банк Открытие</option>
                    <option value="МТС Банк">МТС Банк</option>
                    <option value="Почта Банк">Почта Банк</option>
                    <option value="Совкомбанк">Совкомбанк</option>
                    <option value="ЮниКредит Банк">ЮниКредит Банк</option>
                    <option value="Промсвязьбанк">Промсвязьбанк</option>
                    <option value="Росгосстрах Банк">Росгосстрах Банк</option>
                    <option value="Генбанк">Генбанк</option>
                    <option value="Челябинвест">Челябинвест</option>
                    <option value="Банк Солидарность">Банк Солидарность</option>
                    <option value="АБ Россия">АБ Россия</option>
                    <option value="Озон банк">Озон банк</option>
                    <option value="Яндекс банк">Яндекс банк</option>
                  </optgroup>
                  <optgroup label="Банки СНГ">
                    <option value="Kaspi Bank (Казахстан)">
                      Kaspi Bank (Казахстан)
                    </option>
                    <option value="AMERIA Bank (Армения)">
                      AMERIA Bank (Армения)
                    </option>
                    <option value="Ararat Bank (Армения)">
                      Ararat Bank (Армения)
                    </option>
                    <option value="Узнацбанк (Узбекистан)">
                      Узнацбанк (Узбекистан)
                    </option>
                    <option value="Узпромстройбанк (Узбекистан)">
                      Узпромстройбанк (Узбекистан)
                    </option>
                    <option value="Народный банк (Узбекистан)">
                      Народный банк (Узбекистан)
                    </option>
                    <option value="Капиталбанк (Узбекистан)">
                      Капиталбанк (Узбекистан)
                    </option>
                    <option value="Асакабанк (Узбекистан)">
                      Асакабанк (Узбекистан)
                    </option>
                    <option value="Halyk Bank (Казахстан)">
                      Halyk Bank (Казахстан)
                    </option>
                    <option value="Kapital Bank (Азербайджан)">
                      Kapital Bank (Азербайджан)
                    </option>
                    <option value="PASHA Bank (Азербайджан)">
                      PASHA Bank (Азербайджан)
                    </option>
                    <option value="TBC Bank (Грузия)">TBC Bank (Грузия)</option>
                    <option value="Bank of Georgia (Грузия)">
                      Bank of Georgia (Грузия)
                    </option>
                    <option value="Optima Bank (Кыргызстан)">
                      Optima Bank (Кыргызстан)
                    </option>
                    <option value="KICB (Кыргызстан)">KICB (Кыргызстан)</option>
                    <option value="ИТБ (Таджикистан)">ИТБ (Таджикистан)</option>
                    <option value="Амонатбанк (Таджикистан)">
                      Амонатбанк (Таджикистан)
                    </option>
                    <option value="Агроинвестбанк (Таджикистан)">
                      Агроинвестбанк (Таджикистан)
                    </option>
                    <option value="ориент банк (Таджикистан)">
                      ориент банк (Таджикистан)
                    </option>
                    <option value="Душанбе (Таджикистан)">
                      Душанбе (Таджикистан)
                    </option>
                    <option value="Алиф банк (Таджикистан)">
                      Алиф банк (Таджикистан)
                    </option>
                    <option value="Тавхидбанк (Таджикистан)">
                      Тавхидбанк (Таджикистан)
                    </option>
                    <option value="Эсхата (Таджикистан)">
                      Эсхата (Таджикистан)
                    </option>
                    <option value="Спитамен (Таджикистан)">
                      Спитамен (Таджикистан)
                    </option>
                  </optgroup>
                </select>
              </div>

              <div className="payment-card">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {paymentType === "card" ? "Номер карты" : "Номер телефон"}
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={paymentValue}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
                  placeholder={
                    paymentType === "card" ? "0000 0000 0000 0000" : placeholder
                  }
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
                  value={minMaxm.min}
                  onChange={(e) => handleMinMax("min", e.target.value)}
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
                  value={minMaxm.max}
                  onChange={(e) => handleMinMax("max", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-teal-400"
                  required=""
                />
              </div>

              <div className="space-y-2 text-white">
                <p className="text-sm font-medium text-gray-300">Ставка</p>
                <div className="flex justify-between px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg">
                  <p>Pay in {bid.payIn}</p>
                  <p>Pay out {bid.payOut}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="px-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
              >
                Отмена
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={isEdit ? saveEdit : saveReq}
                className="px-6 cursor-pointer py-3 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-teal-400 to-pink-400 text-white rounded-lg hover:opacity-90"
              >
                {isEdit ? "Сохранить" : "Добавить"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Requisite;
