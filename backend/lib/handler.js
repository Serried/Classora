const yt = () => ({ year: new Date().getFullYear() + 543, term: 1 });

const handle = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res)).catch((e) => {
    console.error(e);
    res.status(500).json({ success: false, message: e.message || 'เกิดข้อผิดพลาด' });
  });

const bad = (res, msg) => res.status(400).json({ success: false, message: msg });
const unauthorized = (res, msg = 'ไม่ได้รับอนุญาต') => res.status(401).json({ success: false, message: msg });
const forbidden = (res, msg) => res.status(403).json({ success: false, message: msg });
const notFound = (res, msg = 'ไม่พบข้อมูล') => res.status(404).json({ success: false, message: msg });
const ok = (res, data, message) => res.json({ success: true, ...(data !== undefined && { data }), ...(message && { message }) });

module.exports = { handle, yt, bad, unauthorized, forbidden, notFound, ok };
