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


Great — you're following an ideal, **clean and scalable Angular folder structure**. Let's walk through each part of this tree and explain how it contributes to building a **high-performance, award-worthy portfolio**:

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

* `services/`: API communication, analytics, theme toggling
* `guards/`: route guards (auth, SEO protection, etc.)
* `animations/`: reusable global animation configs or utility functions

> ✅ Use for things that should be registered once and injected everywhere.

---

## 📁 `layout/` — Universal Layout Components

Contains UI components that are **always present** (outside of routing):

### Contents:

* `header/`: site logo, nav links, hamburger menu
* `footer/`: social media icons, legal links, copyright

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

* `hero/`: Fullscreen animated hero section (powered by **Anime.js**)
* `featured-projects/`: Grid or slider showing selected works

#### `about/`

Shows your background, skillset, tools, and maybe a resume section.

#### `work/`

List of all your projects with previews, animations, etc.

* `project-detail/`: A child route or nested view showing individual project details with images, video, etc.

#### `contact/`

Contact form, social links, location, and a downloadable resume button.

> ✅ Using subcomponents (like `hero`, `project-detail`) keeps each feature **isolated** and **easier to animate or reuse**.

---

## 📁 `shared/` — Reusable UI Components, Directives, Pipes

This is your **design system** — small parts used in multiple places.

### Possible folders:

* `components/`: Buttons, tags, section titles, cards
* `directives/`: Scroll-based triggers, intersection observers
* `pipes/`: Format dates, truncate text, linkify URLs

> ✅ Keeps your UI DRY and ensures a consistent visual system.

---

## 🔥 Why This Structure Works for a Portfolio

| Goal                   | How this structure helps                       |
| ---------------------- | ---------------------------------------------- |
| **UX**                 | Each part is animation-ready and isolated      |
| **Performance**        | Lazy loading & standalone pages                |
| **Maintainability**    | Clear roles: layout vs. logic vs. pages        |
| **Scalability**        | Can easily expand pages, themes, or animations |

---

## 💡 Pro Tips

* Use **Framer Motion-style page transitions** via Angular’s animation system
* Integrate **Anime.js** inside `hero.component.ts` and `featured-projects.component.ts`
* Preload fonts/videos from `assets/` to boost perceived speed
* Use `core/services/seo.service.ts` for dynamic `<title>` and `<meta>` tags

---
