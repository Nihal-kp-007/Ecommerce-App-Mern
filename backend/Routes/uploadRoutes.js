import path from "path";
import multer from "multer";
import express from "express";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, flie, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
});
router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded successfully",
    image: `/${req.file.path}`,
  });
});

export default router;
