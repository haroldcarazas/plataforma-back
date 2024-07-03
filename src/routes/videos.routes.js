import { Router } from 'express'
import { getById, index, remove, store, update } from '../controllers/videos.controller.js'
import { validateDataVideo, validateVideoID } from '../middlewares/videos.middleware.js'
import { uploadVideos } from '../config/multer.js'

const router = Router()

router.get('/', index)
router.get('/:id', validateVideoID, getById)
router.post('/', uploadVideos.single('video'), validateDataVideo, store)
router.put('/:id', uploadVideos.single('video'), validateVideoID, validateDataVideo, update)
router.delete('/:id', validateVideoID, remove)

export default router
