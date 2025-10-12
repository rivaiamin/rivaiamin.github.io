<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/logo.svg';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Default Meta Tags (can be overridden by individual pages) -->
	<title>Riva'i Amin - Senior Full-Stack Engineer & 3D Artist</title>
	<meta
		name="description"
		content="Senior Full-Stack Engineer with 9+ years of experience in web development, cloud solutions, AI, and 3D art. Expert in PHP, Golang, Python, Vue.js, Svelte, and modern technologies."
	/>
	<meta
		name="keywords"
		content="Riva'i Amin, Rivai Amin, Full-Stack Engineer, Senior Developer, Software Engineer, 3D Artist, PHP, Golang, Python, JavaScript, Vue.js, Svelte, Laravel, Cloud Computing, GCP, Azure, AI, Machine Learning, DevOps, Technical Leader, Indonesia Developer, Web Development"
	/>
	<meta name="author" content="Riva'i Amin" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="revisit-after" content="7 days" />
	
	<!-- Open Graph / Facebook (Default) -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://rivaiamin.github.io/" />
	<meta property="og:title" content="Riva'i Amin - Senior Full-Stack Engineer & 3D Artist" />
	<meta
		property="og:description"
		content="Senior Full-Stack Engineer with 9+ years of experience specializing in web development, cloud solutions, AI, and 3D art."
	/>
	<meta property="og:image" content="https://rivaiamin.github.io/rivaiamin_photo.jpg" />
	<meta property="og:site_name" content="Riva'i Amin Portfolio" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card (Default) -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://rivaiamin.github.io/" />
	<meta name="twitter:title" content="Riva'i Amin - Senior Full-Stack Engineer & 3D Artist" />
	<meta
		name="twitter:description"
		content="Senior Full-Stack Engineer with expertise in modern web technologies, cloud infrastructure, and 3D art."
	/>
	<meta name="twitter:image" content="https://rivaiamin.github.io/rivaiamin_photo.jpg" />

	<!-- Additional SEO Meta Tags -->
	<meta name="theme-color" content="#3b82f6" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="format-detection" content="telephone=no" />

	<!-- Favicon -->
	<link rel="icon" href={favicon} />

	<!-- Fonts (Preconnect for performance) -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Rajdhani:wght@500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children?.()}
