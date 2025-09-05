"use client";
import React, { FC } from "react";
import styles from "../header.module.scss";

interface IContactInfoProps {
  phone?: string;
}

const ContactInfo: FC<IContactInfoProps> = ({ phone = "+7 999 448 46-95" }) => {
  const formattedPhone = phone.replace(/\s/g, "");

  return (
    <div className={styles.contact_info}>
      <a href={`tel:${formattedPhone}`} className={styles.contact_info__phone}>
        {phone}
      </a>
    </div>
  );
};

export default ContactInfo;