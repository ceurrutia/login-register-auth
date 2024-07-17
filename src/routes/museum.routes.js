import { Router } from "express";
import { authRequired } from'../middlewares/validateToken.js'
import { 
    getMuseums, 
    getMuseum, 
    createMuseum, 
    updateMuseum, 
    deleteMuseum} 
    from '../controllers/museum.controller.js'

const router = Router()

router.get('/museums', authRequired, getMuseums )
router.get('/museum/:id', authRequired, getMuseum)
router.post('/museum', authRequired, createMuseum )
router.delete('/museum/:id', authRequired, deleteMuseum)
router.put('/museum/:id', authRequired, updateMuseum )

export default router