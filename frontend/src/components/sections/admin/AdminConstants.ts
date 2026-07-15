export const APPOINTMENTS_DATA: any[] = [];
export const REVIEWS_DATA: any[] = [];
export const PHOTOS_DATA: any[] = [];

export const INITIAL_SERVICES = [
  {
    id: 1,
    name: "Medical Checkup",
    tag: "Clinic",
    hours: "08:00 – 17:00",
    desc: "Comprehensive health screening including blood work, vitals, and consultation.",
    color: "#65A396",
    active: true,
  },
  {
    id: 2,
    name: "Spa & Recovery",
    tag: "Wellness",
    hours: "09:00 – 21:00",
    desc: "Therapeutic massage and reflexology tailored for post-trek muscle recovery.",
    color: "#604C3A",
    active: true,
  },
  {
    id: 3,
    name: "Emergency Care",
    tag: "Emergency",
    hours: "24 Hours",
    desc: "Round-the-clock emergency response for altitude sickness, injuries, and acute illness.",
    color: "#D95E57",
    active: true,
  },
  {
    id: 4,
    name: "Home Visit",
    tag: "On-Call",
    hours: "08:00 – 20:00",
    desc: "Our doctors come to your accommodation for consultations and treatment.",
    color: "#65A396",
    active: true,
  },
  {
    id: 5,
    name: "Laboratory Diagnostics",
    tag: "Lab",
    hours: "08:00 – 16:00",
    desc: "In-house blood tests, urinalysis, and rapid diagnostics for faster results.",
    color: "#5B85D4",
    active: false,
  },
];

export const NOTIFS = [
  {
    id: 1,
    icon: "📅",
    title: "New appointment",
    body: "Dian Rahayu – Apr 16, 09:00",
    time: "10 min ago",
    read: false,
  },
  {
    id: 2,
    icon: "⭐",
    title: "New review",
    body: "Bagas S. left a 4-star review",
    time: "1 hr ago",
    read: false,
  },
  {
    id: 3,
    icon: "⏳",
    title: "Pending booking",
    body: "Rizki Pratama awaiting confirm",
    time: "2 hrs ago",
    read: false,
  },
  {
    id: 4,
    icon: "📧",
    title: "New email",
    body: "Dewi Kusuma – rescheduling req",
    time: "3 hrs ago",
    read: true,
  },
];
