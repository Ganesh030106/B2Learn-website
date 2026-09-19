import React, { useState } from 'react';
import { Terminal, Smartphone, Send, Sparkles, Radio, CheckCheck, RefreshCw, Copy, Check, FileText, Globe, Layers, ArrowRight } from 'lucide-react';

export default function WhatsAppCliDesk({ events, onAddEvent }) {
  const [cliLogs, setCliLogs] = useState([
    { id: 1, type: 'system', text: '$ wa-cli init --provider=meta-cloud-api' },
    { id: 2, type: 'success', text: '✓ Connected to Meta WhatsApp Cloud API (WABA ID: #889210)' },
    { id: 3, type: 'info', text: 'ℹ Listening on webhook endpoint: /api/whatsapp/webhook' },
    { id: 4, type: 'info', text: 'ℹ Gemini 1.5 Flash NLP parser initialized for event extraction' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // WhatsApp Chat State
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: "👋 Hi! I'm your local WhatsApp Event Assistant for Chennai & nearby cities. Ask me things like:\n\n• \"Any events happening this weekend in Chennai?\"\n• \"Yoga in the park\"\n• Or paste an Instagram caption / Google Form link to list an event!", time: '12:00 PM' }
  ]);
  const [userChatInput, setUserChatInput] = useState('');

  // Raw Text Paste Extractor State
  const [rawTextPaste, setRawTextPaste] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedPreview, setExtractedPreview] = useState(null);

  // Terminal Execution Handler
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    setCliLogs(prev => [...prev, { id: Date.now(), type: 'input', text: `$ ${cmd}` }]);
    setTerminalInput('');

    setTimeout(() => {
      let responseLog = { id: Date.now() + 1, type: 'info', text: '' };

      if (cmd.includes('status')) {
        responseLog.text = 'STATUS: WA CLI Daemon running | Latency: 42ms | Active 24h Windows: 3 | Daily Free Quota: 1,000 / 1,000';
      } else if (cmd.includes('sync-luma')) {
        responseLog.text = '✓ Ingested 4 public events from Luma Discover Chennai (JSON feed parsed successfully)';
      } else if (cmd.includes('test-sms') || cmd.includes('test-wa')) {
        responseLog.text = '✓ Sent outbound test Meta WhatsApp message payload to recipient +919876543210';
      } else {
        responseLog.text = `Executing wa-cli command "${cmd}"... Process exited with code 0`;
      }

      setCliLogs(prev => [...prev, responseLog]);
    }, 400);
  };

  // WhatsApp Chat Interaction Handler
  const handleSendChatMessage = (presetText) => {
    const textToSend = presetText || userChatInput;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setUserChatInput('');

    // Add log to CLI terminal
    setCliLogs(prev => [
      ...prev,
      { id: Date.now() + 1, type: 'info', text: `[INBOUND WEBHOOK] From: +919876512345 | Body: "${textToSend}"` }
    ]);

    // Generate conversational response
    setTimeout(() => {
      let botText = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('weekend') || lower.includes('events') || lower.includes('chennai')) {
        botText = `Found 3 events happening in Chennai this weekend 🎉\n\n1. *Build2Learn #38 Meetup* (Sat 10:00 AM, Anna University)\n2. *Full-Stack Next.js 14 & AI Agents* (Sat 10:00 AM)\n3. *Chennai Python Data Science Sprint* (Tue 11:00 AM, IIT Park)\n\nReply with an event name (e.g. "python one" or "nextjs") to get details & set a morning reminder!`;
      } else if (lower.includes('yoga') || lower.includes('park')) {
        botText = `🧘 *Yoga in the Park*\n\n📅 Sunday, 7:00 AM\n📍 Elliot's Beach park entrance, Besant Nagar, Chennai\n🎟️ Free admission, no registration required.\n\nWould you like a WhatsApp reminder on Sunday morning at 6:15 AM? (Reply YES to confirm)`;
      } else if (lower.includes('yes') || lower.includes('remind')) {
        botText = `✅ Perfect! I've set a WhatsApp reminder for Sunday at 6:15 AM. See you at Elliot's Beach! 🌅`;
      } else if (lower.includes('python')) {
        botText = `🐍 *Python Data Science & AsyncIO Sprint*\n\n📅 Sep 29, 11:00 AM - 03:00 PM\n📍 IIT Madras Research Park, Hall A, Chennai\n🎟️ 25 Seats remaining.\n\nType RSVP to claim your free seat via WhatsApp!`;
      } else {
        botText = `🤖 I parsed your message using Gemini NLP. I can help you find events in Chennai, set morning reminders, or register for meetups! Try asking "any events this weekend?"`;
      }

      const botMsg = {
        id: Date.now() + 2,
        sender: 'bot',
        text: botText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  // Gemini AI Raw Text Extractor Handler
  const handleExtractRawText = (e) => {
    e.preventDefault();
    if (!rawTextPaste.trim()) return;

    setIsExtracting(true);

    setTimeout(() => {
      const parsed = {
        id: `evt-ai-${Date.now()}`,
        title: 'Extracted: Chennai AI & Open Source Guild',
        category: 'Meetup',
        techStack: ['Python', 'AI / ML'],
        chapter: 'Chennai Chapter',
        city: 'Chennai',
        date: '2026-10-10',
        time: '04:00 PM - 07:00 PM',
        venue: 'Ideas2IT Campus, Guindy, Chennai',
        organizer: 'Local Guild Community',
        description: rawTextPaste.slice(0, 140) + '...',
        totalSeats: 50,
        rsvpedSeats: 12
      };

      setExtractedPreview(parsed);
      setIsExtracting(false);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                WA CLI Bridge (WhatsApp CLI & Meta Webhook)
              </span>
              <span className="text-xs text-indigo-300 font-medium bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                Meta Cloud API 100% Free Service Conversations
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              WhatsApp-Native <span className="gradient-text-emerald">Event Bot & CLI</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              No app download required. Users ask questions directly inside WhatsApp, and organizers paste Instagram captions or Google Form links to auto-publish events using Gemini AI.
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: Live WhatsApp Mobile Simulator */}
        <div className="glass-panel p-6 flex flex-col h-[600px]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Build2Learn WhatsApp Bot</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Meta Cloud API Active
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              Chennai & Regional Hub
            </span>
          </div>

          {/* Quick Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none">
            {[
              "any events in chennai this weekend?",
              "yoga in the park",
              "python meetups"
            ].map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSendChatMessage(prompt)}
                className="text-[11px] font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
              >
                💬 "{prompt}"
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {chatMessages.map(m => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm whitespace-pre-line leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-900 text-slate-200 border border-slate-700/80 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1 flex items-center gap-1">
                  {m.time} {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                </span>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendChatMessage();
            }}
            className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about events in WhatsApp..."
              value={userChatInput}
              onChange={(e) => setUserChatInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="btn-emerald py-2.5 px-4 text-xs rounded-xl"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Column 2: WA CLI Terminal & Gemini Text Extractor */}
        <div className="space-y-6">
          {/* WA CLI Console */}
          <div className="glass-panel p-5 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Terminal className="w-4 h-4" />
                <span>WA CLI TERMINAL CONSOLE</span>
              </div>
              <span className="text-[10px] text-slate-500">v2.4.0-stable</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl h-44 overflow-y-auto space-y-1.5 border border-slate-800">
              {cliLogs.map(log => (
                <div
                  key={log.id}
                  className={`${
                    log.type === 'input' ? 'text-indigo-300 font-bold' :
                    log.type === 'success' ? 'text-emerald-400' :
                    log.type === 'system' ? 'text-cyan-400' : 'text-slate-300'
                  }`}
                >
                  {log.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                placeholder="wa-cli status / wa-cli sync-luma / wa-cli test-wa"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </form>
          </div>

          {/* Gemini AI Raw Text / Instagram Extractor */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Paste Raw Text / Instagram Post / Google Form
              </h3>
              <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Gemini 1.5 Flash AI
              </span>
            </div>

            <form onSubmit={handleExtractRawText} className="space-y-3">
              <textarea
                rows={3}
                required
                placeholder="Paste raw Instagram caption or WhatsApp forward (e.g. 'Chennai AI Guild Meetup, Sat Oct 10 at Ideas2IT Guindy 4pm. Free entry!')..."
                value={rawTextPaste}
                onChange={(e) => setRawTextPaste(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={isExtracting}
                className="btn-emerald w-full text-xs py-2.5 justify-center rounded-xl"
              >
                {isExtracting ? 'Gemini AI Extracting Event Details...' : 'Parse & Extract Event JSON'}
              </button>
            </form>

            {extractedPreview && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">{extractedPreview.title}</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">AI Parsed</span>
                </div>
                <p className="text-slate-300">📅 {extractedPreview.date} • {extractedPreview.time}</p>
                <p className="text-slate-300">📍 {extractedPreview.venue}</p>

                <button
                  onClick={() => {
                    onAddEvent(extractedPreview);
                    setExtractedPreview(null);
                    setRawTextPaste('');
                    alert('Event extracted by Gemini AI and added to live calendar database!');
                  }}
                  className="btn-primary w-full text-xs py-2 justify-center rounded-lg mt-2"
                >
                  Confirm & Add Event to Calendar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
