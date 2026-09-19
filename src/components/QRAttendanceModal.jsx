import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, MapPin, Calendar as CalendarIcon, User, ShieldCheck, Download } from 'lucide-react';

export default function QRAttendanceModal({ event, attendeeName, onClose }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  if (!event) return null;

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="glass-panel w-full max-w-md p-6 relative text-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Digital Pass & QR Ticket
          </span>
          <h2 className="text-xl font-bold text-white mt-2">{event.title}</h2>
          <p className="text-xs text-slate-400 mt-1">{event.venue}</p>
        </div>

        {/* Ticket Container */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl relative space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
            <span className="text-slate-400">ATTENDEE</span>
            <span className="font-bold text-white">{attendeeName || 'Anand Kumar'}</span>
          </div>

          {/* QR Code Graphics */}
          <div className="p-4 bg-white rounded-xl inline-block shadow-inner mx-auto">
            <svg className="w-40 h-40 text-slate-950 mx-auto" viewBox="0 0 100 100">
              <rect x="10" y="10" width="25" height="25" fill="black" />
              <rect x="15" y="15" width="15" height="15" fill="white" />
              <rect x="18" y="18" width="9" height="9" fill="black" />

              <rect x="65" y="10" width="25" height="25" fill="black" />
              <rect x="70" y="15" width="15" height="15" fill="white" />
              <rect x="73" y="18" width="9" height="9" fill="black" />

              <rect x="10" y="65" width="25" height="25" fill="black" />
              <rect x="15" y="70" width="15" height="15" fill="white" />
              <rect x="18" y="73" width="9" height="9" fill="black" />

              {/* Random QR pixels */}
              <rect x="40" y="10" width="8" height="8" fill="black" />
              <rect x="48" y="25" width="8" height="8" fill="black" />
              <rect x="40" y="40" width="15" height="15" fill="black" />
              <rect x="60" y="45" width="10" height="10" fill="black" />
              <rect x="45" y="65" width="12" height="12" fill="black" />
              <rect x="65" y="65" width="25" height="8" fill="black" />
              <rect x="75" y="78" width="15" height="12" fill="black" />
            </svg>
          </div>

          {/* Ticket ID */}
          <div className="font-mono text-xs text-indigo-300 font-semibold tracking-wider">
            PASS-ID: #{event.id.toUpperCase()}-2026
          </div>

          {/* Check-In Status */}
          {isCheckedIn ? (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Checked-In at Venue! Karma Points +50</span>
            </div>
          ) : (
            <button
              onClick={() => setIsCheckedIn(true)}
              className="btn-emerald w-full py-2.5 text-xs justify-center rounded-xl"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Simulate Venue Scanner Check-In</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
