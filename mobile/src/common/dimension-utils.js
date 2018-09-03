import { Dimensions, Platform } from 'react-native'

const { width: viewportWidth } = Dimensions.get('window')

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

const slideWidth = wp(75)
const itemHorizontalMargin = wp(2)

export const itemWidth = slideWidth + itemHorizontalMargin * 2

export function getDimensions () {
  const { width: viewportWidth } = Dimensions.get('screen')

  const slideWidth = wp(75)
  const itemHorizontalMargin = wp(2)

  const sliderWidth = viewportWidth
  const itemWidth = slideWidth + itemHorizontalMargin * 2

  return {
    sliderWidth, itemWidth
  }
}
