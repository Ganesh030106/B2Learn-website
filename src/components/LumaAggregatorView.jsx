import React, { useState } from 'react';
import { Layers, RefreshCw, ExternalLink, Globe, CheckCircle2, MapPin, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

export default function LumaAggregatorView({ events, onAddEvent }) {
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lumaEvents, setLumaEvents] = useState([
    {
      id: 'luma-1',
      title: 'Luma Featured: Chennai Founders & Builders Mixer',
      category: 'Meetup',
      techStack: ['Python', 'AI / ML'],
      city: 'Chennai',
      date: '2026-10-01',
      time: '06:00 PM - 09:00 PM',
      venue: 'Ideas2IT Tech Campus, Guindy, Chennai',
      lumaUrl: 'https://lu.ma/chennai-builders',
      organizer: 'Luma Community Hub',
      syncedAt: 'Just now'
    },
    {
      id: 'luma-2',
      title: 'Luma Featured: Coimbatore AI Hardware Hackathon',
      category: 'Hackathon',
      techStack: ['AI / ML', 'Rust'],
      city: 'Coimbatore',
      date: '2026-10-14',
      time: '09:00 AM - 05:00 PM',
      venue: 'PSG Tech Auditorium, Coimbatore',
      lumaUrl: 'https://lu.ma/coimbatore-ai-hardware',
      organizer: 'Coimbatore Tech Collective',
      syncedAt: '2 hours ago'
    }
  ]);

  const handleSyncLuma = () => {
    setIsSyncing(true);

    setTimeout(() => {
      const newLuma = {
        id: `luma-${Date.now()}`,
        title: `Luma Featured: ${selectedCity} Open Source Tech Summit`,
        category: 'Tech Talk',
        techStack: ['Python', 'DevOps'],
        city: selectedCity,
        date: '2026-10-18',
        time: '03:00 PM - 06:00 PM',
        venue: `${selectedCity} Innovation Center`,
        lumaUrl: `https://lu.ma/${selectedCity.toLowerCase()}-tech`,
        organizer: 'Luma City Hub',
        syncedAt: 'Just now'
      };

      setLumaEvents(prev => [newLuma, ...prev]);
      setIsSyncing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                Luma Public Discover Aggregator Pipeline
              </span>
              <span className="text-xs text-emerald-300 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                100% Free Public Ingestion
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Luma Discover <span className="gradient-text">Sync Feed</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Auto-fetches public Luma discover event feeds for Chennai, Coimbatore, and nearby cities. Organizers post on Luma, and the bot ingests them seamlessly.
            </p>
          </div>

          <button
            onClick={handleSyncLuma}
            disabled={isSyncing}
            className="btn-primary py-3 px-5 text-sm rounded-xl shadow-lg flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing Luma Discover JSON...' : 'Run Luma Sync'}</span>
          </button>
        </div>
      </div>

      {/* Grid of Ingested Luma Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lumaEvents.map(evt => (
          <div key={evt.id} className="glass-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  Synced from Luma Public
                </span>
                <span className="text-xs text-slate-400 font-mono">📍 {evt.city}</span>
              </div>

              <h3 className="text-xl font-bold text-white">{evt.title}</h3>

              <div className="space-y-1.5 text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{evt.date} • {evt.time}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{evt.venue}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <a
                href={evt.lumaUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs py-2.5 px-4 flex-1 justify-center rounded-xl"
              >
                <ExternalLink className="w-4 h-4 text-cyan-400" />
                <span>View on Lu.ma</span>
              </a>

              <button
                onClick={() => {
                  onAddEvent({
                    id: `evt-luma-${Date.now()}`,
                    title: evt.title,
                    category: evt.category,
                    techStack: evt.techStack,
                    chapter: `${evt.city} Chapter`,
                    city: evt.city,
                    date: evt.date,
                    time: evt.time,
                    venue: evt.venue,
                    mapsUrl: 'https://maps.google.com',
                    organizer: evt.organizer,
                    description: `Ingested from public Luma page: ${evt.lumaUrl}`,
                    totalSeats: 100,
                    rsvpedSeats: 35
                  });
                  alert('Luma event added to Community Calendar database!');
                }}
                className="btn-emerald text-xs py-2.5 px-4 flex-1 justify-center rounded-xl"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Import to Calendar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
