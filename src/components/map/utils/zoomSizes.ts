export interface ZoomSizes {
  dot: number
  wrapper: number
  markerH: number
  labelFs: number
  padX: number
  padY: number
}

export const getSizesByZoom = (zoom: number): ZoomSizes => {
  if (zoom >= 19) {
    return {
      dot: 14,
      wrapper: 22,
      markerH: 36,
      labelFs: 16,
      padX: 12,
      padY: 5,
    }
  }
  if (zoom >= 17) {
    return {
      dot: 12,
      wrapper: 20,
      markerH: 34,
      labelFs: 16,
      padX: 12,
      padY: 4,
    }
  }
  if (zoom >= 15) {
    return {
      dot: 11,
      wrapper: 18,
      markerH: 32,
      labelFs: 15,
      padX: 12,
      padY: 4,
    }
  }
  if (zoom >= 14) {
    return {
      dot: 10,
      wrapper: 16,
      markerH: 28,
      labelFs: 16,
      padX: 12,
      padY: 4,
    }
  }
  if (zoom >= 13) {
    return {
      dot: 9,
      wrapper: 15,
      markerH: 26,
      labelFs: 16,
      padX: 12,
      padY: 4,
    }
  }
  if (zoom >= 12) {
    return {
      dot: 12,
      wrapper: 14,
      markerH: 32,
      labelFs: 13,
      padX: 12,
      padY: 4,
    }
  }
  if (zoom >= 11) {
    return {
      dot: 7,
      wrapper: 13,
      markerH: 22,
      labelFs: 11,
      padX: 6,
      padY: 2,
    }
  }
  if (zoom >= 10) {
    return {
      dot: 6,
      wrapper: 12,
      markerH: 20,
      labelFs: 10,
      padX: 6,
      padY: 2,
    }
  }
  return {
    dot: 5,
    wrapper: 10,
    markerH: 18,
    labelFs: 10,
    padX: 6,
    padY: 2,
  }
}
