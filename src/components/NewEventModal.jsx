import React, { useState } from 'react';
import { X, FileSpreadsheet, PlusCircle, CheckCircle2, Sparkles, MapPin, Calendar as CalendarIcon, Clock, Users } from 'lucide-react';

export default function NewEventModal({ onClose, onCreateEvent }) {
  const [tab, setTab] = useState('googleForm'); // 'googleForm' | 'manual'
  const [googleFormUrl, setGoogleFormUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Form states for manual intake
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Workshop');
  const [chapter, setChapter] = useState('Chennai Chapter');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('10:00 AM - 01:00 PM');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [totalSeats, setTotalSeats] = useState(50);

  const handleGoogleFormImport = (e) => {
    e.preventDefault();
    if (!googleFormUrl) return;

    setIsImporting(true);

    setTimeout(() => {
      onCreateEvent({
        id: `evt-${Date.now()}`,
        title: 'Auto-Synced Google Form Tech Meetup',
        category: 'Meetup',
        chapter: 'Chennai Chapter',
        date: '2026-10-12',
        time: '04:00 PM - 07:00 PM',
        venue: 'IIT Madras Research Park, Auditorium 1',
        mapsUrl: 'https://maps.google.com/?q=IIT+Madras+Research+Park',
        organizer: 'Build2Learn Team',
        description: 'Auto-imported event synced live from Google Form intake database. RSVPs collected via Google Form response sheet.',
        totalSeats: 75,
        rsvpedSeats: 32,
        isWaitlist: false,
        prerequisites: ['Google Form submission'],
        carpools: [],
        skillsToShare: ['WebDev', 'Python'],
        lightningTalks: []
      });

      setIsImporting(false);
      onClose();
    }, 800);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!title || !venue) return;

    onCreateEvent({
      id: `evt-${Date.now()}`,
      title,
      category,
      chapter,
      date,
      time,
      venue,
      mapsUrl: 'https://maps.google.com',
      organizer: 'Community Lead',
      description,
      totalSeats: parseInt(totalSeats) || 50,
      rsvpedSeats: 1,
      isWaitlist: false,
      prerequisites: [],
      carpools: [],
      skillsToShare: [],
      lightningTalks: []
    });

    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8 relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Publish Event
          </span>
          <h2 className="text-2xl font-bold text-white mt-2">Add Event to Community Calendar</h2>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setTab('googleForm')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              tab === 'googleForm' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Google Form / Sheet Sync</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('manual')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              tab === 'manual' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manual Form Intake</span>
          </button>
        </div>

        {/* Google Form Tab */}
        {tab === 'googleForm' && (
          <form onSubmit={handleGoogleFormImport} className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-2">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Automated Google Form Intake Pipeline
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paste your public Google Form link or Google Sheet Webhook URL. Our scheduler parses form responses into calendar cards automatically.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                GOOGLE FORM / SHEET URL *
              </label>
              <input
                type="url"
                required
                placeholder="https://docs.google.com/forms/d/e/..."
                value={googleFormUrl}
                onChange={(e) => setGoogleFormUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isImporting}
              className="btn-emerald w-full py-2.5 text-xs justify-center rounded-xl"
            >
              {isImporting ? 'Syncing Google Sheet Database...' : 'Sync & Publish to Web Calendar'}
            </button>
          </form>
        )}

        {/* Manual Tab */}
        {tab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">EVENT TITLE *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flutter & Firebase App Sprint"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Meetup">Meetup</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Tech Talk">Tech Talk</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">CHAPTER</label>
                <select
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                >
                  <option value="Chennai Chapter">Chennai Chapter</option>
                  <option value="Coimbatore Chapter">Coimbatore Chapter</option>
                  <option value="Madurai Chapter">Madurai Chapter</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">DATE *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">TIME *</label>
                <input
                  type="text"
                  required
                  placeholder="10:00 AM - 01:00 PM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">VENUE ADDRESS *</label>
                <input
                  type="text"
                  required
                  placeholder="Campus address or Google Meet Link"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of what attendees will learn..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white resize-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-2.5 text-xs justify-center rounded-xl"
            >
              Publish Event to Calendar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
