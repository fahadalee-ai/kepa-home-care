import { IMAGES } from "./images";

export type AppointmentStatus = "upcoming" | "completed" | "cancelled";
export type CareRole = "patient" | "family";
export type TimeOfDay = "morning" | "afternoon" | "evening";
export type Recurrence = "once" | "weekly" | "multiple";
export type ContactMethod = "phone" | "email" | "text";
export type BookingFor = "myself" | "someone";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  dob?: string;
  role?: CareRole;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  preferredContact?: ContactMethod;
};

export type Service = {
  id: string;
  name: string;
  short: string;
  description: string;
  image: string;
  who: string;
  includes: string[];
};

export type CoverageArea = {
  id: string;
  name: string;
  city: string;
  note: string;
  image: string;
};

export type Appointment = {
  id: string;
  userId: string;
  serviceId: string;
  areaId: string;
  date: string;
  time: string;
  timeOfDay: TimeOfDay;
  recurrence: Recurrence;
  name: string;
  phone: string;
  email: string;
  contactMethod: ContactMethod;
  bookingFor: BookingFor;
  patientName: string;
  patientDob: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
  medicalNotes: string;
  insurance: string;
  selfPay: boolean;
  status: AppointmentStatus;
  createdAt: string;
};

export type BookingDraft = {
  serviceId: string;
  servicePreset: boolean;
  areaId: string;
  bookingFor: BookingFor;
  patientName: string;
  patientDob: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  medicalNotes: string;
  insurance: string;
  selfPay: boolean;
  date: string;
  time: string;
  timeOfDay: TimeOfDay | "";
  recurrence: Recurrence;
  notes: string;
  name: string;
  phone: string;
  email: string;
  contactMethod: ContactMethod;
};

export const BUSINESS = {
  name: "KEPA Home Care, LLC",
  tagline: "Quality home care services, you can trust",
  phone: "(774)-243-1000",
  phoneHref: "tel:+17742431000",
  altPhone: "774-568-3899",
  altPhoneHref: "tel:+17745683899",
  email: "kepa.homecare@gmail.com",
  emailHref: "mailto:kepa.homecare@gmail.com",
  address: "101 Pleasant St, Suite 209",
  cityLine: "Worcester, MA 01609",
  fullAddress: "101 Pleasant St, Suite 209, Worcester, MA 01609",
  mapsHref:
    "https://maps.google.com/?q=101+Pleasant+St+Suite+209+Worcester+MA+01609",
  hours: "9am – 5pm",
  officeLine: "101 Pleasant St, Suite 209, Worcester, MA 01609 | (774)-243-1000 | Office Hours: 9am–5pm",
} as const;

export const SERVICES: Service[] = [
  {
    id: "skilled-nursing",
    name: "Skilled Nursing",
    short: "Clinical nursing care in the comfort of home",
    description:
      "KEPA Home Care brings skilled nursing to your doorstep so you can recover and stay well without a hospital stay. Our nurses deliver clinical care with the warmth of a home visit.",
    image: IMAGES.skilledNursing,
    who: "Patients recovering from surgery, managing a chronic condition, or needing clinical oversight at home in Massachusetts.",
    includes: [
      "Wound care",
      "Medication management",
      "Health monitoring",
      "Post-surgical care",
      "Chronic disease management",
    ],
  },
  {
    id: "home-health-aide",
    name: "Home Health Aide Services",
    short: "Daily support that keeps life at home possible",
    description:
      "Certified home health aides help with the routines of daily living so clients can remain safely at home. Care is personal, patient, and built around each household.",
    image: IMAGES.homeHealthAide,
    who: "Older adults and anyone who needs hands-on help with bathing, dressing, meals, and mobility at home.",
    includes: [
      "Personal care and bathing",
      "Dressing and grooming",
      "Meal preparation",
      "Mobility and transfer assistance",
      "Light homemaking and companionship",
    ],
  },
  {
    id: "physical-therapy",
    name: "Physical Therapy",
    short: "Mobility and strength, practiced in your living room",
    description:
      "In-home physical therapy helps you regain mobility and independence after injury or illness. Sessions happen where you actually live and move.",
    image: IMAGES.physicalTherapy,
    who: "People rebuilding strength after injury, surgery, or a decline in balance and walking.",
    includes: [
      "Mobility and gait training",
      "Strength and balance exercises",
      "Pain management",
      "Post-injury recovery",
      "Home safety and fall-prevention coaching",
    ],
  },
  {
    id: "occupational-therapy",
    name: "Comprehensive In-Home Occupational Therapy Services",
    short: "Everyday activities made safer and more independent",
    description:
      "Occupational therapy focuses on the activities that make a day work — dressing, bathing, cooking, and getting around the house with more confidence.",
    image: IMAGES.occupationalTherapy,
    who: "Clients who want to stay independent with daily routines after illness, injury, or a change in ability.",
    includes: [
      "Activities of daily living",
      "Adaptive equipment guidance",
      "Home environment adjustments",
      "Energy conservation strategies",
      "Caregiver training for daily routines",
    ],
  },
];

export const COVERAGE_AREAS: CoverageArea[] = [
  {
    id: "worcester",
    name: "Worcester and surrounding areas",
    city: "Worcester",
    note: "Clients in Worcester describe skilled nursing that is tailored to their specific needs.",
    image: IMAGES.areaWorcester,
  },
  {
    id: "boston",
    name: "Boston and surrounding areas",
    city: "Boston",
    note: "Boston families have trusted KEPA for compassionate, expert in-home support.",
    image: IMAGES.areaBoston,
  },
  {
    id: "lowell",
    name: "Lowell and surrounding areas",
    city: "Lowell",
    note: "Lowell clients highlight in-home physical therapy and home health aides who made recovery manageable.",
    image: IMAGES.areaLowell,
  },
  {
    id: "springfield",
    name: "Springfield and surrounding areas",
    city: "Springfield",
    note: "Springfield families note skilled nursing that is both highly skilled and patient.",
    image: IMAGES.areaSpringfield,
  },
];

export const OUTSIDE_AREA_NOTE =
  "We currently serve these Massachusetts regions. Contact us to check availability near you.";

export const ONBOARDING = [
  {
    title: "15 Years of Experience in Home Care",
    body: "Massachusetts' trusted source for comprehensive in-home healthcare solutions.",
    image: IMAGES.nurseHome,
    alt: "Nurse caring for an elderly patient at home",
  },
  {
    title: "Expert Care, Right at Your Doorstep",
    body: "Skilled Nursing, Home Health Aide, Physical Therapy & Occupational Therapy — all in the comfort of your home.",
    image: IMAGES.ptHome,
    alt: "Physical therapist assisting a patient with mobility exercises at home",
  },
  {
    title: "In-Home Care That Elevates the Human Spirit",
    body: "A dedicated team of healthcare professionals committed to your well-being.",
    image: IMAGES.familySmile,
    alt: "Caregiver and family smiling together",
  },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Dedicated Team",
    body: "Experienced healthcare professionals committed to delivering quality in-home healthcare solutions",
  },
  {
    title: "Medical & Health",
    body: "Top-quality in-home healthcare services, including skilled nursing, therapy, and comprehensive medical solutions",
  },
  {
    title: "Exclusive Support",
    body: "Dedicated support ensuring the well-being and healthcare needs of our clients are met with excellence",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Linda M.",
    city: "Boston, MA",
    quote:
      "I can't express how grateful I am for the exceptional social work services at KEPA Home Care. Their licensed clinical social workers in Boston helped me navigate a challenging period in my life with compassion and expertise. They made me feel heard, supported, and empowered to overcome my challenges. Thank you, KEPA Home Care!",
  },
  {
    name: "John P.",
    city: "Lowell, MA",
    quote:
      "The in-home physical therapists at KEPA Home Care were a true blessing for my recovery. Their expertise and dedication helped me regain mobility and independence after a serious injury. I'm grateful for the convenience of in-home care and the excellent care I received.",
  },
  {
    name: "Sandra R.",
    city: "Springfield, MA",
    quote:
      "KEPA Home Care's skilled nursing services in Springfield made a significant difference in my mother's life. The caregivers were not only highly skilled but also compassionate and patient. Their commitment to her well-being was evident in every interaction.",
  },
  {
    name: "David S.",
    city: "Worcester, MA",
    quote:
      "I couldn't have asked for a better team of healthcare professionals. KEPA Home Care's skilled nursing services in Worcester were top-notch. The care and support provided were exceptional. They made sure I received the best care tailored to my specific needs.",
  },
  {
    name: "Elizabeth H.",
    city: "Lowell, MA",
    quote:
      "I was fortunate to have KEPA Home Care's in-home health aides in Lowell. Their kindness and expertise in caring for my father were truly remarkable. They made a challenging time in our lives much more manageable. I highly recommend their services.",
  },
] as const;

export const ABOUT =
  "At KEPA Home Care, LLC, we are your trusted source for top-rated healthcare services in Massachusetts, specializing in comprehensive in-home healthcare solutions. Our team of dedicated professionals is committed to providing expert care and support, making us a leading name in the field of comprehensive home health care. We understand that the comfort and familiarity of home are invaluable, especially when it comes to healthcare. That’s why we bring the highest quality healthcare services right to your doorstep.";

export const TEAM = [
  {
    role: "Registered Nurses",
    focus: "Skilled Nursing",
    image: IMAGES.teamNurse,
    body: "Experienced nurses delivering clinical care — wound care, medication management, and health monitoring — in the home.",
  },
  {
    role: "Certified Home Health Aides",
    focus: "Daily living support",
    image: IMAGES.teamAide,
    body: "Aides who help with personal care, meals, and companionship so clients can stay safely at home.",
  },
  {
    role: "Licensed Physical Therapists",
    focus: "Physical Therapy",
    image: IMAGES.teamPt,
    body: "Therapists who rebuild mobility, strength, and balance through sessions in the living room, not a clinic.",
  },
  {
    role: "Licensed Occupational Therapists",
    focus: "Occupational Therapy",
    image: IMAGES.teamOt,
    body: "Therapists who make daily activities safer and more independent, right where those activities happen.",
  },
] as const;

export const STATS = [
  { label: "Customer Satisfaction", value: 98, suffix: "%" },
  { label: "Expert Staff", value: 40, suffix: "+" },
  { label: "Projects Completed", value: 1200, suffix: "+" },
  { label: "Award Wins", value: 12, suffix: "+" },
] as const;

export const TIME_OF_DAY: { id: TimeOfDay; label: string }[] = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
];

export const RECURRENCE: { id: Recurrence; label: string }[] = [
  { id: "once", label: "One-time" },
  { id: "weekly", label: "Weekly" },
  { id: "multiple", label: "Multiple times per week" },
];

export const TIME_SLOTS = ["09:00", "13:00", "17:00"] as const;

export const BOOKING_STEPS = ["Service", "Area", "Schedule", "Review"] as const;

export function accountBookingPatch(user: User): Partial<BookingDraft> {
  return {
    bookingFor: "myself",
    patientName: user.name,
    patientDob: user.dob ?? "",
    address: user.address ?? "",
    city: user.city ?? "",
    state: user.state || "MA",
    zip: user.zip ?? "",
    name: user.name,
    phone: user.phone,
    email: user.email,
    contactMethod: user.preferredContact ?? "phone",
  };
}

export const emptyDraft = (): BookingDraft => ({
  serviceId: "",
  servicePreset: false,
  areaId: "",
  bookingFor: "myself",
  patientName: "",
  patientDob: "",
  address: "",
  city: "",
  state: "MA",
  zip: "",
  medicalNotes: "",
  insurance: "",
  selfPay: false,
  date: "",
  time: "",
  timeOfDay: "",
  recurrence: "once",
  notes: "",
  name: "",
  phone: "",
  email: "",
  contactMethod: "phone",
});

export const seedUsers: User[] = [
  {
    id: "u1",
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "(774) 555-0142",
    password: "Care1234",
    dob: "1958-04-12",
    role: "patient",
    address: "18 Elm Street",
    city: "Worcester",
    state: "MA",
    zip: "01609",
    preferredContact: "phone",
  },
];

function isoDaysFromToday(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export const seedAppointments: Appointment[] = [
  {
    id: "apt1",
    userId: "u1",
    serviceId: "skilled-nursing",
    areaId: "worcester",
    date: isoDaysFromToday(5),
    time: "09:00",
    timeOfDay: "morning",
    recurrence: "weekly",
    name: "Maria Santos",
    phone: "(774) 555-0142",
    email: "maria@example.com",
    contactMethod: "phone",
    bookingFor: "myself",
    patientName: "Maria Santos",
    patientDob: "1958-04-12",
    address: "18 Elm Street",
    city: "Worcester",
    state: "MA",
    zip: "01609",
    notes: "Please call when you arrive.",
    medicalNotes: "Post-surgical wound check.",
    insurance: "",
    selfPay: false,
    status: "upcoming",
    createdAt: isoDaysFromToday(-2),
  },
];

export function serviceById(id: string) {
  return SERVICES.find((s) => s.id === id);
}

export function areaById(id: string) {
  return COVERAGE_AREAS.find((a) => a.id === id);
}

export function timeOfDayLabel(id: string) {
  return TIME_OF_DAY.find((t) => t.id === id)?.label ?? id;
}

export function recurrenceLabel(id: string) {
  return RECURRENCE.find((t) => t.id === id)?.label ?? id;
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatDateLong(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(hhmm: string) {
  if (!hhmm.includes(":")) return hhmm;
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function todayIso() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
}

export function roleLabel(role?: CareRole) {
  if (role === "family") return "Family Member / Caregiver";
  if (role === "patient") return "Patient";
  return "";
}

export function statusLabel(status: AppointmentStatus) {
  if (status === "upcoming") return "Upcoming";
  if (status === "completed") return "Completed";
  return "Cancelled";
}

export type NotificationKind = "appointment" | "reminder" | "system";

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  detail: string;
  time: string;
  read: boolean;
  kind: NotificationKind;
  cta?: { label: string; to: string; params?: Record<string, string> };
};

export type ChatThread = {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  unread: number;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  from: "me" | "them";
  text: string;
  time: string;
};

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "Visit request received",
    body: "Your skilled nursing visit in Worcester is being reviewed by our care team.",
    detail:
      "Our care team will contact you within 24 hours to confirm your in-home visit. Office hours are 9am–5pm at (774)-243-1000.",
    time: "2h ago",
    read: false,
    kind: "appointment",
    cta: { label: "View appointment", to: "/appointments/$id", params: { id: "apt1" } },
  },
];

export const CHAT_THREADS: ChatThread[] = [
  {
    id: "care",
    name: "KEPA Care Team",
    role: "Scheduling",
    preview: "We received your visit request and will confirm within 24 hours.",
    time: "9:40 AM",
    unread: 1,
  },
  {
    id: "support",
    name: "KEPA Support",
    role: "Office",
    preview: "Office hours are 9am–5pm. Call (774)-243-1000 if you need us sooner.",
    time: "Yesterday",
    unread: 0,
  },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    threadId: "care",
    from: "them",
    text: "Hello — this is the KEPA care team. How can we help with your in-home visit?",
    time: "9:12 AM",
  },
  {
    id: "m2",
    threadId: "care",
    from: "me",
    text: "I sent a request for skilled nursing in Worcester.",
    time: "9:28 AM",
  },
  {
    id: "m3",
    threadId: "care",
    from: "them",
    text: "We received your visit request and will confirm within 24 hours.",
    time: "9:40 AM",
  },
  {
    id: "m4",
    threadId: "support",
    from: "them",
    text: "KEPA Home Care — office hours are 9am–5pm at 101 Pleasant St, Suite 209, Worcester.",
    time: "Yesterday",
  },
  {
    id: "m5",
    threadId: "support",
    from: "them",
    text: "Call (774)-243-1000 or 774-568-3899 if you need us sooner.",
    time: "Yesterday",
  },
];

export function notificationById(id: string) {
  return NOTIFICATIONS.find((n) => n.id === id);
}

export function chatThreadById(id: string) {
  return CHAT_THREADS.find((t) => t.id === id);
}

export function messagesForThread(threadId: string) {
  return CHAT_MESSAGES.filter((m) => m.threadId === threadId);
}

export function unavailableSlotsForDate(_iso: string) {
  return [] as string[];
}
