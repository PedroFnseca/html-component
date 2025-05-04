# Lepy Sports Streaming ⚽

A modern sports video streaming platform, focusing on football (soccer), developed with pure HTML, CSS, and JavaScript.

## 📑 About the Project

Lepy Sports Streaming is a web platform for viewing sports content, mainly football matches, highlights, and analysis. The system allows users to watch live broadcasts, interact via chat, and explore recommended videos.

### Main Features

- 🎬 High-quality sports video streaming
- 💬 Live chat for viewer interaction
- 🏆 Organization by competitions and teams

## 🛠️ Architecture and Code Organization

### Component-Based Architecture

The project uses a component-based architecture, allowing greater reusability and maintainability of the code. Each interface element is isolated in its own component:

```
components/
├── header.html    # Header with logo, search, and profile
├── footer.html    # Footer with links and information
├── sidebar.html   # Side navigation menu
├── chat.html      # Live chat component
└── recommendations.html  # Grid of recommended videos
```

### Loader System

One of the technical highlights of the project is its dynamic component loading system:

- **Modular Loaders**: Each component has its own JavaScript loader, responsible for loading and incorporating the HTML into the main page
- **Asynchronous Loading**: Uses fetch API to load components without blocking page rendering
- **Efficient Implementation**: Loaders monitor the DOM and ensure components are initialized even when loaded after the DOMContentLoaded event

```
scripts/loaders/
├── index.js       # Reusable main loader function
├── header.js      # Specific loader for the header
├── footer.js      # Specific loader for the footer
├── sidebar.js     # Specific loader for the sidebar
├── chat.js        # Specific loader for the chat
└── recommendations.js  # Loader for recommendations
```

### Modular CSS Structure

The CSS is organized in a modular structure for better maintenance and separation of responsibilities:

```
styles/
├── main.css                # Main file that imports all modules
├── base/
│   ├── variables.css       # CSS variables (colors, spacing, etc.)
│   ├── reset.css           # Style reset and global styles
│   └── typography.css      # Typography definitions
├── layout/
│   ├── container.css       # Main layout
│   ├── header.css          # Header styles
│   ├── sidebar.css         # Sidebar styles
│   ├── content.css         # Content area styles
│   └── footer.css          # Footer styles
├── components/
│   ├── search.css          # Search bar styles
│   ├── nav-item.css        # Navigation item styles
│   ├── video.css           # Video player styles
│   ├── chat.css            # Chat component styles
│   └── recommendations.css # Recommendations styles
└── utils/
    └── responsive.css      # Media queries and responsive adjustments
```

### Data Organization

Dynamic data is organized in JSON files, facilitating maintenance and simulation of a real API:

```
data/
├── users.json       # User information for the chat
├── comments.json    # Predefined comments for the chat
└── match-data.json  # Data about matches and videos
```

## 🎨 Design Techniques

### Consistent Design System

- **Color System**: Uses CSS variables to define a cohesive color palette and dark theme
- **Typography**: Clear and consistent typographic hierarchy
- **Spacing**: Proportional spacing system
- **Reusable Components**: Cards, buttons, and forms follow the same visual pattern

### User-Focused UX/UI

- **Layout Inspired by Popular Platforms**: Familiarity with YouTube and other streaming platforms
- **Visual Hierarchy**: Emphasis on main content and intuitive navigation
- **Visual Feedback**: Clear interactions and subtle animations to improve the experience
- **Accessibility**: Adequate contrast and semantic structure

## 🚀 Interactive Features

- **Video Switching**: Click on recommendations to replace the main video
- **Interactive Chat**: Simulated chat system with random message generation
- **Dynamic Navigation**: Navigation system between categories and teams

## 🧩 Technologies Used

- HTML5 for semantic structuring
- CSS3 with variables and flexbox/grid for advanced layouts
- Pure JavaScript (Vanilla JS) for interactivity
- Component-based architecture without frameworks
- FontAwesome for icons
- YouTube Embedded Player for video playback
