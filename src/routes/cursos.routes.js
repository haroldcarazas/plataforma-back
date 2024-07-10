import { Router } from 'express'
import { getById, getByUsuarioId, index } from '../controllers/cursos.controller.js'

const router = Router()

router.get('/', index)
router.get('/:id', getById)
router.get('/usuario/:id', getByUsuarioId)

export default router
