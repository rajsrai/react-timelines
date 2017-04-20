import createTime from '../time'

describe('createTime', () => {
  describe('timelineWidth', () => {
    it('calculates timelineWidth from start, end and scale', () => {
      const { timelineWidth } = createTime({
        start: new Date('2017-01-01T00:00:00.000Z'),
        end: new Date('2018-01-01T00:00:00.000Z'),
        factor: 10 // 10px === 1 day
      })
      expect(timelineWidth).toBe(3650)
    })

    it('scale relates to pixel width of one day', () => {
      const newYear = new Date('2017-01-01T00:00:00.000Z')
      const newYearMidday = new Date('2017-01-01T12:00:00.000Z')
      const { timelineWidth } = createTime({
        start: newYear,
        end: newYearMidday,
        factor: 100
      })
      expect(timelineWidth).toBe(50)
    })
  })

  describe('toX()', () => {
    it('calculates correct x pixel position for given date', () => {
      const start = new Date('2017-01-01T00:00:00.000Z')
      const end = new Date('2018-01-01T00:00:00.000Z')
      const { toX } = createTime({ start, end, factor: 2 })
      const nearMiddle = new Date('2017-07-01')
      const notClamped = new Date('2020-01-01')
      expect(toX(end)).toBe(730)
      expect(toX(start)).toBe(0)
      expect(toX(nearMiddle)).toBe(362)
      expect(toX(notClamped)).toBe(2190)
    })
  })

  describe('toStyleLeft()', () => {
    it('returns style object with correct "left" property', () => {
      const start = new Date('2017-01-01T00:00:00.000Z')
      const firstOfJune = new Date('2017-06-01T12:34:56.000Z')
      const end = new Date('2018-01-01T00:00:00.000Z')
      const { toStyleLeft } = createTime({ start, end, factor: 2 })
      expect(toStyleLeft(start)).toEqual({ left: '0px' })
      expect(toStyleLeft(firstOfJune)).toEqual({ left: '303.0485185185185px' })
      expect(toStyleLeft(end)).toEqual({ left: '730px' })
    })
  })

  describe('toStyleLeftAndWidth()', () => {
    it('returns style object with correct "left" and "width" property', () => {
      const start = new Date('2017-01-01T00:00:00.000Z')
      const firstOfJune = new Date('2017-06-01T12:34:56.000Z')
      const end = new Date('2018-01-01T00:00:00.000Z')
      const { toStyleLeftAndWidth } = createTime({ start, end, factor: 2 })
      expect(toStyleLeftAndWidth(start, end)).toEqual({ left: '0px', width: '730px' })
      expect(toStyleLeftAndWidth(firstOfJune, end)).toEqual({ left: '303.0485185185185px', width: '426.9514814814815px' })
    })
  })

  describe('fromX', () => {
    it('calculates the date from a given x value', () => {
      const start = new Date('2017-01-01')
      const firstOfDecember = new Date('2017-12-01')
      const end = new Date('2018-01-01')
      const { fromX, toX } = createTime({ start, end, factor: 2 })
      expect(fromX(toX(start))).toEqual(start)
      expect(fromX(toX(firstOfDecember))).toEqual(firstOfDecember)
      expect(fromX(toX(end))).toEqual(end)
    })
  })
})
