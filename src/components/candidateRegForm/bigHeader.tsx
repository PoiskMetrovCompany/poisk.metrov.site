"use client";
import React, { FC, useState, useEffect, useRef } from "react";

interface INotification {
  id?: { $oid?: string };
  title: string;
  created_at: string;
}

interface IHeaderProps {
  onCityChange?: (city: string) => void;
}

const BigHeader: FC<IHeaderProps> = ({ onCityChange }) => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('Новосибирск');
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Список городов
  const cities = ['Новосибирск', 'Санкт-Петербург'];

  // Функция для форматирования даты
  const formatNotificationDate = (dateString: string): string => {
    const notificationDate = new Date(dateString);
    const now = new Date();
    
    // Проверяем, является ли дата сегодняшней
    const isToday = notificationDate.toDateString() === now.toDateString();
    
    const hours = notificationDate.getHours().toString().padStart(2, '0');
    const minutes = notificationDate.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    
    if (isToday) {
      return time;
    } else {
      const day = notificationDate.getDate().toString().padStart(2, '0');
      const month = (notificationDate.getMonth() + 1).toString().padStart(2, '0');
      return `${time} ${day}.${month}`;
    }
  };

  // Обработчик выбора города
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
    if (onCityChange) {
      onCityChange(city);
    }
  };

  // Обработчик клика по селектору города
  const toggleCityDropdown = () => {
    setShowCityDropdown(!showCityDropdown);
  };

  // Обработчик клика вне dropdown для закрытия
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      const url = '/api/v1/notification/new-candidates';
      
      // Используем уже существующую в проекте функцию для получения токена
      const getAccessToken = (): string | null => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (name === 'access_token') {
            return value;
          }
        }
        return null;
      };

      // Функция для получения CSRF токена
      const getCsrfToken = (): string => {
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
          return metaTag.getAttribute('content') || '';
        }

        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (name === 'XSRF-TOKEN') {
            return decodeURIComponent(value);
          }
        }

        return 'Zva2RlvTSh5wTQogjJMfE8v5ObQoOSIcL40Xwc5d';
      };

      const token = getAccessToken();
      const csrfToken = getCsrfToken();
      
      console.log('🚀 Отправляем GET запрос на:', url);
      console.log('🌐 Текущий домен:', window.location.origin);
      console.log('📍 Полный URL:', window.location.origin + url);
      console.log('🔑 Access Token найден:', token ? 'Да' : 'Нет');
      console.log('🔑 Access Token (первые 20 символов):', token ? token.substring(0, 20) + '...' : 'Отсутствует');
      console.log('🛡️ CSRF Token найден:', csrfToken ? 'Да' : 'Нет');

      try {
        const headers: Record<string, string> = {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        };

        // Добавляем Authorization заголовок, если токен найден
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        // Добавляем CSRF токен
        if (csrfToken) {
          headers['X-CSRF-TOKEN'] = csrfToken;
        }

        console.log('📋 Заголовки запроса:', headers);

        const response = await fetch(url, {
          method: 'GET',
          headers: headers
        });
        
        console.log('📡 Статус ответа:', response.status);
        console.log('📋 Заголовки ответа:', Object.fromEntries(response.headers.entries()));
        console.log('✅ Запрос успешен:', response.ok);

        if (response.ok) {
          // Получаем JSON ответ
          const data = await response.json();
          console.log('✅ Данные уведомлений получены:', data);
          
          // Обновляем состояние с полученными уведомлениями
          if (data.response && data.attributes) {
            setNotifications(data.attributes);
          }
        } else {
          // Получаем текст ошибки
          const errorText = await response.text();
          console.error('❌ Ошибка ответа сервера:', {
            status: response.status,
            statusText: response.statusText,
            errorText: errorText.substring(0, 200)
          });
        }

      } catch (error) {
        console.error('❌ Ошибка при получении уведомлений:', error);
        console.error('🔍 Детали ошибки:', {
          name: (error as Error).name,
          message: (error as Error).message,
          stack: (error as Error).stack
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleLogout = () => {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Определяем какую иконку показывать
  const getNotificationIcon = (): string => {
    return notifications.length > 0 ? '/img/ringActive.png' : '/img/ring.png';
  };

  const getNotificationAlt = (): string => {
    return notifications.length > 0 ? 'Есть новые уведомления' : 'Уведомлений нет';
  };

  return (
    <header>
      <div className="formRow justify-space-between w-80">
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img id="nonTextImg" src="/img/ logo без текста.png" alt="Логотип компании Поиск Метров" />
          <div style={{position: 'relative'}} ref={cityDropdownRef}>
            <h5 id="city">
              Город: 
              <span 
                id="selectCity" 
                onClick={toggleCityDropdown}
                style={{cursor: 'pointer'}}
              >
                {selectedCity}
              </span>
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{
                  transform: showCityDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <path d="M6 9L12 15L18 9" />
              </svg>
            </h5>
            
            {/* Выпадающий список городов */}
            {showCityDropdown && (
              <div className="city-dropdown">
                {cities.map((city) => (
                  <div 
                    key={city}
                    className={`city-option ${city === selectedCity ? 'selected' : ''}`}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-80" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px'}}>
          <a href="/profile-candidates/security/">Кандидаты</a>
          <a href="/profile-candidates/security/settings" className="active">Настройки</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', minWidth: '250px', position: 'relative'}}>
          {/* Контейнер для кнопки уведомлений и блока уведомлений */}
          <div style={{position: 'relative'}}>
            <button
              id="notifBtn"
              ref={notificationButtonRef}
              onClick={toggleNotifications}
              style={{position: 'relative'}}
            >
              <img 
                src={getNotificationIcon()} 
                alt={getNotificationAlt()} 
              />
            </button>
            {/* Блок уведомлений */}
            {showNotifications && (
              <div className="notifications-container">
                <div className="header">
                  <h1 className="notification-header">Уведомления</h1>
                </div>
                <div className="divider"></div>
                <div className="notifications-list">
                  {loading ? (
                    <div className="notification-item">
                      <div className="notification-content">
                        <span className="notification-text">Загрузка уведомлений...</span>
                      </div>
                    </div>
                  ) : notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div key={notification.id?.$oid || index} className="notification-item">
                        <div className="notification-dot"></div>
                        <div className="notification-content">
                          <span className="notification-text">{notification.title}</span>
                          <span className="notification-time">
                            {formatNotificationDate(notification.created_at)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="notification-item">
                      <div className="notification-content">
                        <span className="notification-text">Уведомлений нет</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button id="exitBtn" onClick={handleLogout}>
            Выйти из ЛК <img src="/img/arowRight.png" alt="Стрелочка вправо" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default BigHeader;