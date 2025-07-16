src/
└── app/
├── app.component.ts
├── app.component.html
├── app.component.scss
├── app.config.ts
├── app.routes.ts

    ├── core/
    │   ├── core.module.ts
    │   ├── services/
    │   └── animations/

    ├── shared/
    │   ├── shared.module.ts
    │   ├── components/
    │   ├── directives/
    │   └── pipes/

    ├── layout/
    │   ├── header/
    │   │   ├── header.component.ts
    │   │   ├── header.component.html
    │   │   └── header.component.scss
    │   └── footer/
    │       ├── footer.component.ts
    │       ├── footer.component.html
    │       └── footer.component.scss

    ├── pages/
    │   ├── home/
    │   │   ├── hero/
    │   │   │   ├── hero.component.ts
    │   │   │   └── hero.component.html
    │   │   ├── featured-projects/
    │   │   │   ├── featured-projects.component.ts
    │   │   │   └── featured-projects.component.html
    │   │   └── home.component.ts ← (standalone, lazy-loaded)
    │
    │   ├── about/
    │   │   └── about.component.ts ← (standalone, lazy-loaded)
    │
    │   ├── work/
    │   │   ├── project-detail/
    │   │   │   ├── project-detail.component.ts
    │   │   │   └── project-detail.component.html
    │   │   └── work.component.ts ← (standalone, lazy-loaded)
    │
    │   └── contact/
    │       └── contact.component.ts ← (standalone, lazy-loaded)

src/app/
├── core/ -- Services, utils, app-wide logic
├── layout/
│ ├── header/ -- Site navbar & branding
│ └── footer/ -- Footer info & social links
├── pages/
│ ├── home/
│ │ ├── hero/ -- Hero banner & intro
│ │ ├── featured-projects/ -- Showcase top projects
│ ├── about/ -- About me, skills, timeline
│ ├── contact/ -- Contact form & info
│ └── work/
│ └── project-detail/ -- Deep dive for each project
└── shared/ -- Reusable components (buttons, cards)

---

## ✅ Root Structure Overview

```
src/
└── app/
    ├── core/
    ├── layout/
    ├── pages/
    └── shared/
```

Each folder has a **clear responsibility**, keeping your code modular, reusable, and easy to navigate.

---

## 📁 `core/` — Application-Wide Logic (Singletons)

This folder contains functionality that’s initialized **once** and used throughout your app.

### Examples:

- `services/`: API communication, analytics, theme toggling
- `guards/`: route guards (auth, SEO protection, etc.)
- `animations/`: reusable global animation configs or utility functions

> ✅ Use for things that should be registered once and injected everywhere.

---

## 📁 `layout/` — Universal Layout Components

Contains UI components that are **always present** (outside of routing):

### Contents:

- `header/`: site logo, nav links, hamburger menu
- `footer/`: social media icons, legal links, copyright

These are typically used in `app.component.html` like:

```html
<app-header></app-header>
<router-outlet></router-outlet>
<app-footer></app-footer>
```

> ✅ Keeps global layout decoupled from content pages.

---

## 📁 `pages/` — Route-Based Lazy-Loaded Pages

Each subfolder in `pages/` is tied to a **specific route** (`/home`, `/about`, etc.). They're lazy-loaded and standalone (in Angular 17+ and 19).

### 🔽 Breakdown:

#### `home/`

This is your landing page. It's broken down into smaller components for clarity:

- `hero/`: Fullscreen animated hero section (powered by **Anime.js**)
- `featured-projects/`: Grid or slider showing selected works

#### `about/`

Shows your background, skillset, tools, and maybe a resume section.

#### `work/`

List of all your projects with previews, animations, etc.

- `project-detail/`: A child route or nested view showing individual project details with images, video, etc.

#### `contact/`

Contact form, social links, location, and a downloadable resume button.

> ✅ Using subcomponents (like `hero`, `project-detail`) keeps each feature **isolated** and **easier to animate or reuse**.

---

## 📁 `shared/` — Reusable UI Components, Directives, Pipes

This is your **design system** — small parts used in multiple places.

### Possible folders:

- `components/`: Buttons, tags, section titles, cards
- `directives/`: Scroll-based triggers, intersection observers
- `pipes/`: Format dates, truncate text, linkify URLs

> ✅ Keeps your UI DRY and ensures a consistent visual system.

---

## 🔥 Why This Structure Works for a Portfolio

| Goal                | How this structure helps                       |
| ------------------- | ---------------------------------------------- |
| **UX**              | Each part is animation-ready and isolated      |
| **Performance**     | Lazy loading & standalone pages                |
| **Maintainability** | Clear roles: layout vs. logic vs. pages        |
| **Scalability**     | Can easily expand pages, themes, or animations |

---

## 💡 Pro Tips

- Use **Framer Motion-style page transitions** via Angular’s animation system
- Integrate **Anime.js** inside `hero.component.ts` and `featured-projects.component.ts`
- Preload fonts/videos from `assets/` to boost perceived speed
- Use `core/services/seo.service.ts` for dynamic `<title>` and `<meta>` tags

---

Absolutely! Given your folder structure and tech stack (Angular + Anime.js + CSS), I’ll help you sketch a **design & UI plan** for your portfolio project. This will include **page layouts, key UI components, and animations ideas** that suit an Awwwards-worthy portfolio.

---

# Portfolio UI & Design Plan

---

## 1. Folder Structure Recap

```
src/app/
 ├── core/             -- Services, utils, app-wide logic
 ├── layout/
 │    ├── header/      -- Site navbar & branding
 │    └── footer/      -- Footer info & social links
 ├── pages/
 │    ├── home/
 │    │    ├── hero/               -- Hero banner & intro
 │    │    ├── featured-projects/  -- Showcase top projects
 │    ├── about/                   -- About me, skills, timeline
 │    ├── contact/                 -- Contact form & info
 │    └── work/
 │         └── project-detail/    -- Deep dive for each project
 └── shared/                      -- Reusable components (buttons, cards)
```

---

## 2. Page-by-Page UI & Design Breakdown

---

### 🏠 Home Page

- **Hero Section (app-hero)**

  - Big bold intro text with your name + tagline
  - Subtle background animation (using Anime.js) like floating shapes or gradient shifts
  - Call to Action (e.g., “View Work”, “Get in Touch”) buttons with hover animations

- **Featured Projects**

  - Grid or carousel layout of 3-5 top projects
  - Cards with project preview image, title, short description
  - Hover effect: image zoom or overlay with project tech stack + “View Details” button

- **Smooth scroll or scroll-triggered animations**

  - Use Anime.js timelines to animate sections as user scrolls down

---

### 🙋 About Page

- Clean layout with:

  - Profile photo + brief bio
  - Skills section with skill bars or icons
  - Timeline or milestone section for education, work experience with fade-in or slide-in animations

- Use color-coded sections or cards to visually break up content

---

### 📬 Contact Page

- Simple contact form (Name, Email, Message)
- Validation with friendly error messages
- Animated form inputs that highlight on focus
- Social media icons with hover scale or color shifts
- Possibly a subtle background pattern or animation

---

### 💼 Work Page

- List or grid of projects (similar to featured projects but full list)
- Filter or categories to sort projects by tech/type
- Clicking a project opens **Project Detail Page**

---

### 📄 Project Detail Page

- Large hero image or video of the project
- Project overview, challenges, solutions
- Tech stack badges or icons
- Animated transitions between projects or when loading page

---

### 🔄 Layout (Header & Footer)

- **Header:**

  - Sticky or fixed navbar with smooth background color change on scroll
  - Logo / site name on left
  - Navigation links to Home, About, Work, Contact with animated underline on hover

- **Footer:**

  - Social links with icons
  - Copyright text
  - Maybe a “Back to Top” animated button

---

## 3. Shared UI Components (in `/shared`)

- Buttons with hover and focus animations
- Cards (for projects, skills, etc.) with shadows and hover effects
- Section titles with underline animations
- Responsive grid layouts
- Loading spinners or progress bars

---

## 4. Animation Ideas Using Anime.js

- **Entrance animations**: fade-in + slide-up for text and images on page load
- **Scroll-triggered animations**: use Angular intersection observer or scroll events + Anime.js timelines
- **Hover effects**: scale, rotate, color shift on buttons and project cards
- **Loading animation**: subtle animated loader on page or project image load
- **Background animations**: floating particles, subtle gradients shifting colors smoothly

---

## 5. Responsive Design

- Mobile-first CSS with media queries
- Hamburger menu for navigation on small screens
- Cards and grids adjust from multi-column on desktop to single column on mobile
- Touch-friendly buttons and form inputs

---

## 6. Color Palette & Typography (suggestion)

- Use a **modern, clean palette** — e.g., dark background with bright accent color (neon blue, coral, or lime)
- Sans-serif font like **Poppins, Montserrat, or Inter** for readability and style
- Consistent spacing & sizing for balance

---

# Bonus: How to Organize CSS files?

- Each component folder contains its own CSS (`.css` or `.scss`) for scoped styles
- Global styles in `src/styles.css`
- Use CSS variables for colors and spacing for easy theming
- Use Flexbox and CSS Grid extensively for layout

---

---

Color palette : https://colorhunt.co/palette/22092c872341be3144f05941
#22092C
#872341
#BE3144
#F05941

menu : https://codepen.io/una/pen/DZdbNp
#f45a00
#d21d00
#ba1d1d
#911a12
#5b190e
#250000
#380102
#190d0c
#390705
#b5985f

Great! Let's build a **complete Angular portfolio structure** using **Anime.js animations**, **modern scroll-based transitions**, and a **clean UI inspired by Awwwards-level designs** like Chungiyoo.

---

## ✅ Project Structure Overview

```
src/app/
├── core/                   # Core services, interceptors, etc.
├── layout/                 # Layout components (shared across pages)
│   ├── header/
│   └── footer/
├── pages/                  # Main site pages
│   ├── home/               # Hero, featured work, etc.
│   │   ├── hero/
│   │   └── featured-projects/
│   ├── about/
│   ├── work/
│   │   └── project-detail/
│   └── contact/
├── shared/                 # Reusable UI components
```

---

## 🧱 Step-by-Step Generation Commands

Use these in your Angular 19 project directory (assumes `standalone: true` setup):

```bash
# Layout
ng g c layout/header --standalone --flat --style=css
ng g c layout/footer --standalone --flat --style=css

# Home and its sections
ng g c pages/home --standalone --style=css
ng g c pages/home/hero --standalone --style=css
ng g c pages/home/featured-projects --standalone --style=css

# About, Work, Contact
ng g c pages/about --standalone --style=css
ng g c pages/work --standalone --style=css
ng g c pages/work/project-detail --standalone --style=css
ng g c pages/contact --standalone --style=css

# Shared UI
ng g c shared/button --standalone --style=css
ng g c shared/section-title --standalone --style=css
```

---

## 📌 Component Responsibilities

### `header/` & `footer/`

- Global navigation, logo
- Sticky header
- Social links in footer

### `home/hero/`

- Welcome text
- Scroll hint
- Fullscreen section with text reveal (Anime.js)

### `home/featured-projects/`

- Grid of 2–3 showcase projects
- Hover and scroll animations

### `about/`

- Bio
- Skills / experience timeline (animated)

### `work/`

- Gallery or card view of all projects
- Click to go to `project-detail`

### `contact/`

- Scroll-in form with name/email/message
- Simple validation
- Optional SVG or canvas animation

Awesome choice! The **"Cyber City"** theme is bold, futuristic, and tech-heavy — perfect for a developer portfolio. Here's how we can break it down into **scroll-based scenes**, each reflecting your skills and personality while building a stunning visual experience.

---

## 🏙️ Cyber City Portfolio — Scene & Section Plan

### 🎬 **1. Hero Intro — Neon Skyline**

- **Scene:** Animated city skyline at night with neon signs and blinking buildings.
- **Animation:** Buildings fade in; a "Welcome to My City" sign animates with flicker/glow.
- **Tools:** SVG city, Anime.js for flicker/timeline.
- **Angular Component:** `pages/home/hero`

---

### 🚇 **2. Metro Journey — Skills Train**

- **Scene:** Metro line travels through tunnels, stopping at "Frontend", "Backend", "UI/UX", etc.
- **Animation:** Train SVG slides on scroll, stations light up.
- **Tools:** Scroll-trigger + SVG train line
- **Angular Component:** `pages/home/skills-train`

---

### 🧠 **3. Neural Tower — What I Know**

- **Scene:** A glowing cyber tower made of circuits; each floor represents a tech (Angular, CSS, etc).
- **Animation:** Floor illuminates as you scroll.
- **Tools:** Anime.js path animation, vertical scroll
- **Component:** `pages/about/tech-tower`

---

### 📂 **4. Project Grid — City Screens**

- **Scene:** Hologram billboards in the city show your projects.
- **Animation:** Grid items fade/slide in like floating screens.
- **Tools:** CSS grid + Anime.js entrance animation
- **Component:** `pages/work`

---

### 🛰️ **5. Contact — Radio Tower / Satellite**

- **Scene:** Tower emits signal to contact you; signal pulses when form is submitted.
- **Animation:** Signal pulse + animated SVG waveform
- **Tools:** Anime.js + Angular forms
- **Component:** `pages/contact`

---

### ✨ Visual Elements

- **Colors:** Electric blue, neon green, pink, deep purple
- **Fonts:** Eurostile, Orbitron, or other sci-fi typography
- **UI Add-ons:** Glitch effects, cyber noise, scanlines, flickering text

---

### 🛠 Folder Structure Integration

```
src/
├── app/
│   ├── pages/
│   │   ├── home/
│   │   │   ├── hero/
│   │   │   └── skills-train/
│   │   ├── about/
│   │   │   └── tech-tower/
│   │   ├── work/
│   │   └── contact/
│   ├── layout/
│   │   ├── header/
│   │   └── footer/
│   ├── shared/
│   │   └── components/
│   └── core/
```

---

## 📐 Cyber City Portfolio — Figma Wireframe Blueprint

### 🎨 **Frame Size**

- **Type:** Desktop (1440px width)
- **Height:** Variable per section (1000–1500px)

---

### 🧩 **Page Sections / Wireframe Components**

---

### **1. Hero Intro: Neon Skyline**

**Figma frame name:** `01-Hero`

| Element           | Type                                      | Placement      |
| ----------------- | ----------------------------------------- | -------------- |
| Background        | Dark gradient (black to deep purple)      |                |
| Skyline SVG       | Vector/Illustration                       | Bottom 40%     |
| Neon title        | Large heading: “Welcome to My Cyber City” | Center         |
| Subtitle          | “Frontend Dev • Angular • UI Engineer”    | Below title    |
| Enter button      | Glowing “Enter City” button               | Below subtitle |
| Background motion | Floating particles or glowing lights      | Back layer     |

---

### **2. Skills: Metro Line**

**Figma frame name:** `02-Skills`

| Element        | Type                                   | Placement              |
| -------------- | -------------------------------------- | ---------------------- |
| Background     | Tunnel / circuit-style dark background |                        |
| SVG Metro line | Horizontal or vertical path            | Center                 |
| Stations       | Circle nodes with icons                | Equidistant along line |
| Label          | Text: “Angular”, “TypeScript”, etc.    | Near stations          |

---

### **3. About: Neural Tower**

**Figma frame name:** `03-About`

| Element           | Type                                          | Placement            |
| ----------------- | --------------------------------------------- | -------------------- |
| Tower             | Stacked circuit design                        | Center vertical      |
| Levels            | Blocks labeled: “Who I Am”, “Strengths”, etc. |                      |
| Animations (hint) | Arrows, lights, wires                         | Annotations in notes |
| Avatar or SVG     | Optional: your face/robot avatar              | Left/right corner    |

---

### **4. Work: City Screens Grid**

**Figma frame name:** `04-Work`

| Element         | Type                      | Placement                 |
| --------------- | ------------------------- | ------------------------- |
| Grid of screens | 3-column project cards    | Center                    |
| Each card       | Image + title + tag       | With hover animation hint |
| Background city | Transparent city at night | Backdrop                  |
| Section title   | “My Projects”             | Top center                |

---

### **5. Contact: Radio Tower**

**Figma frame name:** `05-Contact`

| Element      | Type                         | Placement            |
| ------------ | ---------------------------- | -------------------- |
| Background   | City outskirts / stars       |                      |
| Radio tower  | Tall SVG or image            | Left or center       |
| Signal waves | Concentric circles           | Emanating from tower |
| Contact form | Fields: name, email, message | Right or below       |
| Send button  | Cyber-style button           | Below form           |

---

### 📦 Optional Shared Elements

- **Navbar (top, fixed):** “Home | About | Work | Contact”
- **Footer:** Cyber glyphs, social links, GitHub

---

## 🛠 Build in Figma

1. Use **Desktop 1440px width frames**
2. Place each section in a separate **Figma page or frame**
3. Label layers clearly (e.g., `#H1`, `Button-Enter`, `Tower-Level-1`)
4. Add **Annotations** for animations (e.g., “Anime.js fade-in here”)

---

cyber city by "Asian Themed Low Poly Night City Buildings" (https://skfb.ly/pwKLV) by 99.Miles is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

planets by "Various Planets" (https://skfb.ly/o7F9p) by Feivelyn is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
