import { Stat, SkillNode, Experience, Quest, WarpPoint, EquipmentItem, PassiveSkill, PassiveCategory, LoreLink, SpectrumTrait } from './types';

/**
 * Combat attributes — derived from operative spectrum + class passives.
 * INT ← Vision / Blueprint · SPD ← Omni-Stance · ATK ← Logic / Backend · DEF ← Plan / DevOps · LUK ← Harvest rhythm
 */
export const DEFAULT_STATS: Stat[] = [
  {
    name: 'ATK',
    label: 'Backend Strike',
    value: 86,
    baseValue: 86,
    bonusValue: 0,
    description:
      'Server-side power: Laravel payment rails, legacy PHP trenches, and Golang microservices. Logic-leaning but not at the cost of reading the room.',
    maxVal: 100,
  },
  {
    name: 'DEF',
    label: 'Ops & Legacy Fortitude',
    value: 83,
    baseValue: 83,
    bonusValue: 0,
    description:
      'CI/CD shields, GCP/Azure ramparts, and immunity to [Obsolescence]—stable under bare-metal and off-grid routing alike.',
    maxVal: 100,
  },
  {
    name: 'SPD',
    label: 'Full-Stack Agility',
    value: 89,
    baseValue: 89,
    bonusValue: 0,
    description:
      'Zero penalty switching between Vue/Svelte reactive stances and 3D WebGL canvas work. Frontend delivery stays fluid end-to-end.',
    maxVal: 100,
  },
  {
    name: 'INT',
    label: 'System Architecture',
    value: 91,
    baseValue: 91,
    bonusValue: 0,
    description:
      'Systemic Oracle range: maps multi-tenancy, schema drift, and full tech trees before the first commit. Dominant Vision + Blueprint trait.',
    maxVal: 100,
  },
  {
    name: 'LUK',
    label: 'Energy Conservation',
    value: 58,
    baseValue: 58,
    bonusValue: 0,
    description:
      'Specialized stamina pool—sustained grind drains faster than average. Offset by [Rhythm of the Harvest] and deep-focus solitude windows.',
    maxVal: 100,
  },
];

export const PROFILE_LANDING = {
  headline: 'Equipping your project with resilient architecture and polished interactive experiences.',
  summary:
    'Adding me to your roster means securing a systemic oracle for your tech stack. You get cohesive, end-to-end stability—eliminating the disconnect between your server ops, backend logic, and client-side UI. Whether rescuing legacy Linux infrastructure, forging heavy-duty API hubs in Laravel and Go, or shipping lightning-fast Svelte and WebGL frontends, I provide the strategic oversight and seamless execution needed to bulletproof your next launch.',
  niches: [
    'Laravel & PHP backends',
    'Vue / Svelte frontends',
    'GCP & DevOps delivery',
    'NLP & data pipelines',
    'Creative / 3D web experiences',
  ],
};

export const FICTIONAL_TITLES = [
  'Architect Projector',
  'Full-Stack Spellblade',
  'Backend Necromancer',
  'Omni-Stance Ranger',
  'DevOps Fortress Guardian',
  'Scrollbinding Code Artisan',
  'Motion Comic Enchanter',
  'Lexicon Alchemist of Banten',
  'Filament Panel Summoner',
  'Legacy Whisperer',
  'Ultra Archmage Deity',
];

export const PASSIVE_SKILL_GROUPS: { id: PassiveCategory; label: string; subtitle: string }[] = [
  { id: 'class', label: 'Class Passives', subtitle: 'Architect / Projector' },
  { id: 'combat', label: 'Combat Passives', subtitle: 'Engineering & DevOps' },
  { id: 'exploration', label: 'Exploration Passives', subtitle: 'Life & Stamina' },
];

export const PASSIVE_SKILLS: PassiveSkill[] = [
  {
    id: 'domain-expansion-solitude',
    name: 'Domain Expansion: Solitude',
    category: 'class',
    passiveType: 'Innate Passive',
    element: 'Void',
    effect:
      'Grants +50% Efficiency and +30% Architecture to complex builds (e.g., Multi-tenancy, 3D WebGL) when operating in a localized environment with zero party members.',
    lore:
      'A true Architect requires silence to weave complex code. When isolated, problem-solving capabilities overclock. Warning: Sudden physical interruptions inflict a temporary [Frustrated] debuff, pausing SP regeneration.',
  },
  {
    id: 'systemic-oracle',
    name: 'Systemic Oracle',
    category: 'class',
    passiveType: 'Aura Passive',
    element: 'Mind',
    effect:
      'Automatically scans the macro-environment for structural vulnerabilities, misaligned database schemas, or legacy code decay without requiring an active perception check.',
    lore:
      "Inherently sees how fragmented systems connect. Rather than grinding endlessly, this unit provides massive AoE buffs to a squad's overall timeline and efficiency simply by observing and guiding the system's architecture.",
  },
  {
    id: 'crest-of-blueprint',
    name: 'Crest of the Blueprint',
    category: 'class',
    passiveType: 'Trait',
    element: 'Light',
    effect: '+20 Resistance against the [Hype] and [Scope Creep] status ailments.',
    lore:
      'Values the original, foundational soul of a system over flashy, surface-level reboots. A tactical judging trait that naturally calculates the entire tech tree—from bare-metal servers to the frontend DOM—before the first line of code is ever executed.',
  },
  {
    id: 'omni-stance-full-stack',
    name: 'Omni-Stance: Full Stack',
    category: 'combat',
    passiveType: 'Combat Passive',
    element: 'Lightning',
    effect:
      'Completely eliminates the stamina penalty normally incurred when switching stances between [Frontend Reactive] (Svelte, React) and [Backend Logic] (Golang, Laravel).',
    lore:
      'Why master a single weapon when you can wield the entire armory? The transition from writing server-side payment integrations to manipulating 3D canvas coordinates is completely seamless.',
  },
  {
    id: 'legacy-whisperer',
    name: 'Legacy Whisperer',
    category: 'combat',
    passiveType: 'Combat Passive',
    element: 'Earth',
    effect:
      'Grants immunity to the [Obsolescence] debuff. Allows the caster to interface with ancient artifacts (CentOS 6, bare-metal enterprise Linux) without suffering sanity drain.',
    lore:
      'While the rest of the guild flees to the cloud, this unit holds the line in the deep trenches. A master of forgotten scripts, capable of stabilizing foundational architectures when the rest of the world has moved on.',
  },
  {
    id: 'async-persistence',
    name: 'Asynchronous Persistence',
    category: 'combat',
    passiveType: 'Tactical Passive',
    element: 'Shadow',
    effect:
      'Nullifies the "No Public IP" debuff in remote environments. +50 Routing to isolated data packets.',
    lore:
      'A master of data synchronization. Possesses an uncanny knack for establishing secure tunnels and routing critical transaction data out of isolated, off-grid locations to central command hubs.',
  },
  {
    id: 'rhythm-of-harvest',
    name: 'Rhythm of the Harvest',
    category: 'exploration',
    passiveType: 'Recovery Passive',
    element: 'Nature',
    effect:
      'Compensates for a highly specialized, undefined stamina pool. Engaging in non-combat crafting—specifically [Botanical Cultivation] or [Culinary Optimization]—triggers rapid SP Restoration.',
    lore:
      'Sustained, repetitive grinding drains HP faster than normal. To counter this, this unit relies on strict energy conservation. Tending to delicate crops and refining local seafood into high-tier sustenance ensures they always return to the frontline at peak output.',
  },
];

export const LORE_LINKS: LoreLink[] = [
  {
    id: 'cv',
    label: 'CV',
    url: '/cv',
    icon: 'FileText',
    blurb: 'Scroll of Vitae',
  },
  {
    id: 'profile',
    label: 'Profile',
    url: '/profile',
    icon: 'User',
    blurb: 'Profile Keep',
  },
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/rivaiamin',
    icon: 'Github',
    blurb: 'Code Forge',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rivaiamin/',
    icon: 'Linkedin',
    blurb: 'Guild Hall',
  },
  {
    id: 'sketchfab',
    label: 'Sketchfab',
    url: 'https://sketchfab.com/rivaiamin',
    icon: 'Box',
    blurb: 'Model Atelier',
  },
];

/**
 * Operative spectrum — 4 opposing pairs (8 axes).
 * Values sourced from personality assessment; labels are in-universe aliases.
 * Order: clockwise from top; each pair sits on opposite sides of the radar.
 */
export const OPERATOR_SPECTRUM: SpectrumTrait[] = [
  {
    id: 'solitude',
    name: 'Solitude',
    spectrum: 'Presence',
    pairId: 'presence',
    value: 89,
    maxVal: 100,
    color: '#4298b4',
    description:
      'Drawn to fewer, deeper engagements — prefers calm channels and focused solo sorties over constant squad chatter.',
  },
  {
    id: 'vision',
    name: 'Vision',
    spectrum: 'Lens',
    pairId: 'lens',
    value: 84,
    maxVal: 100,
    color: '#e4ae3a',
    description:
      'Reads patterns, abstractions, and future states before touching ground-level implementation details.',
  },
  {
    id: 'logic',
    name: 'Logic',
    spectrum: 'Core',
    pairId: 'core',
    value: 56,
    maxVal: 100,
    color: '#33a474',
    description:
      'Leads with analysis and consistency; still weighs team morale when making trade-offs.',
  },
  {
    id: 'plan',
    name: 'Plan',
    spectrum: 'Pace',
    pairId: 'pace',
    value: 74,
    maxVal: 100,
    color: '#88619a',
    description:
      'Commits to roadmaps, documentation, and predictable delivery cadence over last-minute improvisation.',
  },
  {
    id: 'rally',
    name: 'Rally',
    spectrum: 'Presence',
    pairId: 'presence',
    value: 11,
    maxVal: 100,
    color: '#4298b4',
    description:
      'Broadcast energy in group settings; energizes squads through live sync and high-visibility coordination.',
  },
  {
    id: 'detail',
    name: 'Detail',
    spectrum: 'Lens',
    pairId: 'lens',
    value: 16,
    maxVal: 100,
    color: '#e4ae3a',
    description:
      'Trusts concrete facts, proven tools, and what is immediately observable in the field.',
  },
  {
    id: 'empathy',
    name: 'Empathy',
    spectrum: 'Core',
    pairId: 'core',
    value: 44,
    maxVal: 100,
    color: '#33a474',
    description:
      'Factors in people, tone, and harmony when steering decisions and code review feedback.',
  },
  {
    id: 'flow',
    name: 'Flow',
    spectrum: 'Pace',
    pairId: 'pace',
    value: 26,
    maxVal: 100,
    color: '#88619a',
    description:
      'Keeps options open, adapts mid-mission, and improvises when the briefing no longer matches reality.',
  },
];

type SkillNodeDraft = Omit<SkillNode, 'unlocked'>;

function computeSkillUnlockState(nodes: SkillNodeDraft[]): SkillNode[] {
  return nodes.map((skill) => {
    if (!skill.requires?.length) {
      return { ...skill, unlocked: true };
    }
    const meetsRequirements = skill.requires.every((reqId) => {
      const req = nodes.find((s) => s.id === reqId);
      return req && req.level === req.maxLevel;
    });
    return { ...skill, unlocked: meetsRequirements };
  });
}

/** Learning-path skill tree — mirrors the Mermaid graph (LR tiers) */
const SKILL_TREE_DRAFT: SkillNodeDraft[] = [
  // Tier 1 — Foundations
  { id: 'prog', name: 'Learning Programming', icon: 'Code', category: 'core', level: 5, maxLevel: 5, description: 'Core programming concepts, algorithms, and problem decomposition.', x: 60, y: 150 },
  { id: 'net', name: 'Learning Internet', icon: 'Globe', category: 'core', level: 5, maxLevel: 5, description: 'HTTP, DNS, networking fundamentals, and how the web is wired.', x: 60, y: 70 },
  { id: 'des', name: 'Learning Design', icon: 'Palette', category: 'core', level: 5, maxLevel: 5, description: 'Visual hierarchy, layout, typography, and user-centered design.', x: 60, y: 230 },
  { id: 'math', name: 'Learning Math & Data', icon: 'Sigma', category: 'core', level: 5, maxLevel: 5, description: 'Statistics, linear algebra, and data reasoning for engineering.', x: 60, y: 310, requires: ['prog'] },

  // Tier 2 — Web basics
  { id: 'web-prog', name: 'Learning Web Programming', icon: 'LayoutTemplate', category: 'core', level: 5, maxLevel: 5, description: 'HTML, CSS, JS, and the browser runtime as a delivery platform.', x: 160, y: 110, requires: ['prog', 'net'] },
  { id: 'db', name: 'Learning Database', icon: 'Database', category: 'core', level: 5, maxLevel: 5, description: 'Relational modeling, queries, transactions, and persistence patterns.', x: 160, y: 210, requires: ['prog'] },
  { id: 'git', name: 'Version Control / Git', icon: 'GitBranch', category: 'core', level: 5, maxLevel: 5, description: 'Branching, merging, code review workflows, and release hygiene.', x: 160, y: 290, requires: ['prog'] },

  // Tier 3 — Disciplines
  { id: 'fe', name: 'Learning Frontend Web', icon: 'Monitor', category: 'frontend', level: 5, maxLevel: 5, description: 'Reactive UI, component architecture, and client-side performance.', x: 260, y: 90, requires: ['web-prog', 'des'] },
  { id: 'be', name: 'Learning Backend Web', icon: 'Server', category: 'backend', level: 5, maxLevel: 5, description: 'APIs, business logic, auth, caching, and server-side scaling.', x: 260, y: 200, requires: ['web-prog', 'db'] },
  { id: 'devops', name: 'Learning DevOps & Servers', icon: 'Terminal', category: 'devops', level: 5, maxLevel: 5, description: 'Provisioning, monitoring, deployment, and production operations.', x: 260, y: 310, requires: ['net', 'prog'] },
  { id: 'mod3d', name: 'Learning 3D Modeling', icon: 'Box', category: 'frontend', level: 4, maxLevel: 5, description: 'Mesh authoring, materials, and asset pipelines for real-time 3D.', x: 260, y: 420, requires: ['des'] },

  // Tier 4 — Frontend branch
  { id: 'vue', name: 'Vue.js Mastery', icon: 'Layers', category: 'frontend', level: 5, maxLevel: 5, description: 'Composition API, reactivity, and production Vue application patterns.', x: 380, y: 50, requires: ['fe'] },
  { id: 'svelte', name: 'Svelte & SvelteKit', icon: 'Sparkles', category: 'frontend', level: 5, maxLevel: 5, description: 'Compile-time UI, SvelteKit routing, and lean client bundles.', x: 380, y: 90, requires: ['fe'] },
  { id: 'angular', name: 'Angular', icon: 'Triangle', category: 'frontend', level: 3, maxLevel: 5, description: 'Enterprise SPA structure, RxJS streams, and typed Angular modules.', x: 380, y: 130, requires: ['fe'] },
  { id: 'threejs', name: 'Three.js / WebGL', icon: 'Cuboid', category: 'frontend', level: 4, maxLevel: 5, description: 'Real-time 3D scenes, shaders, and interactive WebGL experiences.', x: 380, y: 170, requires: ['fe', 'mod3d'] },

  // Tier 4 — Backend branch
  { id: 'php', name: 'PHP Core', icon: 'FileCode', category: 'backend', level: 5, maxLevel: 5, description: 'Modern PHP, OOP patterns, and high-throughput web backends.', x: 380, y: 230, requires: ['be'] },
  { id: 'go', name: 'Golang', icon: 'Zap', category: 'backend', level: 5, maxLevel: 5, description: 'Concurrent services, static typing, and cloud-native microservices.', x: 380, y: 270, requires: ['be'] },
  { id: 'dotnet', name: 'C# / .NET Core', icon: 'Square', category: 'backend', level: 3, maxLevel: 5, description: 'ASP.NET Core APIs, EF Core, and cross-platform .NET services.', x: 380, y: 310, requires: ['be'] },
  { id: 'node', name: 'Node.js', icon: 'Hexagon', category: 'backend', level: 4, maxLevel: 5, description: 'Event-driven JavaScript servers, npm ecosystems, and SSR stacks.', x: 380, y: 350, requires: ['be'] },
  { id: 'pgsql', name: 'PostgreSQL', icon: 'Database', category: 'backend', level: 5, maxLevel: 5, description: 'Advanced SQL, indexing, replication, and Postgres-first schema design.', x: 380, y: 390, requires: ['db'] },

  // Tier 5 — Advanced backend
  { id: 'laravel', name: 'Laravel & Lumen', icon: 'Flame', category: 'backend', level: 5, maxLevel: 5, description: 'Eloquent ORM, queues, API resources, and Laravel ecosystem tooling.', x: 500, y: 250, requires: ['php'] },
  { id: 'filament', name: 'FilamentPHP Framework', icon: 'PanelTop', category: 'backend', level: 5, maxLevel: 5, description: 'Admin panels, form builders, and rapid internal tooling on Laravel.', x: 500, y: 290, requires: ['laravel'] },

  // Tier 4 — AI & ML branch
  { id: 'python', name: 'Python', icon: 'BookOpen', category: 'ai', level: 5, maxLevel: 5, description: 'Scripting, data tooling, and backend ML integration in Python.', x: 380, y: 450, requires: ['be', 'math'] },
  { id: 'tf', name: 'TensorFlow / Machine Learning', icon: 'BrainCircuit', category: 'ai', level: 4, maxLevel: 5, description: 'Model training, inference pipelines, and ML deployment patterns.', x: 500, y: 470, requires: ['python'] },
  { id: 'nlp', name: 'OpenNLP / Text Parsing', icon: 'MessageSquare', category: 'ai', level: 5, maxLevel: 5, description: 'Tokenization, sentiment analysis, and custom NLP processing chains.', x: 500, y: 510, requires: ['python'] },

  // Tier 4 — Infrastructure branch
  { id: 'linux', name: 'Linux / Ubuntu / CentOS', icon: 'HardDrive', category: 'devops', level: 5, maxLevel: 5, description: 'Shell administration, systemd, and production Linux server ops.', x: 380, y: 530, requires: ['devops'] },
  { id: 'docker', name: 'Docker / Containers', icon: 'Container', category: 'devops', level: 5, maxLevel: 5, description: 'Images, compose stacks, and containerized deployment workflows.', x: 500, y: 550, requires: ['linux'] },
  { id: 'cloud', name: 'GCP & Azure Architecture', icon: 'Cloud', category: 'devops', level: 5, maxLevel: 5, description: 'Cloud-native design on Google Cloud and Microsoft Azure.', x: 500, y: 590, requires: ['docker'] },
  { id: 'cicd', name: 'CI/CD Pipelines', icon: 'Workflow', category: 'devops', level: 4, maxLevel: 5, description: 'Automated build, test, and deploy gates across environments.', x: 500, y: 630, requires: ['cloud', 'git'] },

  // Capstone
  {
    id: 'lead',
    name: 'Tech Lead / Systems Architecture',
    icon: 'Crown',
    category: 'master',
    level: 4,
    maxLevel: 5,
    description: 'Cross-stack ownership, system design, and engineering leadership at scale.',
    x: 620,
    y: 350,
    requires: ['filament', 'go', 'cloud', 'pgsql', 'tf'],
  },
];

export const INITIAL_SKILL_NODES: SkillNode[] = computeSkillUnlockState(SKILL_TREE_DRAFT);

export const PORTFOLIO_QUESTS: Quest[] = [
  {
    id: 'main-quest-1',
    title: 'The Katalogram Portal Genesis',
    company: 'Katalogram',
    role: 'Founder & Web Architect',
    type: 'main',
    period: '2022 - Present',
    description:
      'Designed and built the Katalogram platform, an interactive digital catalog and creative economy hub aimed at showcasing local designs, arts, and digital exhibitions in Banten, Indonesia.',
    objectives: [
      'Engineered a highly responsive custom catalog system handling rich media assets smoothly.',
      'Constructed high-speed backend data controllers reducing query latency and optimizing search index loops.',
      'Crafted gorgeous user interfaces utilizing modern web standards and fluent fluid layouts.',
    ],
    loot: [
      '+45,000 EXP (Level Up!)',
      'Catalyst Crest (Enhances creative layouts)',
      'Katalogram Seal (Unlocks digital showcase nodes)',
    ],
    difficulty: 'S',
  },
  {
    id: 'main-quest-2',
    title: 'The Pilakon Motion Comic Engine',
    company: 'Pilakon Creative Labs',
    role: 'Creator & Lead Technologist',
    type: 'main',
    period: '2023 - 2024',
    description:
      'Engineered Pilakon, an innovative open-source Motion Web Comic framework combining sequential visual storytelling with fluid, interactive CSS animations and responsive scroll triggers.',
    objectives: [
      'Handcrafted vector comic panels dynamically rendered and optimized for high-density mobile screens.',
      'Implemented seamless state tracking and performance pipelines keeping comic transitions smooth and lag-free.',
      'Gained outstanding reviews from visual artists, bridging the gap between web development and sequential art.',
    ],
    loot: [
      '+30,000 EXP',
      'Pilakon Brush (+25 Artistry)',
      'Motion Quill (Speeds up visual scroll-feedback actions)',
    ],
    difficulty: 'A',
  },
  {
    id: 'main-quest-3',
    title: 'Supervised Sentiment Analytics',
    company: 'Sentiment NLP Lab',
    role: 'NLP & PHP Alchemist',
    type: 'main',
    period: '2021 - 2022',
    description:
      'Formulated a hybrid sentiment analysis classifier using Apache OpenNLP models integrated with lightweight PHP, leveraging Lexicon-trained and supervised algorithms to parse complex text collections.',
    objectives: [
      'Developed and evaluated Lexicon-trained classification matrices achieving 88% filtering accuracy.',
      'Designed text preprocessing and indexing pipelines optimized for natural language parsing.',
      'Constructed responsive analytical dashboards translating text analytics into real-time visual charts.',
    ],
    loot: [
      '+20,000 EXP',
      'Lexicon Core (+10 Intellect)',
      'Sentiment Analyzer Goggles (Visualizes text semantics)',
    ],
    difficulty: 'B',
  },
  {
    id: 'side-quest-1',
    title: 'Banten Creative Tech Initiative',
    type: 'side',
    description:
      'Led educational tech bootcamps and creative design hackathons in Banten, Indonesia, coaching next-generation web developers and digital artists.',
    objectives: [
      'Organized coding sprints and workshops focused on modern web architectures and graphic design basics.',
      'Formulated interactive digital art curriculums for regional high schools and universities.',
    ],
    loot: [
      '+12,000 EXP',
      "Teacher's Scepter (+10 Education Aura)",
      'Banten Tech Medallion',
    ],
    difficulty: 'A',
    link: '#',
  },
  {
    id: 'side-quest-2',
    title: 'The Interactive Portfolio OS',
    type: 'side',
    description:
      'Programmed an immersive, retro-futuristic JRPG-style portfolio dashboard to showcase software engineering stats, interactive skill trees, and artistic items.',
    objectives: [
      'Created custom responsive layouts utilizing Tailwind CSS and Motion React for animations.',
      'Integrated an interactive mock Terminal console with custom diagnostic CLI commands.',
    ],
    loot: [
      '+8,000 EXP',
      'Chrono-Keyboard (Increases typing flow)',
      'Unlocks Developer Stats Console',
    ],
    difficulty: 'B',
    link: '#',
  },
  {
    id: 'defeated-boss-1',
    title: 'Goliath Apache OpenNLP Raid',
    type: 'defeated',
    description:
      'An S-Rank challenge scaling Natural Language Processing tools with limited server memory. Resolved by writing stream-based training workflows.',
    objectives: [
      'Prevented heap allocation limits using lazy model loading and token stream buffers.',
      'Engineered an API pipeline proxying NLP token parsing requests cleanly.',
    ],
    loot: [
      'S-Rank Analytics Emblem (Shows text parsing stats)',
      'NLP Mastery (+8 Backend, +10 NLP Intellect)',
    ],
    difficulty: 'S',
    link: '#',
  },
  {
    id: 'defeated-boss-2',
    title: 'Aether Vector Canvas Lab',
    type: 'defeated',
    description:
      'A challenge of layout vector mathematics. Developed interactive graphic coordinates to align custom digital layers perfectly on an infinite web canvas.',
    objectives: [
      'Formulated pixel snapping coordinates and anchor bounds in raw TypeScript.',
      'Constructed complete graphic history controls for undo-redo canvas states.',
    ],
    loot: [
      'Aether T-Square (+15 Frontend, +5 UI Craft)',
      'Snapping Oracle (Guarantees clean alignment)',
    ],
    difficulty: 'A',
    link: '#',
  },
  {
    id: 'defeated-boss-3',
    title: 'Banten Design Guild Portal',
    type: 'defeated',
    description:
      'An automated showcase ward mapping Indonesian artist contributions across geographical nodes to boost local Creative Economy visibility.',
    objectives: [
      'Configured geographical indexing mapping local design hubs.',
      'Designed responsive catalog filters enabling smooth multi-category search matrices.',
    ],
    loot: [
      'Banten Guild Key (+12 Creative Economy, +4 Community)',
      'Artistic Champion Shield',
    ],
    difficulty: 'B',
    link: '#',
  },
];

/** Career path nodes — content from https://rivaiamin.github.io/profile */
export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-fintech',
    stage: 1,
    place: 'Fintech Solutions',
    years: 'Aug 2017 – Dec 2019',
    position: 'Full-Stack Engineer',
    description:
      'High-volume payment processing systems handling millions of transactions across bank integrations.',
    highlights: [
      'Processed IDR100M+ monthly transactions',
      'Successful bank integrations',
      '99.9% uptime maintained',
    ],
    stack: ['Lumen PHP', 'Angular', 'REST APIs', 'Payment Gateways', 'Security Systems'],
  },
  {
    id: 'exp-aimsis',
    stage: 2,
    place: 'AIMSIS Engineering',
    years: 'Jan 2020 – Aug 2023',
    position: 'VP of Engineering',
    description:
      'Led cross-functional teams and engineering excellence practices for platforms serving hundreds of concurrent users.',
    highlights: [
      'Led team of 5+ engineers',
      'Reduced bugs by 40%',
      'Increased delivery velocity by 35%',
      'Managed 200+ concurrent users',
    ],
    stack: ['Laravel', 'Vue.js', 'PHP', 'PostgreSQL', 'GCP Infrastructure'],
  },
  {
    id: 'exp-ahsa',
    stage: 3,
    place: 'AHSA Kreatif',
    years: 'Jul 2023 – Present',
    position: 'Senior Engineer',
    description:
      'Custom enterprise solutions and AI-powered applications for fintech, education, and product clients.',
    highlights: [
      'Delivered 20+ client projects',
      'Fintech & payment systems',
      'Education platform development',
      'AI/ML solutions',
    ],
    stack: ['FilamentPHP', 'Laravel', 'Vue.js', 'SvelteKit', 'TensorFlow', 'Python'],
  },
  {
    id: 'exp-taldio',
    stage: 4,
    place: 'Taldio.com',
    years: 'Dec 2023 – Jun 2025',
    position: 'Full-Stack Engineer',
    description:
      'Modern web platform development with .NET Core and Golang, focused on performance and scalable architecture.',
    highlights: [
      'Improved system response time and scalability',
      'Zero critical incidents maintained',
      'Streamlined CI/CD pipelines',
      'Managed 1000+ concurrent users',
    ],
    stack: ['.NET Core', 'Golang', 'GCP', 'Docker', 'Azure DevOps'],
  },
];

/** World map warp points — external links as quick-travel portals */
export const WARP_POINTS: WarpPoint[] = [
  {
    id: 'warp-cv',
    name: 'Scroll of Vitae',
    label: 'CV / Resume',
    url: '/cv',
    icon: 'FileText',
    region: 'identity',
    x: 10,
    y: 34,
  },
  {
    id: 'warp-profile',
    name: 'Profile Keep',
    label: 'Profile',
    url: '/profile',
    icon: 'User',
    region: 'identity',
    x: 28,
    y: 18,
  },
  {
    id: 'warp-github',
    name: 'Code Forge',
    label: 'GitHub',
    url: 'https://github.com/rivaiamin',
    icon: 'Github',
    region: 'identity',
    x: 42,
    y: 42,
  },
  {
    id: 'warp-linkedin',
    name: 'Guild Hall',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rivaiamin/',
    icon: 'Linkedin',
    region: 'identity',
    x: 24,
    y: 58,
  },
  {
    id: 'warp-sketchfab',
    name: 'Model Atelier',
    label: 'Sketchfab',
    url: 'https://sketchfab.com/rivaiamin',
    icon: 'Box',
    region: 'identity',
    x: 40,
    y: 8,
  },
  {
    id: 'warp-kurvo',
    name: 'Kurvo Outpost',
    label: 'Kurvo',
    url: '/kurvo/',
    icon: 'Sparkles',
    region: 'project',
    x: 72,
    y: 32,
  },
  {
    id: 'warp-ddl',
    name: 'Schema Crossing',
    label: 'DDL Compare',
    url: '/ddl-compare/',
    icon: 'GitCompare',
    region: 'project',
    x: 82,
    y: 48,
  },
  {
    id: 'warp-timer',
    name: 'Chrono Tower',
    label: 'Task Timer',
    url: '/tauri-task-timer/',
    icon: 'Timer',
    region: 'project',
    x: 50,
    y: 86,
  },
  {
    id: 'warp-digi',
    name: 'Intruder Gate',
    label: 'Digi Intruder Quiz',
    url: 'https://digi-intruder-quiz.vercel.app',
    icon: 'Shield',
    region: 'project',
    x: 62,
    y: 59,
  },
  {
    id: 'warp-tebakaja',
    name: 'Guessing Grove',
    label: 'Tebakaja',
    url: 'https://tebakaja.vercel.app',
    icon: 'Brain',
    region: 'project',
    x: 86,
    y: 66,
  },
  {
    id: 'warp-talenta',
    name: 'Talent Bazaar',
    label: 'Talenta Digital',
    url: 'https://talentadigital.vercel.app',
    icon: 'Briefcase',
    region: 'project',
    x: 68,
    y: 88,
  },
];

/** Tech stack & tools — sourced from https://github.com/rivaiamin/rivaiamin */
export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  // Backend
  { id: 'gear-php', name: 'PHP', category: 'backend', rarity: 'legendary', icon: 'Code', stats: { Experience: '9+ yrs' }, description: 'Core backend language across fintech, CMS, and enterprise platforms.' },
  { id: 'gear-golang', name: 'Golang', category: 'backend', rarity: 'epic', icon: 'Cpu', stats: { Experience: '4+ yrs' }, description: 'High-performance APIs, microservices, and cloud-native tooling.' },
  { id: 'gear-nodejs', name: 'Node.js', category: 'backend', rarity: 'epic', icon: 'Server', stats: { Experience: '5+ yrs' }, description: 'Event-driven servers, real-time apps, and JavaScript full-stack runtimes.' },
  { id: 'gear-python', name: 'Python', category: 'backend', rarity: 'epic', icon: 'Terminal', stats: { Experience: '4+ yrs' }, description: 'Scripting, ML pipelines, NLP workflows, and automation tooling.' },
  { id: 'gear-dotnet', name: '.NET', category: 'backend', rarity: 'rare', icon: 'Box', stats: { Experience: '2+ yrs' }, description: '.NET Core platform development for scalable web systems.' },
  { id: 'gear-laravel', name: 'Laravel', category: 'backend', rarity: 'legendary', icon: 'Layers', stats: { Experience: '8+ yrs' }, description: 'Primary PHP framework for LMS, CMS, and enterprise web applications.' },
  { id: 'gear-codeigniter', name: 'CodeIgniter', category: 'backend', rarity: 'rare', icon: 'FileCode', stats: { Experience: '3+ yrs' }, description: 'Lightweight PHP MVC framework for rapid legacy and gov-sector builds.' },
  { id: 'gear-filament', name: 'FilamentPHP', category: 'backend', rarity: 'epic', icon: 'LayoutGrid', stats: { Experience: '3+ yrs' }, description: 'Admin panels and multi-tenancy CMS platforms for enterprise clients.' },

  // Frontend
  { id: 'gear-vue', name: 'Vue.js', category: 'frontend', rarity: 'legendary', icon: 'Monitor', stats: { Experience: '7+ yrs' }, description: 'Reactive SPA development across education, fintech, and CMS products.' },
  { id: 'gear-svelte', name: 'Svelte', category: 'frontend', rarity: 'epic', icon: 'Sparkles', stats: { Experience: '3+ yrs' }, description: 'Compile-time UI for lightweight, high-performance web interfaces.' },
  { id: 'gear-angular', name: 'Angular', category: 'frontend', rarity: 'rare', icon: 'Globe', stats: { Experience: '4+ yrs' }, description: 'Structured enterprise frontends and admin dashboard applications.' },
  { id: 'gear-typescript', name: 'TypeScript', category: 'frontend', rarity: 'legendary', icon: 'ShieldCheck', stats: { Experience: '6+ yrs' }, description: 'Strong typing across frontend and full-stack JavaScript codebases.' },
  { id: 'gear-javascript', name: 'JavaScript', category: 'frontend', rarity: 'legendary', icon: 'Braces', stats: { Experience: '9+ yrs' }, description: 'Foundation language for browser UI, Node.js services, and tooling.' },
  { id: 'gear-tailwind', name: 'Tailwind CSS', category: 'frontend', rarity: 'epic', icon: 'Palette', stats: { Experience: '4+ yrs' }, description: 'Utility-first styling for rapid, consistent interface delivery.' },

  // Database
  { id: 'gear-mysql', name: 'MySQL', category: 'database', rarity: 'epic', icon: 'Database', stats: { Experience: '8+ yrs' }, description: 'Relational storage for web apps, payment systems, and CMS platforms.' },
  { id: 'gear-postgresql', name: 'PostgreSQL', category: 'database', rarity: 'epic', icon: 'Database', stats: { Experience: '5+ yrs' }, description: 'Advanced SQL features for scalable, data-heavy applications.' },
  { id: 'gear-sqlserver', name: 'SQL Server', category: 'database', rarity: 'rare', icon: 'HardDrive', stats: { Experience: '3+ yrs' }, description: 'Microsoft SQL stack for enterprise and .NET-integrated systems.' },

  // Cloud & DevOps
  { id: 'gear-gcp', name: 'Google Cloud', category: 'cloud', rarity: 'epic', icon: 'Cloud', stats: { Experience: '4+ yrs' }, description: 'GCP infrastructure, Cloud Run, and scalable deployment targets.' },
  { id: 'gear-azure', name: 'Azure', category: 'cloud', rarity: 'epic', icon: 'CloudCog', stats: { Experience: '3+ yrs' }, description: 'Azure DevOps pipelines and cloud resource management.' },
  { id: 'gear-docker', name: 'Docker', category: 'cloud', rarity: 'epic', icon: 'Box', stats: { Experience: '4+ yrs' }, description: 'Containerized builds, multi-stage images, and isolated environments.' },
  { id: 'gear-git', name: 'Git', category: 'cloud', rarity: 'legendary', icon: 'GitBranch', stats: { Experience: '9+ yrs' }, description: 'Version control, branching strategies, and collaborative workflows.' },
  { id: 'gear-azure-devops', name: 'Azure DevOps', category: 'cloud', rarity: 'rare', icon: 'Workflow', stats: { Experience: '2+ yrs' }, description: 'CI/CD pipelines, release management, and build automation.' },

  // AI / ML
  { id: 'gear-tensorflow', name: 'TensorFlow', category: 'ai', rarity: 'epic', icon: 'Brain', stats: { Models: '8 trained' }, description: 'Custom image classification and deep learning model training.' },
  { id: 'gear-sklearn', name: 'scikit-learn', category: 'ai', rarity: 'rare', icon: 'ChartScatter', stats: { Experience: '2+ yrs' }, description: 'Classical ML workflows, feature engineering, and model evaluation.' },
  { id: 'gear-openai', name: 'OpenAI', category: 'ai', rarity: 'epic', icon: 'Bot', stats: { Experience: '2+ yrs' }, description: 'LLM integration and AI-assisted development workflows.' },
  { id: 'gear-opennlp', name: 'OpenNLP', category: 'ai', rarity: 'epic', icon: 'MessageSquare', stats: { Experience: '3+ yrs' }, description: 'NLP pipelines including sentiment analysis and NER for text processing.' },
];
