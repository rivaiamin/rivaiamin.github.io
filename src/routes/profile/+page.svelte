<script lang="ts">
	import { cv, profile } from '$lib/cvData';

	let scrollY = $state(0);
	let showScrollTop = $state(false);

	const socialLinks = [
		{ href: profile.contacts.github, label: 'GitHub' },
		{ href: profile.contacts.linkedin, label: 'LinkedIn' },
		{ href: profile.contacts.sketchfab, label: 'Sketchfab' },
		{ href: profile.contacts.instagram, label: 'Instagram' },
		{ href: profile.contacts.portfolio, label: 'Site' }
	];

	const statItems = [
		{ value: `${profile.stats.yearsExperience}+`, label: 'Years building' },
		{ value: `${profile.stats.projectsCompleted}+`, label: 'Projects shipped' },
		{ value: `${profile.stats.technologies}+`, label: 'Stack tools' },
		{ value: `${profile.stats.teamsLed}+`, label: 'Teams led' }
	];

	const serviceEntries = Object.entries(profile.services);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function handleScroll() {
		scrollY = window.scrollY;
		showScrollTop = scrollY > 480;
	}
</script>

<svelte:window onscroll={handleScroll} />

<svelte:head>
	<title>{profile.name} - Professional Profile</title>

	<meta
		name="description"
		content="Professional profile of Riva'i Amin, Senior Full-Stack Engineer and Technical Leader with 9+ years of experience in web development, cloud solutions, and AI."
	/>
	<meta
		name="keywords"
		content="Riva'i Amin, Full-Stack Engineer, Technical Leader, PHP, Golang, Python, Vue.js, Svelte, GCP, AI, Machine Learning, Software Development, Team Leadership"
	/>
	<meta name="author" content={profile.name} />

	<meta property="og:title" content={profile.name + ' - Professional Profile'} />
	<meta
		property="og:description"
		content="Senior Full-Stack Engineer and Technical Leader specializing in scalable web applications, cloud infrastructure, and AI solutions."
	/>
	<meta property="og:type" content="profile" />
	<meta property="og:url" content={profile.contacts.portfolio + '/profile'} />
	<meta property="og:image" content={profile.contacts.portfolio + '/rivaiamin_photo.jpg'} />
	<meta property="og:image:width" content="400" />
	<meta property="og:image:height" content="400" />
	<meta property="og:image:alt" content={profile.name + ' - Professional Photo'} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content={profile.name + ' - Portfolio'} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={profile.name + ' - Professional Profile'} />
	<meta
		name="twitter:description"
		content="Senior Full-Stack Engineer and Technical Leader with expertise in modern web technologies, cloud infrastructure, and AI."
	/>
	<meta name="twitter:image" content={profile.contacts.portfolio + '/rivaiamin_photo.jpg'} />
	<meta name="twitter:image:alt" content={profile.name + ' - Professional Photo'} />
	<meta name="twitter:creator" content={profile.contacts.twitter} />

	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />
	<link rel="canonical" href={profile.contacts.portfolio + '/profile'} />

	{@html `<script type="application/ld+json">${JSON.stringify(
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: profile.name,
			jobTitle: profile.tagline,
			description: profile.summary,
			url: profile.contacts.portfolio,
			image: `${profile.contacts.portfolio}/rivaiamin_photo.jpg`,
			email: profile.contacts.email,
			telephone: profile.contacts.phone,
			address: {
				'@type': 'PostalAddress',
				addressLocality: profile.contacts.location
			},
			sameAs: [
				profile.contacts.linkedin,
				profile.contacts.github,
				profile.contacts.sketchfab,
				profile.contacts.instagram,
				profile.contacts.portfolio
			],
			alumniOf: {
				'@type': 'EducationalOrganization',
				name: profile.education.school,
				department: profile.education.degree
			},
			knowsAbout: cv.skills.concat(cv.techStacks),
			hasOccupation: {
				'@type': 'Occupation',
				name: cv.title,
				occupationLocation: {
					'@type': 'Country',
					name: profile.contacts.location.split(',').pop()?.trim() || 'Indonesia'
				},
				skills: cv.skills.join(', '),
				experienceRequirements: `${profile.stats.yearsExperience}+ years`
			},
			award: cv.awards,
			memberOf: cv.experiences.slice(0, 3).map((exp) => ({
				'@type': 'Organization',
				name: exp.company,
				description: exp.role
			}))
		},
		null,
		2
	)}</script>`}

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Syne:wght@600;700;800&display=swap"
		rel="stylesheet"
	/>

	<style>
		/*
		 * DESIGN IDENTITY: Volcanic Workshop
		 * Reading: developer-leader portfolio for recruiters and technical clients,
		 * workshop-blueprint / tropical-terminal language.
		 * Dials: VARIANCE 7 | MOTION 5 | DENSITY 3
		 *
		 * Palette: volcanic charcoal base, warm paper text, single copper accent.
		 * Typography: Syne (display) + IBM Plex Sans (body) + IBM Plex Mono (data).
		 * Motif: dual craft (code architecture + 3D spatial work), Indonesian warmth
		 * without tourist clichés, LKS competition craft pedigree.
		 */

		:global(body) {
			font-family: 'IBM Plex Sans', system-ui, sans-serif;
			background: #12100e;
			color: #ede6dc;
			overflow-x: hidden;
		}

		:global(html) {
			scroll-behavior: smooth;
		}

		.profile-page {
			--bg: #12100e;
			--surface: #1a1714;
			--surface-raised: #221e1a;
			--ink: #ede6dc;
			--muted: #8f8779;
			--faint: #5c554c;
			--accent: #c9783f;
			--accent-dim: rgb(201 120 63 / 0.14);
			--line: rgb(237 230 220 / 0.1);
			--radius: 4px;
			--font-display: 'Syne', system-ui, sans-serif;
			--font-mono: 'IBM Plex Mono', ui-monospace, monospace;
			position: relative;
			background: var(--bg);
		}

		.grain {
			position: fixed;
			inset: 0;
			pointer-events: none;
			z-index: 50;
			opacity: 0.045;
			background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		}

		.container {
			width: min(100%, 72rem);
			margin-inline: auto;
			padding-inline: 1.25rem;
		}

		@media (min-width: 768px) {
			.container {
				padding-inline: 2rem;
			}
		}

		/* Hero */
		.hero {
			position: relative;
			min-height: 100dvh;
			display: grid;
			align-items: end;
			padding-block: 5rem 3rem;
			border-bottom: 1px solid var(--line);
			overflow: hidden;
		}

		.hero-grid {
			display: grid;
			gap: 2.5rem;
			align-items: end;
		}

		@media (min-width: 900px) {
			.hero-grid {
				grid-template-columns: 1.15fr 0.85fr;
				gap: 3rem;
				padding-top: 1rem;
			}
		}

		.hero-copy {
			position: relative;
			z-index: 2;
		}

		.hero-role {
			font-family: var(--font-mono);
			font-size: 0.72rem;
			letter-spacing: 0.14em;
			text-transform: uppercase;
			color: var(--accent);
			margin-bottom: 1.25rem;
		}

		.hero-title {
			font-family: var(--font-display);
			font-size: clamp(2.75rem, 8vw, 5.5rem);
			font-weight: 800;
			line-height: 0.95;
			letter-spacing: -0.03em;
			margin: 0 0 1.25rem;
			text-wrap: balance;
		}

		.hero-title em {
			font-style: normal;
			color: var(--accent);
		}

		.hero-lead {
			max-width: 38ch;
			font-size: 1.05rem;
			line-height: 1.65;
			color: var(--muted);
			margin: 0 0 2rem;
		}

		.hero-actions {
			display: flex;
			flex-wrap: wrap;
			gap: 0.75rem;
			margin-bottom: 2rem;
		}

		.btn-primary,
		.btn-ghost {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: 0.8rem 1.35rem;
			font-size: 0.9rem;
			font-weight: 600;
			text-decoration: none;
			border-radius: var(--radius);
			transition:
				transform 0.2s ease,
				background 0.2s ease,
				border-color 0.2s ease;
			white-space: nowrap;
		}

		.btn-primary {
			background: var(--accent);
			color: #12100e;
			border: 1px solid var(--accent);
		}

		.btn-primary:hover {
			transform: translateY(-1px);
			background: #d4864a;
		}

		.btn-primary:active {
			transform: scale(0.98);
		}

		.btn-ghost {
			background: transparent;
			color: var(--ink);
			border: 1px solid var(--line);
		}

		.btn-ghost:hover {
			border-color: rgb(237 230 220 / 0.28);
			background: rgb(255 255 255 / 0.03);
		}

		.social-row {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		.social-link {
			font-family: var(--font-mono);
			font-size: 0.72rem;
			letter-spacing: 0.06em;
			text-transform: uppercase;
			color: var(--muted);
			text-decoration: none;
			padding: 0.45rem 0.7rem;
			border: 1px solid var(--line);
			border-radius: var(--radius);
			transition:
				color 0.2s ease,
				border-color 0.2s ease;
		}

		.social-link:hover {
			color: var(--ink);
			border-color: var(--accent);
		}

		.hero-visual {
			position: relative;
			justify-self: end;
			width: min(100%, 22rem);
		}

		@media (min-width: 900px) {
			.hero-visual {
				width: 100%;
				max-width: 26rem;
			}
		}

		.photo-frame {
			position: relative;
			aspect-ratio: 4 / 5;
			overflow: hidden;
			border: 1px solid var(--line);
			background: var(--surface);
		}

		.photo-frame img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center top;
			filter: saturate(0.92) contrast(1.04);
		}

		.photo-frame::before {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(180deg, transparent 55%, rgb(18 16 14 / 0.55) 100%);
			pointer-events: none;
			z-index: 1;
		}

		.photo-tag {
			position: absolute;
			left: 1rem;
			bottom: 1rem;
			z-index: 2;
			font-family: var(--font-mono);
			font-size: 0.68rem;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			color: var(--ink);
			background: rgb(18 16 14 / 0.72);
			padding: 0.35rem 0.55rem;
			border: 1px solid var(--line);
		}

		.hero-bg-mark {
			position: absolute;
			right: -8vw;
			top: 8vh;
			font-family: var(--font-display);
			font-size: clamp(8rem, 22vw, 16rem);
			font-weight: 800;
			line-height: 0.85;
			color: rgb(237 230 220 / 0.025);
			pointer-events: none;
			user-select: none;
			letter-spacing: -0.05em;
		}

		/* Metrics strip */
		.metrics {
			border-bottom: 1px solid var(--line);
			background: var(--surface);
		}

		.metrics-inner {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: 768px) {
			.metrics-inner {
				grid-template-columns: repeat(4, 1fr);
			}
		}

		.metric {
			padding: 1.5rem 1.25rem;
			border-right: 1px solid var(--line);
		}

		.metric:last-child {
			border-right: none;
		}

		@media (max-width: 767px) {
			.metric:nth-child(2) {
				border-right: none;
			}

			.metric:nth-child(1),
			.metric:nth-child(2) {
				border-bottom: 1px solid var(--line);
			}
		}

		.metric-value {
			font-family: var(--font-mono);
			font-size: clamp(1.75rem, 4vw, 2.35rem);
			font-weight: 500;
			color: var(--accent);
			font-variant-numeric: tabular-nums;
			margin-bottom: 0.35rem;
		}

		.metric-label {
			font-size: 0.78rem;
			color: var(--muted);
			line-height: 1.4;
		}

		/* Sections */
		.section {
			padding-block: 4.5rem;
		}

		@media (min-width: 768px) {
			.section {
				padding-block: 6rem;
			}
		}

		.section-head {
			margin-bottom: 2.5rem;
		}

		.section-title {
			font-family: var(--font-display);
			font-size: clamp(1.85rem, 4vw, 2.75rem);
			font-weight: 700;
			letter-spacing: -0.02em;
			line-height: 1.05;
			margin: 0;
		}

		.section-note {
			margin-top: 0.85rem;
			max-width: 48ch;
			color: var(--muted);
			line-height: 1.65;
		}

		/* About */
		.about-grid {
			display: grid;
			gap: 2rem;
		}

		@media (min-width: 900px) {
			.about-grid {
				grid-template-columns: 1.4fr 0.9fr;
				gap: 3.5rem;
				align-items: start;
			}
		}

		.about-summary {
			font-size: 1.1rem;
			line-height: 1.75;
			color: var(--ink);
			margin: 0 0 2rem;
			max-width: 58ch;
		}

		.values-scroll {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		.value-chip {
			font-size: 0.82rem;
			padding: 0.45rem 0.75rem;
			border: 1px solid var(--line);
			border-radius: var(--radius);
			color: var(--muted);
			background: var(--surface);
		}

		.side-stack {
			display: grid;
			gap: 1px;
			background: var(--line);
			border: 1px solid var(--line);
		}

		.side-panel {
			background: var(--surface);
			padding: 1.5rem;
		}

		.panel-label {
			font-family: var(--font-mono);
			font-size: 0.68rem;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: var(--accent);
			margin-bottom: 0.85rem;
		}

		.panel-title {
			font-size: 1rem;
			font-weight: 600;
			margin: 0 0 0.35rem;
		}

		.panel-sub {
			font-size: 0.88rem;
			color: var(--muted);
			margin: 0;
			line-height: 1.55;
		}

		.award-list {
			list-style: none;
			padding: 0;
			margin: 0;
			display: grid;
			gap: 0.85rem;
		}

		.award-list li {
			font-size: 0.88rem;
			color: var(--muted);
			line-height: 1.55;
			padding-left: 1rem;
			border-left: 2px solid var(--accent-dim);
		}

		/* Expertise bento */
		.expertise-section {
			background: var(--surface);
			border-block: 1px solid var(--line);
		}

		.bento {
			display: grid;
			gap: 1px;
			background: var(--line);
			border: 1px solid var(--line);
		}

		@media (min-width: 768px) {
			.bento {
				grid-template-columns: repeat(6, 1fr);
				grid-template-rows: auto auto;
			}

			.bento-cell:nth-child(1) {
				grid-column: span 3;
			}

			.bento-cell:nth-child(2) {
				grid-column: span 3;
			}

			.bento-cell:nth-child(3) {
				grid-column: span 2;
			}

			.bento-cell:nth-child(4) {
				grid-column: span 4;
			}
		}

		.bento-cell {
			background: var(--bg);
			padding: 1.75rem;
			min-height: 12rem;
			display: flex;
			flex-direction: column;
		}

		.bento-cell.featured {
			background:
				linear-gradient(135deg, rgb(201 120 63 / 0.08), transparent 55%),
				var(--bg);
		}

		.bento-index {
			font-family: var(--font-mono);
			font-size: 0.68rem;
			color: var(--faint);
			margin-bottom: 1rem;
		}

		.bento-title {
			font-family: var(--font-display);
			font-size: 1.35rem;
			font-weight: 700;
			margin: 0 0 0.75rem;
			line-height: 1.15;
		}

		.bento-desc {
			font-size: 0.92rem;
			color: var(--muted);
			line-height: 1.6;
			margin: 0 0 auto;
			padding-bottom: 1.25rem;
			max-width: 42ch;
		}

		.tech-row {
			display: flex;
			flex-wrap: wrap;
			gap: 0.4rem;
			margin-top: auto;
		}

		.tech-tag {
			font-family: var(--font-mono);
			font-size: 0.68rem;
			padding: 0.3rem 0.5rem;
			border: 1px solid var(--line);
			color: var(--muted);
			border-radius: var(--radius);
		}

		/* Work timeline */
		.work-list {
			display: grid;
			gap: 0;
		}

		.work-item {
			display: grid;
			gap: 1.25rem;
			padding-block: 2rem;
			border-bottom: 1px solid var(--line);
		}

		@media (min-width: 768px) {
			.work-item {
				grid-template-columns: 11rem 1fr;
				gap: 2.5rem;
				align-items: start;
			}
		}

		.work-item:first-child {
			padding-top: 0;
		}

		.work-period {
			font-family: var(--font-mono);
			font-size: 0.75rem;
			color: var(--accent);
			letter-spacing: 0.04em;
			line-height: 1.5;
		}

		.work-name {
			font-family: var(--font-display);
			font-size: 1.5rem;
			font-weight: 700;
			margin: 0 0 0.65rem;
			line-height: 1.15;
		}

		.work-desc {
			color: var(--muted);
			line-height: 1.65;
			margin: 0 0 1.25rem;
			max-width: 58ch;
		}

		.work-achievements {
			list-style: none;
			padding: 0;
			margin: 0 0 1.25rem;
			display: grid;
			gap: 0.45rem;
		}

		.work-achievements li {
			font-size: 0.88rem;
			color: var(--ink);
			padding-left: 1rem;
			position: relative;
		}

		.work-achievements li::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0.55em;
			width: 4px;
			height: 4px;
			background: var(--accent);
			border-radius: 1px;
		}

		/* Projects */
		.projects-section {
			background: var(--surface);
			border-block: 1px solid var(--line);
		}

		.project-groups {
			display: grid;
			gap: 3rem;
		}

		.project-group-title {
			font-family: var(--font-display);
			font-size: 1.15rem;
			font-weight: 700;
			margin: 0 0 1rem;
			color: var(--ink);
		}

		.project-cards {
			display: grid;
			gap: 1px;
			background: var(--line);
			border: 1px solid var(--line);
		}

		@media (min-width: 768px) {
			.project-cards {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		.project-card {
			background: var(--bg);
			padding: 1.25rem 1.35rem;
		}

		.project-card-top {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			gap: 1rem;
			margin-bottom: 0.55rem;
		}

		.project-name {
			font-size: 0.95rem;
			font-weight: 600;
			margin: 0;
			line-height: 1.35;
		}

		.project-tech {
			font-family: var(--font-mono);
			font-size: 0.65rem;
			color: var(--accent);
			white-space: nowrap;
			flex-shrink: 0;
		}

		.project-impact {
			font-size: 0.84rem;
			color: var(--muted);
			line-height: 1.55;
			margin: 0;
		}

		/* Contact */
		.contact-grid {
			display: grid;
			gap: 1px;
			background: var(--line);
			border: 1px solid var(--line);
			margin-bottom: 2.5rem;
		}

		@media (min-width: 768px) {
			.contact-grid {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		.contact-cell {
			background: var(--surface);
			padding: 1.35rem 1.5rem;
			text-decoration: none;
			color: inherit;
			transition: background 0.2s ease;
		}

		a.contact-cell:hover {
			background: var(--surface-raised);
		}

		.contact-key {
			font-family: var(--font-mono);
			font-size: 0.68rem;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			color: var(--faint);
			margin-bottom: 0.45rem;
		}

		.contact-val {
			font-size: 0.95rem;
			color: var(--ink);
			word-break: break-word;
		}

		.contact-cta {
			display: flex;
			flex-wrap: wrap;
			gap: 0.75rem;
		}

		/* Footer */
		.footer {
			padding-block: 2.5rem 3rem;
			border-top: 1px solid var(--line);
		}

		.footer-inner {
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
			align-items: flex-start;
		}

		@media (min-width: 768px) {
			.footer-inner {
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			}
		}

		.footer-copy {
			font-size: 0.82rem;
			color: var(--muted);
			margin: 0;
		}

		.footer-copy strong {
			color: var(--accent);
			font-weight: 600;
		}

		.scroll-top {
			position: fixed;
			right: 1.25rem;
			bottom: 1.25rem;
			width: 2.75rem;
			height: 2.75rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background: var(--accent);
			color: #12100e;
			border: none;
			border-radius: var(--radius);
			cursor: pointer;
			z-index: 40;
			font-size: 1.1rem;
			line-height: 1;
			transition: transform 0.2s ease;
		}

		.scroll-top:hover {
			transform: translateY(-2px);
		}

		.scroll-top:active {
			transform: scale(0.96);
		}

		.reveal {
			animation: rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
		}

		@keyframes rise {
			from {
				opacity: 0;
				transform: translateY(18px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@media (prefers-reduced-motion: reduce) {
			.reveal {
				animation: none;
			}

			.btn-primary,
			.btn-ghost,
			.social-link,
			.scroll-top,
			.contact-cell {
				transition: none;
			}
		}
	</style>
</svelte:head>

<div class="profile-page">
	<div class="grain" aria-hidden="true"></div>

	<!-- Hero: asymmetric split, angular portrait -->
	<section class="hero">
		<div class="hero-bg-mark" aria-hidden="true">RA</div>
		<div class="container hero-grid reveal">
			<div class="hero-copy">
				<p class="hero-role">{profile.tagline}</p>
				<h1 class="hero-title">
					{profile.name.split(' ')[0]}
					<em>{profile.name.split(' ').slice(1).join(' ')}</em>
				</h1>
				<p class="hero-lead">
					Full-stack systems, cloud infrastructure, and AI workflows for fintech, education, and
					product teams across Indonesia.
				</p>
				<div class="hero-actions">
					<a
						href="https://wa.me/6285814140079"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-primary"
					>
						WhatsApp
					</a>
					<a href="mailto:{profile.contacts.email}" class="btn-ghost">Email</a>
				</div>
				<div class="social-row">
					{#each socialLinks as link}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							aria-label={link.label}
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>

			<div class="hero-visual">
				<div class="photo-frame">
					<img src={profile.photo} alt={profile.name} width="400" height="500" />
					<span class="photo-tag">Engineer + 3D</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Metrics: mono data strip -->
	<section class="metrics" aria-label="Career metrics">
		<div class="container metrics-inner">
			{#each statItems as item}
				<div class="metric">
					<div class="metric-value">{item.value}</div>
					<div class="metric-label">{item.label}</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- About: editorial + side panels -->
	<section class="section" id="about">
		<div class="container">
			<div class="section-head">
				<h2 class="section-title">Building systems that hold up in production</h2>
			</div>

			<div class="about-grid">
				<div>
					<p class="about-summary">{profile.summary}</p>
					<div class="values-scroll">
						{#each profile.values as value}
							<span class="value-chip">{value}</span>
						{/each}
					</div>
				</div>

				<div class="side-stack">
					<div class="side-panel">
						<div class="panel-label">Education</div>
						<p class="panel-title">{profile.education.degree}</p>
						<p class="panel-sub">
							{profile.education.school}<br />
							{profile.education.specialization}<br />
							{profile.education.year}
						</p>
					</div>
					<div class="side-panel">
						<div class="panel-label">Recognition</div>
						<ul class="award-list">
							{#each profile.awards.slice(0, 2) as award}
								<li>{award}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Expertise: asymmetric bento -->
	<section class="section expertise-section" id="expertise">
		<div class="container">
			<div class="section-head">
				<h2 class="section-title">What I build</h2>
				<p class="section-note">
					End-to-end delivery across backend, frontend, cloud, and applied machine learning.
				</p>
			</div>

			<div class="bento">
				{#each serviceEntries as [service, details], idx}
					<article class="bento-cell" class:featured={idx === 3}>
						<div class="bento-index">0{idx + 1}</div>
						<h3 class="bento-title">{service}</h3>
						<p class="bento-desc">{details.description}</p>
						<div class="tech-row">
							{#each details.technologies as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Work: timeline layout -->
	<section class="section" id="work">
		<div class="container">
			<div class="section-head">
				<h2 class="section-title">Selected engagements</h2>
				<p class="section-note">
					From payment rails and LMS platforms to enterprise CMS and AI-assisted delivery.
				</p>
			</div>

			<div class="work-list">
				{#each profile.portfolios as portfolio}
					<article class="work-item">
						<div class="work-period">{portfolio.period}</div>
						<div>
							<h3 class="work-name">{portfolio.name}</h3>
							<p class="work-desc">{portfolio.description}</p>
							<ul class="work-achievements">
								{#each portfolio.achievements as achievement}
									<li>{achievement}</li>
								{/each}
							</ul>
							<div class="tech-row">
								{#each portfolio.technologies as tech}
									<span class="tech-tag">{tech}</span>
								{/each}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Projects: grouped grid -->
	<section class="section projects-section" id="projects">
		<div class="container">
			<div class="section-head">
				<h2 class="section-title">Project archive</h2>
				<p class="section-note">Representative builds grouped by domain.</p>
			</div>

			<div class="project-groups">
				{#each Object.entries(cv.projectGroups) as [category, projects]}
					<div>
						<h3 class="project-group-title">{category}</h3>
						<div class="project-cards">
							{#each projects as project}
								<article class="project-card">
									<div class="project-card-top">
										<h4 class="project-name">{project.name}</h4>
										<span class="project-tech">{project.tech}</span>
									</div>
									<p class="project-impact">{project.impact}</p>
								</article>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact -->
	<section class="section" id="contact">
		<div class="container">
			<div class="section-head">
				<h2 class="section-title">Start a conversation</h2>
				<p class="section-note">
					Available for engineering leadership, full-stack delivery, and architecture consulting.
				</p>
			</div>

			<div class="contact-grid">
				<a href="mailto:{profile.contacts.email}" class="contact-cell">
					<div class="contact-key">Email</div>
					<div class="contact-val">{profile.contacts.email}</div>
				</a>
				<a href="tel:{profile.contacts.phone.replace(/\s/g, '')}" class="contact-cell">
					<div class="contact-key">Phone</div>
					<div class="contact-val">{profile.contacts.phone}</div>
				</a>
				<div class="contact-cell">
					<div class="contact-key">Location</div>
					<div class="contact-val">{profile.contacts.location}</div>
				</div>
				<a
					href={profile.contacts.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					class="contact-cell"
				>
					<div class="contact-key">LinkedIn</div>
					<div class="contact-val">linkedin.com/in/rivaiamin</div>
				</a>
			</div>

			<div class="contact-cta">
				<a href="mailto:{profile.contacts.email}" class="btn-primary">Send email</a>
				<a
					href="https://wa.me/6285814140079"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-ghost"
				>
					WhatsApp
				</a>
			</div>
		</div>
	</section>

	<footer class="footer">
		<div class="container footer-inner">
			<p class="footer-copy">
				&copy; 2025 <strong>{profile.name}</strong>
			</p>
			<div class="social-row">
				{#each socialLinks as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="social-link"
						aria-label={link.label}
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	</footer>

	{#if showScrollTop}
		<button class="scroll-top" onclick={scrollToTop} aria-label="Scroll to top">↑</button>
	{/if}
</div>
