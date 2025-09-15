import React, { KeyboardEvent, useState } from "react"

import Image from "next/image"

import styles from "./accessTable.module.scss"

import ConfirmationModal from "../confirmationalWindow"

interface User {
  id: number
  name: string
  position: string
  email: string
  password: string
}

interface NewAccess {
  name: string
  position: string
  email: string
  password: string
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

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Гавриш Елена Владимировна",
      position: "РОП",
      email: "emailexample@gmail.com",
      password: "K9mP2nQ7",
    },
    {
      id: 2,
      name: "Гавриш Елена Владимировна",
      position: "РОП",
      email: "emailexample@gmail.com",
      password: "X3vL8sR4",
    },
    {
      id: 3,
      name: "Гавриш Елена Владимировна",
      position: "РОП",
      email: "emailexample@gmail.com",
      password: "M5tY9wE6",
    },
    {
      id: 4,
      name: "Гавриш Елена Владимировна",
      position: "РОП",
      email: "emailexample@gmail.com",
      password: "N2jH7pA1",
    },
  ])

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
      const newAccessObj: User = {
        id: Date.now(),
        name: newAccess.name.trim(),
        position: newAccess.position.trim() || "Не указано",
        email: newAccess.email.trim(),
        password: newAccess.password.trim() || "temp123",
      }
      setUsers([...users, newAccessObj])
      setNewAccess({ name: "", position: "", email: "", password: "" })
      setIsAdding(false)
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

  const confirmDelete = () => {
    if (userToDelete === null) return

    const updatedUsers = users.filter((_, i) => i !== userToDelete)
    setUsers(updatedUsers)

    if (editingIndex === userToDelete) {
      setEditingIndex(null)
      setNewAccess({ name: "", position: "", email: "", password: "" })
    }

    setIsEditing(false)
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
