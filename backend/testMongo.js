import 'dotenv/config'
import mongoose from 'mongoose'

async function main() {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error('MONGODB_URI is not set')
    }
    console.log('Attempting connection to MongoDB Atlas...')

    // Mask password for logging
    const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
    console.log('URI being used:', maskedUri);

    // Parse logic to check auth source (basic check)
    if (uri.includes('mongodb+srv')) {
      console.log('Connection Type: SRV (Atlas/Cluster)');
    } else {
      console.log('Connection Type: Standard');
    }

    if (!uri.includes('authSource')) {
      console.log('⚠️ Warning: "authSource" is missing in URI. If your user is in "admin", consider adding "&authSource=admin" or "?authSource=admin"');
    }

    await mongoose.connect(uri)
    console.log('✅ Connected to MongoDB Atlas')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
  } finally {
    await mongoose.disconnect().catch(() => { })
    process.exit(0)
  }
}

main()
