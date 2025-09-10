import clsx from "clsx"

import React, { memo } from "react"

import styles from "../catalogueList.module.scss"

import IconImage from "@/components/ui/IconImage"
import Heading2 from "@/components/ui/heading2"
import PropertyTypeSelect from "@/components/ui/inputs/select/PropertyTypeSelect"

interface CatalogueHeaderProps {
  selectedPropertyType: string
  setSelectedPropertyType: (type: string) => void
}

export const CatalogueHeader: React.FC<CatalogueHeaderProps> = memo(
  ({ selectedPropertyType, setSelectedPropertyType }) => {
    return (
      <div className={styles.catalogue__choose}>
        <div className={styles.catalogue__choose__livingSet}>
          <Heading2>
            Подобрать{" "}
            <PropertyTypeSelect
              defaultValue={selectedPropertyType}
              onValueChange={setSelectedPropertyType}
              placeholder="Выберите тип недвижимости"
              className="inlineSelect"
            />
          </Heading2>
        </div>

        <div className={styles.catalogue__choose__favorite}>
          <IconImage
            iconLink="/images/icons/heartOrange.svg"
            alt="Сохранить поиск"
            className={styles.catalogue__choose__favorite__icon}
          />
          Сохранить поиск
        </div>
      </div>
    )
  }
)

CatalogueHeader.displayName = "CatalogueHeader"
