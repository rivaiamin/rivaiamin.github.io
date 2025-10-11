<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/logo.svg';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>Rivai Amin - Software Engineer & 3D Artist Portfolio</title>
	<meta
		name="description"
		content="Rivai Amin is a Software Engineer and 3D Artist specializing in web development, 3D modeling, and creative digital solutions. View portfolio and curriculum vitae."
	/>
	<meta
		name="keywords"
		content="Rivai Amin, Software Engineer, 3D Artist, Web Developer, Portfolio, Curriculum Vitae, 3D Modeling, Programming, GitHub"
	/>
	<meta name="author" content="Rivai Amin" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="UTF-8" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://rivaiamin.github.io/" />
	<meta property="og:title" content="Rivai Amin - Software Engineer & 3D Artist" />
	<meta
		property="og:description"
		content="Software Engineer and 3D Artist specializing in web development, 3D modeling, and creative digital solutions."
	/>
	<meta property="og:site_name" content="Rivai Amin Portfolio" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://rivaiamin.github.io/" />
	<meta name="twitter:title" content="Rivai Amin - Software Engineer & 3D Artist" />
	<meta
		name="twitter:description"
		content="Software Engineer and 3D Artist specializing in web development, 3D modeling, and creative digital solutions."
	/>

	<!-- Canonical URL -->
	<link rel="canonical" href="https://rivaiamin.github.io/" />

	<!-- Favicon -->
	<link rel="icon" href={favicon} />

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Rajdhani:wght@500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children?.()}
