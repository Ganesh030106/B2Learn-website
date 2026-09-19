import React, { useState } from 'react';
import { Calendar as CalendarIcon, MessageSquare, Smartphone, Archive, BarChart3, PlusCircle, Building2, Mic, Heart, Terminal, Globe } from 'lucide-react';
import CalendarView from './components/CalendarView';
import EventModal from './components/EventModal';
import LiveQABoard from './components/LiveQABoard';
import SmsSimulator from './components/SmsSimulator';
import QRAttendanceModal from './components/QRAttendanceModal';
import ResourceVault from './components/ResourceVault';
import ImpactReportModal from './components/ImpactReportModal';
import NewEventModal from './components/NewEventModal';
import VenueDirectory from './components/VenueDirectory';
import SpeakerPortal from './components/SpeakerPortal';
import WhatsAppCliDesk from './components/WhatsAppCliDesk';
import LumaAggregatorView from './components/LumaAggregatorView';

import { INITIAL_EVENTS, INITIAL_VENUES, INITIAL_SPEAKER_CALLS, INITIAL_SPEAKER_APPLICATIONS, INITIAL_QA, INITIAL_RESOURCE_VAULT } from './data/mockEvents';

export default function App() {
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' | 'wacli' | 'luma' | 'venues' | 'speakers' | 'qa' | 'sms' | 'resources'
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [venues, setVenues] = useState(INITIAL_VENUES);
  const [speakerCalls, setSpeakerCalls] = useState(INITIAL_SPEAKER_CALLS);
  const [speakerApplications, setSpeakerApplications] = useState(INITIAL_SPEAKER_APPLICATIONS);
  const [questions, setQuestions] = useState(INITIAL_QA);
  const [resources, setResources] = useState(INITIAL_RESOURCE_VAULT);
  const [selectedChapter, setSelectedChapter] = useState('All Chapters');

  // Modals
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [isImpactReportOpen, setIsImpactReportOpen] = useState(false);
  const [qrModalData, setQrModalData] = useState(null);

  // Handlers
  const handleRsvpSubmit = (eventId, rsvpDetails) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return { ...evt, rsvpedSeats: evt.rsvpedSeats + 1 };
      }
      return evt;
    }));
  };

  const handleAddVenue = (newVen) => {
    setVenues(prev => [newVen, ...prev]);
  };

  const handleAddSpeakerCall = (newCall) => {
    setSpeakerCalls(prev => [newCall, ...prev]);
  };

  const handleApplyToSpeak = (newApp) => {
    setSpeakerApplications(prev => [newApp, ...prev]);
    setSpeakerCalls(prev => prev.map(call => {
      if (call.id === newApp.callId) {
        return { ...call, applicationsCount: call.applicationsCount + 1 };
      }
      return call;
    }));
  };

  const handleApproveApplication = (appId) => {
    setSpeakerApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, status: 'approved' };
      }
      return app;
    }));
  };

  const handleAddQuestion = (newQ) => {
    setQuestions(prev => [
      { id: `qa-${Date.now()}`, ...newQ, upvotes: 1, time: 'Just now', answered: false },
      ...prev
    ]);
  };

  const handleUpvoteQuestion = (qId) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        return { ...q, upvotes: q.upvotes + 1 };
      }
      return q;
    }));
  };

  const handleCreateEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('calendar')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-white tracking-tight">Build2Learn</span>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                    TN TECH
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Community Event Scheduler</p>
              </div>
            </div>

            {/* Mobile Action Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsNewEventModalOpen(true)}
                className="btn-primary text-xs py-2 px-3 rounded-lg"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none justify-start md:justify-center">
            {[
              { id: 'calendar', label: 'Web Calendar', icon: CalendarIcon },
              { id: 'wacli', label: 'WA CLI Bot', icon: Terminal },
              { id: 'luma', label: 'Luma Aggregator', icon: Globe },
              { id: 'venues', label: 'Venue Directory', icon: Building2 },
              { id: 'speakers', label: 'Call for Speakers', icon: Mic },
              { id: 'qa', label: 'Live Q&A Stream', icon: MessageSquare },
              { id: 'sms', label: 'SMS Command Desk', icon: Smartphone },
              { id: 'resources', label: 'Resource Vault', icon: Archive }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsImpactReportOpen(true)}
              className="btn-secondary text-xs py-2 px-3.5 rounded-xl"
              title="View Community Impact Analytics & Export PDF"
            >
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Impact Report</span>
            </button>

            <button
              onClick={() => setIsNewEventModalOpen(true)}
              className="btn-primary text-xs py-2 px-4 rounded-xl shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex-1">
        {activeTab === 'calendar' && (
          <CalendarView
            events={events}
            selectedChapter={selectedChapter}
            setSelectedChapter={setSelectedChapter}
            onSelectEvent={(evt) => setSelectedEvent(evt)}
            onOpenNewEventModal={() => setIsNewEventModalOpen(true)}
          />
        )}

        {activeTab === 'wacli' && (
          <WhatsAppCliDesk
            events={events}
            onAddEvent={handleCreateEvent}
          />
        )}

        {activeTab === 'luma' && (
          <LumaAggregatorView
            events={events}
            onAddEvent={handleCreateEvent}
          />
        )}

        {activeTab === 'venues' && (
          <VenueDirectory
            venues={venues}
            onAddVenue={handleAddVenue}
          />
        )}

        {activeTab === 'speakers' && (
          <SpeakerPortal
            speakerCalls={speakerCalls}
            applications={speakerApplications}
            onAddSpeakerCall={handleAddSpeakerCall}
            onApplyToSpeak={handleApplyToSpeak}
            onApproveApplication={handleApproveApplication}
          />
        )}

        {activeTab === 'qa' && (
          <LiveQABoard
            events={events}
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onUpvoteQuestion={handleUpvoteQuestion}
          />
        )}

        {activeTab === 'sms' && (
          <SmsSimulator />
        )}

        {activeTab === 'resources' && (
          <ResourceVault
            resources={resources}
          />
        )}
      </main>

      {/* Global Modals */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRsvpSubmit={handleRsvpSubmit}
          onOpenQrPass={(evt, name) => {
            setSelectedEvent(null);
            setQrModalData({ event: evt, attendeeName: name });
          }}
        />
      )}

      {isNewEventModalOpen && (
        <NewEventModal
          onClose={() => setIsNewEventModalOpen(false)}
          onCreateEvent={handleCreateEvent}
        />
      )}

      {isImpactReportOpen && (
        <ImpactReportModal
          events={events}
          onClose={() => setIsImpactReportOpen(false)}
        />
      )}

      {qrModalData && (
        <QRAttendanceModal
          event={qrModalData.event}
          attendeeName={qrModalData.attendeeName}
          onClose={() => setQrModalData(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-4 text-slate-400">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Built for Build2Learn & Tamil Nadu Tech Communities
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Meta WhatsApp Cloud API & WA CLI Engine
          </span>
        </div>
        <p>© 2026 Build2Learn. Zero-Friction Community Event Scheduler.</p>
      </footer>
    </div>
  );
}
