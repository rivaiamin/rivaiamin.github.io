<script>
	// CV data centralized here
	const cv = {
		name: "Riva'i Amin",
		title: 'Fullstack Engineer',
		photo: '/rivaiamin_photo.jpg',
		summary: `A fullstack web engineer who began his career in 2010. I possess experience and feel well-suited
      for involvement in the entire system development cycle, commencing with problem identification,
      elaborating detailed requirements, crafting cost-effective solutions, coordinating development efforts,
      and delivering the final product to users. I've worked with a diverse range of products and catered to
      varying client needs, from academic systems to financial solutions. I'm confident I can adapt quickly and
      tackle a wide array of challenges.`,

		contacts: {
			email: 'rivaiamin.id@gmail.com',
			// phone: '+62 8986 849 527',
			location: 'Tangerang / Bogor, Indonesia',
			linkedin: 'https://linkedin.com/in/rivaiamin',
			portfolio: 'https://rivaiamin.github.io'
		},

		techStacks: [
			'PHP',
			'Javascript',
			'MySQL',
			'Git',
			'Laravel',
			'GCP',
			'GoLang',
			'Python',
			'VueJS',
			'Svelte',
			'NodeJS',
			'DotNet',
			'PostgreSQL',
			'SQL Server',
			'Docker',
			'AlpineJS',
			'CodeIgniter',
			'AngularJS',
		],

		skills: [
			'Backend Web',
			'Frontend Web',
			'Server Operation',
			'SQL Operation',
			'Machine Learning',
			'Team Management',
			'Software Development',
			'Problem Solving',
			'Critical Analysis'
		],

		experiences: [
			{
				company: 'Taldio.com',
				role: 'Fullstack Engineer',
				period: 'Dec 2023 – June 2025',
				bullets: [
					'Develop features and fix bugs using .NET, Golang and other stacks',
					'Maintain Dev Azure and Google Cloud',
					'Maintain automated deployment pipelines'
				]
			},
			{
				company: 'Freelancer',
				role: 'Fullstack Engineer',
				period: 'Jul 2023 – Present',
				bullets: [
					'Develop full customizable tenancy CMS with FilamentPHP',
					'Build and maintain multiple web applications',
					'Training & testing AI models'
				]
			},
			{
				company: 'AIMSIS',
				role: 'VP of Engineer',
				period: 'Jan 2020 – Aug 2023',
				bullets: [
					'Monitor and maintain code for various products',
					'Lead & assist dev team coordination',
					'Plan sprints, review code, deploy and deliver products',
					'Perform server maintenance and troubleshooting'
				]
			},
			{
				company: 'AIMSIS',
				role: 'Fullstack Engineer',
				period: 'Aug 2018 – Dec 2019',
				bullets: [
					'Worked on Veripay, Visimedia and other products',
					'Backend and frontend implementation and maintenance'
				]
			},
			{
				company: 'AIMSIS',
				role: 'Fullstack Engineer',
				period: 'Aug 2018 – Dec 2019',
				bullets: [
					'Worked on Veripay, Visimedia and other products',
					'Backend and frontend implementation and maintenance'
				]
			}
		],

		projects: [
			"Named Entity Recognition for Al-Qur'an Words – OpenNLP",
			'Sentiment Analysis for Twitter about Indonesia Political Issue – OpenNLP',
			'Social Cataloging System – Lumen PHP',
			'e-Money System – Lumen PHP',
			'Docx into Database Converter – Python',
			'Payment Gateway Integration – Golang',
			'School Payment System – VueJS & PHP',
			'Multiple Web App – Laravel & FilamentPHP'
		],

		education: [
			{
				school: 'UIN Syarif Hidayatullah Jakarta',
				major: 'Sistem Informasi',
				note: 'Completed in 2018'
			},
			{
				school: 'SMK Negeri 5 Kota Tangerang',
				major: 'Rekayasa Perangkat Lunak',
				note: 'Completed in 2010'
			}
		],

		awards: ['LKS Web Design 2010 — Juara 1 Tingkat Provinsi Banten']
	};

	// Create JSON-LD structured data for SEO/ATS parsing
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: cv.name,
		jobTitle: cv.title,
		email: cv.contacts.email,
		// telephone: cv.contacts.phone,
		address: {
			'@type': 'PostalAddress',
			addressLocality: cv.contacts.location
		},
		url: cv.contacts.portfolio,
		sameAs: [cv.contacts.linkedin],
		knowsAbout: cv.techStacks,
		hasOccupation: {
			'@type': 'Occupation',
			name: cv.title,
			skills: cv.skills
		},
		worksFor: cv.experiences.map((exp) => ({
			'@type': 'OrganizationRole',
			roleName: exp.role,
			memberOf: {
				'@type': 'Organization',
				name: exp.company
			},
			startDate: exp.period.split('–')[0].trim(),
			endDate: exp.period.split('–')[1]?.trim() || 'Present'
		}))
	};

	// Trigger PDF download (opens print dialog)
	function downloadPDF() {
		window.print();
	}
</script>

<svelte:head>
	<title>{cv.name} - CV</title>
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>`}
	<style>
		@page {
			size: A4;
			margin: 15mm 20mm;
		}
		@media print {
			body {
				background: white !important;
				color: black;
				margin: 0 !important;
				padding: 0 !important;
			}
			main {
				background: white !important;
				padding: 0 !important;
				margin: 0 !important;
				min-height: auto !important;
			}
			article {
				background: white !important;
				box-shadow: none !important;
				border-radius: 0 !important;
				padding: 0 !important;
				margin: 0 !important;
				max-width: none !important;
				width: 100% !important;
			}
			a {
				color: #1e3a8a !important;
				text-decoration: none !important;
			}
			#download-btn,
			#back-btn,
			.print\\:hidden {
				display: none !important;
			}
			/* Page break controls */
			.print-break {
				page-break-inside: avoid;
			}
			.print-break-before {
				page-break-before: always;
			}
			.print-break-after {
				page-break-after: always;
			}
			/* Ensure sections don't break awkwardly */
			section {
				page-break-inside: avoid;
				orphans: 3;
				widows: 3;
			}
			/* Keep headers with their content */
			h1, h2, h3 {
				page-break-after: avoid;
			}
			/* Keep list items together when possible */
			ul, ol {
				page-break-inside: avoid;
			}
			/* Experience entries should stay together */
			.experience-entry {
				page-break-inside: avoid;
				margin-bottom: 1rem;
			}
		}
	</style>
</svelte:head>

<main
	class="min-h-screen flex justify-center bg-gradient-to-br from-slate-50 to-blue-50 print:bg-white print:min-h-0 print:flex-none print:justify-start text-gray-900 py-12 px-4 sm:px-6 lg:px-8 print:py-0 print:px-0"
>
	<article
		class="w-full max-w-4xl bg-white shadow-xl rounded-xl print:shadow-none print:rounded-none print:max-w-none print:w-full overflow-hidden relative"
	>
		<!-- Action Buttons -->
		<div class="print:hidden absolute top-6 left-6 right-6 flex justify-between items-center z-10">
			<button
				id="back-btn"
				type="button"
				class="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 hover:shadow-md"
				on:click={() => history.back()}
				aria-label="Go back"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back
			</button>

			<button
				id="download-btn"
				on:click={downloadPDF}
				class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 hover:shadow-md"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
					/>
				</svg>
				Download PDF
			</button>
		</div>
		<!-- Add space below the action bar for separation from content -->
		<div class="print:hidden h-10"></div>

		<!-- Content Container -->
		<div class="px-8 sm:px-12 py-16 print:px-8 print:py-8">
			<!-- Header -->
			<header class="border-b-2 border-blue-600 pb-8 mb-8 print-break">
				<div class="flex items-start gap-8">
					<img
						src={cv.photo}
						alt={`Profile photo placeholder for ${cv.name}`}
						class="w-28 h-28 rounded-lg object-cover ring-4 ring-blue-100 shadow-md flex-shrink-0"
					/>
					<div class="flex-1">
						<h1 class="text-4xl font-bold text-gray-900 mb-2 tracking-tight">{cv.name}</h1>
						<p class="text-xl text-blue-700 font-semibold mb-4">{cv.title}</p>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
						<div class="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 text-blue-600 flex-shrink-0"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							<a href={'mailto:' + cv.contacts.email} class="hover:text-blue-700 transition-colors"
								>{cv.contacts.email}</a
							>
						</div>
						<!-- <div class="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 text-blue-600 flex-shrink-0"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
							<a
								href={'tel:' + cv.contacts.phone.replace(/\s/g, '')}
								class="hover:text-blue-700 transition-colors">{cv.contacts.phone}</a
							>
						</div> -->
						<div class="flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 text-blue-600 flex-shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<span>{cv.contacts.location}</span>
							</div>
							<div class="flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 text-blue-600 flex-shrink-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
									/>
								</svg>
								<a
									href={cv.contacts.portfolio}
									target="_blank"
									rel="noopener"
									class="hover:text-blue-700 transition-colors">{cv.contacts.portfolio}</a
								>
							</div>
						</div>
					</div>
				</div>
			</header>

			<!-- Summary -->
			<section class="mb-8 print-break">
				<h2
					class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide"
				>
					Professional Summary
				</h2>
				<p class="text-gray-700 leading-relaxed text-justify">{cv.summary}</p>
			</section>

			<!-- Experience -->
			<section class="mb-8 print-break">
				<h2
					class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide"
				>
					Professional Experience
				</h2>
				<div class="space-y-6">
					{#each cv.experiences as exp, index}
						<div class="experience-entry">
							<div class="flex justify-between items-start mb-2">
								<div class="flex-1">
									<h3 class="text-lg font-bold text-gray-900">{exp.company}</h3>
									<p class="text-base text-blue-700 font-semibold">{exp.role}</p>
								</div>
								<span
									class="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-md whitespace-nowrap ml-4"
									>{exp.period}</span
								>
							</div>
							<ul class="space-y-1.5 ml-5">
								{#each exp.bullets as bullet}
									<li class="text-gray-700 leading-relaxed relative pl-2 before:content-['▸'] before:absolute before:left-[-12px] before:text-blue-600 before:font-bold">
										{bullet}
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</section>

			<!-- Two-column layout for Tech Stacks and Skills -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
				<!-- Tech Stacks -->
				<section class="print-break">
					<h2
						class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide"
					>
						Technical Skills
					</h2>
					<div class="flex flex-wrap gap-2">
						{#each cv.techStacks as tech}
							<span
								class="text-sm bg-blue-50 text-blue-800 border border-blue-300 px-3 py-1.5 rounded-md font-medium"
								>{tech}</span
							>
						{/each}
					</div>
				</section>

				<!-- Skills -->
				<section class="print-break">
					<h2
						class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide"
					>
						Core Competencies
					</h2>
					<ul class="grid grid-cols-1 gap-2">
						{#each cv.skills as skill}
							<li class="text-gray-700 relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-green-600 before:font-bold">
								{skill}
							</li>
						{/each}
					</ul>
				</section>
			</div>

			<!-- Projects -->
			<section class="mb-8 print-break">
				<h2
					class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide"
				>
					Key Projects & Products
				</h2>
				<ul class="grid grid-cols-1 gap-2">
					{#each cv.projects as project}
						<li class="text-gray-700 leading-relaxed relative pl-5 before:content-['▸'] before:absolute before:left-0 before:text-blue-600 before:font-bold">
							{project}
						</li>
					{/each}
				</ul>
			</section>

			<!-- Education -->
			<section class="mb-8 print-break">
				<h2
					class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide"
				>
					Education
				</h2>
				<div class="space-y-4">
					{#each cv.education as edu}
						<div>
							<h3 class="text-lg font-bold text-gray-900">{edu.school}</h3>
							<p class="text-base text-blue-700 font-semibold">{edu.major}</p>
							<p class="text-sm text-gray-600 mt-1">{edu.note}</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- Awards -->
			<section class="mb-8 print-break">
				<h2
					class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide"
				>
					Awards & Recognition
				</h2>
				<ul class="space-y-2">
					{#each cv.awards as award}
						<li class="text-gray-700 relative pl-5 before:content-['★'] before:absolute before:left-0 before:text-yellow-600 before:font-bold">
							{award}
						</li>
					{/each}
				</ul>
			</section>

			<!-- Links -->
			<section class="print-break">
				<h2
					class="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300 uppercase tracking-wide"
				>
					Contact & Links
				</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-900">Email:</span>
						<a href={'mailto:' + cv.contacts.email} class="text-blue-700 hover:underline"
							>{cv.contacts.email}</a
						>
					</div>
					<!-- <div class="flex items-center gap-2">
						<span class="font-semibold text-gray-900">Phone:</span>
						<a
							href={'tel:' + cv.contacts.phone.replace(/\s/g, '')}
							class="text-blue-700 hover:underline">{cv.contacts.phone}</a
						>
					</div> -->
					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-900">LinkedIn:</span>
						<a
							href={cv.contacts.linkedin}
							target="_blank"
							rel="noopener"
							class="text-blue-700 hover:underline break-all">{cv.contacts.linkedin}</a
						>
					</div>
					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-900">Portfolio:</span>
						<a
							href={cv.contacts.portfolio}
							target="_blank"
							rel="noopener"
							class="text-blue-700 hover:underline">{cv.contacts.portfolio}</a
						>
					</div>
				</div>
			</section>
		</div>
	</article>
</main>
