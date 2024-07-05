import express from 'express'
import { PORT } from './config/config.js'
import { connectDB } from './config/db.js'
import { validateCORS } from './middlewares/middleware.js'
import videosRoutes from './routes/videos.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'

connectDB()

const app = express()

app.use(express.json())
app.use(validateCORS)
app.use('/api/videos', videosRoutes)
app.use('/api/usuarios', usuariosRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
