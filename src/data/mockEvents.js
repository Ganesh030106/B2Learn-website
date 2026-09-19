export const INITIAL_EVENTS = [
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
    mapsUrl: 'https://maps.google.com/?q=Anna+University+Chennai',
    organizer: 'Build2Learn Team',
    description: 'Learn to build autonomous AI agents using Python, LangChain, Next.js, and Vercel AI SDK. Hands-on coding session with live deployment.',
    totalSeats: 60,
    rsvpedSeats: 48,
    isWaitlist: false,
    prerequisites: ['Laptop with Node.js v18+', 'Basic Python / JS knowledge'],
    carpools: [
      { id: 'cp-1', name: 'Karthik S.', type: 'offer', seats: 3, location: 'Velachery', contact: '+91 98765 12345' },
      { id: 'cp-2', name: 'Priya R.', type: 'need', location: 'Tambaram', contact: '+91 91234 56789' }
    ],
    skillsToShare: ['React', 'Python', 'TailwindCSS'],
    lightningTalks: [
      { id: 'lt-1', title: 'Deploying LLMs on Raspberry Pi in 5 Mins', speaker: 'Arun V.' }
    ]
  },
  {
    id: 'evt-102',
    title: 'Rust & WebAssembly Deep Dive Meetup',
    category: 'Meetup',
    techStack: ['Rust', 'DevOps'],
    chapter: 'Coimbatore Chapter',
    city: 'Coimbatore',
    date: '2026-09-27',
    time: '02:00 PM - 05:00 PM',
    venue: 'PSG Tech Innovation Hub, Hall 3, Coimbatore',
    mapsUrl: 'https://maps.google.com/?q=PSG+College+of+Technology',
    organizer: 'TN Tech Developers',
    description: 'Explore high-performance systems programming with Rust and how to compile Rust to WebAssembly for browser applications.',
    totalSeats: 40,
    rsvpedSeats: 40,
    isWaitlist: true,
    prerequisites: ['Systems programming interest', 'Laptop optional'],
    carpools: [
      { id: 'cp-3', name: 'Deepak M.', type: 'offer', seats: 2, location: 'Peelamedu', contact: '+91 99887 76655' }
    ],
    skillsToShare: ['Rust', 'C++', 'Wasm'],
    lightningTalks: []
  },
  {
    id: 'evt-103',
    title: 'Python Data Science & AsyncIO Sprint',
    category: 'Workshop',
    techStack: ['Python', 'AI / ML'],
    chapter: 'Chennai Chapter',
    city: 'Chennai',
    date: '2026-09-29',
    time: '11:00 AM - 03:00 PM',
    venue: 'IIT Madras Research Park, Hall A, Chennai',
    mapsUrl: 'https://maps.google.com/?q=IIT+Madras+Research+Park',
    organizer: 'Chennai Python Community',
    description: 'Deep dive into Python 3.12 performance, AsyncIO concurrency, and pandas data pipelines for high-throughput AI apps.',
    totalSeats: 80,
    rsvpedSeats: 55,
    isWaitlist: false,
    prerequisites: ['Python intermediate familiarity'],
    carpools: [],
    skillsToShare: ['Python', 'Pandas', 'FastAPI'],
    lightningTalks: []
  },
  {
    id: 'evt-104',
    title: 'Build2Learn Hackathon: Open Source for India',
    category: 'Hackathon',
    techStack: ['React / Web', 'Mobile', 'Python'],
    chapter: 'Madurai Chapter',
    city: 'Madurai',
    date: '2026-10-03',
    time: '09:00 AM - 06:00 PM',
    venue: 'Thiagarajar College of Engineering, Madurai',
    mapsUrl: 'https://maps.google.com/?q=Thiagarajar+College+of+Engineering',
    organizer: 'Build2Learn & TN Tech',
    description: 'A 1-day sprint to build open-source web and mobile tools solving local civic and education challenges in Tamil Nadu.',
    totalSeats: 100,
    rsvpedSeats: 82,
    isWaitlist: false,
    prerequisites: ['Git & GitHub profile', 'Team of 2-4 (or form teams at venue)'],
    carpools: [],
    skillsToShare: ['Mobile Dev', 'UI/UX Design', 'Node.js'],
    lightningTalks: [
      { id: 'lt-2', title: 'Designing Accessibility First for Local Languages', speaker: 'Meena K.' }
    ]
  },
  {
    id: 'evt-105',
    title: 'Mastering Docker & Kubernetes for Beginners',
    category: 'Tech Talk',
    techStack: ['DevOps'],
    chapter: 'Online',
    city: 'Online',
    date: '2026-10-08',
    time: '07:00 PM - 08:30 PM',
    venue: 'Google Meet (Link sent via SMS upon RSVP)',
    mapsUrl: 'https://meet.google.com',
    organizer: 'Build2Learn Cloud Club',
    description: 'Demystifying containerization, pod orchestration, deployment manifests, and CI/CD pipelines for modern developers.',
    totalSeats: 200,
    rsvpedSeats: 145,
    isWaitlist: false,
    prerequisites: ['Basic Linux CLI commands'],
    carpools: [],
    skillsToShare: ['Docker', 'DevOps', 'AWS'],
    lightningTalks: []
  }
];

export const INITIAL_VENUES = [
  {
    id: 'ven-1',
    name: 'Zoho Campus Community Hall',
    type: 'free',
    companySponsor: 'Zoho Corporation',
    city: 'Chennai',
    location: 'Estancia IT Park, Guduvanchery, Chennai',
    capacity: 120,
    availableDates: ['2026-09-30', '2026-10-05', '2026-10-12', '2026-10-20'],
    amenities: ['Gigabit Wi-Fi', '4K Dual Projectors', 'Central AC', 'Free Snacks & Coffee', 'Microphone System'],
    contactPerson: 'Suresh Kumar (Community Liaison)',
    contactEmail: 'venue-sponsor@zoho.com',
    contactPhone: '+91 98400 11223',
    verified: true
  },
  {
    id: 'ven-2',
    name: 'Freshworks Innovation Auditorium',
    type: 'free',
    companySponsor: 'Freshworks India',
    city: 'Chennai',
    location: 'Global Infocity, Perungudi, OMR, Chennai',
    capacity: 150,
    availableDates: ['2026-10-02', '2026-10-09', '2026-10-16'],
    amenities: ['High-speed Wi-Fi', 'Stage & Podium', 'Live Stream Rig', 'Snacks Lounge', 'Parking for 80 Cars'],
    contactPerson: 'Divya M. (Events Manager)',
    contactEmail: 'events@freshworks.com',
    contactPhone: '+91 97100 44556',
    verified: true
  },
  {
    id: 'ven-3',
    name: 'Kovai Tech Hub Seminar Suite',
    type: 'free',
    companySponsor: 'Kovai.co',
    city: 'Coimbatore',
    location: 'TIDEL Park, Civil Aerodrome Post, Coimbatore',
    capacity: 80,
    availableDates: ['2026-10-01', '2026-10-10', '2026-10-15'],
    amenities: ['Wi-Fi', 'Projector & Screen', 'Whiteboards', 'Tea/Coffee'],
    contactPerson: 'Ramesh V.',
    contactEmail: 'tech-hub@kovai.co',
    contactPhone: '+91 94433 88776',
    verified: true
  },
  {
    id: 'ven-4',
    name: 'Grand Chennai Convention Center (Hall B)',
    type: 'paid',
    city: 'Chennai',
    location: 'Mount Road, Anna Salai, Chennai',
    capacity: 300,
    pricePerDay: '₹12,000 / day',
    amenities: ['Auditorium Seating', 'Professional Sound System', 'Valet Parking', 'Catering Available'],
    managerName: 'Rajesh Sharma',
    contactPhone: '+91 98840 99887',
    contactEmail: 'bookings@grandchennaiconventions.in'
  },
  {
    id: 'ven-5',
    name: 'TIDEL Park Executive Conference Suite',
    type: 'paid',
    city: 'Coimbatore',
    location: 'Avinashi Road, Peelamedu, Coimbatore',
    capacity: 100,
    pricePerDay: '₹5,000 / day',
    amenities: ['Executive Chairs', 'HD Video Conferencing', 'High-speed Fiber Internet', 'AC Hall'],
    managerName: 'Kavitha P.',
    contactPhone: '+91 94422 11000',
    contactEmail: 'facilities@tidelparkcbe.com'
  }
];

export const INITIAL_SPEAKER_CALLS = [
  {
    id: 'spk-1',
    title: 'Looking for Python & AI Agent Specialist',
    eventTitle: 'Chennai Python & LLM Developer Meetup',
    chapter: 'Chennai Chapter',
    city: 'Chennai',
    date: '2026-10-04',
    timeSlot: '11:30 AM - 12:15 PM (45 min session)',
    topicsWanted: ['LangChain / LlamaIndex', 'Python AsyncIO', 'Local LLM Quantization (Ollama)'],
    perks: ['Travel Reimbursed', 'Community Swag Pack', 'Recorded Session Featured on YouTube'],
    organizerName: 'Anand Kumar (Build2Learn Manager)',
    organizerPhone: '+91 98765 11223',
    status: 'open',
    applicationsCount: 3
  },
  {
    id: 'spk-2',
    title: 'Keynote Speaker: Rust in Production',
    eventTitle: 'Coimbatore Systems Engineering Summit',
    chapter: 'Coimbatore Chapter',
    city: 'Coimbatore',
    date: '2026-10-18',
    timeSlot: '02:00 PM - 03:00 PM',
    topicsWanted: ['Rust WebAssembly', 'Memory Safety at Scale', 'Rust vs Go Benchmarks'],
    perks: ['VIP Speaker Pass', 'Networking Dinner', 'Speaker Trophy'],
    organizerName: 'Deepak M.',
    organizerPhone: '+91 99887 76655',
    status: 'open',
    applicationsCount: 1
  },
  {
    id: 'spk-3',
    title: 'Workshop Mentor: React 19 & Server Actions',
    eventTitle: 'Madurai Full-Stack Bootcamp',
    chapter: 'Madurai Chapter',
    city: 'Madurai',
    date: '2026-10-25',
    timeSlot: '10:00 AM - 01:00 PM (Hands-on Lab)',
    topicsWanted: ['React 19 Server Components', 'Next.js App Router', 'Tailwind v4'],
    perks: ['Honorarium Provided', 'Certificate of Recognition'],
    organizerName: 'Priya R.',
    organizerPhone: '+91 91234 56789',
    status: 'open',
    applicationsCount: 2
  }
];

export const INITIAL_SPEAKER_APPLICATIONS = [
  {
    id: 'app-1',
    callId: 'spk-1',
    speakerName: 'Sanjay Ram (Senior AI Engineer)',
    city: 'Chennai',
    talkTitle: 'Building Production-Ready Multi-Agent Swarms with Python & CrewAI',
    abstract: 'Practical walkthrough of orchestrating 5 specialized Python agents for automated code reviews and vulnerability detection.',
    experienceYears: 6,
    portfolioUrl: 'https://github.com/sanjay-ai-dev',
    phone: '+91 98401 55443',
    email: 'sanjay.ram@devtech.io',
    status: 'pending'
  }
];

export const INITIAL_QA = [
  {
    id: 'qa-1',
    eventId: 'evt-101',
    author: 'Siddharth M.',
    question: 'Will we be given free API keys for OpenAI / Anthropic during the workshop?',
    upvotes: 14,
    time: '10 mins ago',
    answered: false
  },
  {
    id: 'qa-2',
    eventId: 'evt-101',
    author: 'Ananya B.',
    question: 'Can we use Windows with WSL2 for the Next.js AI SDK setup, or is Mac required?',
    upvotes: 9,
    time: '25 mins ago',
    answered: true
  }
];

export const INITIAL_RESOURCE_VAULT = [
  {
    id: 'res-1',
    title: 'React 19 & Server Components Masterclass',
    date: '2026-08-15',
    chapter: 'Chennai Chapter',
    attendees: 54,
    slidesUrl: '#',
    githubUrl: 'https://github.com/Ganesh030106/B2Learn-website',
    recordingUrl: '#',
    badgeTitle: 'React 19 Pioneer Badge',
    tags: ['React', 'Frontend', 'Build2Learn']
  }
];
