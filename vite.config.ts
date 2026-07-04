import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	esbuild: {
		jsx: 'automatic',
		jsxImportSource: 'react'
	},
	assetsInclude: ['**/*.glb'],
	resolve: {
		dedupe: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei']
	}
});
