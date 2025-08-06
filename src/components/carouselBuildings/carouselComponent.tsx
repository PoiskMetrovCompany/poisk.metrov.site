"use client";

import React, { useEffect, useState, FC } from "react";
import styles from "./carouselComponent.module.scss";

interface ICarouselProps {
  children: React.ReactNode;
  itemWidth?: number;
  gap?: number;
}

const CarouselComponent: FC<ICarouselProps> = ({ children, itemWidth = 870, gap = 50 }) => {
  const [translateX, setTranslateX] = useState<number>(0);
  const [transition, setTransition] = useState<string>('transform 0.5s ease-in-out');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const items: React.ReactElement[] = React.Children.toArray(children) as React.ReactElement[];
  const itemsCount: number = items.length;
  
  const extendedItems: React.ReactElement[] = [
    items[itemsCount - 2],
    items[itemsCount - 1],
    ...items,
    items[0],
    items[1]
  ];

  const cardWidth: number = itemWidth + gap;
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
      if (direction === 'next' && newTranslateX <= -cardWidth * (itemsCount + 2)) {
        setTransition('none');
        setTranslateX(initialOffset);
        setTimeout(() => {
          setTransition('transform 0.5s ease-in-out');
          setIsAnimating(false);
        }, 50);
      } else if (direction === 'prev' && newTranslateX >= 0) {
        setTransition('none');
        setTranslateX(-cardWidth * itemsCount);
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
    <div className={styles.carousel}>
      <div className={styles.carousel__navigation}>
        <button className={`${styles.carousel__button} ${styles['carousel__button--prev']}`} onClick={prevSlide}>
          <svg fill="#000000" width="18.67px" height="18.67px" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" id="arrow">
            <path d="M6.70711 2.29289C6.31658 1.90237 5.68342 1.90237 5.29289 2.29289L0.79289 6.79289C0.40237 7.18342 0.40237 7.81658 0.79289 8.20711L5.29289 12.7071C5.68342 13.0976 6.31658 13.0976 6.70711 12.7071C7.09763 12.3166 7.09763 11.6834 6.70711 11.2929L4 8.5H13.5C14.0523 8.5 14.5 8.05228 14.5 7.5C14.5 6.94772 14.0523 6.5 13.5 6.5H4L6.70711 3.70711C7.09763 3.31658 7.09763 2.68342 6.70711 2.29289Z"/>
          </svg>
        </button>
        <button className={`${styles.carousel__button} ${styles['carousel__button--next']}`} onClick={nextSlide}>
          <svg fill="#000000" width="18.67px" height="18.67px" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" id="arrow">
            <path d="M8.29289 2.29289C8.68342 1.90237 9.31658 1.90237 9.70711 2.29289L14.2071 6.79289C14.5976 7.18342 14.5976 7.81658 14.2071 8.20711L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L11 8.5H1.5C0.947715 8.5 0.5 8.05228 0.5 7.5C0.5 6.94772 0.947715 6.5 1.5 6.5H11L8.29289 3.70711C7.90237 3.31658 7.90237 2.68342 8.29289 2.29289Z"/>
          </svg>
        </button>
      </div>
      
      <div className={styles.carousel__viewport} style={{ width: '1690px', margin: '0 auto', overflow: 'hidden' }}>
        <div
          className={styles.carousel__track}
          style={{
            display: 'flex',
            gap: `${gap}px`,
            transform: `translateX(${translateX}px)`,
            transition: transition
          }}
        >
          {extendedItems.map((item, index) => (
            <div key={index} className={styles.carousel__item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;