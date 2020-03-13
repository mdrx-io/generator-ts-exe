import app from './app'

describe('general functionality', () => {
  it('should just work', () => {
    expect(false).toBe(true)
  })

  it('returns a module with "Hello, World!"', () => {
    expect(app.logString).toBe('Hello, World!')
  })
})
