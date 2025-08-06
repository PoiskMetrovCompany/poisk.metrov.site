"use client";

import React, { FC } from "react";
import "../../app/globals.css"
import styles from "../../layouts/carouselComponent.module.scss";
import CatalogButton from "../ui/buttons/CatalogButton";
import DetailsButton from "../ui/buttons/DetailsButton";
import FavoriteButton from "../ui/buttons/FavoriteButton";

interface ISpecification {
  type: string;
  price: string;
}

interface IBadge {
  developer: string;
  period: string;
}

interface IProperty {
  title: string;
  price: string;
  subtitle: string;
  badge: IBadge;
  metro: string;
  driveTime: string;
  specifications: ISpecification[];
}

interface IPropertyCardProps {
  property: IProperty;
  image: string;
}

const PropertyCard: FC<IPropertyCardProps> = ({ property, image }) => {
  const { title, price, subtitle, badge, metro, driveTime, specifications } = property;

  return (
    <article className={styles['property-card']}>
      <div className={styles['property-card__image']}>
        <img src={image} alt={`Изображение ЖК ${title}`} />
        <div className={styles['property-card__badge']}>
          <span>{badge.developer}</span>
          <span>{badge.period}</span>
        </div>
      </div>
      
      <div className={styles['property-card__content']}>
        <div className={styles['property-card__row']}>
          <div className={styles['property-card__title']}>{title}</div>
          <div className={styles['property-card__price']}>{price}</div>
        </div>
        
        <div className={styles['property-card__row']}>
          <div className={styles['property-card__subtitle']}>{subtitle}</div>
          <div className={styles['property-card__location']}>
            <span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#666"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
              {metro}
            </span>
            <span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="#666"/>
              </svg>
              {driveTime}
            </span>
          </div>
        </div>
        
        <div className={styles['property-card__divider']}></div>
        
        <div className={styles['property-card__specifications']}>
          <div className={styles.specifications}>
            {specifications.map((spec, index) => (
              <div key={index} className={styles.specifications__item}>
                <span className={styles.specifications__type}>{spec.type}</span>
                <span className={styles.specifications__price}>{spec.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles['property-card__actions']}>
          <CatalogButton />
          <DetailsButton />
          <FavoriteButton />
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;