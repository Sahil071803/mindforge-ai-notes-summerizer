const History = require("../models/History");

// ✅ GET
const getHistory = async (req, res) => {
  try {
    const data = await History.find().sort({ createdAt: -1 });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ DELETE
const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    await History.findByIdAndDelete(id);

    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🔥 UPDATE
const updateHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, summary } = req.body;

    const updated = await History.findByIdAndUpdate(
      id,
      { text, summary },
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getHistory, deleteHistory, updateHistory };