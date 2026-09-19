import React, { useState } from 'react';
import { Mic, UserCheck, PlusCircle, Calendar as CalendarIcon, MapPin, Phone, Mail, CheckCircle2, Award, Search, Sparkles, X, ChevronRight } from 'lucide-react';

export default function SpeakerPortal({ speakerCalls, applications, onAddSpeakerCall, onApplyToSpeak, onApproveApplication }) {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCallModal, setActiveCallModal] = useState(null); // Call object for speaker application
  const [isPostCallModalOpen, setIsPostCallModalOpen] = useState(false);
  const [viewTab, setViewTab] = useState('calls'); // 'calls' | 'applications'

  // Form states for applying as a speaker
  const [speakerName, setSpeakerName] = useState('');
  const [speakerCity, setSpeakerCity] = useState('Chennai');
  const [talkTitle, setTalkTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [experienceYears, setExperienceYears] = useState(3);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [speakerPhone, setSpeakerPhone] = useState('');
  const [speakerEmail, setSpeakerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  // Form states for posting a speaker call
  const [callTitle, setCallTitle] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [city, setCity] = useState('Chennai');
  const [eventDate, setEventDate] = useState('2026-10-15');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 12:00 PM');
  const [topicsWanted, setTopicsWanted] = useState('Python, AsyncIO, AI Agents');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerPhone, setOrganizerPhone] = useState('');

  const filteredCalls = speakerCalls.filter(c => {
    const matchesCity = selectedCity === 'All Cities' || c.city === selectedCity;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.topicsWanted.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesSearch;
  });

  const handleSpeakerApply = (e) => {
    e.preventDefault();
    if (!speakerName || !talkTitle || !speakerPhone) return;

    setIsSubmitting(true);

    setTimeout(() => {
      onApplyToSpeak({
        id: `app-${Date.now()}`,
        callId: activeCallModal.id,
        speakerName,
        city: speakerCity,
        talkTitle,
        abstract,
        experienceYears: parseInt(experienceYears) || 3,
        portfolioUrl,
        phone: speakerPhone,
        email: speakerEmail,
        status: 'pending'
      });

      setIsSubmitting(false);
      setApplySuccess(true);
    }, 600);
  };

  const handlePostCall = (e) => {
    e.preventDefault();
    if (!callTitle || !eventTitle) return;

    onAddSpeakerCall({
      id: `spk-${Date.now()}`,
      title: callTitle,
      eventTitle,
      chapter: `${city} Chapter`,
      city,
      date: eventDate,
      timeSlot,
      topicsWanted: topicsWanted.split(',').map(t => t.trim()),
      perks: ['Speaker Swag Pack', 'Certificate of Recognition', 'Session Featured on Portal'],
      organizerName: organizerName || 'Community Lead',
      organizerPhone: organizerPhone || '+91 98765 43210',
      status: 'open',
      applicationsCount: 0
    });

    setIsPostCallModalOpen(false);
    alert('Call for Speakers published! Interested local speakers can now apply.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                Call for Speakers Portal
              </span>
              <span className="text-xs text-emerald-300 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
                Chennai & TN Regional Speakers
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Speaker Request & <span className="gradient-text">Proposal Desk</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Are you interested in speaking at Python, AI, or Web meetups in Chennai or nearby cities? Apply to open speaker slots directly to community event managers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPostCallModalOpen(true)}
              className="btn-primary py-3 px-5 text-sm rounded-xl shadow-lg flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Call for Speakers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & View Tabs */}
      <div className="glass-panel p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Toggle Calls vs Manager Applications */}
        <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setViewTab('calls')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              viewTab === 'calls' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4 text-indigo-300" />
            <span>Open Speaker Calls ({speakerCalls.length})</span>
          </button>
          <button
            onClick={() => setViewTab('applications')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              viewTab === 'applications' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-300" />
            <span>Submitted Applications ({applications.length})</span>
          </button>
        </div>

        {/* City Filter & Search */}
        <div className="flex flex-wrap items-center gap-3 flex-1 justify-end">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-900 border border-slate-700/60 text-slate-200 text-sm rounded-xl px-3.5 py-2 font-medium focus:outline-none cursor-pointer"
          >
            {['All Cities', 'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem'].map(c => (
              <option key={c} value={c}>{c === 'All Cities' ? '📍 All Cities' : `📍 ${c}`}</option>
            ))}
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Python, AI, speaker calls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Tab Views */}
      {viewTab === 'calls' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCalls.length === 0 ? (
            <div className="col-span-full glass-panel p-12 text-center text-slate-400">
              <Mic className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <h3 className="text-lg font-semibold text-white">No open speaker calls found</h3>
              <p className="text-sm mt-1">Try selecting another city or post a new call for speakers.</p>
            </div>
          ) : (
            filteredCalls.map(call => (
              <div key={call.id} className="glass-card p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                      📍 {call.city} • Open Slot
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {call.applicationsCount} Applicant(s)
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{call.title}</h3>
                  <p className="text-xs font-semibold text-indigo-300">Target Event: {call.eventTitle}</p>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <p className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span>{call.date} • {call.timeSlot}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Manager: <strong>{call.organizerName}</strong> ({call.organizerPhone})</span>
                    </p>
                  </div>

                  {/* Topics Wanted */}
                  {call.topicsWanted && (
                    <div className="space-y-1">
                      <p className="text-[11px] text-slate-400 font-bold uppercase">Topics Wanted:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {call.topicsWanted.map(topic => (
                          <span key={topic} className="text-[10px] font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                            {topic === 'Python' ? '🐍 Python' : topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => { setActiveCallModal(call); setApplySuccess(false); }}
                    className="btn-primary text-xs py-2.5 px-4 w-full justify-center rounded-xl"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Apply to Speak in {call.city}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Applications Tab */
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Incoming Speaker Applications ({applications.length})
          </h3>

          {applications.length === 0 ? (
            <div className="glass-panel p-10 text-center text-slate-400">
              <UserCheck className="w-10 h-10 mx-auto mb-2 text-slate-600" />
              <p className="text-sm">No speaker applications submitted yet.</p>
            </div>
          ) : (
            applications.map(app => (
              <div key={app.id} className="glass-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      {app.speakerName}
                    </span>
                    <span className="text-xs text-cyan-300 font-medium">📍 {app.city}</span>
                    <span className="text-xs text-slate-400 font-mono">{app.experienceYears} Years Exp</span>
                  </div>

                  <h4 className="text-lg font-bold text-white">"{app.talkTitle}"</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">{app.abstract}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                    <span>Phone: {app.phone}</span>
                    <span>Email: {app.email}</span>
                    {app.portfolioUrl && (
                      <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="text-indigo-400 underline">
                        Portfolio / GitHub
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  {app.status === 'approved' ? (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Approved Speaker
                    </span>
                  ) : (
                    <button
                      onClick={() => onApproveApplication(app.id)}
                      className="btn-emerald text-xs py-2 px-4 rounded-xl shadow-md"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Speaker</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Speaker Application Modal */}
      {activeCallModal && (
        <div className="modal-overlay animate-fade-in">
          <div className="glass-panel w-full max-w-xl p-6 sm:p-8 relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveCallModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Speaker Application
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">{activeCallModal.title}</h2>
              <p className="text-xs text-slate-400 mt-1">
                Event: <strong className="text-slate-200">{activeCallModal.eventTitle}</strong> ({activeCallModal.city})
              </p>
            </div>

            {applySuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Application Submitted!</h3>
                <p className="text-xs text-emerald-300">
                  Community Manager <strong className="text-white">{activeCallModal.organizerName}</strong> has received your talk proposal for {activeCallModal.city}.
                </p>
                <button
                  onClick={() => setActiveCallModal(null)}
                  className="btn-primary text-xs py-2 px-5 rounded-xl mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSpeakerApply} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">SPEAKER FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sanjay Ram"
                      value={speakerName}
                      onChange={(e) => setSpeakerName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">YOUR CITY *</label>
                    <select
                      value={speakerCity}
                      onChange={(e) => setSpeakerCity(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    >
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Trichy">Trichy</option>
                      <option value="Salem">Salem</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">PROPOSED TALK TITLE *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Building Production-Ready Multi-Agent Swarms with Python"
                      value={talkTitle}
                      onChange={(e) => setTalkTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">TALK ABSTRACT & SUMMARY *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Brief overview of what attendees will learn from your talk..."
                      value={abstract}
                      onChange={(e) => setAbstract(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">YEARS OF EXPERIENCE</label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">PORTFOLIO / GITHUB URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/your-username"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={speakerPhone}
                      onChange={(e) => setSpeakerPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="speaker@devtech.io"
                      value={speakerEmail}
                      onChange={(e) => setSpeakerEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-2.5 text-xs justify-center rounded-xl"
                >
                  {isSubmitting ? 'Sending Application...' : `Submit Proposal to ${activeCallModal.organizerName}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Post a Call for Speakers Modal */}
      {isPostCallModalOpen && (
        <div className="modal-overlay animate-fade-in">
          <div className="glass-panel w-full max-w-lg p-6 relative space-y-4">
            <button
              onClick={() => setIsPostCallModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-white">Post Open Call for Speakers</h2>

            <form onSubmit={handlePostCall} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">CALL TITLE *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Looking for Python & LLM Specialist"
                  value={callTitle}
                  onChange={(e) => setCallTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">TARGET EVENT NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chennai Python Meetup"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">CITY *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Trichy">Trichy</option>
                    <option value="Salem">Salem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">EVENT DATE *</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">TOPICS WANTED (COMMA SEPARATED)</label>
                <input
                  type="text"
                  placeholder="Python, AsyncIO, AI Agents"
                  value={topicsWanted}
                  onChange={(e) => setTopicsWanted(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">ORGANIZER NAME</label>
                  <input
                    type="text"
                    placeholder="Anand Kumar"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">ORGANIZER PHONE</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={organizerPhone}
                    onChange={(e) => setOrganizerPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-2.5 text-xs justify-center rounded-xl"
              >
                Publish Call for Speakers
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
