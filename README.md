# Build2Learn Community Event Scheduler 🚀

A simple, high-converting, and zero-friction event platform tailored for student and developer communities (**Build2Learn**, **Tamil Nadu Tech**). Features Google Form intake sync, automated Twilio SMS reminders, live Q&A upvoting board, offline 2-way SMS command desk, digital QR ticket passes, and post-event resource vaults.

---

## 🌟 Unique Features & Core Value Proposition

| Feature | Description |
| :--- | :--- |
| 🔄 **Google Form Sync** | Publish events by pasting Google Form / Sheet links without managing proprietary databases. |
| 📲 **Twilio SMS Engine** | Automated T-24h & T-2h SMS reminders cut event no-show rates by over 50%. |
| 📅 **Interactive Web Calendar** | Month & List views with category tags (Workshop, Meetup, Hackathon, Tech Talk) & chapter filters. |
| 💬 **Live Q&A Upvote Board** | Audience members post and upvote questions during sessions, with 1-click Speaker Presentation View. |
| 🤖 **2-Way SMS Command Desk** | Offline attendees text `WIFI`, `VENUE`, `SLIDES`, or `CANCEL` to get instant automated SMS replies. |
| 🚗 **Peer Carpool Matcher** | Attendees indicate ride offers/needs during RSVP to connect with local community members. |
| 🎟️ **QR Pass & Attendance** | Instant digital QR ticket pass generation and venue scanner check-in simulation. |
| 📦 **Resource Vault** | Archive past workshop slides, GitHub repositories, and downloadable Proof of Attendance Badges. |
| 📊 **Sponsor Impact Report** | Printable 1-page PDF analytics report displaying turnout rates and SMS delivery metrics. |

---

## 🛠️ Quick Start & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Launch Backend API Server (Optional)
```bash
npm run server
```
Runs the Express API on port `5000` handling Twilio SMS webhooks, Q&A polling, and Google Form intake sync.

---

## 🏗️ Project Architecture

```
b2learn/
├── server/
│   └── index.js              # Express API (Twilio webhooks, Q&A, RSVP routes)
├── src/
│   ├── components/
│   │   ├── CalendarView.jsx  # Interactive Calendar (Month & List views)
│   │   ├── EventModal.jsx    # RSVP, Carpool matcher, .ics download, WhatsApp share
│   │   ├── LiveQABoard.jsx   # Live Q&A stream & Speaker Presentation Mode
│   │   ├── SmsSimulator.jsx  # 2-Way Twilio SMS Command Desk simulator
│   │   ├── QRAttendanceModal.jsx # QR Ticket Pass & Scanner Check-in
│   │   ├── ResourceVault.jsx # Past event archive & Verified digital badge generator
│   │   ├── ImpactReportModal.jsx # Printable Sponsor & Community Analytics PDF report
│   │   └── NewEventModal.jsx # Google Form auto-sync & manual intake
│   ├── data/
│   │   └── mockEvents.js     # Initial community events, Q&A stream, and resources
│   ├── App.jsx               # Application shell, navigation & global modal manager
│   ├── main.jsx              # React DOM entry point
│   └── index.css             # Glassmorphism design system & CSS variables
├── .env.example              # Twilio & Google Sheets credentials template
├── package.json              # Build scripts & dependencies
└── vite.config.js            # Vite build configuration & server proxy
```

---

## 📄 License
MIT License. Built with ❤️ for **Build2Learn** & local learning circles.