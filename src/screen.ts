const screenSize = {
  sm: {
    unit: 'px',
    text: 335,
    box: 335,
    screen: 375
  },
  md: {
    unit: 'px',
    text: 560,
    box: 560,
    screen: 767
  },
  lg: {
    unit: 'px',
    text: 660,
    box: 720,
    screen: 1023
  },
  xl: {
    unit: 'px',
    text: 680,
    box: 780,
    screen: 1279
  }
}

export default {
  sm: screenSize.sm.screen + screenSize.sm.unit,
  md: screenSize.md.screen + screenSize.md.unit,
  lg: screenSize.lg.screen + screenSize.lg.unit,
  xl: screenSize.xl.screen + screenSize.xl.unit
}
