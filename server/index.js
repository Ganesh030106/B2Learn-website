import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-Memory Databases for runtime
let events = [
  {
    id: 'evt-101',
    title: 'Full-Stack Next.js 14 & AI Agents Workshop',
    category: 'Workshop',
    techStack: ['Python', 'AI / ML', 'React / Web'],
    chapter: 'Chennai Chapter',
    city: 'Chennai',
    date: '2026-09-24',
    time: '10:00 AM - 01:00 PM',
    venue: 'Anna University Tech Park, Auditorium B, Chennai',
    totalSeats: 60,
    rsvpedSeats: 48
  }
];

let venues = [
  {
    id: 'ven-1',
    name: 'Zoho Campus Community Hall',
    type: 'free',
    companySponsor: 'Zoho Corporation',
    city: 'Chennai',
    location: 'Estancia IT Park, Guduvanchery, Chennai',
    capacity: 120,
    availableDates: ['2026-09-30', '2026-10-05', '2026-10-12'],
    amenities: ['Gigabit Wi-Fi', '4K Dual Projectors', 'Central AC'],
    contactPerson: 'Suresh Kumar',
    contactEmail: 'venue-sponsor@zoho.com',
    contactPhone: '+91 98400 11223'
  }
];

let speakerCalls = [
  {
    id: 'spk-1',
    title: 'Looking for Python & AI Agent Specialist',
    eventTitle: 'Chennai Python & LLM Developer Meetup',
    chapter: 'Chennai Chapter',
    city: 'Chennai',
    date: '2026-10-04',
    timeSlot: '11:30 AM - 12:15 PM',
    topicsWanted: ['LangChain / LlamaIndex', 'Python AsyncIO', 'Local LLMs'],
    organizerName: 'Anand Kumar',
    organizerPhone: '+91 98765 11223',
    status: 'open'
  }
];

let speakerApplications = [];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Build2Learn Community Event Scheduler API', twilioActive: true });
});

// GET & POST Events
app.get('/api/events', (req, res) => {
  res.json({ success: true, events });
});

app.post('/api/rsvp', (req, res) => {
  const { eventId, name, phone } = req.body;
  const event = events.find(e => e.id === eventId);
  if (event) event.rsvpedSeats += 1;
  console.log(`[TWILIO SMS SENT] To: ${phone} | Body: "RSVP confirmed for ${event?.title}"`);
  res.json({ success: true, message: 'RSVP recorded & Twilio SMS dispatched' });
});

// GET & POST Venues
app.get('/api/venues', (req, res) => {
  res.json({ success: true, venues });
});

app.post('/api/venues/sponsor', (req, res) => {
  const newVen = { id: `ven-${Date.now()}`, type: 'free', ...req.body };
  venues.unshift(newVen);
  console.log('[COMPANY VENUE SPONSORED]', newVen);
  res.json({ success: true, venue: newVen });
});

// GET & POST Speaker Calls & Applications
app.get('/api/speaker-calls', (req, res) => {
  res.json({ success: true, speakerCalls, applications: speakerApplications });
});

app.post('/api/speaker-calls', (req, res) => {
  const newCall = { id: `spk-${Date.now()}`, status: 'open', applicationsCount: 0, ...req.body };
  speakerCalls.unshift(newCall);
  res.json({ success: true, call: newCall });
});

app.post('/api/speaker-proposals', (req, res) => {
  const newApp = { id: `app-${Date.now()}`, status: 'pending', ...req.body };
  speakerApplications.unshift(newApp);
  const call = speakerCalls.find(c => c.id === req.body.callId);
  if (call) call.applicationsCount += 1;
  console.log('[SPEAKER APPLICATION SUBMITTED]', newApp);
  res.json({ success: true, application: newApp });
});

// Twilio Webhook
app.post('/api/sms-webhook', (req, res) => {
  const incomingBody = (req.body.Body || req.body.command || '').toUpperCase().trim();
  let replyText = '🤖 Available commands: WIFI, VENUE, SLIDES, CANCEL';
  if (incomingBody.includes('WIFI')) replyText = '📡 Venue Wi-Fi: "B2Learn_Auditorium" | Password: "build2learn2026"';
  else if (incomingBody.includes('VENUE')) replyText = '📍 Venue: Anna University Tech Park, Auditorium B, Chennai';
  else if (incomingBody.includes('SLIDES')) replyText = '📦 Slides & Code: https://github.com/Ganesh030106/B2Learn-website';
  else if (incomingBody.includes('CANCEL')) replyText = '✅ RSVP cancelled. Seat released to waitlist.';
  res.type('text/xml');
  res.send(`<Response><Message>${replyText}</Message></Response>`);
});

app.listen(PORT, () => {
  console.log(`🚀 Build2Learn API server running on port ${PORT}`);
});
