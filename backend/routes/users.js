const express = require('express');
const pool = require('../lib/db');
const { requireAuth } = require('../middleware/auth');
const { upload } = require('../utils/upload');
const { handle, bad, ok } = require('../lib/handler');

const router = express.Router();

router.post('/me/avatar', requireAuth, upload.single('avatar'), handle(async (req, res) => {
  if (!req.file) return bad(res, 'กรุณาอัพโหลดไฟล์');
  const path = `avatars/${req.file.filename}`;
  await pool.query('UPDATE User SET avatar = ? WHERE userID = ?', [path, req.user.userID]);
  ok(res, { avatar: path });
}));

module.exports = router;
