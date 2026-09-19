import React, { useState } from 'react';
import { Building2, MapPin, Phone, Mail, Calendar as CalendarIcon, Users, CheckCircle2, DollarSign, PlusCircle, Search, ShieldCheck, ExternalLink, Sparkles, X } from 'lucide-react';

export default function VenueDirectory({ venues, onAddVenue }) {
  const [activeTab, setActiveTab] = useState('free'); // 'free' | 'paid'
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(null); // venue object for quote

  // Form states for sponsoring a venue
  const [companyName, setCompanyName] = useState('');
  const [venueName, setVenueName] = useState('');
  const [city, setCity] = useState('Chennai');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState(100);
  const [availableDates, setAvailableDates] = useState('2026-10-15, 2026-10-22');
  const [amenities, setAmenities] = useState('Wi-Fi, Projector, AC, Tea/Coffee');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const filteredVenues = venues.filter(v => {
    const matchesTab = v.type === activeTab;
    const matchesCity = selectedCity === 'All Cities' || v.city === selectedCity;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (v.companySponsor && v.companySponsor.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesCity && matchesSearch;
  });

  const handleSponsorSubmit = (e) => {
    e.preventDefault();
    if (!companyName || !venueName || !location) return;

    onAddVenue({
      id: `ven-${Date.now()}`,
      name: venueName,
      type: 'free',
      companySponsor: companyName,
      city,
      location,
      capacity: parseInt(capacity) || 100,
      availableDates: availableDates.split(',').map(d => d.trim()),
      amenities: amenities.split(',').map(a => a.trim()),
      contactPerson,
      contactEmail,
      contactPhone,
      verified: true
    });

    setIsSponsorModalOpen(false);
    alert('Thank you! Your company venue sponsorship has been listed for community event schedulers.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                Event Schedulers Venue Desk
              </span>
              <span className="text-xs text-indigo-300 font-medium bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                Company Sponsorships & Paid Spaces
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Community <span className="gradient-text-emerald">Venue Directory</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Search free sponsored company venues or book premium paid auditoriums for your next Build2Learn / TN Tech meetup.
            </p>
          </div>

          <button
            onClick={() => setIsSponsorModalOpen(true)}
            className="btn-emerald py-3 px-5 text-sm rounded-xl shadow-lg flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            <span>Sponsor Company Venue (Free)</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div className="glass-panel p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Toggle Free vs Paid */}
        <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('free')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'free' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Free Sponsored Venues</span>
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'paid' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-300" />
            <span>Paid Rental Venues</span>
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
              placeholder="Search company or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/60 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Venue List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVenues.length === 0 ? (
          <div className="col-span-full glass-panel p-12 text-center text-slate-400">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <h3 className="text-lg font-semibold text-white">No venues found for your selection</h3>
            <p className="text-sm mt-1">Try switching between Free and Paid tabs or changing the city filter.</p>
          </div>
        ) : (
          filteredVenues.map(ven => (
            <div key={ven.id} className="glass-card p-6 flex flex-col justify-between space-y-4 relative overflow-hidden">
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  {ven.type === 'free' ? (
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Sponsored Free Venue by {ven.companySponsor}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5" />
                      {ven.pricePerDay}
                    </span>
                  )}
                  <span className="text-xs font-medium text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full">
                    📍 {ven.city}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{ven.name}</h3>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{ven.location}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Capacity: <strong>{ven.capacity} Seats</strong></span>
                  </p>
                </div>

                {/* Amenities */}
                {ven.amenities && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {ven.amenities.map(a => (
                      <span key={a} className="text-[10px] font-semibold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                        ✓ {a}
                      </span>
                    ))}
                  </div>
                )}

                {/* Available Dates for Free Venues */}
                {ven.type === 'free' && ven.availableDates && (
                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" /> Available Open Dates:
                    </p>
                    <p className="text-slate-200">{ven.availableDates.join(' • ')}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                {ven.type === 'free' ? (
                  <a
                    href={`mailto:${ven.contactEmail}?subject=Free Venue Reservation Request for Build2Learn Meetup`}
                    className="btn-emerald text-xs py-2.5 px-4 w-full justify-center rounded-xl"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reserve Free Venue ({ven.contactPerson})</span>
                  </a>
                ) : (
                  <>
                    <a
                      href={`tel:${ven.contactPhone}`}
                      className="btn-primary text-xs py-2.5 px-4 flex-1 justify-center rounded-xl"
                    >
                      <Phone className="w-4 h-4 text-white" />
                      <span>Call Venue Manager</span>
                    </a>
                    <button
                      onClick={() => setIsQuoteModalOpen(ven)}
                      className="btn-secondary text-xs py-2.5 px-4 flex-1 justify-center rounded-xl"
                    >
                      <span>Request Quote</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sponsor Company Venue Modal */}
      {isSponsorModalOpen && (
        <div className="modal-overlay animate-fade-in">
          <div className="glass-panel w-full max-w-xl p-6 sm:p-8 relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSponsorModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Company Venue Sponsorship
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">Offer Your Office Venue for Free</h2>
              <p className="text-xs text-slate-400 mt-1">
                Tech companies can list their auditoriums or seminar halls to support student and developer meetups.
              </p>
            </div>

            <form onSubmit={handleSponsorSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">COMPANY SPONSOR NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zoho / Freshworks"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">VENUE / HALL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Innovation Hall A"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>

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
                  <label className="block text-xs font-semibold text-slate-400 mb-1">SEATING CAPACITY *</label>
                  <input
                    type="number"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">FULL LOCATION ADDRESS *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Estancia IT Park, Guduvanchery, Chennai"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">AVAILABLE DATES (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    placeholder="2026-10-15, 2026-10-22"
                    value={availableDates}
                    onChange={(e) => setAvailableDates(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">CONTACT PERSON NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Suresh Kumar"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">CONTACT EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="events@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-emerald w-full py-2.5 text-xs justify-center rounded-xl"
              >
                Publish Free Venue Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Paid Venue Quote Modal */}
      {isQuoteModalOpen && (
        <div className="modal-overlay animate-fade-in">
          <div className="glass-panel w-full max-w-md p-6 relative space-y-4 text-center">
            <button
              onClick={() => setIsQuoteModalOpen(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <Building2 className="w-12 h-12 text-indigo-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">{isQuoteModalOpen.name}</h3>
            <p className="text-xs text-slate-400">Rate: <strong className="text-indigo-300">{isQuoteModalOpen.pricePerDay}</strong></p>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2">
              <p><strong className="text-slate-200">Manager:</strong> {isQuoteModalOpen.managerName}</p>
              <p><strong className="text-slate-200">Phone:</strong> <a href={`tel:${isQuoteModalOpen.contactPhone}`} className="text-emerald-400 underline">{isQuoteModalOpen.contactPhone}</a></p>
              <p><strong className="text-slate-200">Email:</strong> {isQuoteModalOpen.contactEmail}</p>
            </div>

            <button
              onClick={() => { alert(`Call request initialized for ${isQuoteModalOpen.managerName} at ${isQuoteModalOpen.contactPhone}`); setIsQuoteModalOpen(null); }}
              className="btn-primary w-full py-2.5 text-xs justify-center rounded-xl"
            >
              <Phone className="w-4 h-4" />
              <span>Call Manager ({isQuoteModalOpen.contactPhone})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
