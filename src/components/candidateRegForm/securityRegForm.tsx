"use client";
import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "./header";
import styles from "./SecurityRegForm.module.css";

interface IAuthResult {
  access_token?: string;
  [key: string]: any;
}

const SecurityRegForm: FC = () => {
  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [showLoginCheckmark, setShowLoginCheckmark] = useState<boolean>(false);
  const [showPasswordCheckmark, setShowPasswordCheckmark] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authResult, setAuthResult] = useState<IAuthResult | null>(null);
  
  const router = useRouter();

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoginValue(value);
    setShowLoginCheckmark(value.trim().length > 0);

    // Очищаем ошибку при изменении значения
    if (error) {
      setError('');
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordValue(value);
    setShowPasswordCheckmark(value.trim().length > 0);

    // Очищаем ошибку при изменении значения
    if (error) {
      setError('');
    }
  };

  const isFormValid = (): boolean => {
    return loginValue.trim().length > 0 && passwordValue.trim().length > 0;
  };

  // Функция для отправки запроса на авторизацию администратора
  const sendAuthRequest = async (login: string, password: string): Promise<boolean> => {
    console.log('sendAuthRequest вызвана для администратора');
    console.log('Данные для отправки:', { login, password: '***' }); // Пароль скрываем в логах

    try {
      setIsLoading(true);
      setError('');

      console.log('Отправляем запрос на авторизацию администратора...');

      // Отправляем запрос на аутентификацию
      const response = await axios.post('/api/v1/account/auth', {
        email: login,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Ответ сервера:', response.data);

      // Проверяем успешность запроса
      if (response.data.request && response.data.attributes) {
        setAuthResult(response.data.attributes);
        setIsAuthenticated(true);
        console.log('Авторизация администратора успешна:', response.data);

        // Сохраняем токен в cookie
        if (response.data.attributes.access_token) {
          // Устанавливаем cookie с токеном на 30 дней
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 дней
          document.cookie = `access_token=${response.data.attributes.access_token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
          console.log('Токен администратора сохранен в cookie:', response.data.attributes.access_token);
        }

        return true;
      } else {
        console.log('Ошибка в ответе сервера');
        setError('Ошибка при авторизации');
        return false;
      }
    } catch (error: any) {
      console.error('Ошибка при авторизации администратора:', error);

      if (error.response) {
        // Сервер ответил с кодом ошибки
        console.log('Ошибка ответа сервера:', error.response.status, error.response.data);
        if (error.response.status === 401) {
          setError('Неверный логин или пароль');
        } else if (error.response.status === 404) {
          setError('Пользователь не найден');
        } else if (error.response.status === 403) {
          setError('Доступ запрещен');
        } else {
          setError(error.response.data?.error || 'Ошибка сервера');
        }
      } else if (error.request) {
        // Запрос был отправлен, но ответа не получено
        console.log('Ошибка запроса:', error.request);
        setError('Ошибка соединения с сервером');
      } else {
        // Ошибка при настройке запроса
        console.log('Ошибка настройки:', error.message);
        setError('Ошибка при отправке запроса');
      }
      return false;
    } finally {
      console.log('Завершение sendAuthRequest для администратора');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Форма отправлена с данными:', { login: loginValue, password: '***' });

    if (isFormValid()) {
      console.log('Форма валидна, отправляем запрос авторизации...');
      await sendAuthRequest(loginValue.trim(), passwordValue.trim());
    } else {
      console.log('Форма не валидна');
      setError('Заполните все поля');
    }
  };

  const handleLogout = () => {
    console.log('Выход из системы администратора');
    setIsAuthenticated(false);
    setAuthResult(null);
    setLoginValue('');
    setPasswordValue('');
    setShowLoginCheckmark(false);
    setShowPasswordCheckmark(false);
    setError('');

    // Удаляем токен из cookie
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('Токен удален из cookie');
  };

  // Если администратор аутентифицирован, перенаправляем на нужную страницу
  if (isAuthenticated && authResult) {
    router.push('/profile-candidates/security/');
    return (
      <>
        <Header />
        <div>Перенаправление...</div>
      </>
    );
  }

  return (
    <>
      <Header />

      <main>
        <section>
          <div className={styles['center-card']}>
            <h1>Вход для администратора</h1>
            <p className={styles['description']}>
              Введите логин и пароль, чтобы авторизоваться в системе и получить доступ к административной панели
            </p>

            <form onSubmit={handleSubmit} className={styles['auth-form']}>
              <div className={styles['input-container']}>
                <label htmlFor="login" className={styles['form-label']}>
                  Логин
                </label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  className={styles['form-input']}
                  placeholder="Введите логин"
                  value={loginValue}
                  onChange={handleLoginChange}
                  disabled={isLoading}
                />
                {showLoginCheckmark && (
                  <div className={styles['checkmark-icon']}>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
              </div>

              <div className={styles['input-container']}>
                <label htmlFor="password" className={styles['form-label']}>
                  Пароль
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={styles['form-input']}
                  placeholder="Введите пароль"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
                {showPasswordCheckmark && (
                  <div className={styles['checkmark-icon']}>
                    <svg viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Отображение ошибки */}
              {error && (
                <div className={styles['error-message']}>
                  {error}
                </div>
              )}

              <button
                className={`${styles['form-btn']} ${isFormValid() && !isLoading ? styles['btn-active'] : styles['btn-inactive']}`}
                disabled={!isFormValid() || isLoading}
                type="submit"
              >
                {isLoading ? "Вход..." : "Войти"}
              </button>
            </form>

            <a href="#" className={styles['change-number']} id="changeNumber">
              Изменить номер
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default SecurityRegForm;