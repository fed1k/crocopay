"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "../layout";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaCopy, FaFilter, FaInbox, FaPlus } from "react-icons/fa6";
import {
  addPayout,
  deletePayout,
  deleteUser,
  getAllPaymentsAdmin,
  getAllPayouts,
  getAllUsers,
  markPaymentAdmin,
  registerUser,
  updatePayout,
  updateProfile,
} from "@/utils/firebase_utils";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { generateSecureId } from "@/utils/helpers";
import FileUploader from "@/components/FileUpload";
import { BASE_BUCKET_URL } from "@/utils/constants";
// import FileUpload from "@/components/FileUpload";

const Admin = () => {
  const { user, rate } = useUserContext();

  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [activationAmount, setActivationAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [newUserToken, setNewUserToken] = useState("");
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [tab, setTab] = useState("users");
  const [payoutModal, setPayoutModal] = useState(false);
  const [nameDropdownOpen, setNameDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [newPayout, setNewPayout] = useState({
    name: "",
    id: "",
    amount: "",
    bank: "",
    method: "",
    status: "",
    paymentTime: "",
    client: "",
    user_id: "",
  });
  const [activeUsers, setActiveUsers] = useState([]);

  const createUser = async () => {
    if (!name) {
      setError("Заполните имя поля!");
      return;
    }

    setLoading(true);
    const response = await registerUser(name, activationAmount);
    setLoading(false);
    if (response) {
      setName("");
      setNewUserToken(response);
      setStep(2);
    }
  };

  const copyAddress = (copiable) => {
    navigator.clipboard.writeText(copiable).then(() => {
      Swal.fire({
        icon: "success",
        title: "Скопировано!",
        text: "Токен скопирован в буфер обмена",
        timer: 1500,
        showConfirmButton: false,
        background: "#1F2937",
        color: "#fff",
        toast: true,
        position: "top-end",
      });
    });
  };

  const closeModal = () => {
    setStep(1);
    setName("");
    setNewUserToken("");
    setModalOpen(false);
  };

  const payoutModalClose = () => {
    setPayoutModal(false);
  };

  const handleFocus = () => {
    setNameDropdownOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setNameDropdownOpen(false);
    }, 100);
  };

  const handleFocusStatus = () => {
    setStatusDropdownOpen(true);
  };

  const handleBlurStatus = () => {
    setTimeout(() => {
      setStatusDropdownOpen(false);
    }, 100);
  };

  const savePayout = async () => {
    const response = await addPayout({...newPayout, createdAt: new Date()});
    if (response) {
      setPayoutModal(false);
    }
  };

  const selectUser = (name, user_id) => {
    const id = "#" + Math.floor(100000 + Math.random() * 900000);
    const client = generateSecureId();
    setNewPayout((prev) => ({ ...prev, id, name, client, user_id }));
    // setNewPayout((prev) => ({...prev, name: el}))
  };

  const openDeleteConfirmation = (user_token) => {
    Swal.fire({
      title: "Вы действительно хотите удалить этого пользователя?",
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "ДА",
      color: "white",
      customClass: {
        confirmButton: "bg-greenish",
      },
      background: "#1F2937FF",
      cancelButtonText: "НЕТ",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteUser(user_token).then(() => {
          Swal.fire("Удалено!", "", "success");
          setUsers((prev) => [...prev].filter((el) => el.token !== user_token));
        });
      }
    });
  };

  const markPayment = async (doc_id, status) => {
    setLoading(true);
    const response = await markPaymentAdmin(doc_id, status);
    setLoading(false);
    if (response.success) {
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === doc_id ? { ...payment, status } : payment
        )
      );
    }
  };

  const handleEdit = async (value, doc_id) => {
    const { isConfirmed, value: newValue } = await Swal.fire({
      title: `Изменить баланс`,
      background: "#1F2937FF",
      color: "white",
      input: "text",
      inputValue: value,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Сохранить",
      cancelButtonText: "Отмена",
      customClass: {
        confirmButton: "bg-greenish",
        cancelButton: "bg-grayish",
      },
      showLoaderOnConfirm: true,
      preConfirm: async (inputVal) => {
        if (inputVal === value) {
          return; // no API call needed
        }

        try {
          updateProfile("balance", inputVal, doc_id).then((res) => {
            if (res.success) {
              setUsers((prev) =>
                [...prev].map((el) => {
                  if (el.token === doc_id) {
                    return {
                      ...el,
                      balance: inputVal,
                    };
                  } else {
                    return el;
                  }
                })
              );
            }
          });
        } catch (error) {
          Swal.showValidationMessage(`Ошибка: ${error.message}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (isConfirmed && newValue !== value) {
      Swal.fire({
        icon: "success",
        title: "Успешно обновлено",
        background: "#1F2937FF",
        color: "white",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleStatus = async (status, id, user_id, user_balance, amount) => {
    // console.log(40 + +amount)
    const response = await updatePayout("status", status, id);
    if (status === "Выполнено") {
      // const profit = (3.5 / 100 ) * +amount.slice(0,-3) 
      const usdtConverted = +amount.slice(0,-3) / (rate + 1.15)
      const profit = (3.5 / 100 ) * usdtConverted
      const newBalance = +user_balance + Math.floor(profit) + usdtConverted;
      await updateProfile("balance", newBalance, user_id);
      await updatePayout("profit", profit + usdtConverted, id)
    }

    if (response?.success) {
    }
  };

  const [deletePayoutLoading, setDeletePayoutLoading] = useState(false);
  const handleDeletePayout = async (doc_id) => {
    setDeletePayoutLoading(true);
    await deletePayout(doc_id);
    setDeletePayoutLoading(false);
    setPayouts((prev) => [...prev].filter((el) => el.doc_id !== doc_id));
  };

  useEffect(() => {
    if (!user?.admin) {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    getAllUsers().then((data) => {
      if (data?.length) {
        setUsers(data);
        const activeUsersTemp = data.filter(
          (user) => user.activationAmount <= user.balance
        );
        setActiveUsers(activeUsersTemp);
      }
    });

    getAllPaymentsAdmin().then((data) => {
      if (data?.length) {
        setPayments(data);
      }
    });

    getAllPayouts().then((data) => {
      if (data?.length) {
        setPayouts(data);
      }
    });
  }, []);

  return (
    <>
      <div className="flex gap-3 pb-4">
        <p
          onClick={() => setTab("users")}
          className={`border-b ${
            tab === "users" ? "" : "border-transparent"
          } cursor-pointer text-white`}
        >
          Ползователы
        </p>

        <p
          onClick={() => setTab("payments")}
          className={`border-b ${
            tab === "payments" ? "" : "border-transparent"
          } cursor-pointer text-white`}
        >
          Платежы
        </p>
        <p
          onClick={() => setTab("payouts")}
          className={`border-b ${
            tab === "payouts" ? "" : "border-transparent"
          } cursor-pointer text-white`}
        >
          Pay out
        </p>
      </div>

      {tab === "users" ? (
        <div>
          <div className="bg-gray-800/90 rounded-2xl w-screen sm:w-auto shadow-2xl p-8 relative overflow-hidden backdrop-blur-lg border border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
                Ползователы
              </h2>
              <div className="flex gap-3">
                {/* <!-- Фильтры --> */}
                <div className="relative">
                  <button
                    id="addDeviceBtn"
                    onClick={() => setModalOpen(true)}
                    className="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl text-white shadow-sm hover:opacity-90 transition-opacity"
                  >
                    <FaPlus />
                    <span className="small-btn">Добавить ползователь</span>
                  </button>
                </div>
              </div>
            </div>

            {/* <!-- Таблица --> */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Токен
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Для активации
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Статус
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Имя
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Телеграм
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Баланс
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">
                      Удалить
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {/* <!-- Пустое состояние --> */}
                  {users?.length ? (
                    users.map((usr, key) => (
                      <tr key={key}>
                        <td className="px-6 py-8 text-gray-400">
                          <div>
                            {usr.token}
                            <button
                              onClick={() => copyAddress(usr.token)}
                              className="text-teal-400 cursor-pointer hover:text-teal-300 transition-colors p-2 hover:bg-gray-800 rounded-lg"
                            >
                              <FaCopy />
                            </button>
                          </div>{" "}
                        </td>
                        <td className="px-6 py-8 text-gray-400">
                          {usr.activationAmount || 1500}
                        </td>
                        <td className="px-6 py-8 text-gray-400">
                          <div
                            className={`flex items-center gap-1 ${
                              usr?.activationAmount <= usr?.balance
                                ? "text-green-400"
                                : "text-red-400"
                            } `}
                          >
                            <div
                              className={`w-3 h-3 ${
                                usr?.activationAmount <= usr?.balance
                                  ? "bg-green-400"
                                  : "bg-red-400"
                              }  rounded-full`}
                            ></div>
                            <span>
                              {usr?.activationAmount <= usr?.balance
                                ? "Активен"
                                : "Неактивен"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-8 text-gray-400">{usr.name}</td>
                        <td className="px-6 py-8 text-gray-400">
                          {usr?.telegram || "@example"}
                        </td>
                        <td className="px-6 py-8 text-start text-gray-400">
                          <div className="flex items-center gap-3">
                            <span>{usr.balance}</span>
                            <FaEdit
                              onClick={() => handleEdit(usr.balance, usr.token)}
                              className="text-teal-400 hover:text-teal-300 cursor-pointer"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-8 flex justify-end text-gray-400">
                          <FaTrashAlt
                            onClick={() => openDeleteConfirmation(usr.token)}
                            className="text-red-400 cursor-pointer hover:opacity-70"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-gray-400"
                      >
                        <div className="flex flex-col items-center justify-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                            <FaInbox className="text-2xl text-gray-500" />
                          </div>
                          <p>Нет Ползователы</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {tab === "payments" ? (
        <div className="bg-gray-800/90 w-screen sm:w-auto rounded-2xl shadow-2xl p-8 relative overflow-scroll md:overflow-hidden backdrop-blur-lg border border-gray-700">
          <h2 className="text-2xl mb-8 font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
            Платежы
          </h2>

          <table className="sm:w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Статус
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Имя
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Дату
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Депосить
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">
                  Подтверждение
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {payments?.length ? (
                payments.map((payment, key) => (
                  <tr key={key}>
                    <td className="px-6 py-8 text-gray-400">
                      {payment.status === "approved"
                        ? "подтверждено"
                        : payment.status === "rejected"
                        ? "отклонено"
                        : "ждеть"}
                    </td>
                    <td className="px-6 py-8 text-gray-400">{payment.name}</td>
                    <td className="px-6 py-8 text-gray-400">{payment.date}</td>
                    <td className="px-6 py-8 text-gray-400">
                      {payment.amount} USDT
                    </td>
                    <td className="px-6 py-8 text-gray-400">
                      <div className="flex gap-3 justify-end">
                        <button
                          disabled={loading || payment.status !== "pending"}
                          onClick={() => markPayment(payment.id, "approved")}
                          className="border hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-gray-700 rounded px-2 py-1 cursor-pointer"
                        >
                          Подтверждать
                        </button>
                        <button
                          disabled={loading || payment.status !== "pending"}
                          onClick={() => markPayment(payment.id, "rejected")}
                          className="border hover:shadow-lg border-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1 cursor-pointer"
                        >
                          Отклонить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}

      {tab === "payouts" ? (
        <div>
          <div className="bg-gray-800/90 rounded-2xl w-screen sm:w-auto shadow-2xl p-8 relative overflow-hidden backdrop-blur-lg border border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
                Pay out заказы
              </h2>
              <div className="flex gap-3">
                {/* <!-- Фильтры --> */}
                <div className="relative">
                  <button
                    id="addDeviceBtn"
                    onClick={() => setPayoutModal(true)}
                    className="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl text-white shadow-sm hover:opacity-90 transition-opacity"
                  >
                    <FaPlus />
                    <span className="small-btn">Добавить Pay out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* <!-- Таблица --> */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Имя
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Статус ЛК
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Баланс
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Время на оплату
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Банк
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Сумма
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Метод
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Статус
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Чек
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Действия
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Удалить
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {/* <!-- Пустое состояние --> */}
                  {payouts?.length ? (
                    payouts.map((usr, key) => {
                      const userTemp = users.find(
                        (el) => el.token === usr.user_id
                      );
                      const userStatus =
                        userTemp?.balance >= userTemp?.activationAmount;
                      // console.log(userStatus)
                      return (
                        <tr key={key}>
                          <td className="px-6 py-8 text-gray-400">{usr?.id}</td>
                          <td className="px-6 py-8 text-gray-400">
                            {usr.name}
                          </td>
                          <td className="px-6 py-8 text-gray-400">
                            <div
                              className={`flex items-center gap-1 ${
                                userStatus ? "text-green-400" : "text-red-400"
                              } `}
                            >
                              <div
                                className={`w-3 h-3 ${
                                  userStatus ? "bg-green-400" : "bg-red-400"
                                }  rounded-full`}
                              ></div>
                              <span>
                                {userStatus ? "Активен" : "Неактивен"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-8 text-gray-400">
                            {userTemp?.balance}
                          </td>
                          <td className="px-6 py-8 text-gray-400">
                            {usr.paymentTime}
                          </td>
                          <td className="px-6 py-8 text-gray-400">
                            {usr.bank}
                          </td>
                          <td className="px-6 py-8 text-gray-400">
                            {usr.amount}
                          </td>
                          <td className="px-6 py-8 text-gray-400">
                            {usr.method}
                          </td>
                          <td
                            className={`px-6 py-8 ${
                              usr.status === "Ожидает"
                                ? "text-yellow-400"
                                : usr.status === "Выполнено"
                                ? "text-green-500"
                                : usr.status === "Отклонено"
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          >
                            {usr.status}
                          </td>
                          <td>
                            {usr?.document ? (
                              <a
                                target="_blank"
                                href={BASE_BUCKET_URL + usr?.document}
                              >
                                чек PDF
                              </a>
                            ) : (
                              <p>Пока нету!</p>
                            )}
                          </td>
                          <td className="px-6 py-8 text-start text-gray-400">
                            <div className="flex items-center gap-3">
                              {/* <span>{usr.balance}</span> */}
                              <button className="border border-red-200">
                                <RxCross2
                                  onClick={() =>
                                    handleStatus(
                                      "Отклонено",
                                      usr.doc_id,
                                      usr.user_id,
                                      userTemp.balance,
                                      usr.amount
                                    )
                                  }
                                  className="text-red-400 w-6 h-6 hover:text-red-300 cursor-pointer"
                                />
                              </button>
                              <button className="border">
                                <TiTick
                                  onClick={() =>
                                    handleStatus(
                                      "Выполнено",
                                      usr.doc_id,
                                      usr.user_id,
                                      userTemp.balance,
                                      usr.amount
                                    )
                                  }
                                  className="text-teal-400 w-6 h-6 hover:text-teal-300 cursor-pointer"
                                />
                              </button>
                            </div>
                          </td>

                          <td className="px-6 py-8 flex justify-end text-gray-400">
                            <FaTrashAlt
                              onClick={() => handleDeletePayout(usr.doc_id)}
                              disabled={deletePayoutLoading}
                              className="text-red-400 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer hover:opacity-70"
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 translate-x-full text-center text-gray-400"
                      >
                        <div className="flex flex-col items-center justify-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                            <FaInbox className="text-2xl text-gray-500" />
                          </div>
                          <p>Нет Ползователы</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div
        id="addDeviceModal"
        onClick={closeModal}
        className={`fixed inset-0 bg-black/50 items-center justify-center z-50 backdrop-blur-sm ${
          modalOpen ? "flex" : "hidden"
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg mx-4 border border-gray-700 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Добавление ползователь
              </h3>
              <p className="text-gray-400 text-sm">
                Заполните информацию о новом ползователь
              </p>
            </div>
            <button
              className="text-gray-400 hover:text-gray-200 transition-colors"
              // onClick="closeAddDeviceModal()"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {step === 1 ? (
            <form id="addDeviceForm" className="space-y-6">
              <div className=" space-y-2">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Имя
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="Например: Григорий"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Необходимый депозит
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={activationAmount}
                    onChange={(e) => setActivationAmount(e.target.value)}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="Например: 1000 USDT"
                  />
                </div>
              </div>

              {error && <p className="text-red-400 mb-0">{error}</p>}

              <div className="flex flex-col-reverse sm:flex-row gap-4 mt-8">
                <button
                  type="button"
                  disabled={loading}
                  onClick={closeModal}
                  className="flex-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={createUser}
                  className="flex-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                >
                  Добавить ползователь
                </button>
              </div>
            </form>
          ) : (
            <div className="w-full space-y-2">
              <p className="text-sm text-gray-400">Ползователь токен</p>
              <div className="flex items-center gap-2 bg-gray-700/50 p-3 rounded-lg group  transition-all duration-300">
                <span
                  id="walletAddress"
                  className="text-white font-mono text-sm flex-1 break-all"
                >
                  {newUserToken}
                </span>
                <button
                  onClick={() => copyAddress(newUserToken)}
                  className="text-teal-400 cursor-pointer hover:text-teal-300 transition-colors p-2 hover:bg-gray-800 rounded-lg"
                >
                  <FaCopy />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        id="addDeviceModal"
        onClick={payoutModalClose}
        className={`fixed inset-0 bg-black/50 items-center justify-center z-50 backdrop-blur-sm ${
          payoutModal ? "flex" : "hidden"
        } `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-800 rounded-2xl p-8 w-full max-w-[80vw] mx-4 border border-gray-700 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Добавление Pay out
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-full relative">
                  <input
                    className="w-full  bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                    type="text"
                    value={newPayout.name}
                    // disabled
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Имя"
                  />
                  <ul
                    className={`absolute  ${
                      nameDropdownOpen ? "block" : "hidden"
                    }  bg-gray-700 w-full rounded-lg shadow`}
                  >
                    {activeUsers.length ? (
                      activeUsers.map((el) => (
                        <li
                          onClick={() => selectUser(el.name, el.token)}
                          className="py-1 px-3 cursor-pointer hover:bg-gray-800"
                        >
                          {el?.name}
                        </li>
                      ))
                    ) : (
                      <p className="py-1 px-3">Нету активний ползователы</p>
                    )}
                  </ul>
                </div>
                <input
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  type="text"
                  placeholder="ID"
                  value={newPayout.id}
                  disabled
                />
              </div>
              <input
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                type="text"
                placeholder="Клиент"
                disabled
                value={newPayout.client}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                type="text"
                placeholder="Сумма"
                onChange={(e) =>
                  setNewPayout((prev) => ({ ...prev, amount: e.target.value }))
                }
              />
              <input
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                type="text"
                placeholder="Метод"
                onChange={(e) =>
                  setNewPayout((prev) => ({ ...prev, method: e.target.value }))
                }
              />
              <input
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                type="text"
                placeholder="Банк"
                onChange={(e) =>
                  setNewPayout((prev) => ({ ...prev, bank: e.target.value }))
                }
              />
              <div className="w-full relative">
                <input
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  type="text"
                  placeholder="Статус"
                  onBlur={handleBlurStatus}
                  onFocus={handleFocusStatus}
                  value={newPayout.status}
                />
                <ul
                  className={` absolute ${
                    statusDropdownOpen ? "block" : "hidden"
                  } bg-gray-700 w-full rounded-lg shadow`}
                >
                  <li
                    className="py-1 px-3 cursor-pointer hover:bg-gray-800"
                    onClick={() =>
                      setNewPayout((prev) => ({ ...prev, status: "Ожидает" }))
                    }
                  >
                    Ожидает
                  </li>
                  <li
                    className="py-1 px-3 cursor-pointer hover:bg-gray-800"
                    onClick={() =>
                      setNewPayout((prev) => ({ ...prev, status: "Выполнено" }))
                    }
                  >
                    Выполнено
                  </li>
                  <li
                    className="py-1 px-3 cursor-pointer hover:bg-gray-800"
                    onClick={() =>
                      setNewPayout((prev) => ({ ...prev, status: "Отклонено" }))
                    }
                  >
                    Отклонено
                  </li>
                </ul>
              </div>
              <button
                onClick={payoutModalClose}
                className="flex-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
              >
                Отмена
              </button>
              <button
                onClick={savePayout}
                className="flex-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                Сохранить
              </button>
            </div>
            <div>
              <input
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-200 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                type="text"
                placeholder="Время на оплату"
                onChange={(e) =>
                  setNewPayout((prev) => ({
                    ...prev,
                    paymentTime: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
