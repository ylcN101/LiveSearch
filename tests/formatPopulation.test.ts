import { formatPopulation } from '../utils/utils'

describe('formatPopulation', () => {
  it('formats thousands correctly', () => {
    expect(formatPopulation(1500)).toBe('1.5K')
  })

  it('formats millions correctly', () => {
    expect(formatPopulation(2000000)).toBe('2.0M')
  })

  it('formats billions correctly', () => {
    expect(formatPopulation(3000000000)).toBe('3.0B')
  })

  it('handles numbers less than 1000 correctly', () => {
    expect(formatPopulation(999)).toBe('999')
  })
})
