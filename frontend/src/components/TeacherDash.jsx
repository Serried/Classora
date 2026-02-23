import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const ITEMS = [
  { to: '/me/schedule', title: 'ตารางสอนส่วนบุคคล', description: 'ตรวจสอบตารางสอนของรายวิชาที่รับผิดชอบในแต่ละวันและภาคเรียน', img: '/cards/teacher/ViewSchedule.jpg' },
  { to: '/me/news', title: 'ข่าวสาร / ประชาสัมพันธ์', description: 'ติดตามประกาศและข้อมูลสำคัญจากทางโรงเรียนหรือฝ่ายวิชาการ', img: '/cards/teacher/News.png' },
  { to: '/me/manage-score', title: 'จัดการคะแนนนักเรียน', description: 'บันทึก แก้ไข และตรวจสอบผลการเรียนของนักเรียนในรายวิชาที่สอน', img: '/cards/teacher/ManageScore.png' },
  { to: '/me/data', title: 'ข้อมูลส่วนบุคคล', description: 'ตรวจสอบข้อมูลส่วนบุคคล', img: '/cards/teacher/Info.jpg' },
];

const auth = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });
const name = (p) => (p?.thai_first_name || p?.thai_last_name) ? `${p.thai_first_name || ''} ${p.thai_last_name || ''}`.trim() : `${p?.first_name || ''} ${p?.last_name || ''}`.trim();

export default function TeacherDash() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    fetch('/api/me/teacher', { headers: auth() })
      .then((r) => r.json())
      .then((r) => r.success && setTeacher(r.data))
      .catch(console.error);
  }, []);

  const avatarUrl = (teacher?.avatar || user?.avatar) ? `/uploads/${teacher?.avatar || user?.avatar}` : 'https://placehold.co/80';

  const profile = (
    <>
      <div className="mt-42"><img src={avatarUrl} alt="" className="rounded-full w-3xs" /></div>
      {teacher && <p className="text-2xl font-bold mt-5">{teacher.gender === 'M' ? 'นาย' : 'นางสาว'} {name(teacher)}</p>}
      <Link to="/bug-report"><button className="mt-5 btn w-full text-white bg-[#FF842C] border-none">แจ้งปัญหา</button></Link>
    </>
  );

  return <DashboardLayout items={ITEMS} profile={profile} loading={!teacher} />;
}
