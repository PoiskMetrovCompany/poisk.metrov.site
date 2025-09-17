import React, { KeyboardEvent, useEffect, useState } from "react"

import Image from "next/image"

import styles from "./accessTable.module.scss"

import ConfirmationModal from "../confirmationalWindow"

interface User {
  id: number
  name: string
  position: string
  email: string
  password: string
  key: string
}

interface NewAccess {
  name: string
  position: string
  email: string
  password: string
}

interface ApiAccount {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  key: string
  role: string
  phone: string | null
  email: string
  secret: string
  last_name: string
  first_name: string
  middle_name: string
}

const AccessTable = () => {
  const [hoveredPassword, setHoveredPassword] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newAccess, setNewAccess] = useState<NewAccess>({
    name: "",
    position: "",
    email: "",
    password: "",
  })
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)

  const [users, setUsers] = useState<User[]>([])

  // Функция для получения токена из cookie
  const getAccessTokenFromCookie = (): string | null => {
    const cookies = document.cookie.split(";")
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=")
      if (name === "access_token") {
        return value
      }
    }
    return null
  }

  const loadAccounts = async () => {
    const accessToken = getAccessTokenFromCookie()

    if (!accessToken) {
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/list`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const data = await response.json()

      if (response.ok && data.attributes) {
        // Фильтруем только пользователей с ролью "РОП" и преобразуем в формат User
        const ropAccounts: User[] = data.attributes
          .filter((account: ApiAccount) => account.role === "РОП")
          .map((account: ApiAccount, index: number) => ({
            id: account.id || index + 1,
            name:
              `${account.last_name || ""} ${account.first_name || ""} ${account.middle_name || ""}`.trim() ||
              "Без имени",
            position: account.role || "РОП",
            email: account.email || "Email не указан",
            password: "••••••••", // Пароль не приходит с API, показываем заглушку
            key: account.key || "", // Сохраняем ключ для удаления
          }))

        setUsers(ropAccounts)
        console.log("Загруженные аккаунты РОП:", ropAccounts)
      }
    } catch (error) {
      // Игнорируем ошибки
    }
  }

  // Загружаем аккаунты при монтировании компонента
  useEffect(() => {
    loadAccounts()
  }, [])

  const handleAddAccess = () => {
    if (editingIndex !== null) {
      saveEditedAccess()
    } else if (isAdding) {
      if (newAccess.name.trim() && newAccess.email.trim()) {
        saveNewAccess()
      }
    } else {
      setIsAdding(true)
      setIsEditing(false)
      setEditingIndex(null)
    }
  }

  const handleEditMode = () => {
    setIsEditing(!isEditing)
    setIsAdding(false)
    setEditingIndex(null)
    setNewAccess({ name: "", position: "", email: "", password: "" })
  }

  const handleCancelAdd = () => {
    setNewAccess({ name: "", position: "", email: "", password: "" })
    setIsAdding(false)
    setEditingIndex(null)
  }

  const saveNewAccess = async () => {
    if (newAccess.name.trim() && newAccess.email.trim()) {
      // Парсим ФИО по пробелу
      const nameParts = newAccess.name.trim().split(" ")
      const lastName = nameParts[0] || ""
      const firstName = nameParts[1] || ""
      const middleName = nameParts[2] || ""

      // Подготавливаем данные для API
      const requestData = {
        last_name: lastName,
        first_name: firstName,
        middle_name: middleName,
        email: newAccess.email.trim(),
        role: "РОП",
        password: newAccess.password.trim() || "temp123",
      }

      try {
        const accessToken = getAccessTokenFromCookie()

        if (accessToken) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/account/store`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify(requestData),
            }
          )

          if (response.ok) {
            // После успешного создания перезагружаем список аккаунтов
            await loadAccounts()
            setNewAccess({ name: "", position: "", email: "", password: "" })
            setIsAdding(false)
          }
        }
      } catch (error) {
        // Игнорируем ошибки
      }
    }
  }

  const saveEditedAccess = async () => {
    if (
      editingIndex !== null &&
      newAccess.name.trim() &&
      newAccess.email.trim()
    ) {
      const updatedUsers = [...users]
      updatedUsers[editingIndex] = {
        ...updatedUsers[editingIndex],
        name: newAccess.name.trim(),
        position: newAccess.position.trim() || "Не указано",
        email: newAccess.email.trim(),
        password:
          newAccess.password.trim() || updatedUsers[editingIndex].password,
      }
      setUsers(updatedUsers)
      setEditingIndex(null)
      setIsEditing(false)
      setNewAccess({ name: "", position: "", email: "", password: "" })
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (editingIndex !== null) {
        saveEditedAccess()
      } else {
        saveNewAccess()
      }
    } else if (e.key === "Escape") {
      if (editingIndex !== null) {
        setEditingIndex(null)
        setNewAccess({ name: "", position: "", email: "", password: "" })
      } else {
        handleCancelAdd()
      }
    }
  }

  const handleEdit = (index: number) => {
    const userToEdit = users[index]
    setNewAccess({
      name: userToEdit.name,
      position: userToEdit.position,
      email: userToEdit.email,
      password: userToEdit.password,
    })
    setEditingIndex(index)
    setIsAdding(false)
  }

  const handleDeleteClick = (index: number) => {
    setUserToDelete(index)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false)
    setUserToDelete(null)
  }

  const confirmDelete = async () => {
    if (userToDelete === null) return

    const userToDeleteData = users[userToDelete]
    console.log("=== НАЧАЛО УДАЛЕНИЯ ===")
    console.log("Индекс удаляемого пользователя:", userToDelete)
    console.log("Данные пользователя:", userToDeleteData)
    console.log("Key для удаления:", userToDeleteData.key)

    // Сначала удаляем из UI
    const updatedUsers = users.filter((_, i) => i !== userToDelete)
    setUsers(updatedUsers)
    console.log("Пользователь удален из UI")

    if (editingIndex === userToDelete) {
      setEditingIndex(null)
      setNewAccess({ name: "", position: "", email: "", password: "" })
    }

    setIsEditing(false)

    // Закрываем модальное окно
    setIsDeleteModalOpen(false)
    setUserToDelete(null)

    // Отправляем DELETE запрос на сервер
    try {
      const accessToken = getAccessTokenFromCookie()
      console.log("Токен доступа:", accessToken ? "найден" : "НЕ найден")

      if (accessToken && userToDeleteData.key) {
        const deleteUrl = `${process.env.NEXT_PUBLIC_API_URL}/account/delete?key=${userToDeleteData.key}`
        console.log("URL для удаления:", deleteUrl)

        const response = await fetch(deleteUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })

        console.log("Статус ответа:", response.status)
        console.log("Статус OK:", response.ok)

        if (response.ok) {
          console.log("✅ Удаление выполнено успешно")
        } else {
          console.error("❌ Ошибка при удалении")
        }
      } else {
        console.error("❌ Нет токена или ключа для удаления")
      }
    } catch (error) {
      console.error("❌ Исключение при удалении:", error)
    }

    console.log("=== КОНЕЦ УДАЛЕНИЯ ===")
  }

  return (
    <>
      <div className="center-card big" style={{ marginTop: "24px" }}>
        <div className="formRow">
          <h3 style={{ textAlign: "left" }}>Управление доступами</h3>
        </div>
        <div className="formRow" style={{ marginTop: "0" }}>
          <h4
            className={styles.tableLabel}
            style={{ textAlign: "left" }}
            tabIndex={0}
            aria-label="Пользователи, имеющие доступ к системе"
          >
            Пользователи, имеющие доступ к системе
          </h4>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.accessTable}>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Должность</th>
                <th>E-mail</th>
                <th>Пароль</th>
                <th className={styles.controls}></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className={styles.name}>{user.name}</td>
                  <td>{user.position}</td>
                  <td>{user.email}</td>
                  <td
                    className={styles.password}
                    onMouseEnter={() => setHoveredPassword(user.id)}
                    onMouseLeave={() => setHoveredPassword(null)}
                  >
                    {hoveredPassword === user.id ? user.password : "•••••••"}
                  </td>
                  <td className={styles.controls}>
                    {isEditing && (
                      <div className={styles.buttonGroup}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEdit(index)}
                        >
                          <Image
                            src={"/images/icons/editBtn.svg"}
                            alt={"Редактировать"}
                            width={20}
                            height={20}
                          />
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteClick(index)}
                        >
                          <Image
                            src={"/images/icons/trashBox.svg"}
                            alt={"Удалить"}
                            width={20}
                            height={20}
                          />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Мобильная версия карточек */}
          <div className={styles.mobileCards}>
            {users.map((user, index) => (
              <div key={user.id} className={styles.mobileCard}>
                <div className={styles.mobileCardContent}>
                  <div className={styles.mobileName}>{user.name}</div>
                  <div className={styles.mobilePosition}>{user.position}</div>
                  <div className={styles.mobileEmail}>{user.email}</div>
                  <div className={styles.mobilePasswordRow}>
                    <span className={styles.mobilePasswordLabel}>Пароль:</span>
                    <span
                      className={styles.mobilePassword}
                      onTouchStart={() => setHoveredPassword(user.id)}
                      onTouchEnd={() => setHoveredPassword(null)}
                    >
                      {hoveredPassword === user.id ? user.password : "•••••••"}
                    </span>
                    {isEditing && (
                      <div className={styles.mobileButtonGroup}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEdit(index)}
                        >
                          <Image
                            src={"/images/icons/editBtn.svg"}
                            alt={"Редактировать"}
                            width={20}
                            height={20}
                          />
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteClick(index)}
                        >
                          <Image
                            src={"/images/icons/trashBox.svg"}
                            alt={"Удалить"}
                            width={20}
                            height={20}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {(isAdding || editingIndex !== null) && (
          <div
            className="formRow table-container"
            style={{
              opacity: 1,
              transform: "translateY(0)",
              maxHeight: "220px",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              marginTop: "1rem",
            }}
          >
            <table className={`inputTable ${styles.inputTableHeight}`}>
              <caption className="tableLabel">
                {editingIndex !== null
                  ? "Редактировать пользователя"
                  : "Данные нового пользователя"}
              </caption>
              <tbody>
                <tr>
                  <td
                    style={{
                      borderTopLeftRadius: "16px",
                    }}
                  >
                    <div className="custom-input-container">
                      <input
                        type="text"
                        name="newName"
                        id="newName"
                        value={newAccess.name}
                        onChange={(e) =>
                          setNewAccess({ ...newAccess, name: e.target.value })
                        }
                        onKeyDown={handleKeyPress}
                        className={newAccess.name ? "has-value" : ""}
                        autoFocus
                      />
                      <label htmlFor="newName" className="custom-placeholder">
                        ФИО
                      </label>
                    </div>
                  </td>
                  <td
                    style={{
                      borderTopRightRadius: "16px",
                    }}
                  >
                    <div className="custom-input-container">
                      <input
                        type="text"
                        name="newPosition"
                        id="newPosition"
                        value={newAccess.position}
                        onChange={(e) =>
                          setNewAccess({
                            ...newAccess,
                            position: e.target.value,
                          })
                        }
                        onKeyDown={handleKeyPress}
                        className={newAccess.position ? "has-value" : ""}
                      />
                      <label
                        htmlFor="newPosition"
                        className="custom-placeholder"
                      >
                        Должность
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottomLeftRadius: "16px",
                    }}
                  >
                    <div className="custom-input-container">
                      <input
                        type="email"
                        name="newEmail"
                        id="newEmail"
                        value={newAccess.email}
                        onChange={(e) =>
                          setNewAccess({ ...newAccess, email: e.target.value })
                        }
                        onKeyDown={handleKeyPress}
                        className={newAccess.email ? "has-value" : ""}
                      />
                      <label htmlFor="newEmail" className="custom-placeholder">
                        E-mail
                      </label>
                    </div>
                  </td>
                  <td
                    style={{
                      borderBottomRightRadius: "16px",
                    }}
                  >
                    <div className="custom-input-container">
                      <input
                        type="text"
                        name="newPassword"
                        id="newPassword"
                        value={newAccess.password}
                        onChange={(e) =>
                          setNewAccess({
                            ...newAccess,
                            password: e.target.value,
                          })
                        }
                        onKeyDown={handleKeyPress}
                        className={newAccess.password ? "has-value" : ""}
                      />
                      <label
                        htmlFor="newPassword"
                        className="custom-placeholder"
                      >
                        Пароль
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div
          className="formRow justify-flex-start"
          style={{ marginTop: "1rem" }}
        >
          <button
            className="formBtn small btn-active"
            onClick={handleAddAccess}
          >
            {editingIndex !== null
              ? "Подтвердить"
              : isAdding
                ? "Сохранить"
                : "Добавить доступ"}
          </button>

          {isAdding || editingIndex !== null ? (
            <button
              className="formBtn small btn-inactive"
              onClick={handleCancelAdd}
            >
              Отменить
            </button>
          ) : (
            <button
              className={`formBtn small ${
                isEditing ? "btn-active" : "btn-inactive"
              }`}
              disabled={editingIndex !== null}
              onClick={handleEditMode}
            >
              {isEditing ? "Завершить редактирование" : "Редактировать"}
            </button>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={confirmDelete}
        header="Удалить доступ?"
        title="Вы точно уверены, что хотите удалить доступ для сотрудника?"
      />
    </>
  )
}

export default AccessTable
