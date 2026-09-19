import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, MapPin, Users, Phone, Mail, Car, Award, Share2, Download, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export default function EventModal({ event, onClose, onRsvpSubmit, onOpenQrPass }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [carpoolType, setCarpoolType] = useState('none'); // 'none' | 'offer' | 'need'
  const [carpoolLocation, setCarpoolLocation] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  if (!event) return null;

  const handleSubmitRsvp = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);

    setTimeout(() => {
      onRsvpSubmit(event.id, {
        name,
        phone,
        email,
        carpool: carpoolType !== 'none' ? { type: carpoolType, location: carpoolLocation } : null,
        skill: selectedSkill
      });
      setIsSubmitting(false);
      setRsvpSuccess(true);
    }, 600);
  };

  // Generate .ics calendar download file
  const handleDownloadIcs = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Build2Learn//Community Event Scheduler//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.venue}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareWhatsApp = () => {
    const text = `🚀 Join us for *${event.title}* on ${event.date} at ${event.venue}.\n\nRegister & get SMS reminders here: https://b2learn.org/e/${event.id}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-workshop">{event.category}</span>
            <span className="text-xs text-slate-400 font-semibold px-2.5 py-0.5 rounded-full bg-slate-800/80">
              {event.chapter}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{event.title}</h2>
        </div>

        {/* Quick Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm">
          <div className="flex items-center gap-3 text-slate-300">
            <CalendarIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500 font-semibold">DATE & TIME</p>
              <p className="font-medium text-slate-200">{event.date} • {event.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div className="truncate">
              <p className="text-xs text-slate-500 font-semibold">VENUE</p>
              <a href={event.mapsUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-medium truncate block">
                {event.venue}
              </a>
            </div>
          </div>
        </div>

        {/* Description & Prerequisites */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">About Event</h4>
          <p className="text-slate-300 text-sm leading-relaxed">{event.description}</p>
          
          {event.prerequisites && event.prerequisites.length > 0 && (
            <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-300">
              <span className="font-bold">Prerequisites:</span> {event.prerequisites.join(' • ')}
            </div>
          )}
        </div>

        {/* Carpools Available */}
        {event.carpools && event.carpools.length > 0 && (
          <div className="space-y-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Car className="w-4 h-4 text-cyan-400" />
                Peer Carpools & Rides
              </h4>
              <span className="text-xs text-cyan-400 font-medium">{event.carpools.length} Active Ride(s)</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {event.carpools.map((cp) => (
                <div key={cp.id} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                  <span className="text-slate-200">
                    <strong className="text-cyan-300">{cp.name}</strong> ({cp.type === 'offer' ? `Offering ${cp.seats} seats` : 'Looking for ride'}) from <span className="text-slate-300">{cp.location}</span>
                  </span>
                  <span className="text-slate-400 font-mono">{cp.contact}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RSVP Form or Success State */}
        {rsvpSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-4 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <div>
              <h3 className="text-xl font-bold text-white">RSVP Confirmed!</h3>
              <p className="text-sm text-emerald-300/90 mt-1">
                A Twilio SMS confirmation has been scheduled to <span className="font-mono text-white">{phone}</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadIcs}
                className="btn-emerald text-xs py-2 px-4 rounded-xl"
              >
                <Download className="w-4 h-4" />
                Add to Calendar (.ics)
              </button>

              <button
                onClick={() => onOpenQrPass(event, name)}
                className="btn-primary text-xs py-2 px-4 rounded-xl"
              >
                <Users className="w-4 h-4" />
                View Digital Ticket Pass
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitRsvp} className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Quick RSVP & SMS Alert</span>
              <span className="text-xs text-slate-400 font-normal">No account required</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">FULL NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">PHONE NUMBER (FOR TWILIO SMS) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Carpool Preference */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-cyan-400" />
                COMMUNITY CARPOOL / RIDE SHARING
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCarpoolType('none')}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    carpoolType === 'none' ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200' : 'bg-slate-800/40 border-slate-700 text-slate-400'
                  }`}
                >
                  No Carpool
                </button>
                <button
                  type="button"
                  onClick={() => setCarpoolType('offer')}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    carpoolType === 'offer' ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200' : 'bg-slate-800/40 border-slate-700 text-slate-400'
                  }`}
                >
                  Offer Ride
                </button>
                <button
                  type="button"
                  onClick={() => setCarpoolType('need')}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    carpoolType === 'need' ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200' : 'bg-slate-800/40 border-slate-700 text-slate-400'
                  }`}
                >
                  Need Ride
                </button>
              </div>

              {carpoolType !== 'none' && (
                <input
                  type="text"
                  placeholder="Your pickup area (e.g. Velachery / Peelamedu)"
                  value={carpoolLocation}
                  onChange={(e) => setCarpoolLocation(e.target.value)}
                  className="w-full mt-2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="btn-secondary text-xs py-2.5 px-3 rounded-xl"
                  title="Share on WhatsApp"
                >
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="btn-secondary text-xs py-2.5 px-3 rounded-xl"
                  title="Download .ics file"
                >
                  <Download className="w-4 h-4 text-indigo-400" />
                  <span>.ics Calendar</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary text-xs py-2.5 px-6 rounded-xl"
              >
                {isSubmitting ? 'Confirming RSVP...' : 'Confirm RSVP & Schedule SMS'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
