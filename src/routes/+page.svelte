<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let particles: Array<{ x: number; y: number; size: number; duration: number; delay: number }> =
		[];
	let links: Array<{ href: string; label: string; icon: string }> = [];

	onMount(() => {
		// Generate floating particles
		particles = Array.from({ length: 20 }, () => ({
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			duration: Math.random() * 10 + 10,
			delay: Math.random() * 5
		}));

		const icons = {
			fileLines: `<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 384 512"><path d="M224 136V0H24C10.7 0 0 10.7 0 24V488c0 13.3 10.7 24 24 24H360c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 240c0 13.3-10.7 24-24 24H120c-13.3 0-24-10.7-24-24s10.7-24 24-24h144c13.3 0 24 10.7 24 24zm0-64c0 13.3-10.7 24-24 24H120c-13.3 0-24-10.7-24-24s10.7-24 24-24h144c13.3 0 24 10.7 24 24zm-168-88c0-13.3 10.7-24 24-24h48c13.3 0 24 10.7 24 24s-10.7 24-24 24h-48c-13.3 0-24-10.7-24-24zm256-54.1V128c0-6.4-2.5-12.5-7-17L305 7c-4.5-4.5-10.6-7-17-7h-6.1c-6.4 0-12.5 2.5-17 7l-7 7c-4.5 4.5-7 10.6-7 17v6.1c0 6.4 2.5 12.5 7 17l7 7c4.5 4.5 10.6 7 17 7h6.1c6.4 0 12.5-2.5 17-7l7-7c4.5-4.5 7-10.6 7-17z"/></svg>`,
			github: `<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
			linkedin: `<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
			sketchfab: `<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.5 16.5l-6.5-3.75-6.5 3.75V7.5l6.5 3.75 6.5-3.75v9z"/></svg>`,
			instagram: `<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
		};

		links = [
			{
				href: '/cv',
				label: 'VIEW CURRICULUM VITAE',
				icon: icons.fileLines
			},
			{
				href: 'https://github.com/rivaiamin',
				label: 'GITHUB PROFILE',
				icon: icons.github
			},
			{
				href: 'https://linkedin.com/in/rivaiamin',
				label: 'LINKEDIN PROFILE',
				icon: icons.linkedin
			},
			{
				href: 'https://sketchfab.com/rivaiamin',
				label: '3D PORTFOLIO',
				icon: icons.sketchfab
			},
			{
				href: 'https://instagram.com/rivaiamin.tva',
				label: 'INSTAGRAM',
				icon: icons.instagram
			}
		];
	});
</script>

<div class="fixed inset-0 bg-black overflow-hidden">
	<!-- 3D Model Background -->
	<div class="model-background">
		<iframe
			title="Lost Programmer Background"
			allowfullscreen
			allow="autoplay"
			src="https://sketchfab.com/models/43d32e4f459f4857a054579da61bb3d6/embed?autospin=0.3&autostart=1&preload=1&ui_hide_controls=1&transparent=1&ui_theme=dark"
		>
		</iframe>
	</div>

	<!-- Vignette overlay -->
	<div class="vignette"></div>

	<!-- Floating particles -->
	{#each particles as particle}
		<div
			class="particle"
			style="left: {particle.x}%; top: {particle.y}%; width: {particle.size}px; height: {particle.size}px; animation-duration: {particle.duration}s; animation-delay: {particle.delay}s;"
		></div>
	{/each}

	<!-- Main Menu Content -->
	<div class="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
		<!-- Game Title -->
		<div class="text-center mb-16">
			<h1 class="game-title text-6xl md:text-8xl font-bold text-white mb-4">RIVAI AMIN</h1>
			<p class="text-blue-400 text-lg md:text-xl tracking-widest uppercase opacity-80">
				Software Engineer • 3D Artist
			</p>
		</div>

		<!-- Main Menu -->
		<div class="space-y-6 text-center">
			{#each links as link}
				<button
					on:click={() => goto(link.href)}
					class="menu-item block w-full text-white text-2xl md:text-3xl font-light tracking-wider px-8 py-2"
				>
					{link.label}
				</button>
			{/each}
		</div>

		<!-- Social Icons (Bottom) -->
		<div class="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-6 md:gap-8">
			{#each links as link}
				<a href={link.href} class="social-icon" aria-label={link.label} target="_blank">
					{@html link.icon}
				</a>
			{/each}
		</div>

		<!-- Version/Copyright (Bottom Right) - Hidden on mobile -->
		<div
			class="version-text absolute bottom-20 md:bottom-8 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:right-8 text-gray-600 text-xs tracking-wider text-center md:text-right"
		>
			<p>v1.0.0</p>
			<p class="mt-1">© 2025 RIVAI AMIN</p>
		</div>
	</div>
</div>

<style>
	@keyframes float {
		0%,
		100% {
			transform: translateY(0) translateX(0);
			opacity: 0.3;
		}
		50% {
			transform: translateY(-30px) translateX(10px);
			opacity: 0.7;
		}
	}

	@keyframes glowPulse {
		0%,
		100% {
			text-shadow:
				0 0 10px rgba(59, 130, 246, 0.5),
				0 0 20px rgba(59, 130, 246, 0.3),
				0 0 30px rgba(59, 130, 246, 0.1);
		}
		50% {
			text-shadow:
				0 0 20px rgba(59, 130, 246, 0.8),
				0 0 30px rgba(59, 130, 246, 0.5),
				0 0 40px rgba(59, 130, 246, 0.3);
		}
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.game-title {
		animation:
			glowPulse 3s ease-in-out infinite,
			fadeIn 1s ease-out;
		font-family: 'Rajdhani', sans-serif;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.menu-item {
		font-family: 'Press Start 2P', cursive;
		font-size: 1rem;
		opacity: 0;
		animation: slideIn 0.5s ease-out forwards;
		position: relative;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.menu-item:nth-child(1) {
		animation-delay: 0.3s;
	}
	.menu-item:nth-child(2) {
		animation-delay: 0.4s;
	}
	.menu-item:nth-child(3) {
		animation-delay: 0.5s;
	}
	.menu-item:nth-child(4) {
		animation-delay: 0.6s;
	}
	.menu-item:nth-child(5) {
		animation-delay: 0.7s;
	}

	.menu-item::before {
		content: '▸';
		position: absolute;
		left: -30px;
		opacity: 0;
		transition: all 0.3s ease;
		color: #3b82f6;
	}

	.menu-item:hover::before {
		opacity: 1;
		left: -40px;
		animation: glowPulse 1.5s ease-in-out infinite;
	}

	.menu-item:hover {
		transform: translateX(10px);
		color: #60a5fa;
		text-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
	}

	.particle {
		position: absolute;
		background: rgba(59, 130, 246, 0.4);
		border-radius: 50%;
		pointer-events: none;
		animation: float linear infinite;
	}

	.model-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.15;
		filter: blur(2px);
	}

	.model-background iframe {
		width: 100%;
		height: 100%;
		border: none;
		pointer-events: none;
	}

	.vignette {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%); */
		pointer-events: none;
	}

	.social-icon {
		transition: all 0.3s ease;
		opacity: 0.6;
	}

	.social-icon:hover {
		opacity: 1;
		transform: scale(1.2);
		filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6));
	}

	.version-text {
		animation: fadeIn 2s ease-out;
		animation-delay: 1s;
		opacity: 0;
		animation-fill-mode: forwards;
	}
</style>
