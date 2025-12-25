const router = require("express").Router();

const {createCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl} = require("../controllers/commentsController");
const {
    verifyToken,
    verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const { validateObjectId } = require("../middlewares/validateObjectId");

// /api/comments
router
    .route("/")
    .post(verifyToken, createCommentCtrl)
    .get(verifyTokenAndAdmin, getAllCommentsCtrl);


    // router.route("/:id")
    // .delete(validateObjectId, verifyToken, deleteCommentCtrl)
    // .put(validateObjectId, verifyToken, updateCommentCtrl);
    
    
    // /api/comments/:id
    router.delete("/:id", validateObjectId, verifyToken, deleteCommentCtrl)
    router.put("/:id", validateObjectId, verifyToken, updateCommentCtrl)

module.exports = router;






