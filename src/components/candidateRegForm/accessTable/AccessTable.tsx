import { useMutation, useQueryClient } from "@tanstack/react-query"

import React, { KeyboardEvent, useState } from "react"

import Image from "next/image"

import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./accessTable.module.scss"

import ConfirmationModal from "../confirmationalWindow"

interface Account {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  key: string
  role: string
  phone: string
  email: string | null
  secret: string
  last_name: string | null
  first_name: string | null
  middle_name: string | null
}

interface AccountsResponse {
  request: boolean
  attributes: Account[]
}

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

interface CreateAccountRequest {
  last_name: string
  first_name: string
  middle_name: string
  email: string
  role: string
  password: string
}

interface UpdateAccountRequest {
  key: string
  last_name: string
  first_name: string
  middle_name: string
  email: string
  role: string
  password: string
}

const AccessTable = () => {
  const getCsrfToken = (): string => {
    const metaTag = document.querySelector('meta[name="csrf-token"]')
    if (metaTag) {
      return metaTag.getAttribute("content") || ""
    }

    const cookies = document.cookie.split(";")
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=")
      if (name === "XSRF-TOKEN") {
        return decodeURIComponent(value)
      }
    }
    return ""
  }
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
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  const {
    data: accountsData,
    isLoading: isLoadingAccounts,
    error: accountsError,
  } = useApiQuery<AccountsResponse>(
    ["accounts"],
    `${process.env.NEXT_PUBLIC_API_URL}/account/list`,
    {
      staleTime: 30 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      retry: 2,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const queryClient = useQueryClient()

  // Мутация для создания нового аккаунта
  const createAccountMutation = useMutation({
    mutationFn: async (accountData: CreateAccountRequest) => {
      const csrfToken = getCsrfToken()

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      }

      if (csrfToken) {
        headers["X-CSRF-TOKEN"] = csrfToken
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/store`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(accountData),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          status: response.status,
          response: { data: errorData },
          message: errorData.message || `HTTP ${response.status}`,
        }
      }

      return await response.json()
    },
    onSuccess: (data) => {
      setErrorMessage("")
      setNewAccess({ name: "", position: "", email: "", password: "" })
      setIsAdding(false)
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: (error: any) => {
      if (error?.status === 201) {
        setErrorMessage(
          "Доступ с таким email уже присутствует, укажите другой!"
        )
      } else if (error?.status === 422) {
        const validationErrors = error?.response?.data?.errors

        if (validationErrors) {
          if (
            validationErrors.email &&
            validationErrors.email.includes("The email has already been taken.")
          ) {
            setErrorMessage("Такой email уже занят")
          } else if (validationErrors.email) {
            setErrorMessage("Некорректный формат email")
          } else if (validationErrors.password) {
            setErrorMessage("Пароль не соответствует требованиям")
          } else if (
            validationErrors.last_name ||
            validationErrors.first_name
          ) {
            setErrorMessage("Проверьте правильность заполнения ФИО")
          } else {
            setErrorMessage(
              "Ошибка валидации данных. Проверьте правильность заполнения полей."
            )
          }
        } else {
          setErrorMessage(
            "Ошибка валидации данных. Проверьте правильность заполнения полей."
          )
        }
      } else {
        setErrorMessage(error?.message || "Ошибка при создании аккаунта")
      }
    },
  })

  // Мутация для обновления аккаунта
  const updateAccountMutation = useMutation({
    mutationFn: async (accountData: UpdateAccountRequest) => {
      const csrfToken = getCsrfToken()

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      }

      if (csrfToken) {
        headers["X-CSRF-TOKEN"] = csrfToken
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/update`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(accountData),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          status: response.status,
          response: { data: errorData },
          message: errorData.message || `HTTP ${response.status}`,
        }
      }

      return await response.json()
    },
    onSuccess: (data) => {
      setErrorMessage("")
      setPasswordError("")
      setNewAccess({ name: "", position: "", email: "", password: "" })
      setEditingIndex(null)
      setIsEditing(false)
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: (error: any) => {
      if (error?.status === 201) {
        setErrorMessage("Такой email уже занят")
      } else if (error?.status === 422) {
        const validationErrors = error?.response?.data?.errors

        if (validationErrors) {
          if (
            validationErrors.email &&
            validationErrors.email.includes("The email has already been taken.")
          ) {
            setErrorMessage("Такой email уже занят")
          } else if (validationErrors.email) {
            setErrorMessage("Некорректный формат email")
          } else if (validationErrors.password) {
            setErrorMessage("Пароль не соответствует требованиям")
          } else if (
            validationErrors.last_name ||
            validationErrors.first_name
          ) {
            setErrorMessage("Проверьте правильность заполнения ФИО")
          } else {
            setErrorMessage(
              "Ошибка валидации данных. Проверьте правильность заполнения полей."
            )
          }
        } else {
          setErrorMessage(
            "Ошибка валидации данных. Проверьте правильность заполнения полей."
          )
        }
      } else {
        setErrorMessage(error?.message || "Ошибка при обновлении аккаунта")
      }
    },
  })

  // Мутация для удаления аккаунта
  const deleteAccountMutation = useMutation({
    mutationFn: async (key: string) => {
      const csrfToken = getCsrfToken()

      const headers: Record<string, string> = {
        Accept: "*/*",
      }

      if (csrfToken) {
        headers["X-CSRF-TOKEN"] = csrfToken
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/delete?key=${key}`,
        {
          method: "DELETE",
          headers,
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          status: response.status,
          response: { data: errorData },
          message: errorData.message || `HTTP ${response.status}`,
        }
      }

      return await response.json()
    },
    onSuccess: (data) => {
      setErrorMessage("")
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: (error: any) => {
      setErrorMessage(error?.message || "Ошибка при удалении аккаунта")
    },
  })

  const users: User[] =
    accountsData?.attributes?.map((account) => ({
      id: account.id,
      name:
        `${account.last_name || ""} ${account.first_name || ""} ${account.middle_name || ""}`.trim() ||
        "Не указано",
      position: account.role,
      email: account.email || account.phone,
      password: "•••••",
      key: account.key,
    })) || []

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      setPasswordError("Пароль должен содержать минимум 8 символов")
      return false
    }
    setPasswordError("")
    return true
  }

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
      setErrorMessage("")
      setPasswordError("")
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
    setErrorMessage("")
    setPasswordError("")
  }

  const saveNewAccess = async () => {
    if (newAccess.name.trim() && newAccess.email.trim()) {
      const password = newAccess.password.trim() || "temp123"

      if (!validatePassword(password)) {
        return
      }

      const nameParts = newAccess.name.trim().split(" ")
      const lastName = nameParts[0] || ""
      const firstName = nameParts[1] || ""
      const middleName = nameParts.slice(2).join(" ") || ""

      const accountData: CreateAccountRequest = {
        last_name: lastName,
        first_name: firstName,
        middle_name: middleName,
        email: newAccess.email.trim(),
        role: newAccess.position.trim() || "РОП",
        password: password,
      }

      createAccountMutation.mutate(accountData)
    }
  }

  const saveEditedAccess = async () => {
    if (
      editingIndex !== null &&
      newAccess.name.trim() &&
      newAccess.email.trim()
    ) {
      const password = newAccess.password.trim() || "temp123"

      if (!validatePassword(password)) {
        return
      }

      const userToEdit = users[editingIndex]
      const nameParts = newAccess.name.trim().split(" ")
      const lastName = nameParts[0] || ""
      const firstName = nameParts[1] || ""
      const middleName = nameParts.slice(2).join(" ") || ""

      const accountData: UpdateAccountRequest = {
        key: userToEdit.key,
        last_name: lastName,
        first_name: firstName,
        middle_name: middleName,
        email: newAccess.email.trim(),
        role: newAccess.position.trim() || "РОП",
        password: password,
      }

      updateAccountMutation.mutate(accountData)
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

    const userToDeleteData = users[userToDelete]
    if (!userToDeleteData) return

    if (editingIndex === userToDelete) {
      setEditingIndex(null)
      setNewAccess({ name: "", position: "", email: "", password: "" })
    }

    setIsEditing(false)
    setIsDeleteModalOpen(false)
    setUserToDelete(null)

    deleteAccountMutation.mutate(userToDeleteData.key)
  }

  return (
    <>
      <div className="center-card big">
        <div className="formRow">
          <h3 style={{ textAlign: "left" }}>Управление доступами</h3>
        </div>
        <div className="formRow" style={{ marginTop: "0" }}>
          <h4 style={{ textAlign: "left" }}>
            Пользователи, имеющие доступ к системе
          </h4>
        </div>

        <div className={styles.tableContainer}>
          {isLoadingAccounts && (
            <div
              style={{ padding: "20px", color: "#666", textAlign: "center" }}
            >
              Загрузка аккаунтов...
            </div>
          )}
          {accountsError && (
            <div
              style={{ padding: "20px", color: "#e74c3c", textAlign: "center" }}
            >
              {accountsError.message || "Ошибка при загрузке аккаунтов"}
              <button
                onClick={() =>
                  queryClient.invalidateQueries({ queryKey: ["accounts"] })
                }
                style={{
                  marginLeft: "10px",
                  background: "none",
                  border: "none",
                  color: "#3498db",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Повторить
              </button>
            </div>
          )}

          {!isLoadingAccounts && !accountsError && (
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
                    <td className={styles.password}>{user.password}</td>
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
          )}
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
            <table className="inputTable" style={{ height: "140px" }}>
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
                        onChange={(e) => {
                          const password = e.target.value
                          setNewAccess({
                            ...newAccess,
                            password: password,
                          })
                          validatePassword(password)
                        }}
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

        {passwordError && (
          <div
            style={{
              padding: "10px",
              marginTop: "10px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "8px",
              color: "#c33",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {passwordError}
          </div>
        )}

        {errorMessage && (
          <div
            style={{
              padding: "10px",
              marginTop: "10px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "8px",
              color: "#c33",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </div>
        )}

        <div
          className="formRow justify-flex-start"
          style={{ marginTop: "1rem" }}
        >
          <button
            className="formBtn small btn-active"
            onClick={handleAddAccess}
            disabled={
              isLoadingAccounts ||
              createAccountMutation.isPending ||
              updateAccountMutation.isPending ||
              deleteAccountMutation.isPending ||
              (isAdding && passwordError !== "") ||
              (editingIndex !== null && passwordError !== "")
            }
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
              disabled={
                isLoadingAccounts ||
                createAccountMutation.isPending ||
                updateAccountMutation.isPending ||
                deleteAccountMutation.isPending
              }
            >
              Отменить
            </button>
          ) : (
            <button
              className={`formBtn small ${
                isEditing ? "btn-active" : "btn-inactive"
              }`}
              disabled={
                editingIndex !== null ||
                isLoadingAccounts ||
                createAccountMutation.isPending ||
                updateAccountMutation.isPending ||
                deleteAccountMutation.isPending
              }
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
