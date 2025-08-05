import styles from "./documents.module.scss"
import Heading2 from "@/components/ui/heading2"
import Image from "next/image"
import Link from "next/link"

const Documents = () => {
  return (
    <div className={styles.documents}>
      <div className={styles.documents__header}>
        <Heading2>Разрешительная документация застройщика</Heading2>
      </div>
      <div className={styles.documents__content}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Link
            href="/"
            key={index}
            className={styles.documents__content__item}
          >
            <div className={styles.documents__content__item__icon}>
              <Image src="/images/icons/document.svg" alt="icon" fill />
            </div>
            <div className={styles.documents__content__item__text}>
              Проектная декларация (Эскроу)
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Documents
