"use client";

import React, { useState, useEffect, useRef, FC } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import "../../candidatesSecurityBlock/candidateRegForm.css";
import HeaderFormSmall from '@/components/candidateRegForm/header';
import Image from 'next/image';
import clsx from 'clsx';

interface AuthAttributes {
    access_token?: string;
    user?: {
        role: string;
    };
}

interface ApiResponse {
    request: boolean;
    attributes?: AuthAttributes;
    error?: string;
}

const SecurityRegForm: FC = () => {
    const router = useRouter();
    const [loginValue, setLoginValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [showLoginCheckmark, setShowLoginCheckmark] = useState<boolean>(false);
    const [showPasswordCheckmark, setShowPasswordCheckmark] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authResult, setAuthResult] = useState<AuthAttributes | null>(null);

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setLoginValue(value);
        setShowLoginCheckmark(value.trim().length > 0);
        // Очищаем ошибку при изменении значения
        if (error) {
            setError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

            const response = await axios.post<ApiResponse>('/api/v1/account/auth', {
                email: login,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Ответ сервера:', response.data);

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
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            console.error('Ошибка при авторизации администратора:', error);
            
            if (axiosError.response) {
                // Сервер ответил с кодом ошибки
                console.log('Ошибка ответа сервера:', axiosError.response.status, axiosError.response.data);
                if (axiosError.response.status === 401) {
                    setError('Неверный логин или пароль');
                } else if (axiosError.response.status === 404) {
                    setError('Пользователь не найден');
                } else if (axiosError.response.status === 403) {
                    setError('Доступ запрещен');
                } else {
                    setError(axiosError.response.data?.error || 'Ошибка сервера');
                }
            } else if (axiosError.request) {
                // Запрос был отправлен, но ответа не получено
                console.log('Ошибка запроса:', axiosError.request);
                setError('Ошибка соединения с сервером');
            } else {
                // Ошибка при настройке запроса
                console.log('Ошибка настройки:', axiosError.message);
                setError('Ошибка при отправке запроса');
            }
            return false;
        } finally {
            console.log('Завершение sendAuthRequest для администратора');
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log('Форма отправлена с данными:', { login: loginValue, password: '***' });

        if (isFormValid()) {
            console.log('Форма валидна, отправляем запрос авторизации...');
            const success = await sendAuthRequest(loginValue.trim(), passwordValue.trim());
            
            if (success) {
                router.push('/candidatesSecurityTable');
            }
        } else {
            console.log('Форма не валидна');
            setError('Заполните все поля');
        }
    };

    const handleLogout = (): void => {
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

    // Если администратор аутентифицирован, перенаправляем
    useEffect(() => {
        if (isAuthenticated && authResult) {
            router.push('/candidatesSecurityTable');
        }
    }, [isAuthenticated, authResult, router]);

    return (
        <>
            <HeaderFormSmall></HeaderFormSmall>

            <main>
                <section>
                    <div className="center-card">
                        <h1>Вход для администратора</h1>
                        <p style={{maxWidth: "100%"}}>
                            Введите логин и пароль, чтобы авторизоваться в системе и получить доступ к административной панели
                        </p>

                        <form action="#" style={{marginTop: '30px'}} onSubmit={handleSubmit}>
                            <div className="input-container" style={{marginBottom: '20px'}}>
                                <label htmlFor="login" id="formLabel" className="formLabel">Логин</label>
                                <input
                                    type="text"
                                    name="login"
                                    id="login"
                                    className="formInput"
                                    placeholder="Введите логин"
                                    value={loginValue}
                                    onChange={handleLoginChange}
                                    disabled={isLoading}
                                />
                                {showLoginCheckmark && (
                                <div className="checkmark-icon" id="checkmarkIcon">
                                    <Image 
                                    src="/images/icons/chechMark.svg"  
                                    alt="Checkmark" 
                                    width={24} 
                                    height={24} 
                                    />
                                </div>
                                )}
                            </div>

                            <div className="input-container">
                                <label htmlFor="password" className="formLabel">Пароль</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="formInput"
                                    placeholder="Введите пароль"
                                    value={passwordValue}
                                    onChange={handlePasswordChange}
                                    disabled={isLoading}
                                />
                                {showPasswordCheckmark && (
                                <div className="checkmark-icon" id="checkmarkIcon">
                                    <Image 
                                    src="/images/icons/chechMark.svg" 
                                    alt="Checkmark" 
                                    width={24} 
                                    height={24} 
                                    />
                                </div>
                                )}
                            </div>

                            {/* Отображение ошибки */}
                            {error && (
                                <div className="error-message" style={{
                                    color: '#d32f2f',
                                    fontSize: '14px',
                                    marginTop: '10px',
                                    padding: '8px',
                                    backgroundColor: '#ffebee',
                                    border: '1px solid #ffcdd2',
                                    borderRadius: '4px'
                                }}>
                                    {error}
                                </div>
                            )}

                            <button
                                className={isFormValid() && !isLoading ? "formBtn btn-active" : "formBtn btn-inactive"}
                                disabled={!isFormValid() || isLoading}
                                type="submit"
                                style={{marginTop: '20px'}}
                            >
                                {isLoading ? "Вход..." : "Войти"}
                            </button><br />
                        </form>

                        <a href="#" style={{display: 'none'}} id="changeNumber">Изменить номер</a>
                    </div>
                </section>
            </main>
        </>
    );
};

export default SecurityRegForm;