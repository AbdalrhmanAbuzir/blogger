const router = require("express").Router();
// import from controllers
const {
  getAllUsersCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  getUsersCountCtrl,
  profilePhotoUploadCtrl
} = require("../controllers/usersController");

// import form middlewares
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
} = require("../middlewares/verifyToken");

const {validateObjectId} = require("../middlewares/validateObjectId")

const photoUpload = require("../middlewares/photoUpload");


// get all users for admin 
    router.get("/profile", verifyTokenAndAdmin, getAllUsersCtrl)
// get user count
    router.get("/count", verifyTokenAndAdmin, getUsersCountCtrl)


    // get user by id, update, and delete 
    router.get("/profile/:id", validateObjectId, getUserProfileCtrl)
    router.put("/profile/:id", validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)


// TODO delete 
//   .delete(validateObjectId, verifyTokenAndAuthorization,deleteUserProfileCtrl);

// upload profile photos
    router.post("/profile/profile-photo-upload", verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl)


module.exports= router;