# Ro Asahi's Personal Website

A personal portfolio and blog built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/        # Content collections (blog, projects)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── styles/         # Global styles
├── public/             # Static assets
├── astro.config.mjs    # Astro configuration
└── tailwind.config.mjs # Tailwind configuration
```

## ✍️ Adding Content

### New Blog Post

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "Brief description"
date: 2026-01-30
tags: ["tag1", "tag2"]
---

Your content here...
```

### New Project

Create a new `.md` file in `src/content/projects/`:

```md
---
title: "Project Name"
description: "Brief description"
tags: ["Tech1", "Tech2"]
href: "https://live-demo.com"
github: "https://github.com/username/repo"
featured: true
---

Project details...
```

## 🌐 Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

Live at: https://roasahi1986.github.io
