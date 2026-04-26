const express = require("express");
const router = express.Router();

const {
  getHistory,
  deleteHistory,
  updateHistory,
} = require("../controllers/historyController");

// ✅ GET
router.get("/", getHistory);

// ✅ DELETE
router.delete("/:id", deleteHistory);

// 🔥 UPDATE
router.put("/:id", updateHistory);

module.exports = router;