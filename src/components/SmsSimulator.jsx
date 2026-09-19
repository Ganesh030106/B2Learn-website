import React, { useState } from 'react';
import { Smartphone, Send, Radio, Sparkles, CheckCheck, RefreshCw } from 'lucide-react';

export default function SmsSimulator() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'system', text: 'Build2Learn Twilio SMS Service Active. Send keywords: WIFI, VENUE, SLIDES, or CANCEL to test automated replies.', time: '11:00 AM' }
  ]);
  const [inputCommand, setInputCommand] = useState('');

  const handleSendCommand = (cmdText) => {
    const textToSend = cmdText || inputCommand;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend.toUpperCase().trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputCommand('');

    // Generate automated Twilio SMS response
    setTimeout(() => {
      let botReply = '';
      const upper = textToSend.toUpperCase().trim();

      if (upper.includes('WIFI')) {
        botReply = '📡 Venue Wi-Fi: "B2Learn_Auditorium" | Password: "build2learn2026" (5GHz Network)';
      } else if (upper.includes('VENUE') || upper.includes('MAPS')) {
        botReply = '📍 Venue: Anna University Tech Park, Auditorium B, Chennai. Google Maps Pin: https://maps.google.com/?q=Anna+University';
      } else if (upper.includes('SLIDES') || upper.includes('CODE')) {
        botReply = '📦 Today\'s Workshop Slides & Code Repo: https://github.com/Ganesh030106/B2Learn-website';
      } else if (upper.includes('CANCEL')) {
        botReply = '✅ Your RSVP has been cancelled. Your seat has been automatically released to the next person on the waitlist. Thank you!';
      } else if (upper.includes('RSVP')) {
        botReply = '🎉 RSVP Confirmed for Full-Stack Next.js 14 & AI Agents Workshop on Sep 24. Calendar link: https://b2learn.org/ics/101';
      } else {
        botReply = `🤖 Unknown command "${upper}". Available commands:\n• WIFI (Venue Wi-Fi details)\n• VENUE (Google Maps Link)\n• SLIDES (GitHub/Slides)\n• CANCEL (Release RSVP seat)`;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'system',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Twilio 2-Way SMS Command Center
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Interactive SMS Simulator Desk</h2>
          <p className="text-slate-400 text-sm">
            Test offline-friendly two-way SMS commands used by attendees in venues with poor internet data.
          </p>
        </div>

        <button
          onClick={() => setMessages([
            { id: 1, sender: 'system', text: 'Build2Learn Twilio SMS Service Active. Send keywords: WIFI, VENUE, SLIDES, or CANCEL.', time: '11:00 AM' }
          ])}
          className="btn-secondary text-xs py-2 px-3 rounded-xl flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Chat Thread
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preset Command Shortcuts */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Quick SMS Commands
          </h3>
          <p className="text-xs text-slate-400">
            Click any command button to simulate an incoming SMS from an attendee:
          </p>

          <div className="space-y-2">
            {[
              { cmd: 'WIFI', label: 'WIFI', desc: 'Returns Venue Wi-Fi & Password' },
              { cmd: 'VENUE', label: 'VENUE', desc: 'Returns Google Maps Location Link' },
              { cmd: 'SLIDES', label: 'SLIDES', desc: 'Returns Presentation Slides & Code' },
              { cmd: 'CANCEL', label: 'CANCEL', desc: 'Cancels RSVP & Auto-Promotes Waitlist' },
              { cmd: 'RSVP', label: 'RSVP', desc: 'Simulates New Event Confirmation' }
            ].map(item => (
              <button
                key={item.cmd}
                onClick={() => handleSendCommand(item.cmd)}
                className="w-full text-left p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-emerald-500/50 hover:bg-slate-800 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {item.label}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
                <Send className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Phone Mockup */}
        <div className="lg:col-span-2 glass-panel p-6 flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Build2Learn Twilio Desk</p>
                <p className="text-xs text-emerald-400 font-mono">+1 (800) 555-B2L2</p>
              </div>
            </div>
            <span className="text-xs text-slate-500 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
              Twilio SMS API v2.0
            </span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm whitespace-pre-line leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1 flex items-center gap-1">
                  {m.time} {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-indigo-400" />}
                </span>
              </div>
            ))}
          </div>

          {/* SMS Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendCommand();
            }}
            className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type SMS command (e.g. WIFI, VENUE, CANCEL)..."
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="submit"
              className="btn-emerald py-2.5 px-4 text-xs rounded-xl"
            >
              <Send className="w-4 h-4" />
              <span>Send SMS</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
