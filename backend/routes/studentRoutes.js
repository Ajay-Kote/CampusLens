const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const upload = require("../middleware/uploadMiddleware");
const { requireRole } = require("../middleware/authMiddleware");

// Student self-profile endpoints
router.get("/me", requireRole("student"), studentController.getOwnProfile);
router.put("/me", requireRole("student"), studentController.updateOwnProfile);

// Admin-only endpoints
router.get("/", requireRole("admin"), studentController.getStudents);
router.get("/:htno", requireRole("admin"), studentController.getStudentByHtno);
router.put("/:htno", requireRole("admin"), studentController.updateStudent);
router.post("/:htno/photo", requireRole("admin"), upload.single("photo"), studentController.uploadPhoto);
router.get("/:htno/idcard", requireRole("admin"), studentController.generateIdCard);

module.exports = router;
