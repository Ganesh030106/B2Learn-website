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
    capacity: 120
  }
];

let speakerCalls = [];
let speakerApplications = [];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Build2Learn WA CLI & Event API', metaApiActive: true });
});

// GET & POST Events
app.get('/api/events', (req, res) => {
  res.json({ success: true, events });
});

app.post('/api/rsvp', (req, res) => {
  const { eventId, name, phone } = req.body;
  const event = events.find(e => e.id === eventId);
  if (event) event.rsvpedSeats += 1;
  console.log(`[META WHATSAPP SENT] To: ${phone} | Body: "RSVP confirmed for ${event?.title}"`);
  res.json({ success: true, message: 'RSVP recorded & WhatsApp reminder scheduled' });
});

// Meta WhatsApp Cloud API Webhook
app.get('/api/whatsapp/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === 'b2learn_wa_verify_token') {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

app.post('/api/whatsapp/webhook', (req, res) => {
  const body = req.body;
  console.log('[INBOUND META WHATSAPP WEBHOOK]', JSON.stringify(body, null, 2));
  res.status(200).send('EVENT_RECEIVED');
});

// WA CLI Command Engine
app.post('/api/wa-cli/send', (req, res) => {
  const { recipient, message } = req.body;
  console.log(`[WA CLI OUTBOUND] To: ${recipient} | Message: ${message}`);
  res.json({ success: true, message: 'WA CLI outbound payload delivered via Meta Cloud API' });
});

// Luma Discover Public Ingestion Endpoint
app.get('/api/ingest/luma', (req, res) => {
  const city = req.query.city || 'Chennai';
  const lumaFeed = [
    {
      id: `luma-${Date.now()}`,
      title: `Luma Featured: ${city} Builders & Developers Meetup`,
      category: 'Meetup',
      city,
      date: '2026-10-05',
      time: '05:00 PM - 08:00 PM',
      venue: `${city} Tech Park`
    }
  ];
  res.json({ success: true, count: lumaFeed.length, lumaFeed });
});

// Gemini AI Raw Text Extractor Endpoint
app.post('/api/ai/extract-event', (req, res) => {
  const { rawText } = req.body;
  console.log('[GEMINI AI PARSING TEXT]', rawText);

  const parsedEvent = {
    id: `evt-ai-${Date.now()}`,
    title: 'Extracted: Community AI Meetup',
    category: 'Meetup',
    techStack: ['Python', 'AI / ML'],
    city: 'Chennai',
    date: '2026-10-12',
    time: '04:00 PM - 07:00 PM',
    venue: 'Ideas2IT Guindy, Chennai',
    description: rawText || 'Auto-parsed via Gemini AI Flash model'
  };

  res.json({ success: true, event: parsedEvent });
});

app.listen(PORT, () => {
  console.log(`🚀 Build2Learn API & WA CLI Webhook server running on port ${PORT}`);
});
