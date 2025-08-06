"use client";

import React, { useEffect, useState, FC } from "react";
import Image from "next/image";

import "../../../public/styles/style.css";

const cardExpandImg = "/images/buidingExpandImg.webp";

interface ISpecification {
  type: string;
  price: string;
}

interface IBadge {
  developer: string;
  period: string;
}

interface ICard {
  id: number;
  title: string;
  price: string;
  subtitle: string;
  badge: IBadge;
  metro: string;
  driveTime: string;
  specifications: ISpecification[];
}

const BuildingCarousel: FC = () => {
  const [translateX, setTranslateX] = useState<number>(0);
  const [transition, setTransition] = useState<string>('transform 0.5s ease-in-out');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  const cards: ICard[] = [
    {
      id: 1,
      title: "Европейский берег",
      price: "от 5.6 млн ₽",
      subtitle: "Микрорайон на набережной Оби",
      badge: { developer: "Брусника", period: "I – IV 2026" },
      metro: "Октябрьская",
      driveTime: "25 минут",
      specifications: [
        { type: "Студии", price: "от 5,6 млн ₽" },
        { type: "1-комн. кв", price: "от 7,1 млн ₽" },
        { type: "2-комн. кв", price: "от 8,5 млн ₽" },
        { type: "3-комн. кв", price: "от 10,8 млн ₽" },
        { type: "4+ комн. кв", price: "от 14,9 млн ₽" }
      ]
    },
    {
      id: 2,
      title: "Солнечная долина",
      price: "от 4.8 млн ₽",
      subtitle: "Жилой комплекс в центре города",
      badge: { developer: "ПИК", period: "III – IV 2025" },
      metro: "Центральная",
      driveTime: "15 минут",
      specifications: [
        { type: "Студии", price: "от 4,8 млн ₽" },
        { type: "1-комн. кв", price: "от 6,2 млн ₽" },
        { type: "2-комн. кв", price: "от 7,8 млн ₽" },
        { type: "3-комн. кв", price: "от 9,5 млн ₽" },
        { type: "4+ комн. кв", price: "от 12,1 млн ₽" }
      ]
    },
    {
      id: 3,
      title: "Зеленый парк",
      price: "от 6.2 млн ₽",
      subtitle: "Элитный комплекс у парка",
      badge: { developer: "Самолет", period: "II – III 2026" },
      metro: "Парковая",
      driveTime: "20 минут",
      specifications: [
        { type: "Студии", price: "от 6,2 млн ₽" },
        { type: "1-комн. кв", price: "от 8,0 млн ₽" },
        { type: "2-комн. кв", price: "от 9,8 млн ₽" },
        { type: "3-комн. кв", price: "от 12,5 млн ₽" },
        { type: "4+ комн. кв", price: "от 16,8 млн ₽" }
      ]
    },
    {
      id: 4,
      title: "Морской бриз",
      price: "от 7.1 млн ₽",
      subtitle: "Премиум класс у моря",
      badge: { developer: "Эталон", period: "I – II 2027" },
      metro: "Морская",
      driveTime: "30 минут",
      specifications: [
        { type: "Студии", price: "от 7,1 млн ₽" },
        { type: "1-комн. кв", price: "от 9,3 млн ₽" },
        { type: "2-комн. кв", price: "от 11,2 млн ₽" },
        { type: "3-комн. кв", price: "от 14,8 млн ₽" },
        { type: "4+ комн. кв", price: "от 19,5 млн ₽" }
      ]
    }
  ];

  const extendedCards: ICard[] = [
    cards[cards.length - 2],
    cards[cards.length - 1],
    ...cards,
    cards[0],
    cards[1]
  ];

  const cardWidth: number = 820 + 50; 
  const initialOffset: number = -cardWidth * 2; 

  useEffect(() => {
    setTranslateX(initialOffset);
  }, [initialOffset]);

  const moveCarousel = (direction: 'next' | 'prev'): void => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newTranslateX: number = translateX + (direction === 'next' ? -cardWidth : cardWidth);
    setTranslateX(newTranslateX);
    
    setTimeout(() => {
      if (direction === 'next' && newTranslateX <= -cardWidth * (cards.length + 2)) {
        setTransition('none');
        setTranslateX(initialOffset);
        setTimeout(() => {
          setTransition('transform 0.5s ease-in-out');
          setIsAnimating(false);
        }, 50);
      } else if (direction === 'prev' && newTranslateX >= 0) {
        setTransition('none');
        setTranslateX(-cardWidth * cards.length);
        setTimeout(() => {
          setTransition('transform 0.5s ease-in-out');
          setIsAnimating(false);
        }, 50);
      } else {
        setIsAnimating(false);
      }
    }, 500);
  };

  const nextSlide = (): void => moveCarousel('next');
  const prevSlide = (): void => moveCarousel('prev');

  return (
    <section className="offers">
      <h2 className="offers__title row">Лучшие предложения</h2>

      <div className="offers__container row" id="cardList">
        <div className="offers_navigation">
          <button className="offers_navigation_button offers_navigation_prev" onClick={prevSlide}>
            <svg fill="#000000" width="18.67px" height="18.67px" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" id="arrow">
              <path d="M6.70711 2.29289C6.31658 1.90237 5.68342 1.90237 5.29289 2.29289L0.79289 6.79289C0.40237 7.18342 0.40237 7.81658 0.79289 8.20711L5.29289 12.7071C5.68342 13.0976 6.31658 13.0976 6.70711 12.7071C7.09763 12.3166 7.09763 11.6834 6.70711 11.2929L4 8.5H13.5C14.0523 8.5 14.5 8.05228 14.5 7.5C14.5 6.94772 14.0523 6.5 13.5 6.5H4L6.70711 3.70711C7.09763 3.31658 7.09763 2.68342 6.70711 2.29289Z"/>
            </svg>
          </button>
          <button className="offers_navigation_button offers_navigation_next" onClick={nextSlide}>
            <svg fill="#000000" width="18.67px" height="18.67px" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" id="arrow">
              <path d="M8.29289 2.29289C8.68342 1.90237 9.31658 1.90237 9.70711 2.29289L14.2071 6.79289C14.5976 7.18342 14.5976 7.81658 14.2071 8.20711L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L11 8.5H1.5C0.947715 8.5 0.5 8.05228 0.5 7.5C0.5 6.94772 0.947715 6.5 1.5 6.5H11L8.29289 3.70711C7.90237 3.31658 7.90237 2.68342 8.29289 2.29289Z"/>
            </svg>
          </button>
        </div>

        <div style={{
          width: '1690px', // Ширина для 2 карточек + gap
          margin: '0 auto',
          overflow: 'hidden'
        }}>
          <div className="cards-wrapper" style={{
            display: 'flex',
            gap: '50px',
            transform: `translateX(${translateX}px)`,
            transition: transition
          }}>
          {extendedCards.map((card, index) => (
            <article key={`${card.id}-${index}`} className="property-card">
              <div className="property-card__image">
                <Image 
                  src={cardExpandImg} 
                  alt="Изображение ЖК"
                  width={820}
                  height={600}
                  style={{
                    width: '100%',
                    height: '600px',
                    borderRadius: '40px',
                    transition: 'height 0.5s ease-in-out',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
                <div className="property-card__badge">
                  <span>{card.badge.developer}</span> 
                  <span>{card.badge.period}</span>
                </div>
              </div>
              <div className="property-card__content">
                <div className="property-card__row">
                  <div className="property-card__title">{card.title}</div>
                  <div className="property-card__price">{card.price}</div>
                </div>
                <div className="property-card__row">
                  <div className="property-card__subtitle">{card.subtitle}</div>
                  <div className="property-card__location">
                    <span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#666"/>
                        <circle cx="12" cy="9" r="2.5" fill="white"/>
                      </svg>
                      {card.metro}
                    </span>
                    <span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="#666"/>
                      </svg>
                      {card.driveTime}
                    </span>
                  </div>
                </div>
                <div className="property-card__divider"></div>
                
                <div className="property-card__specifications">
                  <div className="specifications">
                    {card.specifications.map((spec, specIndex) => (
                      <div key={specIndex} className="specifications__item">
                        <span className="specifications__type">{spec.type}</span>
                        <span className="specifications__price">{spec.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="property-card__actions">
                  <button className="property-card__button property-card__button_primary">Каталог</button>
                  <button className="property-card__button property-card__button_secondary">Подробнее</button>
                  <button className="property-card__favorite">
                    <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M13.1026543,2.69607267 C14.1723908,2.17246378 15.1055573,1.99999846 16.5532309,2.0000161 C20.2579495,2.01535832 23,5.13984465 23,9.11987614 C23,12.1577519 21.3061684,15.0922806 18.1511601,17.9298912 C16.4951061,19.4193443 14.3806781,20.8933233 12.866397,21.6774721 L12,22.1261233 L11.133603,21.6774721 C9.6193219,20.8933233 7.50489394,19.4193443 5.84883985,17.9298912 C2.69383159,15.0922806 1,12.1577519 1,9.11987614 C1,5.09726693 3.71643647,2 7.45454545,2 C8.85027925,2 9.83131847,2.18877527 10.9218108,2.72813403 C11.3014787,2.91591822 11.658192,3.13866136 11.9899709,3.39576047 C12.3350403,3.12339226 12.7066025,2.88992996 13.1026543,2.69607267 Z M16.8137247,16.4428585 C19.5861779,13.9493174 21,11.4998994 21,9.11987614 C21,6.18896383 19.0882067,4.01053125 16.5490834,4.00000753 C15.3870057,4.00000023 14.7458716,4.11849292 13.9819236,4.49242603 C13.5120101,4.72243676 13.095105,5.0329512 12.7314502,5.42754949 L12.0023377,6.21870239 L11.2665312,5.43377128 C10.9108757,5.05437109 10.5000057,4.75076878 10.0351348,4.52084307 C9.24812694,4.13158808 8.56428173,4 7.45454545,4 C4.88364127,4 3,6.14771812 3,9.11987614 C3,11.4998994 4.41382212,13.9493174 7.18627532,16.4428585 C8.69781928,17.8023393 10.6410383,19.1609346 12,19.8736982 C13.3589617,19.1609346 15.3021807,17.8023393 16.8137247,16.4428585 Z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
      <div className="offers_button row">
            <button className="offers_button-catalogue">Перейти в каталог</button>
      </div>
    </section>
  );
};

export default BuildingCarousel;

