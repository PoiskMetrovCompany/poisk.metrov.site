"use client"
import React, {FC} from "react";
import styles from "./getYourDreamFlat.module.scss"
import LeftSide from "./leftSide";
import RightSide from "./rightSide";

import Image from "next/image";
import clsx from "clsx";

const GetYourDreamFlat:FC = () => {
    return(
        <div className={styles.dreamFlat}>
            <div className={styles.dreamFlat__container}>
                <Image
                    src={"./images/backgrounds/selection.svg"}
                    alt="Задний фон"
                    width={600}
                    height={600}
                    className={clsx(styles.dreamFlat__backImg)}
                />
                <div className={styles.dreamFlat__leftSide}>
                    <LeftSide />
                </div>
                <div className={styles.dreamFlat__rightSide}>
                    <RightSide />
                </div>
            </div>
        </div>
    )
}

export default GetYourDreamFlat