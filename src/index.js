import express from 'express'
import { PORT } from './config/config.js'
import { connectDB } from './config/db.js'
import { validateCORS } from './middlewares/middleware.js'
import videosRoutes from './routes/videos.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import cursosRoutes from './routes/cursos.routes.js'
import examenesRoutes from './routes/examenes.routes.js'

connectDB()

const app = express()

app.use(express.json())
app.use(validateCORS)
app.use('/api/videos', videosRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/cursos', cursosRoutes)
app.use('/api/examenes', examenesRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
