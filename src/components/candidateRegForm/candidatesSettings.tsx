"use client"

import React, { FC, KeyboardEvent, useEffect, useState } from "react"

import Image from "next/image"

import AccessTable from "./accessTable/AccessTable"
import ConfirmationModal from "./confirmationalWindow"

interface IRole {
  id: string
  key: string
  title: string
}

const CandidatesSettings: FC = () => {
  // Состояния для загрузки данных вакансий
  const [roles, setRoles] = useState<IRole[]>([])
  const [isLoadingRoles, setIsLoadingRoles] = useState<boolean>(true)
  const [rolesError, setRolesError] = useState<string>("")

  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newRole, setNewRole] = useState<string>("")
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingRole, setEditingRole] = useState<string>("")

  // Состояния для модального окна удаления
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null)

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

  // Функция для загрузки вакансий из API
  const loadRoles = async () => {
    try {
      setIsLoadingRoles(true)
      setRolesError("")

      const accessToken = getAccessTokenFromCookie()

      if (!accessToken) {
        setRolesError("Токен доступа не найден")
        return
      }

      const response = await fetch("/api/v1/vacancy/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const data = await response.json()

      if (data.response && data.attributes) {
        // Формируем массив ролей из вакансий с сохранением key
        const rolesFromApi: IRole[] = data.attributes.map((vacancy: any) => ({
          id: vacancy.id,
          key: vacancy.key,
          title: vacancy.title,
        }))
        setRoles(rolesFromApi)
        console.log("Роли загружены:", rolesFromApi)
      } else {
        setRolesError("Ошибка при получении данных вакансий")
      }
    } catch (error: any) {
      console.error("Ошибка при загрузке ролей:", error)

      if (error.response) {
        if (error.response.status === 401) {
          setRolesError(
            "Ошибка авторизации. Пожалуйста, войдите в систему заново."
          )
        } else if (error.response.status === 403) {
          setRolesError("Нет доступа к данным вакансий")
        } else {
          setRolesError(
            error.response.data?.error || "Ошибка сервера при загрузке ролей"
          )
        }
      } else {
        setRolesError("Ошибка при загрузке ролей")
      }
    } finally {
      setIsLoadingRoles(false)
    }
  }

  // Загружаем роли при монтировании компонента
  useEffect(() => {
    loadRoles()
  }, [])

  const handleAddRole = () => {
    console.log("=== НАЖАТА КНОПКА ДОБАВИТЬ РОЛЬ ===")
    console.log("Текущие состояния:")
    console.log("- editingIndex:", editingIndex)
    console.log("- isAdding:", isAdding)
    console.log("- newRole:", newRole)
    console.log("- editingRole:", editingRole)

    if (editingIndex !== null) {
      console.log("→ Режим: ПОДТВЕРЖДЕНИЕ РЕДАКТИРОВАНИЯ")
      // Если редактируем - сохраняем отредактированную роль
      saveEditedRole()
    } else if (isAdding) {
      console.log("→ Режим: СОХРАНЕНИЕ НОВОЙ РОЛИ")
      console.log("→ Значение в инпуте:", `"${newRole}"`)
      console.log("→ После trim():", `"${newRole.trim()}"`)
      console.log(
        "→ Условие newRole.trim():",
        newRole.trim() ? "TRUE" : "FALSE"
      )
      // Второе нажатие - сохраняем новую роль
      if (newRole.trim()) {
        console.log("→ ВЫЗЫВАЕМ saveNewRole()")
        saveNewRole()
      } else {
        console.log("→ НЕ вызываем saveNewRole() - пустое значение")
      }
    } else {
      console.log("→ Режим: ПОКАЗАТЬ ИНПУТ ДЛЯ ДОБАВЛЕНИЯ")
      // Первое нажатие - показываем input для добавления
      setIsAdding(true)
      setIsEditing(false)
      setEditingIndex(null) // Сбрасываем редактирование
      console.log("→ Установлено isAdding = true")
    }
    console.log("=== КОНЕЦ ОБРАБОТКИ КНОПКИ ===")
  }

  const handleEditMode = () => {
    setIsEditing(!isEditing)
    setIsAdding(false)
    setEditingIndex(null) // Сбрасываем редактирование при переключении режима
    setEditingRole("")
  }

  // Функция для отмены добавления новой роли
  const handleCancelAdd = () => {
    setNewRole("")
    setIsAdding(false)
  }

  const saveNewRole = async () => {
    if (newRole.trim()) {
      const newTitle = newRole.trim()

      console.log("=== НАЧАЛО ДОБАВЛЕНИЯ НОВОЙ РОЛИ ===")
      console.log("Название новой роли:", newTitle)

      // Сразу добавляем в UI
      const newRoleObj: IRole = {
        id: `temp_${Date.now()}`,
        key: `temp_key_${Date.now()}`,
        title: newTitle,
      }
      setRoles([...roles, newRoleObj])
      setNewRole("")
      setIsAdding(false)

      console.log("Новая роль добавлена в UI:", newRoleObj)

      // Отправляем POST запрос на сервер для создания роли
      const requestData = {
        title: newTitle,
      }

      console.log("Данные для отправки:", requestData)
      console.log("JSON для отправки:", JSON.stringify(requestData, null, 2))

      try {
        const accessToken = getAccessTokenFromCookie()
        console.log(
          "Токен доступа для создания:",
          accessToken ? "найден" : "НЕ найден"
        )

        if (accessToken) {
          console.log("Отправка POST запроса к /api/v1/vacancy/store")
          console.log("Заголовки запроса:", {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.substring(0, 10)}...`,
          })

          const response = await fetch("/api/v1/vacancy/store", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
          })

          console.log("Статус ответа при создании:", response.status)
          console.log("Статус OK при создании:", response.ok)
          console.log(
            "Заголовки ответа при создании:",
            Object.fromEntries(response.headers.entries())
          )

          const data = await response.json()
          console.log("Данные ответа при создании:", data)

          if (response.ok && data.response) {
            console.log("✅ Создание роли выполнено успешно")
            console.log("Полученные данные новой роли:", data)

            // Если сервер вернул данные новой роли, можно обновить временную роль
            if (data.attributes) {
              console.log("Обновление временной роли данными с сервера")
              const updatedRoles = [...roles]
              const lastIndex = updatedRoles.length - 1
              updatedRoles[lastIndex] = {
                id: data.attributes.id,
                key: data.attributes.key,
                title: data.attributes.title,
              }
              setRoles(updatedRoles)
              console.log(
                "Роль обновлена данными с сервера:",
                updatedRoles[lastIndex]
              )
            }
          } else {
            console.error("❌ Ошибка при создании роли от сервера")
            console.error("Response.ok:", response.ok)
            console.error("Data.response:", data.response)
            console.error("Данные ошибки:", data)
          }
        } else {
          console.error("❌ Нет токена доступа для создания роли")
        }
      } catch (error) {
        console.error("❌ ИСКЛЮЧЕНИЕ при создании роли:", error)
        console.error(
          "Тип ошибки при создании:",
          (error as Error).constructor.name
        )
        console.error(
          "Сообщение ошибки при создании:",
          (error as Error).message
        )
        console.error("Stack trace при создании:", (error as Error).stack)

        if ((error as any).response) {
          console.error(
            "Ответ сервера при ошибке создания:",
            (error as any).response
          )
          console.error(
            "Статус ошибки создания:",
            (error as any).response.status
          )
          console.error("Данные ошибки создания:", (error as any).response.data)
        }
      }

      console.log("=== СОЗДАНИЕ РОЛИ ЗАВЕРШЕНО ===")
    }
  }

  const cancelAdd = () => {
    setNewRole("")
    setIsAdding(false)
  }

  const editRole = (index: number) => {
    // Устанавливаем индекс редактируемой роли и заполняем инпут текущим значением
    setEditingIndex(index)
    setEditingRole(roles[index].title)
    setIsAdding(false) // Убеждаемся, что режим добавления выключен
  }

  const saveEditedRole = async () => {
    if (editingRole.trim() && editingIndex !== null) {
      const roleToUpdate = roles[editingIndex]
      const newTitle = editingRole.trim()

      // Сразу обновляем UI: закрываем инпут и обновляем roleItem
      const updatedRoles = [...roles]
      updatedRoles[editingIndex] = {
        ...updatedRoles[editingIndex],
        title: newTitle,
      }
      setRoles(updatedRoles)
      setEditingIndex(null)
      setEditingRole("")
      // ВАЖНО: Завершаем режим редактирования после сохранения
      setIsEditing(false)

      // Отправляем запрос на сервер (результат не влияет на UI)
      const requestData = {
        key: roleToUpdate.key,
        title: newTitle,
      }

      try {
        const accessToken = getAccessTokenFromCookie()

        if (accessToken) {
          fetch("/api/v1/vacancy/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
          })
        }
      } catch (error) {
        // Игнорируем ошибки - UI уже обновлен
      }
    }
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditingRole("")
  }

  // Обработчик нажатия на кнопку удаления - показывает модальное окно
  const handleDeleteClick = (index: number) => {
    setRoleToDelete(index)
    setIsDeleteModalOpen(true)
  }

  // Закрытие модального окна
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false)
    setRoleToDelete(null)
  }

  // Подтверждение удаления - вызывается после нажатия "Да, удалить"
  const confirmDelete = async () => {
    if (roleToDelete === null) return

    const index = roleToDelete
    const roleToDeleteData = roles[index]

    console.log("=== НАЧАЛО УДАЛЕНИЯ ВАКАНСИИ ===")
    console.log("Индекс удаляемой роли:", index)
    console.log("Данные роли для удаления:", roleToDeleteData)
    console.log("Key для удаления:", roleToDeleteData.key)

    // Сразу удаляем из UI
    const updatedRoles = roles.filter((_, i) => i !== index)
    setRoles(updatedRoles)

    // Если удаляется редактируемая роль, сбрасываем редактирование
    if (editingIndex === index) {
      setEditingIndex(null)
      setEditingRole("")
      console.log("Сброшено редактирование удаленной роли")
    }

    // ВАЖНО: Завершаем режим редактирования после удаления
    setIsEditing(false)

    // Отправляем DELETE запрос на сервер
    try {
      const accessToken = getAccessTokenFromCookie()
      console.log(
        "Токен доступа для удаления:",
        accessToken ? "найден" : "НЕ найден"
      )

      if (accessToken) {
        const deleteUrl = `/api/v1/vacancy/destroy?key=${roleToDeleteData.key}`
        console.log("URL для удаления:", deleteUrl)
        console.log("Метод запроса: DELETE")
        console.log("Заголовки запроса:", {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.substring(0, 10)}...`,
        })

        const response = await fetch(deleteUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })

        console.log("Статус ответа при удалении:", response.status)
        console.log("Статус OK при удалении:", response.ok)
        console.log(
          "Заголовки ответа при удалении:",
          Object.fromEntries(response.headers.entries())
        )

        const data = await response.json()
        console.log("Данные ответа при удалении:", data)

        if (response.ok) {
          console.log("✅ Удаление выполнено успешно")
        } else {
          console.error("❌ Ошибка при удалении от сервера")
          console.error("Response.ok:", response.ok)
          console.error("Data:", data)
        }
      } else {
        console.error("❌ Нет токена доступа для удаления")
      }
    } catch (error) {
      console.error("❌ ИСКЛЮЧЕНИЕ при удалении:", error)
      console.error(
        "Тип ошибки при удалении:",
        (error as Error).constructor.name
      )
      console.error("Сообщение ошибки при удалении:", (error as Error).message)
      console.error("Stack trace при удалении:", (error as Error).stack)

      if ((error as any).response) {
        console.error(
          "Ответ сервера при ошибке удаления:",
          (error as any).response
        )
        console.error("Статус ошибки удаления:", (error as any).response.status)
        console.error("Данные ошибки удаления:", (error as any).response.data)
      }
    }

    console.log("=== УДАЛЕНИЕ ЗАВЕРШЕНО ===")
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (editingIndex !== null) {
        saveEditedRole()
      } else {
        saveNewRole()
      }
    } else if (e.key === "Escape") {
      if (editingIndex !== null) {
        cancelEdit()
      } else {
        cancelAdd()
      }
    }
  }

  return (
    <>
      <main>
        <section
          style={{ minHeight: "0", flexWrap: "wrap", maxWidth: "1280px" }}
        >
          <div className="formRow justify-flex-start">
            <h2>Настройки анкеты</h2>
          </div>
          <div className="center-card big">
            <div className="formRow">
              <h3 style={{ textAlign: "left" }}>Роли вакансий</h3>
            </div>
            <div className="formRow" style={{ marginTop: "0" }}>
              <h4 style={{ textAlign: "left" }}>
                Роли вакансий, которые отображаются в анкете кандидатов
              </h4>
            </div>
            <div
              className="formRow justify-flex-start"
              style={{ flexWrap: "wrap", gap: "1rem" }}
            >
              {/* Показываем индикатор загрузки или ошибку */}
              {isLoadingRoles && (
                <div style={{ padding: "10px", color: "#666", width: "100%" }}>
                  Загрузка ролей...
                </div>
              )}
              {rolesError && (
                <div
                  style={{ padding: "10px", color: "#e74c3c", width: "100%" }}
                >
                  {rolesError}
                  <button
                    onClick={loadRoles}
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

              {/* Отображаем роли, загруженные из API */}
              {!isLoadingRoles &&
                !rolesError &&
                roles.map((role, index) => (
                  <div
                    key={index}
                    className="roleItem"
                    data-key={role.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>{role.title}</span>
                    {isEditing && (
                      <>
                        <button
                          onClick={() => editRole(index)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src="/images/icons/edit.svg"
                            alt="Edit"
                            width={16}
                            height={16}
                          />
                        </button>

                        <button
                          onClick={() => handleDeleteClick(index)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px",
                            display: "flex",
                            alignItems: "center",
                            color: "#dc3545",
                          }}
                        >
                          <Image
                            src="/images/icons/delete.svg"
                            alt="Delete"
                            width={16}
                            height={16}
                          />
                        </button>
                      </>
                    )}
                  </div>
                ))}

              {/* Инпут для добавления новой роли */}
              {isAdding && (
                <div className="input-container" style={{ minWidth: "200px" }}>
                  <label htmlFor="newRole" className="formLabel">
                    Новая роль
                  </label>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    name="newRole"
                    id="newRole"
                    className="formInput"
                    placeholder="Введите название роли"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    onKeyDown={handleKeyPress}
                    autoFocus
                  />
                </div>
              )}

              {/* Инпут для редактирования роли */}
              {editingIndex !== null && (
                <div className="input-container" style={{ minWidth: "200px" }}>
                  <label htmlFor="editRole" className="formLabel">
                    Редактирование роли
                  </label>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    name="editRole"
                    id="editRole"
                    className="formInput"
                    placeholder="Введите название роли"
                    value={editingRole}
                    onChange={(e) => setEditingRole(e.target.value)}
                    onKeyDown={handleKeyPress}
                    autoFocus
                  />
                </div>
              )}
            </div>
            <div
              className="formRow justify-flex-start"
              style={{ marginTop: "0" }}
            >
              <button
                className="formBtn small btn-active"
                onClick={handleAddRole}
                disabled={isLoadingRoles}
              >
                {editingIndex !== null
                  ? "Подтвердить"
                  : isAdding
                    ? "Сохранить роль"
                    : "Добавить роль"}
              </button>

              {/* Логика для второй кнопки */}
              {isAdding ? (
                // Когда добавляем роль - показываем кнопку "Отменить"
                <button
                  className="formBtn small btn-inactive"
                  onClick={handleCancelAdd}
                >
                  Отменить
                </button>
              ) : (
                // В остальных случаях - кнопка редактирования
                <button
                  className={`formBtn small ${
                    isEditing ? "btn-active" : "btn-inactive"
                  }`}
                  disabled={editingIndex !== null || isLoadingRoles}
                  onClick={handleEditMode}
                >
                  {isEditing ? "Завершить редактирование" : "Редактировать"}
                </button>
              )}
            </div>
          </div>
          <AccessTable />
        </section>
      </main>

      {/* Модальное окно подтверждения удаления */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={confirmDelete}
        header="Удалить вакансию?"
        title={
          roleToDelete !== null
            ? `Вы уверены, что хотите удалить роль "${roles[roleToDelete]?.title}"? Это действие нельзя будет отменить.`
            : ""
        }
      />
    </>
  )
}

export default CandidatesSettings
