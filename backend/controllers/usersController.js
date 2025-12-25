const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const path= require("path")
const {cloudinaryUploadImage, cloudinaryRemoveImage} = require("../utils/cloudinary")



/**-----------------------------------------------
 * @desc    Get All Users Profile
 * @route   /api/users/profile
 * @method  GET
 * @access  private (only admin)
------------------------------------------------*/
module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});



/**-----------------------------------------------
 * @desc    Get User Profile by id 
 * @route   /api/users/profile:id
 * @method  GET
 * @access  public
------------------------------------------------*/
module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").populate("posts");;
  
  if(!user){
      return res.status(404).json({ message: "user not found" })
    }
    
    return res.status(200).json(user);
});



/**-----------------------------------------------
 * @desc    update User Profile by id 
 * @route   /api/users/profile:id
 * @method  PUT
 * @access  public
------------------------------------------------*/
module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
    
    const {error} = validateUpdateUser(req.body)
    if (error){
        return res.status(400).json({ message: error.details[0].message });
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio,
        }
    },{new:true}).select("-password");
    
    return res.status(200).json(updateUser);
});


/**-----------------------------------------------
 * @desc    Get Users Count
 * @route   /api/users/count
 * @method  GET
 * @access  private (only admin)
 ------------------------------------------------*/
module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});



/**-----------------------------------------------
 * @desc    profile photo upload
 * @route    /api/users/profile/profile-photo-upload
 * @method  POST
 * @access  private (only user himself)
------------------------------------------------*/
module.exports.profilePhotoUploadCtrl  = asyncHandler(async (req, res) => {
    // 1. Validation
    if(!req.file){
        return res.status(400).json({message: "no file provided"})
    }
    
     // 2. Get the path to the image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  // 3. Upload to cloudinary
    const result = await cloudinaryUploadImage(imagePath);

  // 4. Get the user from DB
    const user = await User.findById(req.user.id);

  // 5. Delete the old profile photo if exist
    if (user.profilePhoto?.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }

  // 6. Change the profilePhoto field in the DB
    user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
    };
    await user.save();

  // 7. Send response to client
    res.status(200).json({
    message: "your profile photo uploaded successfully",
    profilePhoto: { url: result.secure_url, publicId: result.public_id },
    });

  // 8. Remvoe image from the server
    fs.unlinkSync(imagePath);


});


/**-----------------------------------------------
 * @desc    profile photo upload
 * @route    /api/users/profile/profile-photo-upload
 * @method  delete
 * @access  private (only user himself)
------------------------------------------------*/

// TODO Add delete profile controller 