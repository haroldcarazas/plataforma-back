import { Router } from 'express'
import { getById, index, remove, store } from '../controllers/videos.controller.js'

const router = Router()

router.get('/', index)
router.get('/:id', getById)
router.post('/', store)
router.delete('/:id', remove)

export default router
