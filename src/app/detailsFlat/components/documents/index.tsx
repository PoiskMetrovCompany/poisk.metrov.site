import Link from "next/link"

import { IDoc } from "@/types/api/apartment"

import styles from "./documents.module.scss"

import IconImage from "@/components/ui/IconImage"
import Heading2 from "@/components/ui/heading2"

interface DocumentsProps {
  docs: IDoc[]
}

const Documents = ({ docs }: DocumentsProps) => {
  if (!docs || docs.length === 0) {
    return null
  }

  return (
    <div className={styles.documents}>
      <div className={styles.documents__header}>
        <Heading2>Разрешительная документация застройщика</Heading2>
      </div>
      <div className={styles.documents__content}>
        {docs.map((doc) => (
          <Link
            href={doc.doc_url}
            key={doc.id}
            className={styles.documents__content__item}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconImage
              iconLink="/images/icons/document.svg"
              alt="document"
              className={styles.documents__content__item__icon}
            />
            <div className={styles.documents__content__item__text}>
              {doc.doc_name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Documents
