import React from "react"
import styles from "./header.module.scss"
import Image from "next/image"

const Header = () => {
  return (
    <header className={styles.header}>
      {/* <div className={styles.header__container}>
        <div className={styles.header__top}>
          <div className={styles.header__top__location}>
            <Image src="/images/icons/logo.svg" alt="logo" width={100} height={100} />
            Новосибирск
          </div>
          <div className={styles.header__top__location}>
            <Image src="/images/icons/logo.svg" alt="logo" width={100} height={100} />
            Новосибирск
          </div>
        </div>
      </div> */}
    </header>
  )
}

export default Header
