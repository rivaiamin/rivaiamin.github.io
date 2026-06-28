<script lang="ts">
	import { browser } from '$app/environment';
	import { cv, profile } from '$lib/cvData';
	import { onMount } from 'svelte';

	type Theme = 'light' | 'dark';

	const THEME_STORAGE_KEY = 'profile-theme';

	let showScrollTop = $state(false);
	let activeSection = $state('about');
	let theme = $state<Theme>('dark');

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

	const navSections = [
		{ id: 'about', label: 'About' },
		{ id: 'expertise', label: 'Expertise' },
		{ id: 'work', label: 'Work' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'contact', label: 'Contact' }
	];

	const serviceEntries = Object.entries(profile.services);

	const firstName = profile.name.split(' ')[0];
	const lastName = profile.name.split(' ').slice(1).join(' ');

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function trimQuote(quote: string, maxLen = 200): string {
		if (quote.length <= maxLen) return quote;
		const cut = quote.slice(0, maxLen);
		const lastSpace = cut.lastIndexOf(' ');
		return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLen)}…`;
	}

	function readSystemTheme(): Theme {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function readStoredTheme(): Theme {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		return stored === 'light' || stored === 'dark' ? stored : readSystemTheme();
	}

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}

	function applyThemeToDocument(next: Theme) {
		document.documentElement.dataset.profileTheme = next;
		document.documentElement.style.colorScheme = next;
		document.body.style.backgroundColor = next === 'light' ? '#f4f6fa' : '#0b0d12';
		document.body.style.color = next === 'light' ? '#151820' : '#e8eaef';
	}

	$effect(() => {
		if (!browser) return;
		applyThemeToDocument(theme);
	});

	function reveal(node: HTMLElement) {
		node.classList.add('reveal-pending');
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('reveal-visible');
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	onMount(() => {
		theme = readStoredTheme();

		const sectionEls = navSections
			.map((s) => document.getElementById(s.id))
			.filter((el): el is HTMLElement => el !== null);

		const spy = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]?.target.id) {
					activeSection = visible[0].target.id;
				}
			},
			{ rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
		);

		for (const el of sectionEls) spy.observe(el);

		const heroSentinel = document.getElementById('hero-sentinel');
		const scrollTopObserver = new IntersectionObserver(
			([entry]) => {
				showScrollTop = entry ? !entry.isIntersecting : false;
			},
			{ threshold: 0 }
		);
		if (heroSentinel) scrollTopObserver.observe(heroSentinel);

		const prevBg = document.body.style.backgroundColor;
		const prevColor = document.body.style.color;
		const prevScheme = document.documentElement.style.colorScheme;
		const prevDataset = document.documentElement.dataset.profileTheme;

		return () => {
			spy.disconnect();
			scrollTopObserver.disconnect();
			document.body.style.backgroundColor = prevBg;
			document.body.style.color = prevColor;
			document.documentElement.style.colorScheme = prevScheme;
			if (prevDataset) {
				document.documentElement.dataset.profileTheme = prevDataset;
			} else {
				delete document.documentElement.dataset.profileTheme;
			}
		};
	});
</script>

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
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap"
		rel="stylesheet"
	/>

	{@html `<script>(function(){try{var k='profile-theme',s=localStorage.getItem(k),d=window.matchMedia('(prefers-color-scheme: dark)').matches,t=s==='light'||s==='dark'?s:(d?'dark':'light');document.documentElement.dataset.profileTheme=t;document.documentElement.style.colorScheme=t;}catch(e){}})();</script>`}

	<style>
		/*
		 * DESIGN IDENTITY: Cold Stack Dossier
		 * Developer-leader portfolio. Dual craft (systems + 3D) on cool slate base
		 * with a single cobalt accent. Dials: VARIANCE 6 | MOTION 5 | DENSITY 4
		 */

		:global(body) {
			font-family: 'IBM Plex Sans', system-ui, sans-serif;
			overflow-x: hidden;
			transition:
				background-color 0.25s ease,
				color 0.25s ease;
		}

		:global(html) {
			scroll-behavior: smooth;
		}

		.profile-page {
			--accent: #4d8df7;
			--accent-hover: #5c9af8;
			--accent-glow: rgb(77 141 247 / 0.2);
			--accent-dim: rgb(77 141 247 / 0.12);
			--accent-border: rgb(77 141 247 / 0.35);
			--accent-border-soft: rgb(77 141 247 / 0.3);
			--radius-sm: 2px;
			--radius: 4px;
			--radius-lg: 8px;
			--font-display: 'Outfit', system-ui, sans-serif;
			--font-mono: 'IBM Plex Mono', ui-monospace, monospace;
			position: relative;
			background: var(--bg);
			color: var(--ink);
			overflow-x: clip;
			transition:
				background-color 0.25s ease,
				color 0.25s ease;
		}

		.profile-page[data-theme='dark'] {
			color-scheme: dark;
			--bg: #0b0d12;
			--surface: #12151c;
			--surface-raised: #1a1e28;
			--ink: #e8eaef;
			--muted: #7a8494;
			--faint: #4f5868;
			--line: rgb(232 234 239 / 0.09);
			--shadow-tint: rgb(11 13 18 / 0.7);
			--on-accent: #0b0d12;
			--hero-scrim: rgb(11 13 18 / 0.7);
			--hero-watermark: rgb(232 234 239 / 0.02);
			--ghost-hover-border: rgb(232 234 239 / 0.22);
			--ghost-hover-bg: rgb(255 255 255 / 0.03);
			--grain-opacity: 0.04;
		}

		.profile-page[data-theme='light'] {
			color-scheme: light;
			--bg: #f4f6fa;
			--surface: #ffffff;
			--surface-raised: #eef1f7;
			--ink: #151820;
			--muted: #5c6578;
			--faint: #919aad;
			--line: rgb(21 24 32 / 0.1);
			--shadow-tint: rgb(21 24 32 / 0.1);
			--on-accent: #ffffff;
			--hero-scrim: rgb(244 246 250 / 0.82);
			--hero-watermark: rgb(21 24 32 / 0.04);
			--ghost-hover-border: rgb(21 24 32 / 0.18);
			--ghost-hover-bg: rgb(21 24 32 / 0.04);
			--grain-opacity: 0.025;
			--accent: #3b7aed;
			--accent-hover: #4d8df7;
			--accent-glow: rgb(59 122 237 / 0.16);
			--accent-dim: rgb(59 122 237 / 0.1);
			--accent-border: rgb(59 122 237 / 0.35);
			--accent-border-soft: rgb(59 122 237 / 0.28);
		}

		.skip-link {
			position: absolute;
			top: -100%;
			left: 1rem;
			z-index: 100;
			padding: 0.6rem 1rem;
			background: var(--accent);
			color: var(--on-accent);
			font-size: 0.85rem;
			font-weight: 600;
			text-decoration: none;
			border-radius: var(--radius);
		}

		.skip-link:focus {
			top: 1rem;
		}

		.blueprint-bg {
			position: fixed;
			inset: 0;
			pointer-events: none;
			z-index: 0;
			background-image:
				linear-gradient(var(--line) 1px, transparent 1px),
				linear-gradient(90deg, var(--line) 1px, transparent 1px);
			background-size: 3.5rem 3.5rem;
			mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%);
		}

		.grain {
			position: fixed;
			inset: 0;
			pointer-events: none;
			z-index: 50;
			opacity: var(--grain-opacity);
			background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
			transition: opacity 0.25s ease;
		}

		.container {
			width: min(100%, 68rem);
			margin-inline: auto;
			padding-inline: max(1rem, env(safe-area-inset-left, 0px))
				max(1rem, env(safe-area-inset-right, 0px));
		}

		@media (min-width: 768px) {
			.container {
				padding-inline: max(2rem, env(safe-area-inset-left, 0px))
					max(2rem, env(safe-area-inset-right, 0px));
			}
		}

		/* Dossier nav */
		.dossier-nav {
			display: none;
			position: fixed;
			left: max(1rem, calc((100vw - 68rem) / 2 - 8rem));
			top: 50%;
			transform: translateY(-50%);
			z-index: 30;
			flex-direction: column;
			gap: 0.15rem;
		}

		@media (min-width: 1200px) {
			.dossier-nav {
				display: flex;
			}
		}

		.dossier-link {
			font-family: var(--font-mono);
			font-size: 0.62rem;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			color: var(--faint);
			text-decoration: none;
			padding: 0.35rem 0;
			border-left: 2px solid transparent;
			padding-left: 0.75rem;
			transition:
				color 0.2s ease,
				border-color 0.2s ease;
		}

		.dossier-link:hover,
		.dossier-link:focus-visible {
			color: var(--muted);
		}

		.dossier-link.active {
			color: var(--accent);
			border-left-color: var(--accent);
		}

		.dossier-link:focus-visible {
			outline: 2px solid var(--accent);
			outline-offset: 3px;
		}

		/* Mobile section nav */
		.mobile-nav {
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 35;
			background: color-mix(in srgb, var(--surface) 92%, transparent);
			backdrop-filter: blur(12px);
			-webkit-backdrop-filter: blur(12px);
			border-top: 1px solid var(--line);
			padding: 0.4rem 0.35rem calc(0.4rem + env(safe-area-inset-bottom, 0px));
			gap: 0.15rem;
		}

		@media (min-width: 768px) {
			.mobile-nav {
				display: none;
			}
		}

		.mobile-nav-link {
			flex: 1;
			min-width: 0;
			min-height: 2.75rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-family: var(--font-mono);
			font-size: 0.58rem;
			letter-spacing: 0.04em;
			text-transform: uppercase;
			color: var(--faint);
			text-decoration: none;
			border-radius: var(--radius-sm);
			padding: 0.35rem 0.2rem;
			transition:
				color 0.2s ease,
				background 0.2s ease;
		}

		.mobile-nav-link:hover,
		.mobile-nav-link:focus-visible {
			color: var(--ink);
		}

		.mobile-nav-link.active {
			color: var(--accent);
			background: var(--accent-dim);
		}

		.mobile-nav-link:focus-visible {
			outline: 2px solid var(--accent);
			outline-offset: 1px;
		}

		@media (prefers-reduced-transparency: reduce) {
			.mobile-nav {
				background: var(--surface);
				backdrop-filter: none;
				-webkit-backdrop-filter: none;
			}
		}

		/* Hero */
		.hero {
			position: relative;
			min-height: 100dvh;
			display: grid;
			align-items: end;
			padding-block: 4.5rem 2.5rem;
			border-bottom: 1px solid var(--line);
			overflow: hidden;
			z-index: 1;
		}

		.hero-ambient {
			position: absolute;
			width: 55vw;
			height: 55vw;
			max-width: 36rem;
			max-height: 36rem;
			right: -12%;
			top: 5%;
			background: radial-gradient(circle, var(--accent-glow) 0%, transparent 68%);
			pointer-events: none;
			filter: blur(40px);
		}

		.hero-topbar {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1.25rem 0;
			z-index: 3;
		}

		.hero-topbar-actions {
			display: flex;
			align-items: center;
			gap: 0.65rem;
		}

		.theme-toggle {
			font-family: var(--font-mono);
			font-size: 0.68rem;
			letter-spacing: 0.06em;
			color: var(--muted);
			background: var(--surface);
			border: 1px solid var(--line);
			border-radius: var(--radius);
			padding: 0.45rem 0.7rem;
			cursor: pointer;
			transition:
				color 0.2s ease,
				border-color 0.2s ease,
				background 0.2s ease;
		}

		.theme-toggle:hover {
			color: var(--ink);
			border-color: var(--accent-border-soft);
			background: var(--surface-raised);
		}

		.theme-toggle:focus-visible {
			outline: 2px solid var(--accent);
			outline-offset: 3px;
		}

		.theme-toggle:active {
			transform: scale(0.98);
		}

		.back-link {
			font-family: var(--font-mono);
			font-size: 0.68rem;
			letter-spacing: 0.08em;
			text-transform: uppercase;
			color: var(--muted);
			text-decoration: none;
			transition: color 0.2s ease;
		}

		.back-link:hover,
		.back-link:focus-visible {
			color: var(--ink);
		}

		.back-link:focus-visible {
			outline: 2px solid var(--accent);
			outline-offset: 3px;
		}

		.hero-ref {
			display: none;
		}

		.hero-grid {
			display: grid;
			gap: 2.5rem;
			align-items: end;
			position: relative;
			z-index: 2;
		}

		@media (min-width: 900px) {
			.hero-grid {
				grid-template-columns: 1.2fr 0.8fr;
				gap: 1rem 3.5rem;
			}
		}

		.hero-copy {
			padding-bottom: 1rem;
		}

		.hero-role {
			font-family: var(--font-mono);
			font-size: 0.7rem;
			letter-spacing: 0.16em;
			text-transform: uppercase;
			color: var(--accent);
			margin-bottom: 1.5rem;
		}

		.hero-title {
			font-family: var(--font-display);
			font-size: clamp(2.5rem, 7vw, 4.75rem);
			font-weight: 700;
			line-height: 1.05;
			letter-spacing: -0.03em;
			margin: 0 0 1.25rem;
			text-wrap: balance;
		}

		.hero-title .accent {
			color: var(--accent);
			font-weight: 600;
		}

		.hero-lead {
			max-width: 36ch;
			font-size: 1.05rem;
			line-height: 1.7;
			color: var(--muted);
			margin: 0 0 2rem;
			text-wrap: pretty;
		}

		.hero-actions {
			display: flex;
			flex-wrap: wrap;
			gap: 0.65rem;
			margin-bottom: 2rem;
		}

		@media (max-width: 899px) {
			.hero {
				min-height: auto;
				padding-block: 4.75rem 2rem;
				align-items: start;
			}

			.hero-ambient {
				width: 80vw;
				height: 50vw;
				right: -20%;
				top: 2rem;
			}

			.hero-grid {
				gap: 1.5rem;
			}

			.hero-visual {
				order: -1;
				justify-self: center;
				width: min(72%, 14rem);
				margin-right: 0;
			}

			.hero-bg-mark {
				font-size: clamp(3.5rem, 24vw, 6rem);
				left: -2vw;
				bottom: auto;
				top: 5.5rem;
			}

			.hero-role {
				font-size: 0.62rem;
				letter-spacing: 0.1em;
				line-height: 1.5;
				margin-bottom: 1rem;
			}

			.hero-title {
				font-size: clamp(2rem, 9.5vw, 2.75rem);
				margin-bottom: 1rem;
			}

			.hero-lead {
				font-size: 1rem;
				margin-bottom: 1.5rem;
			}

			.hero-actions {
				margin-bottom: 0;
			}

			.hero-actions .btn-primary,
			.hero-actions .btn-ghost {
				flex: 1 1 calc(50% - 0.35rem);
				min-height: 2.75rem;
				padding-inline: 1rem;
			}

			.hero-topbar {
				padding-block: 0.85rem;
			}
		}

		@media (max-width: 380px) {
			.back-link {
				font-size: 0.6rem;
				letter-spacing: 0.05em;
			}

			.theme-toggle {
				padding: 0.4rem 0.55rem;
				font-size: 0.62rem;
			}
		}

		.btn-primary,
		.btn-ghost {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: 0.75rem 1.4rem;
			font-size: 0.88rem;
			font-weight: 600;
			text-decoration: none;
			border-radius: var(--radius);
			transition:
				transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
				background 0.22s ease,
				border-color 0.22s ease,
				box-shadow 0.22s ease;
			white-space: nowrap;
		}

		.btn-primary {
			background: var(--accent);
			color: var(--on-accent);
			border: 1px solid var(--accent);
			box-shadow: 0 4px 20px var(--accent-dim);
		}

		.btn-primary:hover {
			transform: translateY(-2px);
			background: var(--accent-hover);
			box-shadow: 0 8px 28px var(--accent-glow);
		}

		.btn-primary:active {
			transform: scale(0.98) translateY(0);
		}

		.btn-primary:focus-visible,
		.btn-ghost:focus-visible {
			outline: 2px solid var(--ink);
			outline-offset: 3px;
		}

		.btn-ghost {
			background: transparent;
			color: var(--ink);
			border: 1px solid var(--line);
		}

		.btn-ghost:hover {
			border-color: var(--ghost-hover-border);
			background: var(--ghost-hover-bg);
			transform: translateY(-1px);
		}

		.social-row {
			display: flex;
			flex-wrap: wrap;
			gap: 0.45rem;
		}

		.social-link {
			font-family: var(--font-mono);
			font-size: 0.68rem;
			letter-spacing: 0.05em;
			color: var(--muted);
			text-decoration: none;
			padding: 0.4rem 0.65rem;
			border: 1px solid var(--line);
			border-radius: var(--radius-sm);
			transition:
				color 0.2s ease,
				border-color 0.2s ease,
				background 0.2s ease;
		}

		.social-link:hover {
			color: var(--ink);
			border-color: var(--accent);
			background: var(--accent-dim);
		}

		.social-link:focus-visible {
			outline: 2px solid var(--accent);
			outline-offset: 2px;
		}

		.hero-visual {
			position: relative;
			justify-self: end;
			width: min(100%, 20rem);
			margin-right: -0.5rem;
		}

		@media (min-width: 900px) {
			.hero-visual {
				width: 100%;
				max-width: 24rem;
				margin-top: -2rem;
				margin-right: -1.5rem;
			}
		}

		.viewport-frame {
			position: relative;
			aspect-ratio: 4 / 5;
			overflow: hidden;
			background: var(--surface);
			box-shadow:
				0 24px 48px var(--shadow-tint),
				0 0 0 1px var(--line);
		}

		.viewport-frame img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center top;
			filter: saturate(0.88) contrast(1.06);
		}

		.viewport-frame::before {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(195deg, transparent 50%, var(--hero-scrim) 100%);
			pointer-events: none;
			z-index: 1;
		}

		.viewport-corner {
			position: absolute;
			width: 1.25rem;
			height: 1.25rem;
			border-color: var(--accent);
			border-style: solid;
			z-index: 2;
			pointer-events: none;
			opacity: 0.75;
		}

		.viewport-corner--tl {
			top: 0.75rem;
			left: 0.75rem;
			border-width: 2px 0 0 2px;
		}

		.viewport-corner--tr {
			top: 0.75rem;
			right: 0.75rem;
			border-width: 2px 2px 0 0;
		}

		.viewport-corner--bl {
			bottom: 0.75rem;
			left: 0.75rem;
			border-width: 0 0 2px 2px;
		}

		.viewport-corner--br {
			bottom: 0.75rem;
			right: 0.75rem;
			border-width: 0 2px 2px 0;
		}

		.photo-caption {
			margin-top: 0.65rem;
			font-family: var(--font-mono);
			font-size: 0.65rem;
			letter-spacing: 0.06em;
			color: var(--muted);
		}

		.hero-bg-mark {
			position: absolute;
			left: -4vw;
			bottom: 8vh;
			font-family: var(--font-display);
			font-size: clamp(6rem, 18vw, 14rem);
			font-weight: 700;
			line-height: 0.85;
			color: var(--hero-watermark);
			pointer-events: none;
			user-select: none;
			letter-spacing: -0.04em;
			z-index: 0;
		}

		/* Metrics */
		.metrics {
			position: relative;
			z-index: 1;
			border-bottom: 1px solid var(--line);
			background: var(--surface);
		}

		.metrics-inner {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		.metric {
			padding: 1.25rem 1rem;
			border-right: 1px solid var(--line);
			border-bottom: 1px solid var(--line);
		}

		.metric:nth-child(2n) {
			border-right: none;
		}

		.metric:nth-child(n + 3) {
			border-bottom: none;
		}

		@media (min-width: 768px) {
			.metrics-inner {
				grid-template-columns: repeat(4, 1fr);
			}

			.metric {
				padding: 1.75rem 1.5rem;
				border-bottom: none;
				border-right: 1px solid var(--line);
			}

			.metric:nth-child(2n) {
				border-right: 1px solid var(--line);
			}

			.metric:last-child {
				border-right: none;
			}
		}

		.metric-value {
			font-family: var(--font-mono);
			font-size: clamp(1.85rem, 4vw, 2.5rem);
			font-weight: 500;
			color: var(--accent);
			font-variant-numeric: tabular-nums;
			margin-bottom: 0.4rem;
			line-height: 1;
		}

		.metric-label {
			font-size: 0.78rem;
			color: var(--muted);
			line-height: 1.45;
		}

		.social-strip {
			position: relative;
			z-index: 1;
			padding-block: 1.25rem 1.5rem;
			border-bottom: 1px solid var(--line);
		}

		@media (max-width: 767px) {
			.social-strip .social-row {
				display: grid;
				grid-template-columns: repeat(2, minmax(0, 1fr));
				gap: 0.4rem;
			}

			.social-strip .social-link {
				display: flex;
				align-items: center;
				justify-content: center;
				min-height: 2.5rem;
			}

			.social-strip .social-link:last-child:nth-child(odd) {
				grid-column: 1 / -1;
			}
		}

		/* Sections */
		.section {
			position: relative;
			z-index: 1;
			padding-block: 3rem 3.5rem;
			scroll-margin-top: 1rem;
		}

		@media (min-width: 768px) {
			.section {
				padding-block: 6rem 6.5rem;
				scroll-margin-top: 2rem;
			}
		}

		.section-head {
			margin-bottom: 3rem;
			max-width: 40rem;
		}

		@media (max-width: 767px) {
			.section-head {
				margin-bottom: 2rem;
			}

			.section-title {
				font-size: clamp(1.55rem, 6.5vw, 2rem);
			}

			.about-summary {
				font-size: 1rem;
				margin-bottom: 1.5rem;
			}

			.side-panel {
				padding: 1.25rem;
			}

			.expertise-card {
				padding: 1.35rem;
				min-height: auto;
			}

			.work-item {
				padding-block: 1.75rem;
			}

			.work-name {
				font-size: 1.25rem;
			}

			.project-groups {
				gap: 2.5rem;
			}

			.project-card-top {
				flex-direction: column;
				align-items: flex-start;
				gap: 0.35rem;
			}

			.project-tech {
				white-space: normal;
				padding-top: 0;
			}

			.testimonial {
				padding: 1.35rem;
			}

			.contact-cell {
				padding: 1.15rem 1.2rem;
			}

			.footer .social-row {
				display: none;
			}

			.profile-page {
				padding-bottom: calc(3.5rem + env(safe-area-inset-bottom, 0px));
			}

			.scroll-top {
				right: 1rem;
				bottom: calc(4.5rem + env(safe-area-inset-bottom, 0px));
			}
		}

		.section-title {
			font-family: var(--font-display);
			font-size: clamp(1.85rem, 4vw, 2.75rem);
			font-weight: 600;
			letter-spacing: -0.02em;
			line-height: 1.08;
			margin: 0;
			text-wrap: balance;
		}

		.section-note {
			margin-top: 1rem;
			max-width: 46ch;
			color: var(--muted);
			line-height: 1.7;
			font-size: 0.98rem;
			text-wrap: pretty;
		}

		/* About */
		.about-grid {
			display: grid;
			gap: 2.5rem;
		}

		@media (min-width: 900px) {
			.about-grid {
				grid-template-columns: 1.35fr 0.85fr;
				gap: 4rem;
				align-items: start;
			}
		}

		.about-summary {
			font-size: 1.12rem;
			line-height: 1.78;
			color: var(--ink);
			margin: 0 0 2.25rem;
			max-width: 54ch;
			text-wrap: pretty;
		}

		.values-scroll {
			display: flex;
			flex-wrap: wrap;
			gap: 0.45rem;
		}

		.value-chip {
			font-size: 0.8rem;
			padding: 0.4rem 0.7rem;
			border: 1px solid var(--line);
			border-radius: var(--radius-sm);
			color: var(--muted);
			background: var(--surface);
			transition:
				border-color 0.2s ease,
				color 0.2s ease;
		}

		.value-chip:hover {
			border-color: var(--accent-dim);
			color: var(--ink);
		}

		.side-stack {
			display: grid;
			gap: 1px;
			background: var(--line);
			border: 1px solid var(--line);
		}

		.side-panel {
			background: var(--surface);
			padding: 1.6rem;
		}

		.panel-label {
			font-family: var(--font-mono);
			font-size: 0.65rem;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			color: var(--accent);
			margin-bottom: 0.9rem;
		}

		.panel-title {
			font-family: var(--font-display);
			font-size: 1.1rem;
			font-weight: 600;
			margin: 0 0 0.4rem;
			line-height: 1.25;
		}

		.panel-sub {
			font-size: 0.88rem;
			color: var(--muted);
			margin: 0;
			line-height: 1.6;
		}

		.award-list {
			list-style: none;
			padding: 0;
			margin: 0;
			display: grid;
			gap: 0.9rem;
		}

		.award-list li {
			font-size: 0.86rem;
			color: var(--muted);
			line-height: 1.55;
			padding-left: 1rem;
			border-left: 2px solid var(--accent);
		}

		/* Expertise */
		.expertise-section {
			background: var(--surface);
			border-block: 1px solid var(--line);
		}

		.expertise-grid {
			display: grid;
			gap: 1.25rem;
		}

		@media (min-width: 768px) {
			.expertise-grid {
				grid-template-columns: repeat(2, 1fr);
				gap: 1.25rem;
			}

			.expertise-card:nth-child(1) {
				grid-row: span 1;
			}

			.expertise-card:nth-child(4) {
				grid-column: 1 / -1;
				display: grid;
				grid-template-columns: 1fr 1.4fr;
				gap: 2rem;
				align-items: start;
			}
		}

		.expertise-card {
			position: relative;
			background: var(--bg);
			border: 1px solid var(--line);
			padding: 1.75rem;
			min-height: 11rem;
			display: flex;
			flex-direction: column;
			transition:
				border-color 0.25s ease,
				box-shadow 0.25s ease;
		}

		.expertise-card:hover {
			border-color: var(--accent-border);
			box-shadow: 0 12px 40px var(--shadow-tint);
		}

		.expertise-card.tint-a {
			background:
				radial-gradient(ellipse 70% 80% at 100% 0%, var(--accent-dim), transparent 60%),
				var(--bg);
		}

		.expertise-card.tint-b {
			background:
				linear-gradient(160deg, var(--accent-dim), transparent 50%),
				var(--bg);
		}

		.expertise-card.featured {
			background:
				radial-gradient(ellipse 80% 60% at 0% 100%, var(--accent-glow), transparent 55%),
				var(--surface-raised);
		}

		.expertise-title {
			font-family: var(--font-display);
			font-size: 1.3rem;
			font-weight: 600;
			margin: 0 0 0.7rem;
			line-height: 1.2;
		}

		.expertise-desc {
			font-size: 0.9rem;
			color: var(--muted);
			line-height: 1.65;
			margin: 0 0 auto;
			padding-bottom: 1.25rem;
			max-width: 40ch;
		}

		.tech-row {
			display: flex;
			flex-wrap: wrap;
			gap: 0.35rem;
			margin-top: auto;
		}

		.tech-tag {
			font-family: var(--font-mono);
			font-size: 0.65rem;
			padding: 0.28rem 0.48rem;
			border: 1px solid var(--line);
			color: var(--muted);
			border-radius: var(--radius-sm);
		}

		/* Work timeline */
		.timeline {
			position: relative;
			padding-left: 0;
		}

		@media (min-width: 768px) {
			.timeline {
				padding-left: 2rem;
			}

			.timeline::before {
				content: '';
				position: absolute;
				left: 0.4rem;
				top: 0.5rem;
				bottom: 0.5rem;
				width: 1px;
				background: linear-gradient(180deg, var(--accent), var(--line) 85%);
			}
		}

		.work-item {
			position: relative;
			display: grid;
			gap: 1rem;
			padding-block: 2.25rem;
			border-bottom: 1px solid var(--line);
		}

		@media (min-width: 768px) {
			.work-item {
				grid-template-columns: 10rem 1fr;
				gap: 3rem;
				padding-left: 1.5rem;
			}

			.work-item::before {
				content: '';
				position: absolute;
				left: -1.65rem;
				top: 2.65rem;
				width: 9px;
				height: 9px;
				border-radius: 50%;
				background: var(--bg);
				border: 2px solid var(--accent);
				box-shadow: 0 0 0 4px var(--accent-dim);
			}
		}

		.work-item:first-child {
			padding-top: 0;
		}

		.work-item:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}

		.work-period {
			font-family: var(--font-mono);
			font-size: 0.72rem;
			color: var(--accent);
			letter-spacing: 0.03em;
			line-height: 1.5;
		}

		.work-name {
			font-family: var(--font-display);
			font-size: 1.4rem;
			font-weight: 600;
			margin: 0 0 0.6rem;
			line-height: 1.2;
		}

		.work-desc {
			color: var(--muted);
			line-height: 1.68;
			margin: 0 0 1.25rem;
			max-width: 54ch;
			font-size: 0.95rem;
		}

		.work-achievements {
			list-style: none;
			padding: 0;
			margin: 0 0 1.25rem;
			display: grid;
			gap: 0.5rem;
		}

		.work-achievements li {
			font-size: 0.87rem;
			color: var(--ink);
			padding-left: 1.1rem;
			position: relative;
			line-height: 1.5;
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
			gap: 3.5rem;
		}

		.project-group-head {
			display: flex;
			align-items: baseline;
			gap: 1rem;
			margin-bottom: 1.25rem;
			flex-wrap: wrap;
		}

		.project-group-title {
			font-family: var(--font-display);
			font-size: 1.15rem;
			font-weight: 600;
			margin: 0;
			color: var(--ink);
		}

		.project-group-count {
			font-family: var(--font-mono);
			font-size: 0.62rem;
			color: var(--faint);
			letter-spacing: 0.08em;
		}

		.project-cards {
			display: grid;
			gap: 0.65rem;
		}

		@media (min-width: 768px) {
			.project-cards {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		.project-card {
			background: var(--bg);
			border: 1px solid var(--line);
			padding: 1.2rem 1.3rem;
			transition:
				border-color 0.2s ease,
				transform 0.2s ease;
		}

		.project-card:hover {
			border-color: var(--accent-border-soft);
			transform: translateY(-2px);
		}

		.project-card-top {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			gap: 1rem;
			margin-bottom: 0.5rem;
		}

		.project-name {
			font-size: 0.92rem;
			font-weight: 600;
			margin: 0;
			line-height: 1.35;
		}

		.project-tech {
			font-family: var(--font-mono);
			font-size: 0.62rem;
			color: var(--accent);
			white-space: nowrap;
			flex-shrink: 0;
			padding-top: 0.15rem;
		}

		.project-impact {
			font-size: 0.83rem;
			color: var(--muted);
			line-height: 1.55;
			margin: 0;
		}

		/* Testimonials */
		.testimonials-grid {
			display: grid;
			gap: 1.25rem;
		}

		@media (min-width: 768px) {
			.testimonials-grid {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		.testimonial {
			background: var(--surface);
			border: 1px solid var(--line);
			padding: 1.75rem;
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
		}

		.testimonial-quote {
			font-size: 1rem;
			line-height: 1.6;
			color: var(--ink);
			margin: 0;
			text-wrap: pretty;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.testimonial-quote::before {
			content: '\201C';
			color: var(--accent);
		}

		.testimonial-meta {
			margin-top: auto;
			padding-top: 1rem;
			border-top: 1px solid var(--line);
		}

		.testimonial-author {
			font-size: 0.82rem;
			font-weight: 600;
			color: var(--ink);
			margin: 0 0 0.2rem;
		}

		.testimonial-company {
			font-family: var(--font-mono);
			font-size: 0.65rem;
			color: var(--faint);
			letter-spacing: 0.04em;
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
			padding: 1.4rem 1.5rem;
			text-decoration: none;
			color: inherit;
			transition: background 0.2s ease;
		}

		a.contact-cell:hover {
			background: var(--surface-raised);
		}

		a.contact-cell:focus-visible {
			outline: 2px solid var(--accent);
			outline-offset: -2px;
		}

		.contact-key {
			font-family: var(--font-mono);
			font-size: 0.65rem;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			color: var(--faint);
			margin-bottom: 0.45rem;
		}

		.contact-val {
			font-size: 0.94rem;
			color: var(--ink);
			word-break: break-word;
		}

		.contact-cta {
			display: none;
		}

		/* Footer */
		.footer {
			position: relative;
			z-index: 1;
			padding-block: 2.5rem 3.5rem;
			border-top: 1px solid var(--line);
		}

		.footer-inner {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
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
			font-size: 0.8rem;
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
			color: var(--on-accent);
			border: none;
			border-radius: var(--radius);
			cursor: pointer;
			z-index: 40;
			font-size: 1.1rem;
			line-height: 1;
			box-shadow: 0 8px 24px var(--accent-dim);
			transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
		}

		.scroll-top:hover {
			transform: translateY(-3px);
		}

		.scroll-top:active {
			transform: scale(0.96);
		}

		.scroll-top:focus-visible {
			outline: 2px solid var(--ink);
			outline-offset: 3px;
		}

		/* Scroll reveals */
		.reveal-pending {
			opacity: 0;
			transform: translateY(22px);
			transition:
				opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
				transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
		}

		.reveal-visible {
			opacity: 1;
			transform: translateY(0);
		}

		@media (prefers-reduced-motion: reduce) {
			.reveal-pending {
				opacity: 1;
				transform: none;
				transition: none;
			}

			.btn-primary,
			.btn-ghost,
			.social-link,
			.scroll-top,
			.contact-cell,
			.project-card,
			.expertise-card,
			.value-chip,
			.theme-toggle,
			.mobile-nav-link,
			.profile-page,
			:global(body) {
				transition: none;
			}
		}
	</style>
</svelte:head>

<div class="profile-page" data-theme={theme}>
	<a href="#main" class="skip-link">Skip to content</a>
	<div class="blueprint-bg" aria-hidden="true"></div>
	<div class="grain" aria-hidden="true"></div>

	<nav class="dossier-nav" aria-label="Page sections">
		{#each navSections as section}
			<a
				href="#{section.id}"
				class="dossier-link"
				class:active={activeSection === section.id}
			>
				{section.label}
			</a>
		{/each}
	</nav>

	<header class="hero">
		<div class="hero-ambient" aria-hidden="true"></div>
		<div class="hero-bg-mark" aria-hidden="true">stack</div>

		<div class="container hero-topbar">
			<a href="/" class="back-link">← Portfolio</a>
			<div class="hero-topbar-actions">
				<button
					type="button"
					class="theme-toggle"
					onclick={toggleTheme}
					aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
				>
					{theme === 'dark' ? 'Light' : 'Dark'}
				</button>
			</div>
		</div>

		<div class="container hero-grid">
			<div class="hero-copy" use:reveal>
				<p class="hero-role">{profile.tagline}</p>
				<h1 class="hero-title">
					{firstName}
					<span class="accent">{lastName}</span>
				</h1>
				<p class="hero-lead">
					Full-stack systems for fintech, education, and product teams. Based in Indonesia.
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
			</div>

			<div class="hero-visual" use:reveal>
				<div class="viewport-frame">
					<span class="viewport-corner viewport-corner--tl" aria-hidden="true"></span>
					<span class="viewport-corner viewport-corner--tr" aria-hidden="true"></span>
					<span class="viewport-corner viewport-corner--bl" aria-hidden="true"></span>
					<span class="viewport-corner viewport-corner--br" aria-hidden="true"></span>
					<img src={profile.photo} alt={profile.name} width="400" height="500" />
				</div>
				<p class="photo-caption">Engineer and 3D</p>
			</div>
		</div>
		<div id="hero-sentinel" aria-hidden="true"></div>
	</header>

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

	<section class="social-strip" aria-label="Social links">
		<div class="container">
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
	</section>

	<main id="main">
		<section class="section" id="about">
			<div class="container" use:reveal>
				<div class="section-head">
					<h2 class="section-title">Systems that hold up when traffic spikes</h2>
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

		<section class="section expertise-section" id="expertise">
			<div class="container" use:reveal>
				<div class="section-head">
					<h2 class="section-title">What I build</h2>
					<p class="section-note">
						Backend to browser, cloud to model weights. End-to-end delivery without handoff gaps.
					</p>
				</div>

				<div class="expertise-grid">
					{#each serviceEntries as [service, details], idx}
						<article
							class="expertise-card"
							class:featured={idx === 3}
							class:tint-a={idx === 0}
							class:tint-b={idx === 2}
						>
							<h3 class="expertise-title">{service}</h3>
							<p class="expertise-desc">{details.description}</p>
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

		<section class="section" id="work">
			<div class="container" use:reveal>
				<div class="section-head">
					<h2 class="section-title">Selected work</h2>
					<p class="section-note">
						Payment rails, LMS at national scale, enterprise CMS, and AI-assisted delivery pipelines.
					</p>
				</div>

				<div class="timeline">
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

		<section class="section projects-section" id="projects">
			<div class="container" use:reveal>
				<div class="section-head">
					<h2 class="section-title">Project archive</h2>
					<p class="section-note">Representative builds grouped by domain.</p>
				</div>

				<div class="project-groups">
					{#each Object.entries(cv.projectGroups) as [category, projects]}
						<div>
							<div class="project-group-head">
								<h3 class="project-group-title">{category}</h3>
								<span class="project-group-count">{projects.length} projects</span>
							</div>
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

		{#if profile.testimonials.length > 0}
			<section class="section" id="voices">
				<div class="container" use:reveal>
					<div class="section-head">
						<h2 class="section-title">What collaborators say</h2>
					</div>

					<div class="testimonials-grid">
						{#each profile.testimonials as testimonial}
							<blockquote class="testimonial">
								<p class="testimonial-quote">{trimQuote(testimonial.quote)}</p>
								<footer class="testimonial-meta">
									<p class="testimonial-author">{testimonial.author}</p>
									<p class="testimonial-company">{testimonial.company}</p>
								</footer>
							</blockquote>
						{/each}
					</div>
				</div>
			</section>
		{/if}

		<section class="section" id="contact">
			<div class="container" use:reveal>
				<div class="section-head">
					<h2 class="section-title">Start a conversation</h2>
					<p class="section-note">
						Open to engineering leadership, full-stack delivery, and architecture consulting.
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
			</div>
		</section>
	</main>

	<footer class="footer">
		<div class="container footer-inner">
			<p class="footer-copy">
				&copy; { new Date().getFullYear() } <strong>{profile.name}</strong>
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

	<nav class="mobile-nav" aria-label="Page sections">
		{#each navSections as section}
			<a
				href="#{section.id}"
				class="mobile-nav-link"
				class:active={activeSection === section.id}
			>
				{section.label}
			</a>
		{/each}
	</nav>
</div>
