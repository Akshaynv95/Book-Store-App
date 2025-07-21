const express = require("express");
const router = express.Router();
const verfiyToken = require("../middlewares/authMiddleware")
const authorizeRoles = require("../middlewares/roleMiddleware")
const { getUserProfile, updateUserProfile } = require("../controllers/userController");


// only admin can access this route
router.get("/admin", verfiyToken, authorizeRoles("admin"), (req,res)=>{
    res.json({message: "Welcome Admin"})
});

// only user can access this route
router.get("/user", verfiyToken, authorizeRoles("user"), (req,res)=>{
    res.json({message: "Welcome user"})
});

router.get("/:id", verfiyToken, getUserProfile);
router.put("/:id", verfiyToken, updateUserProfile);

module.exports = router;