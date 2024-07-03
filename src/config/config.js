import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/plataforma'
