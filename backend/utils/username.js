function teacherBaseUsername(first_name, last_name) {
  const f = String(first_name || '').trim().toLowerCase();
  const l = String(last_name || '').trim().toLowerCase();
  return f && l ? `${f}.${l[0]}` : null;
}

async function createTeacherUsername(pool, first_name, last_name) {
  const base = teacherBaseUsername(first_name, last_name);
  if (!base) return null;
  let uname = base;
  let n = 2;
  while (true) {
    const [[r]] = await pool.query('SELECT 1 FROM User WHERE username = ?', [uname]);
    if (!r) return uname;
    uname = base + String(n);
    n++;
  }
}

async function createStudentUsername(pool) {
  const year = new Date().getFullYear() + 543;
  const yearSuffix = String(year).substring(2, 4);
  const [rows] = await pool.query(
    "SELECT username FROM User WHERE username LIKE ? ORDER BY username DESC LIMIT 1",
    [yearSuffix + '%']
  );
  let nextNum = 1;
  if (rows.length > 0) {
    const numPart = rows[0].username.substring(2);
    nextNum = parseInt(numPart, 10) + 1;
  }
  return yearSuffix + String(nextNum).padStart(3, '0');
}

module.exports = { createStudentUsername, createTeacherUsername };
