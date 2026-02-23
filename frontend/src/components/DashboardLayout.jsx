import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { useServerTime } from '../hooks/useServerTime';

const DashCard = ({ to, title, description, img }) => (
  <Link to={to} className="block w-full h-full">
    <div className="w-full h-full overflow-hidden border border-[#ddd] shadow-xl/30 rounded-xl bg-white">
      <img src={img} alt="" className="w-full h-48 object-cover object-center" />
      <div className="p-4">
        <h5 className="text-lg font-bold">{title}</h5>
        <p className="text-md mb-10">{description}</p>
      </div>
    </div>
  </Link>
);

export default function DashboardLayout({ items, profile, loading, error }) {
  const { clientTime, serverTime, formatTime } = useServerTime();

  return (
    <>
      <NavBar />
      {loading ? <p className="p-4">{error ? <span className="text-red-600">{error}</span> : 'กำลังโหลด...'}</p> : (
      <div className="flex min-h-screen w-full gap-6 bg-gray-100">
        <div className="w-1/5 bg-white border border-[#ddd] rounded-xl p-5">
          <p>เวลาของคุณ: <strong>{formatTime(clientTime)}</strong></p>
          <p>เวลาของเซิร์ฟเวอร์: <strong>{formatTime(serverTime)}</strong></p>
        </div>
        <div className="w-3/5 min-w-0 grid grid-cols-2 p-6 gap-6 content-start">
          {items.map((item, i) => (
            <div key={i} className={items.length % 2 && i === items.length - 1 ? 'col-span-2' : ''}>
              <DashCard {...item} />
            </div>
          ))}
        </div>
        <div className="w-1/5 bg-white border border-[#ddd] rounded-xl flex flex-col items-center justify-start">{profile}</div>
      </div>
      )}
    </>
  );
}
