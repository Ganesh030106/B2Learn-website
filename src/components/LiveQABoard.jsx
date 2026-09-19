import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, Tv, CheckCircle2, Sparkles, User } from 'lucide-react';

export default function LiveQABoard({ events, questions, onAddQuestion, onUpvoteQuestion }) {
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  const [questionText, setQuestionText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [speakerMode, setSpeakerMode] = useState(false);

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const eventQuestions = questions
    .filter(q => q.eventId === selectedEventId)
    .sort((a, b) => b.upvotes - a.upvotes);

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    onAddQuestion({
      eventId: selectedEventId,
      author: authorName || 'Anonymous Dev',
      question: questionText.trim()
    });

    setQuestionText('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Speaker Mode Full Overlay */}
      {speakerMode && (
        <div className="fixed inset-0 bg-slate-950 z-50 p-8 sm:p-12 overflow-y-auto space-y-8 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                SPEAKER PRESENTATION MODE
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                {selectedEvent?.title}
              </h1>
            </div>
            <button
              onClick={() => setSpeakerMode(false)}
              className="btn-secondary text-xs py-2 px-4 rounded-xl"
            >
              Exit Speaker View
            </button>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {eventQuestions.map((q, idx) => (
              <div
                key={q.id}
                className={`glass-panel p-6 border-l-4 ${
                  idx === 0 ? 'border-l-indigo-500 bg-indigo-950/20' : 'border-l-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">
                      "{q.question}"
                    </p>
                    <p className="text-sm text-slate-400 font-medium">
                      Asked by <span className="text-indigo-300 font-semibold">{q.author}</span> • {q.time}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/40 min-w-[70px]">
                    <ThumbsUp className="w-5 h-5 text-indigo-400 mb-1" />
                    <span className="text-lg font-bold text-white">{q.upvotes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              Live Collaborative Q&A Stream
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Audience Questions & Upvotes</h2>
          <p className="text-slate-400 text-sm">
            Ask questions during live workshops and upvote questions you want speakers to answer.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-xl px-3.5 py-2.5 font-medium focus:outline-none cursor-pointer"
          >
            {events.map(evt => (
              <option key={evt.id} value={evt.id}>{evt.title}</option>
            ))}
          </select>

          <button
            onClick={() => setSpeakerMode(true)}
            className="btn-secondary text-xs py-2.5 px-4 rounded-xl flex items-center gap-2"
            title="Launch Full-Screen Speaker View for Projectors"
          >
            <Tv className="w-4 h-4 text-indigo-400" />
            <span>Speaker View</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question Submission Form */}
        <div className="glass-panel p-6 space-y-4 h-fit">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            Ask a Question
          </h3>

          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">YOUR NAME (OPTIONAL)</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Anonymous Dev"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">QUESTION *</label>
              <textarea
                rows={4}
                required
                placeholder="What would you like the speaker to explain or demo?"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-xs py-2.5 justify-center rounded-xl"
            >
              <Send className="w-4 h-4" />
              Submit to Live Stream
            </button>
          </form>
        </div>

        {/* Question Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Top Upvoted Questions ({eventQuestions.length})
            </h3>
            <span className="text-xs text-slate-500">Real-time update active</span>
          </div>

          {eventQuestions.length === 0 ? (
            <div className="glass-panel p-10 text-center text-slate-400">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 text-slate-600" />
              <p className="text-sm">No questions asked yet for this session.</p>
              <p className="text-xs text-slate-500 mt-1">Be the first to ask a question!</p>
            </div>
          ) : (
            eventQuestions.map(q => (
              <div key={q.id} className="glass-card p-5 flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <p className="text-slate-100 font-semibold text-base sm:text-lg leading-snug">
                    {q.question}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-medium text-indigo-300">{q.author}</span>
                    <span>•</span>
                    <span>{q.time}</span>
                    {q.answered && (
                      <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Answered
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onUpvoteQuestion(q.id)}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-indigo-500 hover:bg-indigo-600/10 text-slate-300 hover:text-indigo-300 transition-all min-w-[56px] group"
                >
                  <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold mt-0.5">{q.upvotes}</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
