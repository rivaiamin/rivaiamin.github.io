<script>
	// CV data centralized here (imported structure from original CV for consistency)
	const profile = {
		name: "Riva'i Amin",
		tagline: 'Senior Full-Stack Engineer & Technical Leader',
		photo: '/rivaiamin_photo.jpg',
		summary: `Results-driven Senior Full-Stack Engineer with 9+ years of experience delivering high-impact web and cloud solutions across fintech, education, and AI sectors. Adept at leading cross-functional teams, optimizing infrastructure, and pioneering AI-assisted development workflows that boosted productivity by up to 30%. Passionate about building scalable systems that bridge human needs and technology.`,
		values: [
			'Excellence in Code Quality',
			'Innovation through AI & ML',
			'Collaborative Team Leadership',
			'Scalable Architecture',
			'Continuous Learning'
		],

		contacts: {
			email: 'rivaiamin.id@gmail.com',
			phone: '+62 8986 849 527',
			location: 'Tangerang / Bogor, Indonesia',
			linkedin: 'https://linkedin.com/in/rivaiamin',
			portfolio: 'https://rivaiamin.github.io'
		},

		services: {
			'Full-Stack Development': {
				description: 'End-to-end web application development using modern technologies',
				technologies: [
					'PHP/Laravel',
					'Vue.js',
					'Svelte',
					'Golang',
					'Node.js',
					'REST APIs',
					'Microservices'
				]
			},
			'Cloud Infrastructure': {
				description: 'Scalable cloud solutions and DevOps implementations',
				technologies: [
					'Google Cloud Platform',
					'Azure',
					'Docker',
					'CI/CD',
					'Infrastructure Optimization'
				]
			},
			'AI & Machine Learning': {
				description: 'Intelligent solutions powered by AI and machine learning',
				technologies: ['TensorFlow', 'OpenNLP', 'Custom ML Models', 'AI-Assisted Development']
			},
			'Technical Leadership': {
				description: 'Team management, code quality, and engineering best practices',
				technologies: ['Agile/Scrum', 'Mentoring', 'Code Review', 'Architecture Design']
			}
		},

		portfolios: [
			{
				name: 'Taldio.com',
				period: 'Dec 2023 – Jun 2025',
				description:
					'Modern web platform development with .NET Core and Golang, focusing on performance optimization and scalable architecture.',
				achievements: [
					'Improved system response time and scalability',
					'Zero critical incidents maintained',
					'Streamlined CI/CD pipelines'
				],
				technologies: ['.NET Core', 'Golang', 'GCP', 'Docker', 'Azure DevOps']
			},
			{
				name: 'Independent Consulting',
				period: 'Jul 2023 – Present',
				description: 'Custom enterprise solutions and AI-powered applications for diverse clients.',
				achievements: [
					'Delivered 20+ client projects',
					'Fintech & Payment Systems',
					'Education Platform Development',
					'AI/ML Solutions'
				],
				technologies: ['FilamentPHP', 'Laravel', 'Vue.js', 'SvelteKit', 'TensorFlow', 'Python']
			},
			{
				name: 'AIMSIS Engineering',
				period: 'Jan 2020 – Aug 2023',
				description:
					'VP of Engineering leading cross-functional teams and implementing engineering excellence practices.',
				achievements: [
					'Led team of 15+ engineers',
					'Reduced bugs by 40%',
					'Increased delivery velocity by 35%',
					'Managed 200+ concurrent users'
				],
				technologies: ['Laravel', 'Vue.js', 'PHP', 'PostgreSQL', 'GCP Infrastructure']
			},
			{
				name: 'Fintech Solutions',
				period: 'Aug 2017 – Dec 2019',
				description: 'High-volume payment processing systems handling millions of transactions.',
				achievements: [
					'Processed $10M+ monthly transactions',
					'Successful bank integrations',
					'99.9% uptime maintained'
				],
				technologies: ['Lumen PHP', 'Angular', 'REST APIs', 'Payment Gateways', 'Security Systems']
			}
		],

		keyProjects: {
			'Enterprise & CMS Systems': [
				{
					name: 'Enterprise Multi-Tenancy CMS Platform',
					tech: 'FilamentPHP',
					impact:
						'Delivered modular architecture enabling 20+ client deployments across various industries'
				},
				{
					name: 'Multi-Level Marketing (MLM) Platform',
					tech: 'FilamentPHP',
					impact: 'Built comprehensive MLM system with commission tracking and member management'
				},
				{
					name: 'Recruitment Management System',
					tech: 'SvelteKit + Laravel',
					impact: 'Streamlined hiring workflow for HR teams managing hundreds of applicants'
				}
			],
			'Fintech & Payment Systems': [
				{
					name: 'E-Money & Payment Processing System',
					tech: 'Lumen PHP',
					impact: 'Processed high-volume daily transactions with multiple bank integrations'
				},
				{
					name: 'Payment Gateway Integration API',
					tech: 'Golang',
					impact: 'Built secure API handling payment processing with major Indonesian banks'
				}
			],
			'AI Solutions': [
				{
					name: 'AI-Powered Resume Analyzer',
					tech: 'Golang & Python',
					impact: 'Built NLP pipeline improving parsing accuracy and reducing manual screening time'
				},
				{
					name: 'Image Classification ML Models (8 models)',
					tech: 'Python & TensorFlow',
					impact:
						'Trained custom models achieving high accuracy rates for diverse classification tasks'
				}
			]
		},

		testimonials: [
			{
				quote:
					"Riva'i's expertise in full-stack development and leadership has been instrumental in our team's success. His ability to deliver complex solutions while maintaining high code quality is outstanding.",
				author: 'Engineering Director, Tech Corp',
				company: 'Technology Company'
			},
			{
				quote:
					"His AI-assisted development approach increased our productivity by 30%. Working with Riva'i brought innovation and efficiency to our projects.",
				author: 'CEO, Startup Solutions',
				company: 'Fintech Startup'
			}
		],

		awards: [
			'LKS Web Design Competition 2010 — 1st Place Provincial Level (Banten Province)',
			'LKS Web Design Competition 2009 — 2nd Place City Level (Tangerang)',
			'Teras Mahasiswa Competition 2015 — Regional Finalist'
		],

		education: {
			degree: 'Bachelor of Information Systems',
			school: 'UIN Syarif Hidayatullah Jakarta',
			specialization: 'Software Engineering & Machine Learning',
			year: 'Graduated 2018'
		},

		stats: {
			yearsExperience: 9,
			projectsCompleted: 25,
			technologies: 15,
			teamsLed: 4
		}
	};

	// Navigation to CV
	function viewCV() {
		window.open('/cv', '_blank');
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
	<meta property="og:title" content="{profile.name} - Professional Profile" />
	<meta
		property="og:description"
		content="Senior Full-Stack Engineer and Technical Leader specializing in scalable web applications, cloud infrastructure, and AI solutions."
	/>
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="{profile.contacts.portfolio}/profile" />
	<meta property="og:image" content="{profile.contacts.portfolio}/rivaiamin_photo.jpg" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{profile.name} - Professional Profile" />
	<meta
		name="twitter:description"
		content="Senior Full-Stack Engineer and Technical Leader with expertise in modern web technologies, cloud infrastructure, and AI."
	/>
	<meta name="twitter:image" content="{profile.contacts.portfolio}/rivaiamin_photo.jpg" />

	<style>
		@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

		:global(body) {
			font-family:
				'Inter',
				-apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				sans-serif;
		}

		.hero-gradient {
			background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
		}

		.service-card {
			transition:
				transform 0.3s ease,
				box-shadow 0.3s ease;
		}

		.service-card:hover {
			transform: translateY(-5px);
			box-shadow:
				0 20px 25px -5px rgba(0, 0, 0, 0.1),
				0 10px 10px -5px rgba(0, 0, 0, 0.04);
		}

		.stat-number {
			background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}

		.accent-bg {
			background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
		}

		.section-title::before {
			content: '';
			position: absolute;
			bottom: -5px;
			left: 0;
			width: 60px;
			height: 3px;
			background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
		}

		.portfolio-card {
			transition: all 0.3s ease;
		}

		.portfolio-card:hover {
			transform: scale(1.02);
		}

		@keyframes fadeInUp {
			from {
				opacity: 0;
				transform: translateY(30px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		.fade-in-up {
			animation: fadeInUp 0.6s ease-out;
		}
	</style>
</svelte:head>

<!-- Hero Section -->
<section class="hero-gradient text-white py-20 relative overflow-hidden">
	<div class="absolute inset-0 bg-black/20"></div>
	<div class="container mx-auto px-4 relative z-10">
		<div class="text-center mb-12">
			<h1 class="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
				{profile.name}
			</h1>
			<p class="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto">
				{profile.tagline}
			</p>
		</div>

		<div class="flex justify-center mb-12">
			<img
				src={profile.photo}
				alt={profile.name}
				class="w-48 h-48 rounded-full border-8 border-white shadow-2xl object-cover"
			/>
		</div>

		<div class="text-center">
			<a
				href="/cv"
				target="_blank"
				class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
			>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
				View Full CV
			</a>
		</div>
	</div>

	<!-- Decorative elements -->
	<div class="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
	<div class="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full"></div>
	<div class="absolute top-1/2 right-20 w-16 h-16 bg-white/10 rounded-full"></div>
</section>

<!-- Stats Section -->
<section class="py-16 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
			<div class="fade-in-up">
				<div class="text-4xl font-bold stat-number">{profile.stats.yearsExperience}+</div>
				<div class="text-gray-600 mt-2">Years Experience</div>
			</div>
			<div class="fade-in-up">
				<div class="text-4xl font-bold stat-number">{profile.stats.projectsCompleted}+</div>
				<div class="text-gray-600 mt-2">Projects Completed</div>
			</div>
			<div class="fade-in-up">
				<div class="text-4xl font-bold stat-number">{profile.stats.technologies}+</div>
				<div class="text-gray-600 mt-2">Technologies</div>
			</div>
			<div class="fade-in-up">
				<div class="text-4xl font-bold stat-number">{profile.stats.teamsLed}+</div>
				<div class="text-gray-600 mt-2">Teams Led</div>
			</div>
		</div>
	</div>
</section>

<!-- About Section -->
<section class="py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-4xl font-bold text-center mb-8 relative section-title">About Me</h2>

			<div class="grid md:grid-cols-2 gap-12 items-center">
				<div class="fade-in-up">
					<div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
						<h3 class="text-2xl font-semibold text-gray-900 mb-4">Professional Summary</h3>
						<p class="text-gray-600 leading-relaxed mb-6">
							{profile.summary}
						</p>
						<h4 class="text-lg font-semibold text-gray-900 mb-3">Core Values</h4>
						<div class="flex flex-wrap gap-2">
							{#each profile.values as value}
								<span
									class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
								>
									{value}
								</span>
							{/each}
						</div>
					</div>
				</div>

				<div class="fade-in-up">
					<div class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
						<h3 class="text-2xl font-semibold text-gray-900 mb-4">Educational Background</h3>
						<div class="space-y-4">
							<div>
								<h4 class="text-lg font-medium text-gray-900">{profile.education.degree}</h4>
								<p class="text-blue-600 font-medium">{profile.education.school}</p>
								<p class="text-gray-600 text-sm mt-1">{profile.education.specialization}</p>
								<p class="text-gray-500 text-xs mt-1">({profile.education.year})</p>
							</div>
						</div>

						<h4 class="text-lg font-semibold text-gray-900 mt-6 mb-3">Awards & Recognition</h4>
						<div class="space-y-2">
							{#each profile.awards.slice(0, 2) as award}
								<div class="flex items-start">
									<div class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
									<p class="text-sm text-gray-600">{award}</p>
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
<section class="py-20 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-4xl font-bold text-center mb-8 relative section-title">
				Services & Expertise
			</h2>

			<div class="grid md:grid-cols-2 gap-8">
				{#each Object.entries(profile.services) as [service, details]}
					<div
						class="service-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 fade-in-up"
					>
						<h3 class="text-2xl font-semibold text-gray-900 mb-4">{service}</h3>
						<p class="text-gray-600 mb-6 leading-relaxed">{details.description}</p>
						<div class="flex flex-wrap gap-2">
											{#each details.technologies as tech}
												<span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
													{tech}
												</span>
											{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Portfolio Section -->
<section class="py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-4xl font-bold text-center mb-8 relative section-title">Portfolio of Work</h2>

			<div class="grid md:grid-cols-2 gap-8 mb-16">
				{#each profile.portfolios as portfolio}
					<div
						class="portfolio-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl fade-in-up"
					>
						<div class="flex justify-between items-start mb-4">
							<div>
								<h3 class="text-2xl font-semibold text-gray-900">{portfolio.name}</h3>
								<p class="text-blue-600 font-medium">{portfolio.period}</p>
							</div>
						</div>

						<p class="text-gray-600 mb-6 leading-relaxed">{portfolio.description}</p>

						<h4 class="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
						<ul class="list-disc list-inside text-gray-600 mb-6 space-y-1">
							{#each portfolio.achievements as achievement}
								<li class="text-sm">{achievement}</li>
							{/each}
						</ul>

						<div class="flex flex-wrap gap-2">
							{#each portfolio.technologies as tech}
								<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<!-- Key Projects Section -->
			<div>
				<h3 class="text-3xl font-bold text-center mb-8">Featured Projects</h3>
				<div class="space-y-8">
					{#each Object.entries(profile.keyProjects) as [category, projects]}
						<div>
							<h4 class="text-xl font-semibold text-blue-600 mb-4">{category}</h4>
							<div class="grid md:grid-cols-2 gap-6">
								{#each projects as project}
									<div class="bg-white p-6 rounded-xl shadow border border-gray-100">
										<div class="flex justify-between items-start mb-3">
											<h5 class="font-semibold text-gray-900">{project.name}</h5>
											<span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
												{project.tech}
											</span>
										</div>
										<p class="text-gray-600 text-sm leading-relaxed">{project.impact}</p>
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
<section class="py-20 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl font-bold mb-8 relative section-title">Testimonials</h2>

			<div class="grid md:grid-cols-2 gap-8">
				{#each profile.testimonials as testimonial}
					<div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 fade-in-up">
						<div class="text-purple-500 mb-4">
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
</section>

<!-- Contact Section -->
<section class="py-20">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-4xl font-bold text-center mb-8 relative section-title">Get In Touch</h2>

			<div class="grid md:grid-cols-2 gap-8">
				<div class="space-y-6">
					<div class="flex items-center p-4 bg-gray-50 rounded-xl">
						<div class="bg-blue-100 p-3 rounded-lg mr-4">
							<svg
								class="w-6 h-6 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-gray-900">Email</h4>
							<a href="mailto:{profile.contacts.email}" class="text-blue-600 hover:underline">
								{profile.contacts.email}
							</a>
						</div>
					</div>

					<div class="flex items-center p-4 bg-gray-50 rounded-xl">
						<div class="bg-blue-100 p-3 rounded-lg mr-4">
							<svg
								class="w-6 h-6 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-gray-900">Phone</h4>
							<a
								href="tel:{profile.contacts.phone.replace(/\s/g, '')}"
								class="text-blue-600 hover:underline"
							>
								{profile.contacts.phone}
							</a>
						</div>
					</div>

					<div class="flex items-center p-4 bg-gray-50 rounded-xl">
						<div class="bg-blue-100 p-3 rounded-lg mr-4">
							<svg
								class="w-6 h-6 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
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
						</div>
						<div>
							<h4 class="font-semibold text-gray-900">Location</h4>
							<p class="text-gray-600">{profile.contacts.location}</p>
						</div>
					</div>
				</div>

				<div class="space-y-6">
					<div class="flex items-center p-4 bg-gray-50 rounded-xl">
						<div class="bg-blue-100 p-3 rounded-lg mr-4">
							<svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764 1.75-1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-gray-900">LinkedIn</h4>
							<a
								href={profile.contacts.linkedin}
								target="_blank"
								rel="noopener"
								class="text-blue-600 hover:underline break-all"
							>
								linkedin.com/in/rivaiamin
							</a>
						</div>
					</div>

					<div class="flex items-center p-4 bg-gray-50 rounded-xl">
						<div class="bg-blue-100 p-3 rounded-lg mr-4">
							<svg
								class="w-6 h-6 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-gray-900">Portfolio</h4>
							<a
								href={profile.contacts.portfolio}
								target="_blank"
								rel="noopener"
								class="text-blue-600 hover:underline"
							>
								rivaiamin.github.io
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class="text-center mt-12">
				<p class="text-gray-600 mb-4">Ready to collaborate on your next project?</p>
				<a
					href="mailto:{profile.contacts.email}"
					class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
				>
					Start a Conversation
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="bg-gray-900 text-white py-12">
	<div class="container mx-auto px-4">
		<div class="text-center">
			<p class="text-gray-400">
				© 2025 {profile.name}. All rights reserved.
			</p>
		</div>
	</div>
</footer>
