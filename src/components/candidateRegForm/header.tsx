"use client";
import React, { FC } from "react";
import clsx from "clsx";
import Image from "next/image";

interface HeaderFormSmallProps {
  className?: string;
}

const HeaderFormSmall: FC<HeaderFormSmallProps> = ({ className }) => {
  return (
    <header className={clsx('header', className)}>
      <Image
        src="/images/candidatesSecurityImg/logoText.webp"
        alt="Картинка с логотипом агенства и подписью Поиск метров"
        width={121}
        height={42}
        priority
        className={clsx('logo-image')}
      />
    </header>
  );
};

export default HeaderFormSmall;