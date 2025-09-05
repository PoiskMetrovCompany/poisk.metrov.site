const getMapElementsData = (
  mapElement: HTMLElement,
  popupElement: HTMLElement,
  markerElement: HTMLElement
) => {
  const mapElementData = mapElement.getBoundingClientRect()
  const markerElementData = markerElement.getBoundingClientRect()
  const popupElementData = popupElement.getBoundingClientRect()

  const mapHalfWidth = mapElementData.width / 2
  const mapHalfHeight = mapElementData.height / 2

  const markerHeight = markerElementData.height
  const markerWidth = markerElementData.width
  const markerHalfWidth = markerWidth / 2
  const markerHalfHeight = markerHeight / 2

  const popupHeight = popupElementData.height
  const popupWidth = popupElementData.width
  const popupHalfWidth = popupElementData.width / 2
  const popupHalfHeight = popupHeight / 2

  const topSpace = markerElementData.top - mapElementData.top
  const bottomSpace =
    mapElementData.top +
    mapElementData.height -
    markerElementData.top -
    markerHeight
  const spaceAvailableAtTop = topSpace >= popupHeight
  const spaceAvailableAtBottom = bottomSpace >= popupHeight

  const leftSpace = markerElementData.left - mapElementData.left
  const rightSpace =
    mapElementData.left +
    mapElementData.width -
    markerElementData.left -
    markerWidth
  const spaceAvailableAtLeft = leftSpace >= popupWidth
  const spaceAvailableAtRight = rightSpace >= popupWidth

  const leftSpaceX = leftSpace + markerHalfWidth - popupHalfWidth
  const rightSpaceX = rightSpace + markerHalfWidth - popupHalfWidth

  const topSpaceY = topSpace - popupHalfHeight + markerHalfHeight
  const bottomSpaceY = bottomSpace - popupHalfHeight + markerHalfHeight
  const spaceAvailableAtTopY = topSpaceY >= 0
  const spaceAvailableAtBottomY = bottomSpaceY >= 0

  const leftC =
    mapElementData.left +
    mapHalfWidth -
    markerElementData.left +
    markerHalfWidth / 2 -
    popupHalfWidth / 2
  const bottomC =
    markerElementData.top -
    mapElementData.top +
    markerHeight -
    mapHalfHeight -
    popupHalfHeight

  return {
    markerHeight,
    topSpace,
    spaceAvailableAtTop,
    spaceAvailableAtBottom,
    spaceAvailableAtLeft,
    spaceAvailableAtRight,
    spaceAvailableAtTopY,
    spaceAvailableAtBottomY,
    leftSpaceX,
    rightSpaceX,
    topSpaceY,
    bottomSpaceY,
    markerHalfWidth,
    markerHalfHeight,
    popupHeight,
    popupHalfWidth,
    popupHalfHeight,
    leftC,
    bottomC,
  }
}

import { LngLatBounds } from "@yandex/ymaps3-types"

export const getBboxByCoordinates = (
  coordinates: number[][]
): LngLatBounds | undefined => {
  if (coordinates.length === 0) return

  let minLongitude = coordinates[0]?.[0]
  let minLatitude = coordinates[0]?.[1]
  let maxLongitude = coordinates[0]?.[0]
  let maxLatitude = coordinates[0]?.[1]

  for (const [longitude, latitude] of coordinates) {
    if (longitude < minLongitude) minLongitude = longitude
    if (latitude < minLatitude) minLatitude = latitude

    if (longitude > maxLongitude) maxLongitude = longitude
    if (latitude > maxLatitude) maxLatitude = latitude
  }

  return [
    [minLongitude, minLatitude],
    [maxLongitude, maxLatitude],
  ]
}

const getPopupPosition = (
  mapElement: HTMLElement,
  popupElement: HTMLElement,
  markerElement: HTMLElement
) => {
  const {
    markerHeight,
    spaceAvailableAtTop,
    spaceAvailableAtBottom,
    spaceAvailableAtLeft,
    spaceAvailableAtRight,
    spaceAvailableAtTopY,
    spaceAvailableAtBottomY,
    leftSpaceX,
    rightSpaceX,
    topSpaceY,
    bottomSpaceY,
    markerHalfWidth,
    markerHalfHeight,
    popupHalfWidth,
    popupHalfHeight,
    leftC,
    bottomC,
  } = getMapElementsData(mapElement, popupElement, markerElement)

  // Проверяем возможно ли открыть попап над/под маркером
  if (spaceAvailableAtTop || spaceAvailableAtBottom) {
    // Корректируем смещение по горизонати, если маркер близко к границе карты
    let left = 0
    if (leftSpaceX < 0) left = -leftSpaceX
    if (rightSpaceX < 0) left = rightSpaceX

    // Доступно место над маркером
    if (spaceAvailableAtTop) {
      return { left, bottom: markerHeight }
    }

    // Доступно место под маркером
    return { left, top: 0 }
  }

  // Проверяем возможно ли открыть попап слева/справа от маркера
  if (
    (spaceAvailableAtLeft || spaceAvailableAtRight) &&
    (spaceAvailableAtTopY || spaceAvailableAtBottomY)
  ) {
    let bottom = -popupHalfHeight + markerHalfHeight

    // Корректируем смещение по вертикали, если маркер близко к границе карты
    if (topSpaceY < 0) {
      bottom = bottom + topSpaceY
    } else if (bottomSpaceY < 0) {
      bottom = bottom - bottomSpaceY
    }

    // Доступно место слева от маркера
    if (spaceAvailableAtLeft) {
      const left = -popupHalfWidth - markerHalfWidth
      return { bottom, left }
    }

    // Доступно место справа от маркера
    const left = popupHalfWidth + markerHalfWidth
    return { bottom, left }
  }

  // Помещаем попап в центр карты
  return { left: leftC, bottom: bottomC }
}

export default getPopupPosition
