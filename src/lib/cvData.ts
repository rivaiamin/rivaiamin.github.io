// Centralized CV data shared across pages
import type { CV, Profile } from './cvTypes';

export const cv: CV = {
	name: "Riva'i Amin",
	title: 'Senior Full-Stack Engineer & Technical Leader',
	photo: '/rivaiamin_photo.jpg',
	summary: `Results-driven Senior Full-Stack Engineer with 9+ years of experience delivering high-impact web and cloud solutions across fintech, education, and AI sectors. Adept at leading cross-functional teams, optimizing infrastructure, and pioneering AI-assisted development workflows that boosted productivity by up to 30%. Passionate about building scalable systems that bridge human needs and technology.`,

	contacts: {
 		email: 'rivaiamin.id@gmail.com',
 		phone: '+62 8986 849 527',
 		location: 'Tangerang / Bogor, Indonesia',
 		linkedin: 'https://linkedin.com/in/rivaiamin',
 		portfolio: 'https://rivaiamin.github.io'
 	},

 	// Unified skills section grouped by category for better ATS parsing
 	technicalSkills: {
 		Backend: [
 			'PHP',
 			'Golang',
 			'Node.js',
 			'Python',
 			'.NET',
 			'Laravel',
 			'FilamentPHP',
 			'CodeIgniter',
 			'REST APIs',
 			'Microservices'
 		],
 		Frontend: ['Vue.js', 'Svelte', 'Angular', 'Alpine.js', 'JavaScript'],
 		Database: ['MySQL', 'PostgreSQL', 'SQL Server'],
 		'Cloud & DevOps': ['GCP', 'Azure', 'Docker', 'CI/CD', 'Git', 'Azure DevOps'],
 		'AI / ML': ['TensorFlow', 'OpenNLP', 'Python', 'Machine Learning'],
 		Leadership: [
 			'Agile/Scrum',
 			'Mentoring',
 			'Code Review',
 			'Architecture Design',
 			'Team Leadership',
 			'Performance Optimization'
 		]
 	},

 	// Keep legacy format for JSON-LD
 	techStacks: [
 		'PHP',
 		'JavaScript',
 		'MySQL',
 		'Laravel',
 		'FilamentPHP',
 		'Google Cloud Platform',
 		'Golang',
 		'Python',
 		'Vue.js',
 		'Svelte',
 		'Node.js',
 		'.NET',
 		'PostgreSQL',
 		'SQL Server',
 		'Docker',
 		'Alpine.js',
 		'Machine Learning',
 		'CodeIgniter',
 		'Azure DevOps',
 		'Git',
 		'REST APIs',
 		'Microservices'
 	],

 	skills: [
 		'Full-Stack Development',
 		'Backend Architecture',
 		'Frontend Development',
 		'Cloud Infrastructure (GCP, Azure)',
 		'DevOps & CI/CD',
 		'Database Design & Optimization',
 		'API Development & Integration',
 		'Machine Learning & AI',
 		'Team Leadership & Mentoring',
 		'Agile/Scrum Methodologies',
 		'Software Architecture',
 		'Performance Optimization',
 		'Code Review & Quality Assurance',
 		'Technical Documentation',
 		'Problem Solving & Critical Thinking'
 	],

 	experiences: [
 		{
 			company: 'Taldio.com',
 			role: 'Senior Full-Stack Engineer',
 			period: 'Dec 2023 – Jun 2025',
 			bullets: [
 				'Engineer and deploy multiple critical features using .NET Core and Golang, significantly reducing system response time and improving user satisfaction',
 				'Manage Azure DevOps and Google Cloud Platform infrastructure, improving system scalability and performance',
 				'Architect and maintain CI/CD pipelines using Docker and Azure DevOps, improving deployment time and release efficiency',
 				'Resolve production bugs while maintaining zero critical incidents, ensuring seamless user experience across all platforms'
 			]
 		},
 		{
 			company: 'Independent Contractor',
 			role: 'Full-Stack Engineer & AI Specialist',
 			period: 'Jul 2023 – Present',
 			bullets: [
 				'Develop enterprise-grade multi-tenancy CMS platform using FilamentPHP, serving multiple clients across various industries',
 				'Build and maintain dozens of custom web applications with high client satisfaction',
 				'Train and fine-tune multiple custom AI models for image classification and NLP tasks, improving accuracy rates and reducing manual processing time',
 				'Utilize AI-assisted development workflow that substantially increases development velocity while maintaining high code quality standards'
 			]
 		},
 		{
 			company: 'AIMSIS',
 			role: 'VP of Engineering',
 			period: 'Jan 2020 – Aug 2023',
 			bullets: [
 				'Led engineering team to maintain and deliver features for hundreds of product variants on schedule while maintaining high code quality',
 				'Established code review processes and quality standards that reduced bugs and improved code maintainability, stability, and readability',
 				'Collaborated closely with cross-functional teams (engineering, product, design) to accelerate feature development and maintain project momentum',
 				'Applied Agile/Scrum methodologies and planned weekly sprints that increased team productivity and on-time delivery',
 				'Delegated tasks to team members based on their skills and strengths to optimize workflow efficiency',
 				'Managed cloud server infrastructure with proactive maintenance and rapid troubleshooting, maintaining high uptime while reducing operational costs',
 				'Developed key features to enhance product functionality, identified bottlenecks, and implemented continuous improvements',
 				'Mentored junior developers to accelerate their growth and foster strong team collaboration, maintaining high retention rates',
 				'Served as emergency contact for urgent requests and critical issues, providing rapid resolution while minimizing team disruptions and business impact'
 			]
 		},
 		{
 			company: 'AIMSIS',
 			role: 'Full-Stack Engineer',
 			period: 'Aug 2018 – Dec 2019',
 			bullets: [
 				'Developed numerous features for Academic LMS platform serving thousands of students and hundreds of teachers, achieving high user satisfaction',
 				"Built seamless integration with Indonesian Government's Dapodik and e-Rapor systems, processing extensive student records with excellent accuracy",
 				'Engineered book library management system handling large volumes of book records with advanced search capabilities and secure read-only access for students',
 				'Integrated biometric fingerprint attendance system across multiple school locations, automating attendance tracking for thousands of students daily'
 			]
 		},
 		{
 			company: 'Veripay',
 			role: 'Backend Engineer',
 			period: 'Aug 2017 – Oct 2018',
 			bullets: [
 				'Architected and built RESTful API using Lumen Framework handling high-volume daily transactions with monthly transaction value',
 				'Integrated payment gateway with multiple major Indonesian banks, processing deposits and withdrawals with excellent success rate and fast response times',
 				'Developed connections to multiple PPOB (Payment Point Online Bank) billers for utilities, mobile credit, and government services',
 				'Created responsive admin dashboard using Angular and Semantic UI, managing active user base and real-time transaction monitoring',
 				'Implemented security measures and fraud detection that reduced fraudulent transactions while maintaining smooth user experience'
 			]
 		},
 		{
 			company: 'KisiKisi.id',
 			role: 'Full-Stack Engineer',
 			period: 'Mar 2016 – Sep 2016',
 			bullets: [
 				'Built comprehensive school directory application using Laravel and AngularJS which was capable of handling thousands of users and schools',
 				'Developed school event management system processing numerous events with high user satisfaction'
 			]
 		},
 		{
 			company: 'Dinas Informatika Kota Tangerang',
 			role: 'Web Developer (Internship)',
 			period: 'Jan 2014 – Feb 2014',
 			bullets: [
 				'Developed environmental permit application using CodeIgniter and jQuery for Environmental Department, digitizing paper-based process and reducing approval time'
 			]
 		},
 		{
 			company: 'Visimedia',
 			role: 'Backend Developer',
 			period: 'Aug 2010 – Mar 2011',
 			bullets: [
 				'Built multiple client websites using PyroCMS (CodeIgniter-based CMS), pursuing quick project delivery',
 				'Maintained and updated news portal website, improving performance and user experience'
 			]
 		}
 	],

 	// Grouped projects with key highlights
 	projectGroups: {
 		'AI & Machine Learning': [
 			{
 				name: 'AI-Powered Resume Analyzer',
 				tech: 'Golang & Python',
 				impact: 'Built NLP pipeline improving parsing accuracy and reducing manual screening time'
 			},
 			{
 				name: 'Image Classification ML Models (8 models)',
 				tech: 'Python & TensorFlow',
 				impact: 'Trained custom models achieving high accuracy rates for diverse classification tasks'
 			},
 			{
 				name: 'Sentiment Analysis AI Model',
 				tech: 'OpenNLP & Python',
 				impact: 'Developed sentiment classification system for text analysis applications'
 			},
 			{
 				name: "Named Entity Recognition for Al-Qur'an Text",
 				tech: 'OpenNLP',
 				impact: 'Created specialized NER model for religious text processing'
 			}
 		],
 		'Enterprise & CMS Systems': [
 			{
 				name: 'Enterprise Multi-Tenancy CMS Platform',
 				tech: 'FilamentPHP',
 				impact: 'Delivered modular architecture enabling 20+ client deployments across various industries'
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
 			},
 			{
 				name: 'Real-time Chat Consultation SPA',
 				tech: 'Laravel & Vue.js',
 				impact: 'Enabled instant communication between consultants and clients'
 			},
 			{
 				name: 'Technician Support & Ticketing System',
 				tech: 'Laravel',
 				impact: 'Optimized field service operations and ticket resolution tracking'
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
 			},
 			{
 				name: 'School Payment & Billing System',
 				tech: 'Vue.js & PHP',
 				impact: 'Automated tuition collection and financial reporting for educational institutions'
 			}
 		],
 		'Education & Public Sector': [
 			{
 				name: 'Online Psychological Testing Platform',
 				tech: 'Golang',
 				impact: 'Delivered scalable assessment platform serving thousands of test-takers'
 			},
 			{
 				name: 'Digital Library Management System',
 				tech: 'Golang & Angular',
 				impact: 'Managed extensive book catalog with advanced search and student access controls'
 			},
 			{
 				name: 'School Admission Management System',
 				tech: 'Vue.js & PHP',
 				impact: 'Digitized enrollment process for educational institutions'
 			},
 			{
 				name: 'Fingerprint Attendance Integration System',
 				tech: 'Python',
 				impact: 'Automated attendance tracking across multiple school locations'
 			},
 			{
 				name: 'Disaster Mitigation & Mapping System',
 				tech: 'JavaScript & OpenStreetMap',
 				impact: 'Provided real-time disaster monitoring and response coordination'
 			},
 			{
 				name: 'Accounting System for Non-Profit Organization',
 				tech: 'Node.js & Angular',
 				impact: 'Simplified financial management and reporting for non-profit operations'
 			}
 		]
 	},

 	// Keep legacy format for backward compatibility
 	projects: [
 		'Enterprise Multi-Tenancy CMS Platform — FilamentPHP',
 		'Multi-Level Marketing (MLM) Platform — FilamentPHP',
 		'AI-Powered Resume Analyzer — Golang',
 		'Online Psychological Testing Platform — Golang',
 		'Recruitment Management System — SvelteKit + Laravel',
 		'Real-time Chat Consultation SPA — Laravel & Vue.js',
 		'Technician Support & Ticketing System — Laravel',
 		'Image Classification ML Models (8 models) — Python & TensorFlow',
 		'Disaster Mitigation & Mapping System — JavaScript & OpenStreetMap',
 		'School Admission Management System — Vue.js & PHP',
 		"Named Entity Recognition for Al-Qur'an Text — OpenNLP",
 		'Sentiment Analysis AI Model — OpenNLP & Python',
 		'E-Money & Payment Processing System — Lumen PHP',
 		'Fingerprint Attendance Integration System — Python',
 		'Digital Library Management System — Golang & Angular',
 		'Payment Gateway Integration API — Golang',
 		'School Payment & Billing System — Vue.js & PHP',
 		'Dynamic Document Generator (DOCX/PDF) — Python',
 		'Accounting System for Non-Profit Organization — Node.js & Angular',
 		'Social Cataloging Platform — Lumen PHP',
 		'Data Migration Tool (SekolahKita.net to MongoDB) — Python',
 		'Document to Database Converter — Python'
 	],

 	education: [
 		{
 			school: 'UIN Syarif Hidayatullah Jakarta',
 			major: 'Bachelor of Information Systems',
 			note: 'Graduated 2018 | Focus: Software Engineering & Machine Learning'
 		},
 		{
 			school: 'SMK Negeri 5 Kota Tangerang',
 			major: 'Software Engineering',
 			note: 'Graduated 2010 | First generation student of the school; won LKS competition in third year and represented the school at the national level'
 		}
 	],

 	awards: [
 		'LKS Web Design Competition 2010 — 1st Place Provincial Level (Banten Province)',
 		'LKS Web Design Competition 2009 — 2nd Place City Level (Tangerang)',
 		'Teras Mahasiswa Competition 2015 — Regional Finalist'
 	],

 	// Option 1: Separate section for one-time professional activities
 	otherActivities: [
 		{
 			organization: 'IT Community SMK Negeri 5 Kota Tangerang',
 			role: 'Head of Dikti',
 			period: '2009-2010',
 			description: 'Led educational programs for community members'
 		},
 		{
 			organization: 'SMK Negeri 5 Kota Tangerang',
 			role: 'Trainer & Advisor',
 			period: '2010-2017',
 			description: 'Mentored and advised students in web programming for LKS competitions, contributing to 6 consecutive years of city and province-level wins'
 		},
 		{
 			organization: 'HIMSI UIN Syarif Hidayatullah Jakarta',
 			role: 'Head of Dikti',
 			period: '2013-2014',
 			description: 'Led educational programs of HIMSI and initiated several new programs'
 		},
 		{
 			organization: 'SMKN 56 Jakarta',
 			role: 'Guest Trainer & Mentor',
 			period: '2016',
 			description: 'Conducted intensive 3-day web programming training for LKS Web Design 2016 competition representatives, resulting in substantial skill improvement'
 		},
 		{
 			organization: 'SMKN 7 Jakarta',
 			role: 'Guest Trainer & Mentor',
 			period: '2016',
 			description: 'Conducted intensive 3-day web programming training for LKS Web Design 2016 competition representatives, resulting in 2nd place at province level'
 		},
 		{
 			organization: 'STMIK Insan Pembangunan',
 			role: 'Guest Trainer & Mentor',
 			period: '2016',
 			description: 'Conducted intensive 1-month web programming training for National LKS Web Design Competition 2016 representatives from Aceh Province, resulting in top 6 placement'
 		},
 		{
 			organization: 'DitPSMK Jakarta',
 			role: 'Technical Judge',
 			period: '2016',
 			description: 'Judged multiple participants in LKS Web Design Jakarta 2016, assessing submissions against industry standards'
 		},
 		{
 			organization: 'DitPSMK Tangerang Selatan',
 			role: 'Technical Judge',
 			period: '2017',
 			description: 'Assessed web programming competition projects for LKS Web Design Tangerang Selatan 2017 against industry standards'
 		}
 	]
};

// Profile-specific view model reused by profile page
export const profile: Profile = {
	name: cv.name,
	tagline: 'Senior Full-Stack Engineer & Technical Leader',
	photo: cv.photo,
	summary: cv.summary,
	values: [
		'Excellence in Code Quality',
		'Innovation through AI & ML',
		'Collaborative Team Leadership',
		'Scalable Architecture',
		'Continuous Learning'
	],

	contacts: cv.contacts,

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
			technologies: ['Google Cloud Platform', 'Azure', 'Docker', 'CI/CD', 'Infrastructure Optimization']
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
			description: 'Modern web platform development with .NET Core and Golang, focusing on performance optimization and scalable architecture.',
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
			description: 'VP of Engineering leading cross-functional teams and implementing engineering excellence practices.',
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

	// reuse awards and education from cv
	awards: cv.awards,
	education: {
		degree: 'Bachelor of Information Systems',
		school: 'UIN Syarif Hidayatullah Jakarta',
		specialization: 'Software Engineering & Machine Learning',
		year: 'Graduated 2018'
	},

	testimonials: [
		{
			quote: "Riva'i's expertise in full-stack development and leadership has been instrumental in our team's success. His ability to deliver complex solutions while maintaining high code quality is outstanding.",
			author: 'Engineering Director, Tech Corp',
			company: 'Technology Company'
		},
		{
			quote: "His AI-assisted development approach increased our productivity by 30%. Working with Riva'i brought innovation and efficiency to our projects.",
			author: 'CEO, Startup Solutions',
			company: 'Fintech Startup'
		}
	],

	stats: {
		yearsExperience: 9,
		projectsCompleted: 25,
		technologies: 15,
		teamsLed: 4
	}
};

