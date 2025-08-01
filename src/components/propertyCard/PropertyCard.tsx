import React from "react";
import Image from "next/image";
import CarouselComponent from "@/layouts/carouselComponent";
import DetailsButton from "../ui/buttons/DetailsButton";
import FavoriteButton from "../ui/buttons/FavoriteButton";
import CatalogButton from "../ui/buttons/CatalogButton"; 

interface Badge {
  developer: string;
  period: string;
}

interface Specification {
  type: string;
  price: string;
}

interface Property {
  title: string;
  price: string;
  subtitle: string;
  badge: Badge;
  metro: string;
  driveTime: string;
  specifications: Specification[];
}

interface IPropertyCard {
  property: Property;
  image: string;
  children?: React.ReactNode;
  itemWidth?: number;
  gap?: number;
  onCatalogClick?: () => void;
  onDetailsClick?: () => void;
  onFavoriteClick?: () => void;
}

const PropertyCard: React.FC<IPropertyCard> = ({ 
  property, 
  image, 
  children,
  itemWidth,
  gap,
  onCatalogClick,
  onDetailsClick,
  onFavoriteClick
}) => {
  const { title, price, subtitle, badge, metro, driveTime, specifications } = property;

  return (
    <article className="property-card">
      <div className="property-card__image">
        <Image
          src={image}
          alt={`Изображение ЖК ${title}`}
          width={400}
          height={300}
          className="property-card__img"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="property-card__badge">
          <span>{badge.developer}</span>
          <span>{badge.period}</span>
        </div>
      </div>
      <div className="property-card__content">
        <div className="property-card__row">
          <div className="property-card__title">{title}</div>
          <div className="property-card__price">{price}</div>
        </div>
        <div className="property-card__row">
          <div className="property-card__subtitle">{subtitle}</div>
          <div className="property-card__location">
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
        <div className="property-card__divider"></div>
        <div className="property-card__specifications">
          <div className="specifications">
            {specifications.map((spec, index) => (
              <div key={index} className="specifications__item">
                <span className="specifications__type">{spec.type}</span>
                <span className="specifications__price">{spec.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="property-card__actions">
          <CatalogButton onClick={onCatalogClick || (() => {})} />
          <DetailsButton onClick={onDetailsClick || (() => {})} />
          <FavoriteButton onClick={onFavoriteClick || (() => {})} />
        </div>
        {children}
      </div>
    </article>
  );
};

export default PropertyCard;