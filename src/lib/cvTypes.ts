export interface ContactInfo {
	email: string;
	phone: string;
	location: string;
	linkedin: string;
	portfolio: string;
}

export interface Project {
	name: string;
	tech: string;
	impact: string;
}

export interface CV {
	name: string;
	title: string;
	photo: string;
	summary: string;
	contacts: ContactInfo;
	technicalSkills: Record<string, string[]>;
	techStacks: string[];
	skills: string[];
	experiences: Array<{ company: string; role: string; period: string; bullets: string[] }>;
	projectGroups: Record<string, Project[]>;
	projects: string[];
	education: Array<{ school: string; major: string; note: string }>;
	awards: string[];
	otherActivities: Array<{ organization: string; role: string; period: string; description: string }>;
}

export interface Profile {
	name: string;
	tagline: string;
	photo: string;
	summary: string;
	values: string[];
	contacts: ContactInfo;
	services: Record<string, { description: string; technologies: string[] }>;
	portfolios: Array<{ name: string; period: string; description: string; achievements: string[]; technologies: string[] }>;
	testimonials: Array<{ quote: string; author: string; company: string }>;
	awards: string[];
	education: { degree: string; school: string; specialization: string; year: string };
	stats: { yearsExperience: number; projectsCompleted: number; technologies: number; teamsLed: number };
}
