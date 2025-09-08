"use client"

import { useQueryClient } from "@tanstack/react-query"

import React, { FC, KeyboardEvent, useEffect, useState } from "react"

import Image from "next/image"

import { useApiQuery } from "@/utils/hooks/use-api"

import AccessTable from "./accessTable/AccessTable"
import ConfirmationModal from "./confirmationalWindow"

interface IRole {
  id: string
  key: string
  title: string
}

const CandidatesSettings: FC = () => {
  const queryClient = useQueryClient()

  // Запрос вакансий с использованием React Query
  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    error: rolesError,
    refetch,
  } = useApiQuery<{
    response: boolean
    attributes: IRole[]
  }>(["vacancies"], `${process.env.NEXT_PUBLIC_API_URL}/vacancy/`, {
    staleTime: 30 * 60 * 1000, // 30 минут - увеличиваем время жизни кэша
    gcTime: 60 * 60 * 1000, // 1 час - увеличиваем время хранения в памяти
    retry: 2,
    refetchOnMount: false, // Не делать refetch при монтировании компонента
    refetchOnWindowFocus: false, // Не делать refetch при фокусе окна
    refetchOnReconnect: false, // Не делать refetch при восстановлении соединения
  })

  // Извлекаем роли из ответа API
  const roles = rolesData?.attributes || []

  // Отслеживаем изменения данных для отладки
  useEffect(() => {
    console.log("🔍 Изменение данных ролей:", {
      count: roles.length,
      isLoading: isLoadingRoles,
      hasError: !!rolesError,
      roles: roles.map((r) => ({ id: r.id, title: r.title, key: r.key })),
    })
  }, [roles, isLoadingRoles, rolesError])

  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newRole, setNewRole] = useState<string>("")
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingRole, setEditingRole] = useState<string>("")

  // Состояния для модального окна удаления
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null)

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

      // Создаем временный объект роли для оптимистичного обновления
      const optimisticRole: IRole = {
        id: `optimistic_${Date.now()}`,
        key: `optimistic_key_${Date.now()}`,
        title: newTitle,
      }

      // Оптимистичное обновление: сразу добавляем роль в UI
      console.log("⚡ Оптимистичное добавление роли:", optimisticRole.title)

      queryClient.setQueryData<{
        response: boolean
        attributes: IRole[]
      }>(["vacancies"], (oldData) => {
        if (!oldData) {
          console.log("⚠️  Нет oldData при оптимистичном добавлении")
          return {
            response: true,
            attributes: [optimisticRole],
          }
        }

        console.log(
          "📊 Добавляем роль к существующим",
          oldData.attributes.length,
          "ролям"
        )
        const newAttributes = [...oldData.attributes, optimisticRole]

        return {
          ...oldData,
          attributes: newAttributes,
        }
      })

      // Сбрасываем состояние формы
      setNewRole("")
      setIsAdding(false)

      console.log("Новая роль добавлена в UI оптимистично:", optimisticRole)

      // Отправляем POST запрос на сервер для создания роли
      const requestData = {
        title: newTitle,
      }

      console.log("Данные для отправки:", requestData)
      console.log("JSON для отправки:", JSON.stringify(requestData, null, 2))

      try {
        // Получаем токен из cookie
        const cookies = document.cookie.split(";")
        let accessToken = null
        for (let cookie of cookies) {
          const [name, value] = cookie.trim().split("=")
          if (name === "access_token") {
            accessToken = value
            break
          }
        }

        console.log(
          "Токен доступа для создания:",
          accessToken ? "найден" : "НЕ найден"
        )

        if (accessToken) {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/vacancy/store`
          console.log("Отправка POST запроса к", apiUrl)
          console.log("Заголовки запроса:", {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.substring(0, 10)}...`,
          })

          const response = await fetch(apiUrl, {
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

          if (response.ok) {
            console.log("✅ Создание роли выполнено успешно")
            console.log("Полученные данные новой роли:", data)

            // Заменяем оптимистичную роль на реальную с сервера
            // API возвращает данные роли напрямую, без поля attributes
            if (data && data.id) {
              console.log("🔄 Заменяем оптимистичную роль на реальную:", data)

              queryClient.setQueryData<{
                response: boolean
                attributes: IRole[]
              }>(["vacancies"], (oldData) => {
                if (!oldData) {
                  console.log("⚠️  Нет oldData при замене роли")
                  return oldData
                }

                console.log(
                  "📊 Текущие данные в кэше:",
                  oldData.attributes.length,
                  "ролей"
                )
                console.log("🎯 Ищем роль с ID:", optimisticRole.id)

                const updatedAttributes = oldData.attributes.map((role) => {
                  if (role.id === optimisticRole.id) {
                    console.log(
                      "✅ Нашли оптимистичную роль, заменяем на:",
                      data
                    )
                    return data // API возвращает данные напрямую
                  }
                  return role
                })

                const result = {
                  ...oldData,
                  attributes: updatedAttributes,
                }

                console.log(
                  "📊 Итоговые данные после замены:",
                  result.attributes.length,
                  "ролей"
                )
                return result
              })
            } else {
              // Если сервер не вернул данные в ожидаемом формате, инвалидируем кэш
              console.log(
                "⚠️  Сервер вернул данные в неожиданном формате, инвалидируем кэш"
              )
              console.log(
                "🔄 Вызываем queryClient.invalidateQueries для vacancies"
              )
              queryClient.invalidateQueries({ queryKey: ["vacancies"] })
            }
          } else {
            console.error("❌ Ошибка при создании роли от сервера")
            console.error("Response.ok:", response.ok)
            console.error("Status:", response.status)
            console.error("Данные ошибки:", data)

            // Откатываем оптимистичное обновление при ошибке
            queryClient.setQueryData<{
              response: boolean
              attributes: IRole[]
            }>(["vacancies"], (oldData) => {
              if (!oldData) return oldData
              return {
                ...oldData,
                attributes: oldData.attributes.filter(
                  (role) => role.id !== optimisticRole.id
                ),
              }
            })
          }
        } else {
          console.error("❌ Нет токена доступа для создания роли")

          // Откатываем оптимистичное обновление при ошибке авторизации
          queryClient.setQueryData<{
            response: boolean
            attributes: IRole[]
          }>(["vacancies"], (oldData) => {
            if (!oldData) return oldData
            return {
              ...oldData,
              attributes: oldData.attributes.filter(
                (role) => role.id !== optimisticRole.id
              ),
            }
          })
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

        // Откатываем оптимистичное обновление при исключении
        queryClient.setQueryData<{
          response: boolean
          attributes: IRole[]
        }>(["vacancies"], (oldData) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            attributes: oldData.attributes.filter(
              (role) => role.id !== optimisticRole.id
            ),
          }
        })

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

      // Создаем обновленную роль для оптимистичного обновления
      const updatedRole: IRole = {
        ...roleToUpdate,
        title: newTitle,
      }

      // Оптимистичное обновление: сразу обновляем роль в UI
      queryClient.setQueryData<{
        response: boolean
        attributes: IRole[]
      }>(["vacancies"], (oldData) => {
        if (!oldData) return oldData
        const updatedAttributes = oldData.attributes.map((role) =>
          role.id === roleToUpdate.id ? updatedRole : role
        )
        return {
          ...oldData,
          attributes: updatedAttributes,
        }
      })

      // Сбрасываем состояния редактирования
      setEditingIndex(null)
      setEditingRole("")
      setIsAdding(false)
      setIsEditing(false)

      const requestData = {
        key: roleToUpdate.key,
        title: newTitle,
      }

      try {
        // Получаем токен из cookie
        const cookies = document.cookie.split(";")
        let accessToken = null
        for (let cookie of cookies) {
          const [name, value] = cookie.trim().split("=")
          if (name === "access_token") {
            accessToken = value
            break
          }
        }

        if (accessToken) {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/vacancy/update`
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
          })

          if (response.ok) {
            console.log("✅ Роль обновлена успешно")
            // Оптимистичное обновление уже применилось, ничего дополнительно не делаем
          } else {
            console.error("❌ Ошибка при обновлении роли на сервере")
            // Откатываем оптимистичное обновление при ошибке
            queryClient.setQueryData<{
              response: boolean
              attributes: IRole[]
            }>(["vacancies"], (oldData) => {
              if (!oldData) return oldData
              const rollbackAttributes = oldData.attributes.map((role) =>
                role.id === roleToUpdate.id ? roleToUpdate : role
              )
              return {
                ...oldData,
                attributes: rollbackAttributes,
              }
            })
          }
        } else {
          console.error("❌ Нет токена доступа для обновления роли")
          // Откатываем оптимистичное обновление при ошибке авторизации
          queryClient.setQueryData<{
            response: boolean
            attributes: IRole[]
          }>(["vacancies"], (oldData) => {
            if (!oldData) return oldData
            const rollbackAttributes = oldData.attributes.map((role) =>
              role.id === roleToUpdate.id ? roleToUpdate : role
            )
            return {
              ...oldData,
              attributes: rollbackAttributes,
            }
          })
        }
      } catch (error) {
        console.error("❌ Исключение при обновлении роли:", error)

        // Откатываем оптимистичное обновление при исключении
        queryClient.setQueryData<{
          response: boolean
          attributes: IRole[]
        }>(["vacancies"], (oldData) => {
          if (!oldData) return oldData
          const rollbackAttributes = oldData.attributes.map((role) =>
            role.id === roleToUpdate.id ? roleToUpdate : role
          )
          return {
            ...oldData,
            attributes: rollbackAttributes,
          }
        })
      }
    }
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditingRole("")
  }

  const handleDeleteClick = (index: number) => {
    setRoleToDelete(index)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false)
    setRoleToDelete(null)
  }

  const confirmDelete = async () => {
    if (roleToDelete === null) return

    const index = roleToDelete
    const roleToDeleteData = roles[index]

    console.log("=== НАЧАЛО УДАЛЕНИЯ ВАКАНСИИ ===")
    console.log("Индекс удаляемой роли:", index)
    console.log("Данные роли для удаления:", roleToDeleteData)
    console.log("Key для удаления:", roleToDeleteData.key)

    // Оптимистичное обновление: сразу удаляем роль из UI
    queryClient.setQueryData<{
      response: boolean
      attributes: IRole[]
    }>(["vacancies"], (oldData) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        attributes: oldData.attributes.filter(
          (role) => role.id !== roleToDeleteData.id
        ),
      }
    })

    // Сбрасываем состояния редактирования если удаляется редактируемая роль
    if (editingIndex === index) {
      setEditingIndex(null)
      setEditingRole("")
      console.log("Сброшено редактирование удаленной роли")
    }

    // ВАЖНО: Завершаем режим редактирования после удаления
    setIsEditing(false)

    // Отправляем DELETE запрос на сервер
    try {
      // Получаем токен из cookie
      const cookies = document.cookie.split(";")
      let accessToken = null
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split("=")
        if (name === "access_token") {
          accessToken = value
          break
        }
      }

      console.log(
        "Токен доступа для удаления:",
        accessToken ? "найден" : "НЕ найден"
      )

      if (accessToken) {
        const deleteUrl = `${process.env.NEXT_PUBLIC_API_URL}/vacancy/destroy?key=${roleToDeleteData.key}`
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
          // Оптимистичное обновление уже применилось, ничего дополнительно не делаем
        } else {
          console.error("❌ Ошибка при удалении от сервера")
          console.error("Response.ok:", response.ok)
          console.error("Data:", data)

          // Откатываем оптимистичное обновление при ошибке
          queryClient.setQueryData<{
            response: boolean
            attributes: IRole[]
          }>(["vacancies"], (oldData) => {
            if (!oldData) return oldData
            return {
              ...oldData,
              attributes: [...oldData.attributes, roleToDeleteData],
            }
          })
        }
      } else {
        console.error("❌ Нет токена доступа для удаления")

        // Откатываем оптимистичное обновление при ошибке авторизации
        queryClient.setQueryData<{
          response: boolean
          attributes: IRole[]
        }>(["vacancies"], (oldData) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            attributes: [...oldData.attributes, roleToDeleteData],
          }
        })
      }
    } catch (error) {
      console.error("❌ ИСКЛЮЧЕНИЕ при удалении:", error)
      console.error(
        "Тип ошибки при удалении:",
        (error as Error).constructor.name
      )
      console.error("Сообщение ошибки при удалении:", (error as Error).message)
      console.error("Stack trace при удалении:", (error as Error).stack)

      // Откатываем оптимистичное обновление при исключении
      queryClient.setQueryData<{
        response: boolean
        attributes: IRole[]
      }>(["vacancies"], (oldData) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          attributes: [...oldData.attributes, roleToDeleteData],
        }
      })

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
                  {rolesError.message || "Ошибка при загрузке ролей"}
                  <button
                    onClick={() => refetch()}
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
