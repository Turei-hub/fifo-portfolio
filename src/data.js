// All site content lives here. Edit this file to update the site.
// Anything set to null is hidden on the live site until you fill it in.

export const site = {
  name: 'Turei Milner',
  fullName: 'Turei Hori Reihana Milner',
  location: 'Kalgoorlie, WA',
  email: 'milner.turei@gmail.com',
  phone: null, // TODO: AU mobile, e.g. '04xx xxx xxx'
  roster: null, // TODO: e.g. 'Open to 2:1, 8/6 or 7/7'
  startDate: null, // TODO: e.g. 'Immediately' or 'From 5 January 2027'
  cvUrl: '/Turei_Milner_CV.pdf', // replace public/Turei_Milner_CV.pdf to update the download
  linkedin: 'https://www.linkedin.com/in/turei-milner-2682b5361/',
  github: 'https://github.com/Turei-hub',
  devPortfolio: 'https://turei.dev',
  studio: 'https://kaupekadigital.com',
}

export const roles = [
  {
    title: "Driller's Offsider",
    scope: 'Surface or underground, exploration or production drilling.',
    why: '15 years of hard physical work in forestry, then 10+ in construction. Chainsaw operation and maintenance, cable harvesting break-out and lineshifts. Used to heavy gear, long shifts and small crews.',
    top: true,
  },
  {
    title: 'Entry Level Underground Operator',
    scope: 'Truck operator or nipper. Happy to start on the nipper and work up.',
    why: 'ATV, motorbike and wheel tractor units, plus years on forestry landings working around machinery. Already living in Kalgoorlie, close to Goldfields operations.',
  },
  {
    title: 'Trades Assistant',
    scope: 'Workshop, maintenance or shutdown crews.',
    why: '42 construction trade unit standards: formwork, reinforcing steel, concrete, scaffolds, power tools and setting out.',
  },
  {
    title: 'Storeperson / Warehouse',
    scope: 'Site stores and logistics.',
    why: 'Current warehouse dispatcher. Picking, freight labels and stocktake on the Pronto Xi ERP system every day.',
  },
]

export const strengths = [
  {
    title: 'Safety mindset',
    body: 'Years in forestry and on construction sites, where hazard awareness and following procedure is everything. Backed by NZQA units in worksite health and safety, incident response, first aid and fire suppression.',
  },
  {
    title: 'Stores & systems',
    body: 'Day-to-day ERP use (Pronto Xi) for picking, freight labels and stocktake, which carries straight over to site stores and warehousing.',
  },
  {
    title: 'Grit & adaptability',
    body: 'Went from felling trees to building software in about a year. Picks up new gear, systems and crews quickly.',
  },
]

// TODO: fill in years and company names. null values are hidden.
export const jobs = [
  {
    dates: null, // TODO: year started at Amber Tech
    role: 'Dispatcher',
    place: 'Amber Tech warehouse · Auckland, NZ',
    points: [
      'Pick and pack orders and run dispatch using the Pronto Xi ERP system',
      'Book freight and print NZ Couriers labels',
      'Carry out stocktakes and keep stock records accurate',
    ],
  },
  {
    dates: '2025 – PRESENT',
    role: 'Founder & Full Stack Developer',
    place: 'Kaupeka Digital · Tāmaki Makaurau, NZ',
    points: [
      'Run my own digital studio, building websites and booking systems for small businesses and Māori organisations',
      'Scope projects, manage clients and deliver end to end on my own',
    ],
  },
  {
    dates: '2010 – 2025',
    role: 'Construction Worker',
    place: 'Construction sites · New Zealand',
    points: [
      'Read plans and worked to precise specifications on tight deadlines',
      'Formwork, reinforcing steel, concrete placement, scaffolding and power tools',
      'Coordinated with other trades under time pressure, with a safety-first attitude on site',
    ],
  },
  {
    dates: '1995 – 2010',
    role: 'Tree Faller / Bushman',
    place: 'Commercial forestry · Mangatū, Tairāwhiti',
    points: [
      '15 years in forestry in the Te Aitanga-a-Māhaki rohe',
      'Felled trees with a chainsaw in commercial plantation forestry, including steep country',
      'Broke out on cable harvesting crews and helped plan and carry out lineshifts',
      'Worked on the landing: poleman duties, stem processing, trimming and log making',
      'Maintained chainsaws and gear, and followed the forestry code of practice every day',
    ],
  },
]

export const tickets = [
  { name: 'NZ Full Driver Licence, Class 1 (Car)', status: 'Current · valid to 2033' },
  { name: 'Fell trees safely using a chainsaw', status: 'NZQA · Level 3 · 2013' },
  { name: 'Chainsaw operation & maintenance (commercial forestry)', status: 'NZQA · Level 3 · 2013' },
  { name: 'ATV / SPV & wheel tractor operation', status: 'NZQA · 2000' },
  { name: 'First aid (life-threatening & common conditions)', status: 'NZQA 2013 · HLTAID011 refresh planned in WA' },
  { name: 'White Card (WA)', status: 'To complete on arrival in WA' },
]

export const certificates = [
  {
    img: '/img/cert-fullstack-l4.webp',
    alt: 'Mission Ready certificate: Full Stack Developer, Certificate in Technology Product Development Essentials, Level 4',
    label: 'MISSION READY · NZQF LEVEL 4 · FEB 2026',
    title: 'Full Stack Developer, Mission Ready Accelerator',
    detail: 'Certificate in Technology Product Development Essentials (micro-credential)',
  },
  {
    img: '/img/cert-launchpad-l3.webp',
    alt: 'Mission Ready certificate: Tech Career Launchpad, Certificate in Tech Career Exploration and Development, Level 3',
    label: 'MISSION READY · NZQF LEVEL 3 · SEP 2025',
    title: 'Tech Career Launchpad',
    detail: 'Certificate in Tech Career Exploration and Development (micro-credential)',
  },
]

export const quals = [
  { issuer: 'MISSION READY · NZQA VERIFIED', title: 'NZ Diploma in Web Development and Design (Level 5)', detail: 'Achieved 5 August 2026. Certificate presented at graduation, February 2027.' },
  { issuer: 'COMPETENZ / FITEC · NZQA VERIFIED', title: 'National Certificate in Forestry (Foundation Skills) (Level 2)', detail: 'Achieved 12 December 2006.' },
  { issuer: 'MISSION READY HQ', title: 'Level 6 Diploma, Full Stack Development', detail: 'Certificate awarded at graduation, February 2027. Also a graduate of the Mission Ready internship programme.' },
  { issuer: 'MISSION READY HQ', title: 'Professional AI-Powered Full Stack Developer', detail: 'Professional credential.' },
]

export const units = [
  {
    title: 'Forestry & Tree Felling', years: '2006 – 2013', summary: '24 unit standards · 153 credits · up to Level 4',
    items: [
      'Fell trees safely using a chainsaw (L3)',
      'Operate a chainsaw and carry out maintenance in commercial forestry (L3)',
      'Break-out for cable harvesting operations, incl. production (L4)',
      'Plan and carry out lineshifts in a cable harvesting operation (L4)',
      'Process tree stems on a landing (L4)',
      'Trim and prepare felled trees for extraction (L4)',
      'Poleman functions on a cable harvesting landing (L3)',
      'Log making, and the Code of Practice for chainsaw use',
    ],
  },
  {
    title: 'Health, Safety & Emergency', years: '2002 – 2013', summary: 'Worksite safety, first aid, incident and fire response',
    items: [
      'Contribute to worksite health and safety in commercial forestry (L3)',
      'Incident response in plantation forests (L3)',
      'Provide first aid for life-threatening conditions (L2)',
      'First aid for common conditions (L2)',
      'Personal safety at vegetation fires; dry and water fire suppression (L3)',
      'Safe working practices on construction sites (L3)',
      'Protect health and safety in the workplace',
      'Hydration, nutrition and factors that impair worker performance',
    ],
  },
  {
    title: 'Construction Trades', years: '2002', summary: '42 unit standards · 95 credits · Levels 2 – 4',
    items: [
      'Use circular saws, portable power tools and hand tools on site (L3)',
      'Formwork for walls, columns, beams, slabs and stairs (L3 – L4)',
      'Fabricate and place reinforcing steel; make and place concrete (L3)',
      'Non-notifiable timber and metal scaffolds (L3)',
      'Construction equipment (L4)',
      'Setting out, spot levels and contour plans (L4)',
      'Foundations, framing, roofing, cladding and joinery (L3 – L4)',
      'Working drawings, specifications and quantity lists (L4)',
    ],
  },
  {
    title: 'Vehicles & Machinery', years: '2000', summary: 'Off-road vehicle and tractor operation',
    items: [
      'Ride an ATV / SPV on flat and undulating terrain (L2 – L3)',
      'Ride an ATV / SPV with a trailed implement (L3)',
      'Ride an ATV / SPV with mounted equipment or a load (L3)',
      'Ride a motorcycle on flat country and undulating terrain (L2 – L3)',
      'Check and drive a basic wheel tractor (L2)',
    ],
  },
  {
    title: 'Agriculture', years: '2000', summary: '11 unit standards · 26 credits',
    items: [
      'Handle livestock when droving, drafting and when distressed (L3)',
      'Carry out milking routines (L3)',
      'Install electric fence components and temporary fences (L2)',
    ],
  },
  {
    title: 'Signmaking', years: '2000', summary: '3 unit standards · 26 credits',
    items: [
      'Safe working practices in signmaking (L2)',
      'Prepare surfaces and apply coatings (L2)',
    ],
  },
]

export const projects = [
  {
    name: '2 Little Leashes', tag: 'LIVE CLIENT SITE · ROTORUA',
    detail: 'Booking platform for a Rotorua dog-walking business. Public site plus an admin dashboard where the owner manages bookings, photos, reviews and live pricing.',
    imgs: [
      { src: '/img/2ll-home.webp', alt: '2 Little Leashes home page' },
      { src: '/img/2ll-admin.webp', alt: '2 Little Leashes admin dashboard, site content and pricing editor' },
    ],
    url: 'https://2littleleashes.co.nz', linkLabel: 'Visit site',
  },
  {
    name: 'Racket Up', tag: 'CLIENT BUILD · SOLE DEVELOPER',
    detail: 'Website and parent portal for a badminton academy teaching kids aged 5 to 14. Sole developer on a 10-week build.',
    imgs: [{ src: '/img/racket-up.webp', alt: 'Racket Up Badminton Academy home page' }],
    url: 'https://racketup.co.nz', linkLabel: 'Visit site',
  },
  {
    name: 'Te Hapori Matihiko', tag: 'CLIENT BUILD',
    detail: 'Website rebuild for Te Hapori Matihiko, including the pages for Aotearoa’s Indigenous Tech Summit.',
    imgs: [{ src: '/img/matihiko.webp', alt: 'Te Hapori Matihiko website, Indigenous Tech Summit banner' }],
    url: 'https://matihiko.nz', linkLabel: 'Visit site',
  },
  {
    name: 'Te Pātaka o Mangatū', tag: 'COMMUNITY PROJECT · DEMO',
    detail: 'A storehouse for my marae’s data. Everything is encrypted in the browser before it leaves the device, so only the passphrase holder can open an entry.',
    imgs: [{ src: '/img/te-pataka.webp', alt: 'Te Pātaka o Mangatū demo home page' }],
    url: 'https://te-pataka-o-mangatu.vercel.app', linkLabel: 'View demo'
  },
  {
    name: 'Phone Ninja', tag: 'SMALL BUSINESS SITE',
    detail: 'Website for a Bay of Plenty phone repair business, with repair bookings, an equipment page and popular phone pages.',
    imgs: [{ src: '/img/phone-ninja.webp', alt: 'Phone Ninja equipment page' }],
    url: null, // TODO: add link if live
  },
  {
    name: 'Kaupeka Digital', tag: 'MY STUDIO',
    detail: 'My own digital studio, building websites and SaaS products for NZ businesses and Māori organisations.',
    imgs: [{ src: '/img/kaupeka.webp', alt: 'Kaupeka Digital home page' }],
    url: 'https://kaupekadigital.com', linkLabel: 'Visit site',
  },
  {
    name: 'Bush to Browser', tag: 'COURSE',
    detail: 'An 8-week course teaching beginners to build websites with AI, taught by a former tree faller who made the same jump.',
    imgs: [{ src: '/img/bush-to-browser.webp', alt: 'Bush to Browser course home page' }],
    url: 'https://bush-to-browser.vercel.app', linkLabel: 'Visit site'
  },
  {
    name: 'turei.dev', tag: 'DEVELOPER PORTFOLIO',
    detail: 'My developer portfolio, with projects, learning outcomes and CV.',
    imgs: [{ src: '/img/turei-dev.webp', alt: 'turei.dev developer portfolio home page' }],
    url: 'https://turei.dev', linkLabel: 'Visit turei.dev',
  },
  {
    name: 'GitHub', tag: 'CODE',
    detail: '42 repositories. All my code is up there to check, including this site.',
    imgs: [{ src: '/img/github.webp', alt: 'Turei-hub GitHub profile' }],
    url: 'https://github.com/Turei-hub', linkLabel: 'View GitHub',
  },
]
