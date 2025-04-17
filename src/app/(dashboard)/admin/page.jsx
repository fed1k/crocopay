"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "../layout";
import { useRouter } from "next/navigation";
import { FaCopy, FaFilter, FaInbox, FaPlus } from "react-icons/fa6";
import {
  deleteUser,
  getAllPaymentsAdmin,
  getAllUsers,
  markPaymentAdmin,
  registerUser,
} from "@/utils/firebase_utils";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const Admin = () => {
  const { user } = useUserContext();

  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [newUserToken, setNewUserToken] = useState("");
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [tab, setTab] = useState("users");

  const createUser = async () => {
    if (!name) {
      setError("Заполните имя поля!");
      return;
    }

    setLoading(true);
    const response = await registerUser(name);
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

  useEffect(() => {
    if (!user?.admin) {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    getAllUsers().then((data) => {
      if (data?.length) {
        setUsers(data);
      }
    });

    getAllPaymentsAdmin().then((data) => {
      if (data?.length) {
        setPayments(data);
      }
    });
  }, []);

  // console.log(payments)

  return (
    <>
      <div className="flex gap-3 pb-4">
        <p
          onClick={() => setTab("users")}
          className={`border-b ${
            tab === "users" ? "" : "border-transparent"
          } cursor-pointer`}
        >
          Ползователы
        </p>
        <p
          onClick={() => setTab("payments")}
          className={`border-b ${
            tab === "payments" ? "" : "border-transparent"
          } cursor-pointer`}
        >
          Платежы
        </p>
      </div>

      {tab === "users" ? (
        <div>
          <div className="bg-gray-800/90 rounded-2xl shadow-2xl p-8 relative overflow-hidden backdrop-blur-lg border border-gray-700">
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
                    <span>Добавить ползователь</span>
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
                        <td className="px-6 py-8 text-gray-400">{usr.name}</td>
                        <td className="px-6 py-8 text-gray-400">
                          {usr?.telegram || "@example"}
                        </td>
                        <td className="px-6 py-8 text-start text-gray-400">
                          {usr.balance}
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
        <div className="bg-gray-800/90 rounded-2xl shadow-2xl p-8 relative overflow-hidden backdrop-blur-lg border border-gray-700">
          <h2 className="text-2xl mb-8 font-bold bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">
            Платежы
          </h2>

          <table className="w-full">
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
                          disabled={loading || payment !== "pending"}
                          onClick={() => markPayment(payment.id, "approved")}
                          className="border disabled:opacity-50 disabled:cursor-not-allowed border-gray-700 rounded px-2 py-1 cursor-pointer"
                        >
                          Подтверждать
                        </button>
                        <button
                          disabled={loading || payment !== "pending"}
                          onClick={() => markPayment(payment.id, "rejected")}
                          className="border border-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1 cursor-pointer"
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
              <div className="">
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
              </div>

              {error && <p className="text-red-400 mb-0">{error}</p>}

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  disabled={loading}
                  onClick={closeModal}
                  className="flex-1 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={createUser}
                  className="flex-1 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
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
    </>
  );
};

export default Admin;
