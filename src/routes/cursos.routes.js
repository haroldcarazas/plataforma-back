import { Router } from 'express'
import { getById, index } from '../controllers/cursos.controller.js'

const router = Router()

router.get('/', index)
router.get('/:id', getById)

export default router
