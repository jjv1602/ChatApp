const {protect}=require('../middlewares/authMiddleware')
const express=require('express')

const router=express.Router()
const { registerUser, authUser, updateUserProfile }=require('../Controllers/userControllers')

// if user goes to api/users/ - it is register page
router.route('/register').post(registerUser);


// if user goes to api/users/login it is login page
router.route('/login').post(authUser);

router.route('/profile').put(updateUserProfile);

module.exports=router;