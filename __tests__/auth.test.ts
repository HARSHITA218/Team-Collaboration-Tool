import { hashPassword, verifyPassword, createToken } from '../src/lib/auth-helpers'

describe('Authentication Helpers', () => {
  it('should securely hash a password and verify it', () => {
    const password = 'mySecurePassword123'
    const hashedPassword = hashPassword(password)
    
    expect(hashedPassword).toBeDefined()
    expect(hashedPassword).not.toBe(password)
    expect(hashedPassword).toContain(':')
    
    // Valid password check
    const isValid = verifyPassword(password, hashedPassword)
    expect(isValid).toBe(true)

    // Invalid password check
    const isInvalid = verifyPassword('wrongpassword', hashedPassword)
    expect(isInvalid).toBe(false)
  })

  it('should generate a valid JWT token', () => {
    const payload = { email: 'test@test.com', id: '123' }
    const token = createToken(payload)
    
    expect(token).toBeDefined()
    const parts = token.split('.')
    expect(parts.length).toBe(3) // Header, Payload, Signature
  })
})
