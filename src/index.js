import express from 'express'
import { PORT } from './config/config.js'
import videosRoutes from './routes/videos.routes.js'
import { connectDB } from './config/db.js'

connectDB()

const app = express()

app.use(express.json())
app.use('/api/videos', videosRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
