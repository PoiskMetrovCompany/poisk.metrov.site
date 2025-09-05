import React from "react"
import styles from "./partners.module.scss"
import Banner from "./components/banner"
import About from "./components/about"
import Request from "./components/request"

const PartnersPage = () => {
  return (
    <div className={styles.partners}>
      <Banner />
      <About />
      <Request />
    </div>
  )
}

export default PartnersPage
