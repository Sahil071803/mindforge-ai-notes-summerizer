const fs = require("fs");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, "utf-8");

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      },
      content: fileContent,
    });
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({
      success: false,
      message: "File upload failed",
      error: error.message,
    });
  }
};

module.exports = { uploadFile };