"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import React, { FC, KeyboardEvent, useEffect, useState } from "react"

import Image from "next/image"

import { useApiMutation, useApiQuery } from "@/utils/hooks/use-api"

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
    staleTime: 30 * 60 * 1000, 
    gcTime: 60 * 60 * 1000,
    retry: 2,
    refetchOnMount: false, 
    refetchOnWindowFocus: false, 
    refetchOnReconnect: false, 
  })


  const roles = rolesData?.attributes || []

  
  const createRoleMutation = useApiMutation<
    { id: string; key: string; title: string },
    { title: string }
  >(`${process.env.NEXT_PUBLIC_API_URL}/vacancy/store`, {
    onSuccess: (data) => {
      console.log("✅ Роль успешно создана:", data)
      queryClient.invalidateQueries({ queryKey: ["vacancies"] })
    },
    onError: (error) => {
      console.error("❌ Ошибка при создании роли:", error)
      queryClient.invalidateQueries({ queryKey: ["vacancies"] })
    },
  })

  const updateRoleMutation = useApiMutation<
    { id: string; key: string; title: string },
    { key: string; title: string }
  >(`${process.env.NEXT_PUBLIC_API_URL}/vacancy/update`, {
    onSuccess: (data) => {
      console.log("✅ Роль успешно обновлена:", data)
      queryClient.invalidateQueries({ queryKey: ["vacancies"] })
    },
    onError: (error) => {
      console.error("❌ Ошибка при обновлении роли:", error)
      queryClient.invalidateQueries({ queryKey: ["vacancies"] })
    },
  })

  const deleteRoleMutation = useApiMutation<
    { success: boolean },
    { key: string }
  >(`${process.env.NEXT_PUBLIC_API_URL}/vacancy/destroy`, {
    onSuccess: (data) => {
      console.log("✅ Роль успешно удалена:", data)
      queryClient.invalidateQueries({ queryKey: ["vacancies"] })
    },
    onError: (error) => {
      console.error("❌ Ошибка при удалении роли:", error)
      queryClient.invalidateQueries({ queryKey: ["vacancies"] })
    },
  })

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

  const saveNewRole = () => {
    if (newRole.trim()) {
      const newTitle = newRole.trim()

      console.log("=== НАЧАЛО ДОБАВЛЕНИЯ НОВОЙ РОЛИ ===")
      console.log("Название новой роли:", newTitle)

      // Сбрасываем состояние формы
      setNewRole("")
      setIsAdding(false)

      createRoleMutation.mutate({ title: newTitle })

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

  const saveEditedRole = () => {
    if (editingRole.trim() && editingIndex !== null) {
      const roleToUpdate = roles[editingIndex]
      const newTitle = editingRole.trim()

      // Сбрасываем состояния редактирования
      setEditingIndex(null)
      setEditingRole("")
      setIsAdding(false)
      setIsEditing(false)

      // Используем мутацию для обновления роли
      updateRoleMutation.mutate({
        key: roleToUpdate.key,
        title: newTitle,
      })
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

  const confirmDelete = () => {
    if (roleToDelete === null) return

    const index = roleToDelete
    const roleToDeleteData = roles[index]

    console.log("=== НАЧАЛО УДАЛЕНИЯ ВАКАНСИИ ===")
    console.log("Индекс удаляемой роли:", index)
    console.log("Данные роли для удаления:", roleToDeleteData)
    console.log("Key для удаления:", roleToDeleteData.key)

    // Сбрасываем состояния редактирования если удаляется редактируемая роль
    if (editingIndex === index) {
      setEditingIndex(null)
      setEditingRole("")
      console.log("Сброшено редактирование удаленной роли")
    }

    // ВАЖНО: Завершаем режим редактирования после удаления
    setIsEditing(false)

    // Используем мутацию для удаления роли
    deleteRoleMutation.mutate({ key: roleToDeleteData.key })

    // Закрываем модальное окно
    setIsDeleteModalOpen(false)
    setRoleToDelete(null)

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
