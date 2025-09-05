import Heading2 from "@/components/ui/heading2"
import styles from "./search.module.scss"
import IconImage from "@/components/ui/IconImage"

const Search = () => {
  return (
    <div className={styles.search}>
      <Heading2 className={styles.search__title}>
        Недвижимость в Новосибирске
      </Heading2>
      <div className={styles.search__content}>
        <IconImage
          iconLink="/images/icons/search.svg"
          alt="search"
          className={styles.search__content__icon}
        />
        <input
          type="text"
          placeholder="Район, метро, улица, застройщик, ЖК"
          className={styles.search__content__input}
        />
      </div>
    </div>
  )
}

export default Search
