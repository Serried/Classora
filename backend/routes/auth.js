const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../lib/db');
const { handle, bad, unauthorized } = require('../lib/handler');

const router = express.Router();

router.post('/login', handle(async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return bad(res, 'กรุณาใส่ชื่อบัญชีผู้ใช้และรหัสผ่าน');

  const [rows] = await pool.query(
    'SELECT userID, username, password_hash, role, refID, status, avatar, thai_first_name, thai_last_name, gender FROM User WHERE username = ?',
    [username]
  );
  const user = rows[0];
  if (!user) return unauthorized(res, 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  if (user.status !== 'ACTIVE') return unauthorized(res, 'บัญชีนี้ถูกปิดใช้งาน');
  if (!(await bcrypt.compare(password, user.password_hash || ''))) return unauthorized(res, 'ข้อมูลไม่ถูกต้อง');

  let profile = { first_name: null, last_name: null, thai_first_name: user.thai_first_name, thai_last_name: user.thai_last_name, gender: user.gender, email: null };
  if (user.refID) {
    const ref = user.role === 'TEACHER' ? { table: 'Teacher', col: 'teacherID' } : { table: 'Student', col: 'studentID' };
    const [[r]] = await pool.query(`SELECT first_name, last_name, thai_first_name, thai_last_name, gender, email FROM ${ref.table} WHERE ${ref.col} = ?`, [user.refID]);
    if (r) profile = { ...profile, ...r };
  }

  const token = jwt.sign({ userID: user.userID, role: user.role, refID: user.refID }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ success: true, token, user: { id: user.userID, username: user.username, role: user.role, refID: user.refID, avatar: user.avatar, ...profile } });
}));

module.exports = router;
