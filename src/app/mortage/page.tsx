import React from "react";
import styles from "./mortage.module.scss"
import ImageMortageSection from "@/components/mortageComponents/ImageMortageSection";
import Partners from "../components/partners";
import FAQ from "@/components/mortageComponents/FAQ";


const partnersData = [
  { src: "/images/partners/VTB.webp", alt: "VTB" },
  { src: "/images/partners/AlfaBank.webp", alt: "AlfaBank" },
  { src: "/images/partners/RayfayzenBank.webp", alt: "RayfayzenBank" },
  { src: "/images/partners/sber.webp", alt: "sber" },
  { src: "/images/partners/Gazprom.webp", alt: "Gazprom" },
  { src: "/images/partners/PSB.webp", alt: "PSB" },
  { src: "/images/partners/TKB.webp", alt: "TKB" },
  { src: "/images/partners/DomRf.webp", alt: "DomRf" },
  { src: "/images/partners/SovkomBank.webp", alt: "Sovkom" },
  { src: "/images/partners/UralSib.webp", alt: "UralSib" },
  { src: "/images/partners/SibirDevelopment.webp", alt: "SibirDevelopment" },
  { src: "/images/partners/Meta.webp", alt: "Meta" },
  { src: "/images/partners/ClearCoast.webp", alt: "ClearCoast" },
]

const Mortage = () => {
  return(
    <div className={styles.mortage}>
      <div className={styles.mortage__container}>
        <ImageMortageSection/>
        <Partners
          logos={partnersData}
          headingText="Наши банки-партнеры"

        />
        <FAQ/>
      </div>
    </div>
  )
}

export default Mortage