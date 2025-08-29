"use client"

import clsx from "clsx"

import React from "react"

import { PointType } from "@/components/map/variables/variables"

import styles from "./pointTypes.module.scss"

interface PointTypesProps {
  activePoints: PointType[]
  handlePointClick: (point: PointType) => void
}

const PointTypes = ({ activePoints, handlePointClick }: PointTypesProps) => {
  return (
    <div className={styles.pointTypes}>
      <button
        className={clsx(styles.pointTypes__item, {
          [styles.pointTypes__item_in_sale_active]: activePoints.includes(
            PointType.IN_SALE
          ),
        })}
        onClick={() => handlePointClick(PointType.IN_SALE)}
      >
        <div className={styles.pointTypes__item_circle_sale} />
        {PointType.IN_SALE}
      </button>

      <button
        className={clsx(styles.pointTypes__item, {
          [styles.pointTypes__item_announcements_active]: activePoints.includes(
            PointType.ANNOUNCEMENTS
          ),
        })}
        onClick={() => handlePointClick(PointType.ANNOUNCEMENTS)}
      >
        <div className={styles.pointTypes__item_circle_announcements} />
        {PointType.ANNOUNCEMENTS}
      </button>
    </div>
  )
}

export default PointTypes
