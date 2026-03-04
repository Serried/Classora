import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { useServerTime } from '../hooks/useServerTime';
import { useState } from 'react';

const DashCard = ({ to, title, description, img }) => (
  <Link to={to} className="block w-full h-full">
    <div className="w-full h-full overflow-hidden border border-[#ddd] shadow-xl/30 rounded-xl bg-white">
      <img src={img} alt="" className="w-full h-36 sm:h-48 object-cover object-center" />
      <div className="p-3 sm:p-4">
        <h5 className="text-base sm:text-lg font-bold">{title}</h5>
        <p className="text-sm sm:text-md mb-6 sm:mb-10">{description}</p>
      </div>
    </div>
  </Link>
);

export default function DashboardLayout({ items, profile, loading, error }) {
  const { clientTime, serverTime, formatTime } = useServerTime();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <NavBar />

      {loading ? (
        <p className="p-4">
          {error ? <span className="text-red-600">{error}</span> : 'กำลังโหลด...'}
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row min-h-screen w-full gap-4 lg:gap-6 bg-gray-100 p-3 sm:p-4 lg:p-6">

          {/* Left sidebar - time display */}
          <div className="w-full lg:w-1/5 bg-white border border-[#ddd] rounded-xl p-4 lg:p-5 flex flex-row lg:flex-col gap-4 lg:gap-2 justify-around lg:justify-start">
            <p className="text-sm lg:text-base">
              เวลาของคุณ: <strong className="block sm:inline">{formatTime(clientTime)}</strong>
            </p>
            <p className="text-sm lg:text-base">
              เวลาของเซิร์ฟเวอร์: <strong className="block sm:inline">{formatTime(serverTime)}</strong>
            </p>
          </div>

          {/* Main content grid */}
          <div className="w-full lg:w-3/5 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 content-start">
            {items.map((item, i) => (
              <div
                key={i}
                className={items.length % 2 !== 0 && i === items.length - 1 ? 'col-span-1 sm:col-span-2' : ''}
              >
                <DashCard {...item} />
              </div>
            ))}
          </div>

          {/* Right sidebar - profile */}
          {/* Mobile: toggle button */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-full bg-white border border-[#ddd] rounded-xl p-3 text-sm font-semibold text-gray-600"
            >
              {showProfile ? '▲ ซ่อนโปรไฟล์' : '▼ แสดงโปรไฟล์'}
            </button>
            {showProfile && (
              <div className="mt-2 bg-white border border-[#ddd] rounded-xl flex flex-col items-center justify-start p-4">
                {profile}
              </div>
            )}
          </div>

          {/* Desktop: always visible */}
          <div className="hidden lg:flex w-1/5 bg-white border border-[#ddd] rounded-xl flex-col items-center justify-start">
            {profile}
          </div>

        </div>
      )}
    </>
  );
}