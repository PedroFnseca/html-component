# Web Component Architecture with HTML, CSS, and JavaScript
> A modern, fast-loading web project leveraging native componentization using pure HTML, CSS, and JavaScript — designed with scalability, reusability, and performance in mind.

> [!NOTE] 
> 
> This project showcases how to build scalable and modular front-end applications using custom HTML components, modular CSS, and Vanilla JavaScript. By focusing on separation of concerns and code reusability, it helps developers avoid repetition and build maintainable codebases without the need for heavy frameworks.
> 
> A practical implementation of this architecture powers a football video streaming platform (but the structure is adaptable to any kind of dynamic web application).

## Component-Based Web Development

The core philosophy of this project is centered on component-based architecture. Each user interface section is encapsulated into its own file and loaded dynamically, allowing for:

- [x] Better maintainability and scalability  
- [x] Cleaner and DRY (Don't Repeat Yourself) code  
- [x] Faster development cycles  
- [x] Reuse across multiple pages or applications  

### HTML Components Directory

```
components/
├── header.html           # Top bar with navigation, logo, and user menu
├── footer.html           # Footer with informational links
├── sidebar.html          # Collapsible navigation menu
├── chat.html             # Interactive chat widget
└── recommendations.html  # Reusable recommendation/content grid
```

## Optimized for Performance

This system is designed for fast page loads and non-blocking rendering, using techniques like:

- Asynchronous component loading via the Fetch API  
- Deferred execution to prevent render-blocking  
- DOM monitoring to ensure late-loaded components are still initialized correctly  

### JavaScript Loaders

Each component is paired with a JavaScript loader to inject HTML and initialize behaviors:

```
scripts/loaders/
├── index.js             # Universal loader logic
├── header.js
├── footer.js
├── sidebar.js
├── chat.js
└── recommendations.js
```

These loaders use modern, efficient patterns to enhance UX without requiring client-side frameworks.

## CSS Structure and Design System

We follow a modular CSS architecture to promote consistency, reuse, and clarity:

```
styles/
├── main.css
├── base/                # Variables, resets, typography
├── layout/              # Grid, containers, major sections
├── components/          # Styles scoped to each UI component
└── utils/               # Media queries and responsive helpers
```

### Design Highlights

- [x] Custom properties (CSS variables) for themes and spacing  
- [x] Responsive layouts with Flexbox and CSS Grid  
- [x] Accessibility-first with semantic HTML and color contrast  
- [x] Consistent UI patterns for buttons, forms, and cards  

## Data Layer (Simulated API)

Simulated dynamic behavior is powered by structured JSON data — useful for prototyping or testing without a backend:

```
data/
├── users.json
├── comments.json
└── content.json
```

## Key Features

- [x] Dynamic Component Injection – Pages load only necessary parts  
- [x] Interactive Modules – Components like chat or video suggestions update in real time  
- [x] Easily Scalable – Add or swap components with minimal effort  
- [x] Semantic and Accessible – Built with accessibility in mind  

## Tech Stack

- [x] HTML5 – Clean, semantic markup  
- [x] CSS3 – Modular, responsive, and maintainable  
- [x] JavaScript (ES6+) – Component loaders, interactions, and data simulation  
- [x] No Frameworks – 100% framework-free architecture for maximum control  
- [x] FontAwesome – Icon support  
- [x] YouTube Embed API – (Optional) media embedding in real use cases  

> [!NOTE] 
> This architecture was applied in building Lepy Sports Streaming, a football-focused platform featuring live video, real-time chat, and personalized recommendations. The same structure can be adapted to blogs, dashboards, e-commerce sites, and more (wherever modular UI components are beneficial).

## Benefits of This Architecture

- [x] Reusability – Write once, use anywhere  
- [x] No Code Duplication – Maintain a single source of truth  
- [x] Fast Loading – Lightweight components load only when needed  
- [x] SEO Friendly – Clean HTML with proper semantics  
- [x] Scalable – Easily extend with new features or pages  
