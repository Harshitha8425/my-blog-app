const express=require('express');
const router=express.Router();
const Posts=require('../Models/PostModel.js');

const upload=require('../Middleware/upload.js');
const fs=require('fs');
const path=require('path');

router.post('/',upload.single('image'),async(req,res)=>
{
    try{
        const{title,content,author}=req.body;
        let imageUrl="";
        if(req.file){
            imageUrl=`uploads/${req.file.filename}`
        }
    const post=await Posts.create({title,author,content,imageUrl});
    res.status(201).json(post);
    }
    catch(error){
        console.log(error);
    }
})

router.get('/',async(req,res)=>{
    const posts=await Posts.find()
    res.status(201).json(posts)

})

router.put('/:id',async(req,res)=>{
    const post= await Posts.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(post)
})
router.delete('/:id',async(req,res) =>{
    await Posts.findByIdAndDelete(req.params.id);
    res.status(200).json({message:'POST DELETED SUCCESSFULLY!!'});
})

module.exports=router