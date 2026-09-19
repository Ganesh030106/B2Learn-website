import React from 'react';
import { X, Printer, TrendingUp, Users, Smartphone, Star, BarChart3, Download, Award } from 'lucide-react';

export default function ImpactReportModal({ events, onClose }) {
  const totalEvents = events.length;
  const totalRSVPs = events.reduce((sum, e) => sum + e.rsvpedSeats, 0);
  const totalSeats = events.reduce((sum, e) => sum + e.totalSeats, 0);
  const fillRate = Math.round((totalRSVPs / totalSeats) * 100);

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Sponsor & Community Report
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2">Community Impact Analytics</h2>
            <p className="text-xs text-slate-400">Generated for Build2Learn & Regional Chapter Sponsors</p>
          </div>

          <button
            onClick={() => window.print()}
            className="btn-primary text-xs py-2 px-4 rounded-xl shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-indigo-400 mb-2">
              <Users className="w-4 h-4" />
              <span className="text-[10px] text-emerald-400 font-bold">+28% MoM</span>
            </div>
            <p className="text-2xl font-extrabold text-white">{totalRSVPs}</p>
            <p className="text-xs text-slate-400 mt-0.5">Total RSVPs Logged</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] text-emerald-400 font-bold">High</span>
            </div>
            <p className="text-2xl font-extrabold text-white">{fillRate}%</p>
            <p className="text-xs text-slate-400 mt-0.5">Capacity Fill Rate</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-cyan-400 mb-2">
              <Smartphone className="w-4 h-4" />
              <span className="text-[10px] text-cyan-400 font-bold">Twilio</span>
            </div>
            <p className="text-2xl font-extrabold text-white">98.4%</p>
            <p className="text-xs text-slate-400 mt-0.5">SMS Delivery Rate</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <Star className="w-4 h-4" />
              <span className="text-[10px] text-amber-400 font-bold">Top</span>
            </div>
            <p className="text-2xl font-extrabold text-white">4.9 / 5.0</p>
            <p className="text-xs text-slate-400 mt-0.5">Attendee Rating</p>
          </div>
        </div>

        {/* Chapter Breakdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            Chapter Turnout Breakdown
          </h3>

          <div className="space-y-2">
            {[
              { chapter: 'Chennai Chapter', percent: 85, color: 'bg-indigo-500' },
              { chapter: 'Coimbatore Chapter', percent: 100, color: 'bg-amber-500' },
              { chapter: 'Madurai Chapter', percent: 82, color: 'bg-emerald-500' },
              { chapter: 'Online Cloud Series', percent: 72, color: 'bg-cyan-500' }
            ].map(item => (
              <div key={item.chapter} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>{item.chapter}</span>
                  <span className="font-bold">{item.percent}% Turnout</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
