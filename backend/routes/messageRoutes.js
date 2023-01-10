const express = require("express");
const {
  allMessages,
  sendMessage,
  deleteallMessages,
} = require("../controllers/messageControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);
router.route("/deleteallMessages").delete(deleteallMessages);

module.exports = router;
