<script lang="ts">
	import { browser } from '$app/environment';
	import '$lib/jrpg/src/index.css';

	let root: import('react-dom/client').Root | undefined;

	function mountJrpg(node: HTMLDivElement) {
		if (!browser) return;

		void Promise.all([
			import('react-dom/client'),
			import('react'),
			import('$lib/jrpg/src/App')
		])
			.then(([{ createRoot }, { createElement }, { default: App }]) => {
				root = createRoot(node);
				root.render(createElement(App));
			})
			.catch((err) => {
				console.error('JRPG mount failed:', err);
			});

		return {
			destroy() {
				root?.unmount();
			}
		};
	}
</script>

<svelte:head>
	<title>Riva'i Amin - Developer Status Console</title>
	<meta
		name="description"
		content="Interactive developer status console — portfolio of Riva'i Amin, Senior Full-Stack Engineer with 9+ years of experience in web development, cloud solutions, AI, and 3D art."
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://rivaiamin.github.io/" />
	<meta property="og:title" content="Riva'i Amin - Developer Status Console" />
	<meta
		property="og:description"
		content="Interactive developer status console — Senior Full-Stack Engineer specializing in web development, cloud solutions, AI, and 3D art."
	/>
	<meta property="og:image" content="https://rivaiamin.github.io/rivaiamin_photo.jpg" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://rivaiamin.github.io/" />
	<meta name="twitter:title" content="Riva'i Amin - Developer Status Console" />
	<meta
		name="twitter:description"
		content="Interactive developer status console — Senior Full-Stack Engineer with expertise in modern web technologies, cloud infrastructure, and 3D art."
	/>
	<meta name="twitter:image" content="https://rivaiamin.github.io/rivaiamin_photo.jpg" />

	<link rel="canonical" href="https://rivaiamin.github.io/" />
</svelte:head>

<div use:mountJrpg class="jrpg-root"></div>
