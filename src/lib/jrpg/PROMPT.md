Design a high-fidelity, interactive web UI for a professional full-stack developer portfolio, modeled after a futuristic or fantasy JRPG character status screen. The layout must include:
> 1. A central hero area for an animated 3D character/avatar.
> 2. A 'Status/Stats' panel replacing traditional bio/experience: 'Level' represents years of experience, 'Attack/Defense' stats represent backend/frontend proficiency.
> 3. A 'Skill Tree' visualization for tech stack (nodes showing expertise in React, Node.js, etc.).
> 4. An 'Adventure Log' or 'Quest Map' section for Work History and Projects.
> 5. An 'Equipment' grid for tools and software used.
> Use a clean, sleek, high-contrast UI aesthetic similar to modern mobile RPGs (e.g., minimalist borders, glowing accent colors, data-heavy but readable typography). The overall vibe should be 'Cyber-Tactical' or 'High-Fantasy Tech'. Provide the CSS layout structure and HTML wireframe components."

---

### RPG-to-Portfolio Mapping Suggestions

To make this feel authentic, map your professional content to these game mechanics:

* **Experience as a "Quest Line":** Instead of a standard resume list, use a map-style timeline. Each job is a "Main Quest" with bullet points as "Objectives Accomplished."
* **Tech Stack as a "Skill Tree":** Do not just list skills. Create a visual tree where mastering "HTML/CSS" unlocks "React," which eventually unlocks "Full Stack Architecture."
* **Portfolio as a "Bestiary" or "Archive":** Instead of "Projects," call your portfolio an "Archive of Defeated Challenges." Each project shows a "Difficulty Level" (Complexity) and the "Loot" (Outcomes/Results) gained from it.
* **Personal Projects as "Side Quests":** Use this to showcase non-work experiments. Label them with "Optional Rewards" or "Experimental Builds."
* **Recommendation for "Mini-Games":** Rather than full games (which are hard to maintain), create **interactive widgets**. For example:
* A "Stat Calculator" where users can toggle your skills to see your "Total Combat Power" (a fun way to let them filter your skills).
* A "Console Command" prompt (a CLI terminal) where users can type `help` or `about` to trigger animations.



### Essential UX Considerations

* **The "Loading Screen":** Since your logo will act as the loading screen, keep it minimal and high-performance. A CSS-based animation is better than a heavy video file to ensure the site feels fast.
* **Responsiveness:** JRPG menus are often dense with information. Ensure that your mobile view simplifies the "Equipment" and "Status" panels into a tabbed interface so it doesn't clutter smaller screens.
* **Typography:** The UI will rely heavily on font choices. Use "LCD/Digital" or "Monospace" fonts for labels, but ensure your body text is highly readable (San-Serif).

---

### Implementation Tech Stack

If you are building this, I recommend:

1. **Framework:** React or Vue (great for managing the "State" of the character).
2. **Animation:** **Framer Motion** (essential for that smooth, game-like transition between menus).
3. **Graphics:** Use **Three.js** or **React Three Fiber** if you want a 3D model, or high-quality SVG/Lottie files for 2D animated sprites.

To make sure this fits your vision, would you like me to draft a structure for the "Skill Tree" component, or would you prefer a mockup of the "Quest Log" layout?