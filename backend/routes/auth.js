import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, provider: user.provider || 'local' },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '30d' }
  )
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      // Already registered → login instead
      const isValid = existing.passwordHash && await bcrypt.compare(password, existing.passwordHash)
      if (!isValid) {
        return res.status(409).json({ error: 'User already exists. Please login.' })
      }
      const token = generateToken(existing)
      existing.lastLoginAt = new Date()
      await existing.save()
      return res.json({
        token,
        user: {
          id: existing._id,
          email: existing.email,
          displayName: existing.displayName || name,
          provider: existing.provider || 'local'
        }
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      displayName: name,
      email,
      passwordHash,
      provider: 'local',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLoginAt: new Date()
    })

    const token = generateToken(user)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        provider: user.provider
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    user.lastLoginAt = new Date()
    await user.save()

    const token = generateToken(user)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        provider: user.provider
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
    if (!token) return res.status(401).json({ error: 'Unauthorized' })

    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    } catch {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const user = await User.findById(payload.id)
    if (!user) return res.status(404).json({ error: 'User not found' })

    res.json({
      id: user._id,
      email: user.email,
      displayName: user.displayName,
      provider: user.provider
    })
  } catch (error) {
    console.error('Me error:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

export default router
