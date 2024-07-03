import mongoose from 'mongoose'
import { MONGO_URL } from './config.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Conectado a la base de datos')
  } catch (error) {
    console.log('No se pudo conectar a la base de datos:', error)
  }
}
