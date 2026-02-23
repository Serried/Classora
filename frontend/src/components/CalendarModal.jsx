import { useState } from "react";

export default function CalendarModal({ value, onClose, onSelect }) {

  const today = new Date();

  const [month, setMonth] = useState(
    value?.getMonth() ?? today.getMonth()
  );

  const [year, setYear] = useState(
    value?.getFullYear() ?? today.getFullYear()
  );

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="modal modal-open">

      <div className="modal-box max-w-sm">

        <div className="flex justify-between mb-4">

          <select
            value={month}
            onChange={e => setMonth(+e.target.value)}
            className="border px-2 rounded-lg"
          >
            {[
              'ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย',
              'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พ.ย', 'ธ.ค'
            ].map((m, i) =>
              <option key={i} value={i}>{m}</option>
            )}
          </select>

          <select
            value={year}
            onChange={e => setYear(+e.target.value)}
            className="rounded-lg border px-2"
          >
            {Array.from({ length: 100 }, (_, i) => today.getFullYear() - i)
              .map(y =>
                <option key={y} value={y}>
                  {y + 543}
                </option>
              )}
          </select>

        </div>

        <div className="grid grid-cols-7 gap-1 text-center">

          {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
            .map(d =>
              <div key={d} className="font-bold">
                {d}
              </div>
            )}

          {blanks.map((_, i) =>
            <div key={"b" + i} />
          )}

          {days.map(d =>
            <button
              key={d}
              onClick={() => {
                onSelect(new Date(year, month, d));
                onClose();
              }}
              className="p-2 hover:bg-orange-200 rounded"
            >
              {d}
            </button>
          )}

        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            ยกเลิก
          </button>
        </div>

      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}