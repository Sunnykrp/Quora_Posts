const express=require('express');
const {createPost,updatePost,deletePost,getAllPosts}=require('../controllers/postContoller.js');
const verifyToken=require('../middleware/authMiddleware.js');

const router=express.Router();

router.post('/create',verifyToken,createPost);
router.put('/:id',verifyToken,updatePost);
router.delete('/:id',verifyToken,deletePost);
router.get("/",verifyToken,getAllPosts);

module.exports=router;