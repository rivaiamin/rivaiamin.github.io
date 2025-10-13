<script lang="ts">
	import { cv, profile } from '$lib/cvData';
	import { onMount } from 'svelte';

	let scrollY = 0;
	let showScrollTop = false;
	let mouseX = 0;
	let mouseY = 0;
	let photoTransform = { x: 0, y: 0 };

	// Social links configuration
	const socialLinks = [
		{
			href: 'https://github.com/rivaiamin',
			label: 'GitHub Profile',
			icon: '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>'
		},
		{
			href: profile.contacts.linkedin,
			label: 'LinkedIn Profile',
			icon: '<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>'
		},
		{
			href: 'https://sketchfab.com/rivaiamin',
			label: 'Sketchfab 3D Portfolio',
			icon: '<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.5 16.5l-6.5-3.75-6.5 3.75V7.5l6.5 3.75 6.5-3.75v9z"/>'
		},
		{
			href: 'https://instagram.com/rivaiamin.tva',
			label: 'Instagram Profile',
			icon: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>'
		},
		{
			href: profile.contacts.portfolio,
			label: 'Portfolio Website',
			icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>',
			isStroke: true
		}
	];

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
			showScrollTop = scrollY > 500;
		};

		const handleMouseMove = (e: MouseEvent) => {
			// Get mouse position relative to viewport center
			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;
			mouseX = (e.clientX - centerX) / centerX;
			mouseY = (e.clientY - centerY) / centerY;
			
			// Apply subtle parallax effect (max 20px movement)
			photoTransform = {
				x: mouseX * 20,
				y: mouseY * 20
			};
		};

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('mousemove', handleMouseMove);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>{profile.name} - Professional Profile</title>

	<!-- SEO Meta Tags -->
	<meta
		name="description"
		content="Professional profile of Riva'i Amin, Senior Full-Stack Engineer and Technical Leader with 9+ years of experience in web development, cloud solutions, and AI."
	/>
	<meta
		name="keywords"
		content="Riva'i Amin, Full-Stack Engineer, Technical Leader, PHP, Golang, Python, Vue.js, Svelte, GCP, AI, Machine Learning, Software Development, Team Leadership"
	/>

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={profile.name + ' - Professional Profile'} />
	<meta
		property="og:description"
		content="Senior Full-Stack Engineer and Technical Leader specializing in scalable web applications, cloud infrastructure, and AI solutions."
	/>
	<meta property="og:type" content="profile" />
	<meta property="og:url" content={profile.contacts.portfolio + '/profile'} />
	<meta property="og:image" content={profile.contacts.portfolio + '/rivaiamin_photo.jpg'} />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={profile.name + ' - Professional Profile'} />
	<meta
		name="twitter:description"
		content="Senior Full-Stack Engineer and Technical Leader with expertise in modern web technologies, cloud infrastructure, and AI."
	/>
	<meta name="twitter:image" content={profile.contacts.portfolio + '/rivaiamin_photo.jpg'} />

	<!-- Canonical URL -->
	<link rel="canonical" href={profile.contacts.portfolio + '/profile'} />

	<style>
		@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');

		:global(body) {
			font-family:
				'Inter',
				-apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				sans-serif;
			background: #0a0e27;
			overflow-x: hidden;
		}

		:global(html) {
			scroll-behavior: smooth;
		}

		.hero-gradient {
			position: relative;
			background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b4e 100%);
			overflow: hidden;
		}

		.hero-pattern {
			position: absolute;
			inset: 0;
			background-image: 
				radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
				radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
				radial-gradient(circle at 40% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
		}

		.grid-pattern {
			position: absolute;
			inset: 0;
			background-image: 
				linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
				linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
			background-size: 50px 50px;
			mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
		}

		.floating-shapes {
			position: absolute;
			inset: 0;
			overflow: hidden;
		}

		.shape {
			position: absolute;
			border-radius: 50%;
			opacity: 0.1;
			filter: blur(40px);
		}

		.shape-1 {
			width: 400px;
			height: 400px;
			background: linear-gradient(135deg, #3b82f6, #10b981);
			top: -100px;
			left: -100px;
			animation: float 20s ease-in-out infinite;
		}

		.shape-2 {
			width: 300px;
			height: 300px;
			background: linear-gradient(135deg, #10b981, #059669);
			bottom: -50px;
			right: -50px;
			animation: float 15s ease-in-out infinite reverse;
		}

		.shape-3 {
			width: 200px;
			height: 200px;
			background: linear-gradient(135deg, #06b6d4, #3b82f6);
			top: 50%;
			right: 10%;
			animation: float 18s ease-in-out infinite;
		}

		@keyframes float {
			0%, 100% { transform: translate(0, 0) rotate(0deg); }
			33% { transform: translate(30px, -30px) rotate(120deg); }
			66% { transform: translate(-20px, 20px) rotate(240deg); }
		}

		.glowing-border {
			position: relative;
			border-radius: 50%;
			padding: 4px;
			background: linear-gradient(135deg, #3b82f6, #10b981, #059669);
			/* animation: rotate-border 3s linear infinite; */
		}

		@keyframes rotate-border {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		}

		.glowing-border::before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: 50%;
			padding: 4px;
			background: linear-gradient(135deg, #3b82f6, #10b981, #059669);
			filter: blur(20px);
			opacity: 0.8;
			z-index: -1;
		}

		.glass-card {
			background: rgba(255, 255, 255, 0.05);
			backdrop-filter: blur(10px);
			border: 1px solid rgba(255, 255, 255, 0.1);
			box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
		}

		.service-card {
			position: relative;
			background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
			border: 1px solid rgba(59, 130, 246, 0.2);
			transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
			overflow: hidden;
		}

		.service-card::before {
			content: '';
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
			transition: left 0.5s ease;
		}

		.service-card:hover::before {
			left: 100%;
		}

		.service-card:hover {
			transform: translateY(-8px) scale(1.02);
			box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
			border-color: rgba(59, 130, 246, 0.5);
		}

		.stat-card {
			position: relative;
			background: rgba(255, 255, 255, 0.02);
			border: 1px solid rgba(255, 255, 255, 0.1);
			transition: all 0.3s ease;
		}

		.stat-card:hover {
			background: rgba(59, 130, 246, 0.05);
			border-color: rgba(59, 130, 246, 0.3);
			transform: translateY(-5px);
		}

		.stat-number {
			font-family: 'Space Grotesk', monospace;
			background: linear-gradient(135deg, #3b82f6 0%, #10b981 50%, #059669 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			background-size: 200% auto;
			animation: gradient-shift 3s ease infinite;
		}

		@keyframes gradient-shift {
			0%, 100% { background-position: 0% center; }
			50% { background-position: 100% center; }
		}

		.section-title {
			font-family: 'Space Grotesk', sans-serif;
			position: relative;
			display: inline-block;
			color: #fff;
		}

		.section-title::before {
			content: '';
			position: absolute;
			bottom: -8px;
			left: 0;
			width: 0;
			height: 4px;
			background: linear-gradient(90deg, #3b82f6, #10b981, #059669);
			border-radius: 2px;
			animation: title-underline 1s ease forwards;
		}

		@keyframes title-underline {
			to { width: 100%; }
		}

		.portfolio-card {
			position: relative;
			background: rgba(15, 23, 42, 0.6);
			border: 1px solid rgba(59, 130, 246, 0.2);
			transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
			overflow: hidden;
		}

		.portfolio-card::after {
			content: '';
			position: absolute;
			top: -50%;
			right: -50%;
			width: 200%;
			height: 200%;
			background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
			opacity: 0;
			transition: opacity 0.4s ease;
		}

		.portfolio-card:hover {
			transform: translateY(-8px);
			box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
			border-color: rgba(59, 130, 246, 0.5);
		}

		.portfolio-card:hover::after {
			opacity: 1;
		}

		.tech-badge {
			position: relative;
			background: rgba(59, 130, 246, 0.1);
			border: 1px solid rgba(59, 130, 246, 0.3);
			color: #60a5fa;
			transition: all 0.3s ease;
		}

		.tech-badge:hover {
			background: rgba(59, 130, 246, 0.2);
			border-color: rgba(59, 130, 246, 0.5);
			transform: translateY(-2px);
		}

		.cta-button {
			position: relative;
			background: linear-gradient(135deg, #3b82f6, #10b981);
			transition: all 0.3s ease;
			overflow: hidden;
		}

		.cta-button::before {
			content: '';
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
			transition: left 0.5s ease;
		}

		.cta-button:hover::before {
			left: 100%;
		}

		.cta-button:hover {
			transform: translateY(-2px);
			box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
		}

		@keyframes fadeInUp {
			from {
				opacity: 0;
				transform: translateY(50px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		.fade-in-up {
			animation: fadeInUp 0.8s ease-out;
		}

		@keyframes slideInLeft {
			from {
				opacity: 0;
				transform: translateX(-50px);
			}
			to {
				opacity: 1;
				transform: translateX(0);
			}
		}

		@keyframes slideInRight {
			from {
				opacity: 0;
				transform: translateX(50px);
			}
			to {
				opacity: 1;
				transform: translateX(0);
			}
		}

		.slide-in-left {
			animation: slideInLeft 0.8s ease-out;
		}

		.slide-in-right {
			animation: slideInRight 0.8s ease-out;
		}

		.scroll-top-button {
			position: fixed;
			bottom: 30px;
			right: 30px;
			width: 50px;
			height: 50px;
			background: linear-gradient(135deg, #3b82f6, #10b981);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all 0.3s ease;
			z-index: 1000;
			box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
		}

		.scroll-top-button:hover {
			transform: translateY(-5px);
			box-shadow: 0 8px 30px rgba(59, 130, 246, 0.6);
		}

		.code-accent {
			font-family: 'Space Grotesk', monospace;
			color: #60a5fa;
		}

		.highlight-text {
			background: linear-gradient(135deg, #3b82f6, #10b981, #059669);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}

		.floating-image {
			animation: gentle-float 6s ease-in-out infinite;
		}

		@keyframes gentle-float {
			0%, 100% { 
				transform: translateY(0px);
			}
			50% { 
				transform: translateY(-15px);
			}
		}
	</style>
</svelte:head>

<!-- Hero Section -->
<section class="hero-gradient text-white py-32 md:py-40 relative overflow-hidden min-h-screen flex items-center">
	<!-- Animated Background -->
	<div class="hero-pattern"></div>
	<div class="grid-pattern"></div>
	
	<!-- Floating Shapes -->
	<div class="floating-shapes">
		<div class="shape shape-1"></div>
		<div class="shape shape-2"></div>
		<div class="shape shape-3"></div>
	</div>

	<div class="container mx-auto px-4 relative z-10">
		<div class="max-w-6xl mx-auto">
			<div class="grid md:grid-cols-2 gap-12 items-center">
				<!-- Left Content -->
				<div class="text-left space-y-8 fade-in-up">
					<div>
						<p class="code-accent text-lg mb-4">
							<span class="text-gray-400">{'<'}</span>Hello World{' '}
							<span class="text-gray-400">{'/>'}</span>
						</p>
						<h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
							I'm <span class="highlight-text">{profile.name}</span>
						</h1>
						<p class="text-xl md:text-2xl text-gray-300 leading-relaxed">
							{profile.tagline}
						</p>
					</div>

					<div class="flex flex-wrap gap-3 sm:gap-4 mt-3 items-center">
						<!-- View Full CV -->
						<!-- <a
							href="/cv"
							target="_blank"
							class="cta-button flex items-center px-7 py-3 md:px-8 md:py-4 text-white font-semibold rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:ring-2 focus:ring-blue-400/60 transition-all duration-300"
							>
							<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<span class="hidden sm:inline">View Full CV</span>
							<span class="sm:hidden">CV</span>
						</a> -->

						<!-- WhatsApp -->
						<a
							href="https://wa.me/6285814140079"
							target="_blank"
							rel="noopener noreferrer"
							class="cta-button flex items-center px-7 py-3 md:px-8 md:py-4 text-white font-semibold rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 focus:ring-2 focus:ring-emerald-400/60 transition-all duration-300"
						>
							<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
							</svg>
							<span class="hidden sm:inline">WhatsApp</span>
							<span class="sm:hidden">WA</span>
						</a>

						<!-- Contact by Email -->
						<a
							href="mailto:{profile.contacts.email}"
							class="flex items-center px-7 py-3 md:px-8 md:py-4 bg-transparent border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 focus:ring-2 focus:ring-blue-400/60 transition-all duration-300"
						>
							<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							<span class="hidden sm:inline">Get In Touch</span>
							<span class="sm:hidden">Email</span>
						</a>
					</div>

			<!-- Social Links -->
			<div class="flex flex-wrap gap-3">
				{#each socialLinks as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={link.label}
						class="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
					>
						<svg class="w-5 h-5" fill={link.isStroke ? 'none' : 'currentColor'} stroke={link.isStroke ? 'currentColor' : ''} viewBox="0 0 24 24">
							{@html link.icon}
						</svg>
					</a>
				{/each}
			</div>
				</div>

				<!-- Right Content - Photo -->
				<div class="flex justify-center md:justify-end slide-in-right">
					<div class="relative" style="transform: translate({photoTransform.x}px, {photoTransform.y}px); transition: transform 0.3s ease-out;">
						<div class="glowing-border">
							<img
								src={profile.photo}
								alt={profile.name}
								class="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover floating-image"
							/>
						</div>
						
						<!-- Floating Stats -->
						<div class="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 hidden md:block"
							style="transform: translate({photoTransform.x * 0.5}px, {photoTransform.y * 0.5}px); transition: transform 0.3s ease-out;">
							<div class="text-3xl font-bold highlight-text">{profile.stats.yearsExperience}+</div>
							<div class="text-sm text-gray-300">Years Exp</div>
						</div>
						
						<div class="absolute -top-4 -right-4 glass-card rounded-2xl p-4 hidden md:block"
							style="transform: translate({photoTransform.x * 0.5}px, {photoTransform.y * 0.5}px); transition: transform 0.3s ease-out;">
							<div class="text-3xl font-bold highlight-text">{profile.stats.projectsCompleted}+</div>
							<div class="text-sm text-gray-300">Projects</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Scroll Indicator -->
		<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
			<svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
			</svg>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="py-20 bg-gradient-to-b from-[#0a0e27] to-[#0f172a] relative">
	<div class="absolute inset-0 opacity-10">
		<div class="absolute inset-0" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.1) 2px, rgba(59, 130, 246, 0.1) 4px);"></div>
	</div>
	
	<div class="container mx-auto px-4 relative z-10">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
			<div class="stat-card p-6 rounded-2xl text-center fade-in-up">
				<div class="text-5xl font-bold stat-number mb-2">{profile.stats.yearsExperience}+</div>
				<div class="text-gray-400 text-sm uppercase tracking-wider">Years Experience</div>
			</div>
			<div class="stat-card p-6 rounded-2xl text-center fade-in-up" style="animation-delay: 0.1s;">
				<div class="text-5xl font-bold stat-number mb-2">{profile.stats.projectsCompleted}+</div>
				<div class="text-gray-400 text-sm uppercase tracking-wider">Projects Completed</div>
			</div>
			<div class="stat-card p-6 rounded-2xl text-center fade-in-up" style="animation-delay: 0.2s;">
				<div class="text-5xl font-bold stat-number mb-2">{profile.stats.technologies}+</div>
				<div class="text-gray-400 text-sm uppercase tracking-wider">Technologies</div>
			</div>
			<div class="stat-card p-6 rounded-2xl text-center fade-in-up" style="animation-delay: 0.3s;">
				<div class="text-5xl font-bold stat-number mb-2">{profile.stats.teamsLed}+</div>
				<div class="text-gray-400 text-sm uppercase tracking-wider">Teams Led</div>
			</div>
		</div>
	</div>
</section>

<!-- About Section -->
<section class="py-20 bg-[#0f172a] relative">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl md:text-5xl font-bold section-title inline-block">About Me</h2>
			</div>

			<div class="grid md:grid-cols-2 gap-8 items-start">
				<div class="slide-in-left">
					<div class="glass-card p-8 rounded-3xl hover:bg-white/10 transition-all duration-300">
						<div class="mb-6">
							<div class="inline-block p-3 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-xl mb-4">
								<svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
								</svg>
							</div>
							<h3 class="text-2xl font-bold text-white mb-4">Professional Summary</h3>
						</div>
						<p class="text-gray-300 leading-relaxed mb-8">
							{profile.summary}
						</p>
						<h4 class="text-lg font-semibold text-white mb-4">Core Values</h4>
						<div class="flex flex-wrap gap-2">
							{#each profile.values as value}
								<span class="tech-badge px-4 py-2 rounded-full text-sm font-medium">
									{value}
								</span>
							{/each}
						</div>
					</div>
				</div>

				<div class="slide-in-right space-y-6">
					<div class="glass-card p-8 rounded-3xl hover:bg-white/10 transition-all duration-300">
						<div class="mb-6">
							<div class="inline-block p-3 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl mb-4">
								<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
								</svg>
							</div>
							<h3 class="text-2xl font-bold text-white mb-4">Educational Background</h3>
						</div>
						<div class="space-y-3 mb-6">
							<h4 class="text-lg font-medium text-blue-400">{profile.education.degree}</h4>
							<p class="text-emerald-400 font-medium">{profile.education.school}</p>
							<p class="text-gray-400 text-sm">{profile.education.specialization}</p>
							<p class="text-gray-500 text-xs">({profile.education.year})</p>
						</div>
					</div>

					<div class="glass-card p-8 rounded-3xl hover:bg-white/10 transition-all duration-300">
						<div class="mb-6">
							<div class="inline-block p-3 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl mb-4">
								<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
								</svg>
							</div>
							<h4 class="text-lg font-semibold text-white mb-4">Awards & Recognition</h4>
						</div>
						<div class="space-y-3">
							{#each profile.awards.slice(0, 2) as award}
								<div class="flex items-start">
									<div class="w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mt-2 mr-3"></div>
									<p class="text-sm text-gray-300">{award}</p>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Services Section -->
<section class="py-20 bg-gradient-to-b from-[#0f172a] to-[#0a0e27]">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl md:text-5xl font-bold section-title inline-block">
					Services & Expertise
				</h2>
				<p class="text-gray-400 mt-6 max-w-2xl mx-auto">
					Delivering cutting-edge solutions across the full technology stack
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-6">
				{#each Object.entries(profile.services) as [service, details], idx}
					<div
						class="service-card p-8 rounded-3xl fade-in-up relative group"
						style="animation-delay: {idx * 0.1}s;"
					>
						<!-- Icon based on service type -->
						<div class="mb-6">
							<div class="inline-block p-4 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-2xl">
								{#if service.includes('Full-Stack')}
									<svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
									</svg>
								{:else if service.includes('Cloud')}
									<svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
									</svg>
								{:else if service.includes('AI')}
									<svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
									</svg>
								{:else}
									<svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
									</svg>
								{/if}
							</div>
						</div>
						
						<h3 class="text-2xl font-bold text-white mb-4">{service}</h3>
						<p class="text-gray-300 mb-6 leading-relaxed">{details.description}</p>
						<div class="flex flex-wrap gap-2">
							{#each details.technologies as tech}
								<span class="tech-badge px-3 py-1.5 rounded-lg text-xs font-medium">
									{tech}
								</span>
							{/each}
						</div>
						
						<!-- Decorative corner -->
						<div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Portfolio Section -->
<section class="py-20 bg-[#0a0e27]">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl md:text-5xl font-bold section-title inline-block">Portfolio of Work</h2>
				<p class="text-gray-400 mt-6 max-w-2xl mx-auto">
					Transforming ideas into impactful digital experiences
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8 mb-16">
				{#each profile.portfolios as portfolio, idx}
					<div
						class="portfolio-card p-8 rounded-3xl fade-in-up relative group"
						style="animation-delay: {idx * 0.15}s;"
					>
						<div class="absolute top-4 right-4">
							<div class="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
								<svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
								</svg>
							</div>
						</div>

						<div class="mb-6">
							<h3 class="text-2xl font-bold text-white mb-2">{portfolio.name}</h3>
							<p class="code-accent text-sm">{portfolio.period}</p>
						</div>

						<p class="text-gray-300 mb-6 leading-relaxed">{portfolio.description}</p>

						<h4 class="font-semibold text-white mb-3 flex items-center">
							<svg class="w-4 h-4 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
							</svg>
							Key Achievements
						</h4>
						<ul class="space-y-2 mb-6">
							{#each portfolio.achievements as achievement}
								<li class="text-sm text-gray-300 flex items-start">
									<span class="text-blue-400 mr-2">▹</span>
									<span>{achievement}</span>
								</li>
							{/each}
						</ul>

						<div class="flex flex-wrap gap-2">
							{#each portfolio.technologies as tech}
								<span class="px-3 py-1 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 text-gray-300 rounded-lg text-xs font-mono">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<!-- Key Projects Section -->
			<div>
				<h3 class="text-3xl font-bold text-white text-center mb-12">Featured Projects</h3>
				<div class="space-y-10">
					{#each Object.entries(cv.projectGroups) as [category, projects], catIdx}
						<div class="fade-in-up" style="animation-delay: {catIdx * 0.1}s;">
							<h4 class="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6 flex items-center">
								<span class="w-2 h-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full mr-3"></span>
								{category}
							</h4>
							<div class="grid md:grid-cols-2 gap-4">
								{#each projects as project}
									<div class="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
										<div class="flex justify-between items-start mb-3">
											<h5 class="font-semibold text-white group-hover:text-blue-400 transition-colors">{project.name}</h5>
											<span class="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-mono">
												{project.tech}
											</span>
										</div>
										<p class="text-gray-300 text-sm leading-relaxed">{project.impact}</p>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Testimonials Section -->
<!-- <section class="py-20 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl font-bold mb-8 relative section-title">Testimonials</h2>

			<div class="grid md:grid-cols-2 gap-8">
				{#each profile.testimonials as testimonial}
					<div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 fade-in-up">
						<div class="text-emerald-500 mb-4">
							<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M11.245 5.43c-.012-.41.189-.774.5-1.044.319-.27.694-.448 1.115-.511.45-.072.874.009 1.245.218.392.222.624.59.69 1.024.073.46-.017.927-.25 1.332-.518.915-1.453 1.5-1.768 1.933.102.333.284.656.538.94.34.375.782.652 1.28.795.492.147.98.136 1.427-.023.44-.16.76-.455.92-.842.146-.348.145-.725-.003-1.073-.315-.836-1.048-1.392-1.574-1.825.408-.33.85-.832 1.195-1.42.406-.695.595-1.49.52-2.29-.064-.756-.375-1.434-.88-1.974-.553-.59-1.288-.999-2.08-.997-.735-.001-1.464.360-2.094.938-.597.545-.985 1.287-1.06 2.107-.086.98.27 1.913.834 2.693.333.486.74.88 1.202 1.168-.28.445-.633.834-1.04 1.152-.436.34-.958.52-1.495.518-.568 0-1.1-.217-1.54-.642-.448-.433-.721-.998-.793-1.618z"
								/>
							</svg>
						</div>
						<p class="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
						<div>
							<p class="font-semibold text-gray-900">{testimonial.author}</p>
							<p class="text-gray-500 text-sm">{testimonial.company}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section> -->

<!-- Contact Section -->
<section class="py-20 bg-gradient-to-b from-[#0a0e27] to-[#0f172a] relative">
	<div class="absolute inset-0 opacity-5">
		<div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.5) 1px, transparent 0); background-size: 40px 40px;"></div>
	</div>

	<div class="container mx-auto px-4 relative z-10">
		<div class="max-w-5xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl md:text-5xl font-bold section-title inline-block">Get In Touch</h2>
				<p class="text-gray-400 mt-6 max-w-2xl mx-auto">
					Have a project in mind? Let's build something amazing together
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-6 mb-12">
				<a href="mailto:{profile.contacts.email}" class="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group flex items-center">
					<div class="bg-gradient-to-br from-blue-500/20 to-emerald-500/20 p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform">
						<svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
						</svg>
					</div>
					<div>
						<h4 class="font-semibold text-white text-sm mb-1">Email</h4>
						<p class="text-gray-400 text-sm">{profile.contacts.email}</p>
					</div>
				</a>

				<a href="tel:{profile.contacts.phone.replace(/\s/g, '')}" class="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group flex items-center">
					<div class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform">
						<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
						</svg>
					</div>
					<div>
						<h4 class="font-semibold text-white text-sm mb-1">Phone</h4>
						<p class="text-gray-400 text-sm">{profile.contacts.phone}</p>
					</div>
				</a>

				<div class="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group flex items-center">
					<div class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform">
						<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
						</svg>
					</div>
					<div>
						<h4 class="font-semibold text-white text-sm mb-1">Location</h4>
						<p class="text-gray-400 text-sm">{profile.contacts.location}</p>
					</div>
				</div>

				<a href={profile.contacts.linkedin} target="_blank" rel="noopener" class="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group flex items-center">
					<div class="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform">
						<svg class="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
							<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
						</svg>
					</div>
					<div>
						<h4 class="font-semibold text-white text-sm mb-1">LinkedIn</h4>
						<p class="text-gray-400 text-sm">linkedin.com/in/rivaiamin</p>
					</div>
				</a>
			</div>

		<div class="text-center">
			<div class="glass-card inline-block px-12 py-10 rounded-3xl">
				<p class="text-gray-300 mb-6 text-lg">Ready to collaborate on your next project?</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<a
						href="mailto:{profile.contacts.email}"
						class="cta-button inline-flex items-center px-10 py-5 text-white font-semibold rounded-full shadow-lg text-lg"
					>
						<svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
						</svg>
						Email Me
					</a>
				<a
					href="https://wa.me/6285814140079"
					target="_blank"
					rel="noopener noreferrer"
					class="cta-button inline-flex items-center px-10 py-5 text-white font-semibold rounded-full shadow-lg text-lg"
				>
						<svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
						</svg>
						WhatsApp
					</a>
				</div>
			</div>
		</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="bg-[#0a0e27] text-white py-12 border-t border-white/10">
	<div class="container mx-auto px-4">
		<div class="text-center">
		<!-- Social Links -->
		<div class="flex justify-center gap-4 mb-6">
			{#each socialLinks as link}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={link.label}
					class="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
				>
					<svg class="w-5 h-5" fill={link.isStroke ? 'none' : 'currentColor'} stroke={link.isStroke ? 'currentColor' : ''} viewBox="0 0 24 24">
						{@html link.icon}
					</svg>
				</a>
			{/each}
		</div>
			
			<p class="text-gray-400">
				© 2025 <span class="text-blue-400">{profile.name}</span>
			</p>
		</div>
	</div>
</footer>

<!-- Scroll to Top Button -->
{#if showScrollTop}
	<button
		on:click={scrollToTop}
		class="scroll-top-button"
		aria-label="Scroll to top"
	>
		<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
		</svg>
	</button>
{/if}

