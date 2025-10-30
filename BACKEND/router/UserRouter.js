const express=require('express');
const User=require('../Models/UserModel.js');
const router= express.Router();
const asyncHandler=require('express-async-handler')

router.post('/submit-form',asyncHandler(async(req,res)=>
{
    const newUser= new User (
      {
        name:req.body.name,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        Age:req.body.Age,
        Gender:req.body.Gender,
        Date:req.body.Date
      }
    )
    await newUser.save();
    res.status(201).json(
      {
        message:`Thank You, ${req.body.name}.Your Data Is Recieved`
      }
    )
  
    console.log('The error in the api is',err)
    res.status(500).json({message:'Failed to save the data'}) 
}))

router.get('/',asyncHandler(async(req,res)=> {
    const users =await User.find();
    res.status(200).json(users);
  
}) )

router.delete('/:id',asyncHandler(async(req,res)=>
{
   const deletedUser = await User.findByIdAndDelete(req.params.id);
   if(!deletedUser)
   {
    return res.status(404).json({message:'user Not Found'})
   }
   else 
   {
    res.status(200).json({message:'user Deleted Successfully'})
   }
}))

router.put('/:id',asyncHandler(async(req,res) =>
{
  
    const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!updateUser)
    {
      return res.status(404).json({message:'User Not Find'})
    }
    return res.status(200).json({message:'User Updated Successfully',user: updateUser})
  

}))

module.exports=router
