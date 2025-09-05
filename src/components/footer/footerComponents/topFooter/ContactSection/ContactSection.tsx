"use client";
import React, { FC, useState } from "react";
import styles from "./contactSection.module.scss";
import ContactForm from "../contactForm/ContactForm";

const ContactSection: FC = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactSection__content}>
        <h2 className={styles.contactSection__title}>
          Остались вопросы?
        </h2>
        <p className={styles.contactSection__description}>
          Оставьте свои контакты, и мы свяжемся с вами в ближайшее время, чтобы ответить на них!
        </p>
      </div>
      <ContactForm />
    </section>
  );
};

export default ContactSection;