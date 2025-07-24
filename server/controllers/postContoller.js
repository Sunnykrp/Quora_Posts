const Post=require('../models/post');

exports.createPost=async(req,res)=>{
    const {title,content}=req.body;
    try{
        const post=new Post({title,content,user:req.user.id});
        await post.save();
        res.status(201).json({message:"Post Created",post});
    }catch(error){
        res.status(500).json({message:"Failed to create post"});
    }
};

exports.updatePost=async(req,res)=>{
   try{
    const post=await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({message:"Post not found"})
    }
    const {title,content}=req.body;
    if(title){
        post.title=title;
    }
    if(content){
        post.content=content;
    }
     await post.save();
     res.status(200).json({message:"Post updated Successfully"});
   }
   catch(err){
    console.log(err);
    res.status(500).json({message:"Internal server error"})
   }
};
exports.deletePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.user.toString()!==req.userId){
            return res.status(403).json({message:"Unauthorized"});
        }
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Post deleted"});
    }catch(error){
        res.status(500).json({message:"Failed to delete post"});
    }
};
exports.getAllPosts=async(req,res)=>{
    try{
        const posts=await Post.find().populate("user","name");
        res.json(posts);
    }catch(err){
        res.status(500).json({message:"Failed to fetch posts"});
    }
};
