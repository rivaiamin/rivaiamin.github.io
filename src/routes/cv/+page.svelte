<script>
	import { cv } from '$lib/cvData';

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

	// Copy CV link to clipboard
	function copyLink() {
		const url = `${cv.contacts.portfolio}/cv`;
		navigator.clipboard.writeText(url).then(() => {
			alert('CV link copied to clipboard!');
		});
	}
</script>

<svelte:head>
	<title>{cv.name} - {cv.title} | CV / Resume</title>

	<!-- SEO Meta Tags -->
	<meta
		name="description"
		content="Senior Full-Stack Engineer and Technical Leader with 9+ years of experience delivering high-impact web and cloud solutions across fintech, education, and AI sectors. Expert in PHP, Golang, Python, Vue.js, Svelte, and cloud infrastructure (GCP, Azure)."
	/>
	<meta
		name="keywords"
		content="Full-Stack Engineer, Senior Developer, Technical Leader, PHP, Golang, Python, Vue.js, Svelte, Node.js, .NET, Laravel, FilamentPHP, Google Cloud Platform, Azure, AI, Machine Learning, TensorFlow, DevOps, CI/CD, Docker, Software Architecture, Team Leadership, Riva'i Amin"
	/>
	<meta name="author" content={cv.name} />
	<meta name="robots" content="index, follow" />

	<!-- Open Graph Meta Tags for Social Media -->
	<meta property="og:title" content="{cv.name} - {cv.title}" />
	<meta
		property="og:description"
		content="Senior Full-Stack Engineer with 9+ years of experience in web development, cloud solutions, and AI. Skilled in PHP, Golang, Python, Vue.js, Svelte, and cloud infrastructure."
	/>
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="{cv.contacts.portfolio}/cv" />
	<meta property="og:image" content="{cv.contacts.portfolio}/rivaiamin_photo.jpg" />
	<meta property="og:site_name" content="{cv.name} - Portfolio" />
	<meta property="profile:first_name" content="Riva'i" />
	<meta property="profile:last_name" content="Amin" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{cv.name} - {cv.title}" />
	<meta
		name="twitter:description"
		content="Senior Full-Stack Engineer with 9+ years of experience. Expert in PHP, Golang, Python, Vue.js, Svelte, and cloud infrastructure."
	/>
	<meta name="twitter:image" content="{cv.contacts.portfolio}/rivaiamin_photo.jpg" />

	<!-- Canonical URL -->
	<link rel="canonical" href="{cv.contacts.portfolio}/cv" />

	<!-- JSON-LD Structured Data for SEO/ATS -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>`}

	<style>
		@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

		@page {
			size: A4;
			margin: 15mm 20mm;
		}

		:global(body) {
			font-family:
				'Inter',
				-apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				sans-serif;
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
			h1,
			h2,
			h3 {
				page-break-after: avoid;
			}
			/* Keep list items together when possible */
			ul,
			ol {
				page-break-inside: avoid;
			}
			/* Experience entries should stay together */
			.experience-entry {
				page-break-inside: avoid;
				margin-bottom: 1rem;
			}
			/* Ensure accent bar prints */
			.accent-bar {
				background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
				-webkit-print-color-adjust: exact;
				print-color-adjust: exact;
			}
		}

		/* Modern accent styles */
		.accent-bar {
			background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
			height: 6px;
			width: 100%;
		}

		.section-badge {
			display: inline-block;
			background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
			color: white;
			padding: 0.5rem 1rem;
			font-size: 0.875rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			border-radius: 0.375rem;
			margin-bottom: 1rem;
		}

		.metric-highlight {
			font-weight: 700;
			color: #2563eb;
		}
	</style>
</svelte:head>

<main
	class="min-h-screen flex justify-center bg-gradient-to-br from-slate-50 to-blue-50 print:bg-white print:min-h-0 print:flex-none print:justify-start text-gray-900 py-12 px-4 sm:px-6 lg:px-8 print:py-0 print:px-0"
>
	<article
		class="w-full max-w-5xl bg-white shadow-2xl rounded-2xl print:shadow-none print:rounded-none print:max-w-none print:w-full overflow-hidden relative"
	>
		<!-- Modern Accent Bar -->
		<div class="accent-bar"></div>

		<!-- Action Bar with Integrated Share Info -->
		<div class="print:hidden absolute top-4 sm:top-8 left-4 right-4 sm:left-6 sm:right-6 z-10">
			<!-- Top row: Action buttons -->
			<div class="flex justify-between items-center gap-2 mb-3">
				<button
					id="back-btn"
					type="button"
					class="bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 text-sm font-semibold py-2 px-3 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-1 hover:shadow-lg hover:border-gray-300"
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
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<span class="hidden sm:inline">Back</span>
				</button>

				<div class="flex items-center gap-2">
					<button
						id="share-btn"
						on:click={copyLink}
						class="bg-white hover:bg-gray-50 border-2 border-blue-200 text-blue-700 text-sm font-semibold py-2 px-3 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-1 hover:shadow-lg hover:border-blue-300"
						aria-label="Copy link"
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
								d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
							/>
						</svg>
						<span class="hidden sm:inline">Share Link</span>
						<span class="sm:hidden">Share</span>
					</button>

					<button
						id="download-btn"
						on:click={downloadPDF}
						class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold py-2 px-3 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-1 hover:shadow-xl hover:scale-105"
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
						<span class="hidden sm:inline">Download PDF</span>
						<span class="sm:hidden">PDF</span>
					</button>
				</div>
			</div>

			<!-- Bottom row: Shareable link info -->
			<div class="flex justify-center">
				<div
					class="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-lg px-3 sm:px-4 py-2 shadow-sm max-w-full"
				>
					<p class="text-xs text-gray-600 flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3 text-blue-500 flex-shrink-0"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span class="font-medium text-blue-700 text-center sm:text-left">Always up-to-date:</span>
						<span class="font-mono text-xs bg-blue-50 px-2 py-0.5 rounded border break-all text-center"
							>{cv.contacts.portfolio}/cv</span
						>
					</p>
				</div>
			</div>
		</div>
		<!-- Add space below the action bar for separation from content -->
		<div class="print:hidden h-32 sm:h-24"></div>

		<!-- Content Container -->
		<div class="px-4 sm:px-8 lg:px-12 py-8 sm:py-12 print:px-8 print:py-8">
			<!-- Header -->
			<header class="mb-10 print:mb-8 print-break">
				<!-- Print-only online CV notice -->
				<div class="hidden print:block bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded">
					<p class="text-sm text-gray-800">
						<span class="font-bold text-blue-700">📄 View this CV online:</span>
						<span class="font-semibold">{cv.contacts.portfolio}/cv</span>
					</p>
				</div>

				<div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
					<img
						src={cv.photo}
						alt={`${cv.name} - Professional Photo`}
						class="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-blue-200 shadow-xl flex-shrink-0"
					/>
					<div class="flex-1 text-center sm:text-left">
						<h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-3 tracking-tight leading-tight">
							{cv.name}
						</h1>
						<p class="text-lg sm:text-xl lg:text-2xl text-blue-700 font-bold mb-4 sm:mb-5">{cv.title}</p>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
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
								<a
									href={'mailto:' + cv.contacts.email}
									class="hover:text-blue-700 transition-colors break-all">{cv.contacts.email}</a
								>
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
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
								<a
									href={'tel:' + cv.contacts.phone.replace(/\s/g, '')}
									class="hover:text-blue-700 transition-colors">{cv.contacts.phone}</a
								>
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
									class="hover:text-blue-700 transition-colors break-all">{cv.contacts.portfolio}</a
								>
							</div>
							<!-- LinkedIn Profile Link -->
							<div class="flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4 text-blue-600 flex-shrink-0"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
									/>
								</svg>
								<a
									href={cv.contacts.linkedin}
									target="_blank"
									rel="noopener"
									class="hover:text-blue-700 transition-colors break-all">{cv.contacts.linkedin}</a
								>
							</div>
						</div>
					</div>
				</div>
			</header>

			<!-- Summary -->
			<section class="mb-10 print:mb-6 mt-8 print:mt-6 print-break">
				<h2
					class="text-2xl font-extrabold text-gray-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-blue-600"
				>
					PROFESSIONAL SUMMARY
				</h2>
				<div
					class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-600"
				>
					<p class="text-gray-800 leading-relaxed text-base">{cv.summary}</p>
				</div>
			</section>

			<!-- Section Divider -->
			<div class="border-t border-gray-200 my-10 print:my-6"></div>

			<!-- Experience -->
			<section class="mb-10 print:mb-6 mt-8 print:mt-6 print-break">
				<h2
					class="text-2xl font-extrabold text-gray-900 uppercase tracking-wide mb-6 pb-2 border-b-2 border-blue-600"
				>
					WORK EXPERIENCE
				</h2>
				<div class="space-y-7">
					{#each cv.experiences as exp, index}
						<div class="experience-entry bg-gray-50 p-5 rounded-xl border-l-4 border-blue-500">
							<div class="flex justify-between items-start mb-3">
								<div class="flex-1">
									<h3 class="text-xl font-extrabold text-gray-900">{exp.company}</h3>
									<p class="text-base text-blue-700 font-bold mt-1">{exp.role}</p>
								</div>
								<span
									class="text-xs text-gray-700 font-bold bg-gray-100 px-4 py-2 rounded-lg whitespace-nowrap ml-4"
									>{exp.period}</span
								>
							</div>
							<ul class="list-disc list-outside ml-5 space-y-2 text-gray-800">
								{#each exp.bullets as bullet}
									<li class="text-sm leading-relaxed pl-1">
										{bullet}
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</section>

			<!-- Section Divider -->
			<div class="border-t border-gray-200 my-10 print:my-6"></div>

			<!-- Unified Technical & Leadership Skills -->
			<section class="mb-10 print:mb-6 mt-8 print:mt-6 print-break">
				<h2
					class="text-2xl font-extrabold text-gray-900 uppercase tracking-wide mb-6 pb-2 border-b-2 border-blue-600"
				>
					TECHNICAL & LEADERSHIP SKILLS
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each Object.entries(cv.technicalSkills) as [category, skills]}
						<div class="bg-gray-50 p-5 rounded-xl border-l-4 border-blue-500">
							<h3 class="text-base font-extrabold text-blue-700 mb-3 uppercase tracking-wide">
								{category}
							</h3>
							<div class="text-gray-800 text-sm leading-relaxed">
								{skills.join(' • ')}
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- Section Divider -->
			<div class="border-t border-gray-200 my-10 print:my-6"></div>

			<!-- Projects -->
			<section class="mb-10 print:mb-6 mt-8 print:mt-6 print-break">
				<h2
					class="text-2xl font-extrabold text-gray-900 uppercase tracking-wide mb-6 pb-2 border-b-2 border-blue-600"
				>
					KEY PROJECTS
				</h2>
				<div class="space-y-8">
					{#each Object.entries(cv.projectGroups) as [category, projects]}
						<div>
							<h3
								class="text-lg font-extrabold text-blue-700 mb-4 uppercase tracking-wide flex items-center gap-2"
							>
								<span class="w-2 h-2 bg-blue-600 rounded-full"></span>
								{category}
							</h3>
							<div class="grid grid-cols-1 gap-4 ml-4">
								{#each projects as project}
									<div class="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
										<div
											class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2"
										>
											<h4 class="text-base font-bold text-gray-900">{project.name}</h4>
											<span
												class="text-xs text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-full whitespace-nowrap self-start"
											>
												{project.tech}
											</span>
										</div>
										<p class="text-sm text-gray-700 leading-relaxed">{project.impact}</p>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- Section Divider -->
			<div class="border-t border-gray-200 my-10 print:my-6"></div>

			<!-- Education -->
			<section class="mb-10 print:mb-6 mt-8 print:mt-6 print-break">
				<h2
					class="text-2xl font-extrabold text-gray-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-blue-600"
				>
					EDUCATION
				</h2>
				<div class="space-y-5">
					{#each cv.education as edu}
						<div class="bg-gray-50 p-5 rounded-xl border-l-4 border-green-500">
							<h3 class="text-xl font-extrabold text-gray-900">{edu.school}</h3>
							<p class="text-base text-gray-900 font-bold mt-1">{edu.major}</p>
							<p class="text-sm text-gray-700 mt-2 font-medium">{edu.note}</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- Section Divider -->
			<div class="border-t border-gray-200 my-10 print:my-6"></div>

			<!-- Other Professional Activities (Judge, Trainer, etc.) -->
			<section class="mb-10 print:mb-6 mt-8 print:mt-6 print-break">
				<h2
					class="text-2xl font-extrabold text-gray-900 uppercase tracking-wide mb-5 pb-2 border-b-2 border-blue-600"
				>
					PROFESSIONAL ACTIVITIES
				</h2>
				<div class="space-y-5">
					{#each cv.otherActivities as activity}
						<div class="bg-gray-50 p-5 rounded-xl border-l-4 border-purple-500">
							<div class="flex justify-between items-start mb-2">
								<div class="flex-1">
									<h3 class="text-lg font-extrabold text-gray-900">{activity.organization}</h3>
									<p class="text-base text-gray-900 font-bold mt-1">{activity.role}</p>
								</div>
								<span
									class="text-xs text-gray-700 font-bold bg-gray-100 px-4 py-2 rounded-lg whitespace-nowrap ml-4"
									>{activity.period}</span
								>
							</div>
							<p class="text-gray-800 leading-relaxed text-sm mt-2">{activity.description}</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- Section Divider -->
			<div class="border-t border-gray-200 my-10 print:my-6"></div>

			<!-- Awards -->
			<section class="mb-10 print:mb-6 mt-8 print:mt-6 print-break">
				<h2
					class="text-2xl font-extrabold text-gray-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-blue-600"
				>
					AWARDS & HONORS
				</h2>
				<ul class="list-disc list-outside ml-5 space-y-2">
					{#each cv.awards as award}
						<li class="text-gray-800 text-sm font-medium pl-1">
							{award}
						</li>
					{/each}
				</ul>
			</section>

			<!-- Section Divider -->
			<div class="border-t border-gray-200 my-10 print:my-6"></div>

			<!-- Links -->
			<section class="mt-8 print:mt-6 print-break">
				<h2
					class="text-2xl font-extrabold text-gray-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-blue-600"
				>
					CONTACT
				</h2>
				<div class="grid grid-cols-1 gap-4 text-gray-800">
					<div class="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-blue-600"
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
						<div>
							<span class="font-bold text-gray-900 block text-xs">Email</span>
							<a
								href={'mailto:' + cv.contacts.email}
								class="text-blue-700 hover:underline font-semibold">{cv.contacts.email}</a
							>
						</div>
					</div>
					<div class="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-blue-600"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
							/>
						</svg>
						<div>
							<span class="font-bold text-gray-900 block text-xs">LinkedIn</span>
							<a
								href={cv.contacts.linkedin}
								target="_blank"
								rel="noopener"
								class="text-blue-700 hover:underline break-all font-semibold"
								>{cv.contacts.linkedin}</a
							>
						</div>
					</div>
					<div class="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-blue-600"
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
						<div>
							<span class="font-bold text-gray-900 block text-xs">Portfolio</span>
							<a
								href={cv.contacts.portfolio}
								target="_blank"
								rel="noopener"
								class="text-blue-700 hover:underline font-semibold">{cv.contacts.portfolio}</a
							>
						</div>
					</div>
				</div>
			</section>

			<!-- Print-only Footer -->
			<footer
				class="hidden print:block text-center text-xs text-gray-600 mt-12 pt-6 border-t border-gray-300"
			>
				{cv.name} • {cv.contacts.email} • {cv.contacts.phone} • {cv.contacts.portfolio}
			</footer>
		</div>
	</article>
</main>
