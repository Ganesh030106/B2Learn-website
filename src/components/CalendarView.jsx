import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, Clock, Filter, PlusCircle, Search, ArrowRight, Share2, CheckCircle2, Code2, Navigation } from 'lucide-react';

export default function CalendarView({ events, selectedChapter, setSelectedChapter, onSelectEvent, onOpenNewEventModal }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'month'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTechStack, setSelectedTechStack] = useState('All Tech');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Workshop', 'Meetup', 'Hackathon', 'Tech Talk'];
  const techStacks = ['All Tech', 'Python', 'AI / ML', 'React / Web', 'Rust', 'DevOps', 'Mobile'];
  const cities = ['All Cities', 'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Online'];

  // Filter events by Category, Tech Stack, City, and Search Query
  const filteredEvents = events.filter(evt => {
    const matchesChapter = selectedChapter === 'All Chapters' || evt.chapter === selectedChapter;
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
    
    // Tech Stack Filter (e.g. Python)
    const matchesTech = selectedTechStack === 'All Tech' || (evt.techStack && evt.techStack.includes(selectedTechStack));
    
    // City Filter
    const matchesCity = selectedCity === 'All Cities' || evt.city === selectedCity;

    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (evt.techStack && evt.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesChapter && matchesCategory && matchesTech && matchesCity && matchesSearch;
  });

  const getBadgeClass = (category) => {
    switch (category) {
      case 'Workshop': return 'badge-workshop';
      case 'Hackathon': return 'badge-hackathon';
      case 'Meetup': return 'badge-meetup';
      case 'Tech Talk': return 'badge-techtalk';
      default: return 'badge-workshop';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Hero Banner */}
      <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                Build2Learn & TN Tech Network
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Twilio SMS Active
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Community Event <span className="gradient-text">Scheduler</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Frictionless event discovery, Google Form integration, automated SMS reminders, Python & tech tag search, and city proximity filters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewEventModal}
              className="btn-primary py-3 px-5 text-sm rounded-xl shadow-lg"
            >
              <PlusCircle className="w-4 h-4" />
              Submit Google Form Event
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar (Search, Nearby City Selector, Chapter Selector, View Mode) */}
      <div className="glass-panel p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Python, AI, React, event title, or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Nearby City Location Selector */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/60 rounded-xl px-3 py-1.5 text-sm">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-slate-200 text-sm font-medium focus:outline-none cursor-pointer"
            >
              {cities.map(c => (
                <option key={c} value={c} className="bg-slate-900 text-slate-200">
                  {c === 'All Cities' ? '📍 All Nearby Cities' : `📍 ${c}`}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Selector */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/60 rounded-xl px-3 py-1.5 text-sm">
            <Filter className="w-4 h-4 text-indigo-400" />
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="bg-transparent text-slate-200 text-sm font-medium focus:outline-none cursor-pointer"
            >
              {['All Chapters', 'Chennai Chapter', 'Coimbatore Chapter', 'Madurai Chapter', 'Online'].map(ch => (
                <option key={ch} value={ch} className="bg-slate-900 text-slate-200">{ch}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900/80 border border-slate-700/60 rounded-xl p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'month' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Month View
            </button>
          </div>
        </div>
      </div>

      {/* Tech Stack Pills (Python, AI, React, Rust, DevOps, Mobile) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Filter by Technology / Topic:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {techStacks.map(tech => (
            <button
              key={tech}
              onClick={() => setSelectedTechStack(tech)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedTechStack === tech
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 border-indigo-400 text-white shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {tech === 'Python' ? '🐍 Python' : tech}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {cat} {cat === 'All' ? `(${events.length})` : ''}
          </button>
        ))}
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full glass-panel p-12 text-center text-slate-400">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-slate-600" />
              <h3 className="text-lg font-semibold text-white">No events match your current filter</h3>
              <p className="text-sm mt-1">Try selecting a different tech stack (e.g. Python) or clear search.</p>
              <button
                onClick={() => { setSelectedTechStack('All Tech'); setSelectedCategory('All'); setSelectedCity('All Cities'); setSearchQuery(''); }}
                className="btn-secondary text-xs mt-4 py-2 px-4 rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredEvents.map(evt => {
              const availableSeats = evt.totalSeats - evt.rsvpedSeats;
              const isFull = availableSeats <= 0;

              return (
                <div
                  key={evt.id}
                  className="glass-card p-6 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`badge ${getBadgeClass(evt.category)}`}>
                          {evt.category}
                        </span>
                        <span className="text-xs font-medium text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                          📍 {evt.city}
                        </span>
                      </div>
                      
                      {/* Seat Status */}
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                        isFull 
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {isFull ? 'Waitlist Open' : `${availableSeats} Seats Left`}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onSelectEvent(evt)}
                      className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-2"
                    >
                      {evt.title}
                    </h3>

                    {/* Tech Stack Badges */}
                    {evt.techStack && (
                      <div className="flex flex-wrap gap-1.5">
                        {evt.techStack.map(t => (
                          <span
                            key={t}
                            onClick={(e) => { e.stopPropagation(); setSelectedTechStack(t); }}
                            className="text-[10px] font-bold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30 cursor-pointer hover:bg-indigo-600 hover:text-white transition-colors"
                          >
                            {t === 'Python' ? '🐍 Python' : t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-slate-400 text-sm line-clamp-2">
                      {evt.description}
                    </p>

                    {/* Meta info */}
                    <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span>{evt.date} • {evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{evt.rsvpedSeats} / {evt.totalSeats} Attending</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectEvent(evt)}
                      className="btn-primary text-xs py-2 px-4 w-full justify-center rounded-xl"
                    >
                      <span>RSVP & View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Month View Grid */}
      {viewMode === 'month' && (
        <div className="glass-panel p-6 overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="calendar-day-header">{d}</div>
              ))}
            </div>

            <div className="calendar-grid">
              {Array.from({ length: 35 }).map((_, idx) => {
                const dayNum = idx - 2;
                const isValidDay = dayNum > 0 && dayNum <= 30;
                const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
                const dayEvents = filteredEvents.filter(e => e.date.endsWith(`-${formattedDay}`));

                return (
                  <div
                    key={idx}
                    className={`calendar-day-cell flex flex-col justify-between ${
                      !isValidDay ? 'opacity-20 pointer-events-none' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${isValidDay ? 'text-slate-300' : 'text-slate-600'}`}>
                        {isValidDay ? dayNum : ''}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                      )}
                    </div>

                    <div className="space-y-1">
                      {dayEvents.map(e => (
                        <div
                          key={e.id}
                          onClick={() => onSelectEvent(e)}
                          className="text-[10px] p-1.5 rounded bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-500/40 truncate cursor-pointer font-medium"
                          title={e.title}
                        >
                          {e.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
